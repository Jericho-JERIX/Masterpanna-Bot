import prisma from "../databases";
import CooldownError from "../errors/hourly-reward.error";
import { GetProfile } from "../types/discord-user/response";
import HourlyRewardUtils from "../utils/hourly-reward";

export default class DiscordUserService {
	constructor() {}

	async getProfile(id: string): Promise<GetProfile> {
		const user = await prisma.discordUser.findUniqueOrThrow({
			where: {
				id,
			},
		});

		const tctCount = await prisma.pointTransaction.count({
			where: {
				discordUserId: id,
			},
		});

        // Find PPH
        const lastDay = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const todayTransaction = await prisma.pointTransaction.findMany({
            where: {
                discordUserId: id,
                createdAt: {
                    gte: lastDay
                },
            },
        })

        let pointInHourList: number[] = Array(24).fill(0)
        for (const tct of todayTransaction) {
            const hour = new Date(tct.createdAt).getHours()
            pointInHourList[hour] += tct.amount
        }

        const pph = pointInHourList.reduce((acc, curr) => acc + curr, 0) / pointInHourList.length

        return {
            ...user,
            totalTransactions: tctCount,
            pph: pph,
        }
	}

	async getById(id: string) {
		return prisma.discordUser.findUniqueOrThrow({
			where: {
				id,
			},
		});
	}

	async getDiscordUserList() {
		return prisma.discordUser.findMany({
			orderBy: {
				point: "desc",
			},
		});
	}

	async createIfDiscordUserNotExists(discordId: string) {
		const discordUser = await prisma.discordUser.findUnique({
			where: {
				id: discordId,
			},
		});

		if (!discordUser) {
			await prisma.discordUser.create({
				data: {
					id: discordId,
				},
			});
		}
	}

	async addPoint(
		discordId: string,
		amount: number,
		{ description }: { description?: string } = {}
	) {
		const discordUser = await this.getById(discordId);

		let newPoint = discordUser.point + amount;

		if (newPoint < 0) {
			newPoint = 0;
		}

		await prisma.pointTransaction.create({
			data: {
				amount,
				pointBefore: discordUser.point,
				pointAfter: newPoint,
				description,
				discordUserId: discordUser.id,
			},
		});

		return prisma.discordUser.update({
			where: {
				id: discordUser.id,
			},
			data: {
				point: newPoint,
			},
		});
	}
}
