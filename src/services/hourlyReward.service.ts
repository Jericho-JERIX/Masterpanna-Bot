import prisma from "../databases";
import CooldownError from "../errors/hourly-reward.error";
import HourlyRewardUtils from "../utils/hourly-reward";
import DiscordUserService from "./discordUser.service";

export default class HourlyRewardService {
	private readonly ds: DiscordUserService;

	constructor() {
		this.ds = new DiscordUserService();
	}

	async recieveHourlyReward(discordId: string) {
		const discordUser = await prisma.discordUser.findUniqueOrThrow({
			where: {
				discordId,
			},
		});

		const now = new Date();
		const lastClaimedAt: Date | null = discordUser.lastClaimedAt ?? null;

		if (
			lastClaimedAt &&
			HourlyRewardUtils.getResetDate(lastClaimedAt) >= now
		) {
			throw new CooldownError();
		}

		const chance = Math.random();
		let recievedPoints = 1;

		if (chance < 0.4) {
			recievedPoints = 2;
		}
		if (chance < 0.1) {
			recievedPoints = 3;
		}

		await prisma.discordUser.update({
			where: {
				id: discordUser.id,
			},
			data: {
				lastClaimedAt: now,
			},
		});

		const result = await this.ds.addPoint(discordId, recievedPoints, {
			description: "Hourly Reward",
		});

		return {
			...result,
			recievedPoints,
		};
	}
}
