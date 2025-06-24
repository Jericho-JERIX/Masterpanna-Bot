import RandomApproachConstant from "../constants/random-approach.constant";
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

	async create(rewardPoints: number) {
		const randomDesc = RandomApproachConstant.getRandomDescription();
		const description = `> *"${randomDesc}"*\nรีบกดที่ปุ่มด้านล่างเพื่อรับรางวัล ก่อนจะมีคนแย่งไป!`;

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
				target.rewardPoints,
				{
					description: "Random Approach",
				}
			);

			return {
				randomApproach: raResult,
				discordUser: duResult,
			};
		} catch (error) {
			console.error(error);
			throw new Error("Failed to claim random approach");
		}
	}

	async getFastestClaimed() {

		const raList = await prisma.randomApproach.findMany({
			where: {
				claimedByDiscordId: {
					not: null,
				},
			},
		});

        if (raList.length === 0) {
            return null;
        }

        let result = null;
        let leastTime = Infinity;
        for (const ra of raList) {
            if (!ra.claimedAt) continue;
            let claimedTime = ra.claimedAt.getTime() - ra.createdAt.getTime();
            if (claimedTime < leastTime) {
                leastTime = claimedTime;
                result = ra;
            }
        }

        if (!result) {
            return null;
        }

        const user = await prisma.discordUser.findUniqueOrThrow({
            where: {
                id: result.claimedByDiscordId!,
            },
        });

        return {
            randomApproach: result,
            discordUser: user,
        };
	}
}
