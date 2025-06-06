import prisma from "../databases";
import DiscordUserService from "./discordUser.service";

export class AlreadyClaimedError extends Error {
	constructor() {
		super("This random approach has already been claimed");
	}
}

export default class RandomApproachService {
	private readonly ds: DiscordUserService;

	constructor() {
		this.ds = new DiscordUserService();
	}

	async create(rewardPoints: number, description?: string) {
		return prisma.randomApproach.create({
			data: {
				rewardPoints,
				description,
			},
		});
	}

	async claim(id: string, discordId: string) {
		const target = await prisma.randomApproach.findUniqueOrThrow({
			where: {
				id,
			},
		});

		if (target.claimedByDiscordId) {
			throw new AlreadyClaimedError();
		}

		try {

            const targetUser = await prisma.discordUser.findUniqueOrThrow({
                where: {
                    discordId,
                },
            });
			
            const raResult = await prisma.randomApproach.update({
				where: {
					id: id,
				},
				data: {
					claimedByDiscordId: targetUser.id,
					claimedAt: new Date(),
				},
			});
			const duResult = await this.ds.addPoint(
				discordId,
				target.rewardPoints
			);

			return {
				randomApproach: raResult,
				discordUser: duResult,
			};
		} catch (error) {
            console.error(error)
			throw new Error("Failed to claim random approach");
		}
	}
}
