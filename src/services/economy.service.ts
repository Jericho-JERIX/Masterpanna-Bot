import prisma from "../databases";

export default class EconomyService {
	constructor() {}

	async getLatestEconomy() {
		return prisma.economy.findFirstOrThrow({
			orderBy: {
				createdAt: "desc",
			},
		});
	}

	async createEconomy() {
		const userList = await prisma.discordUser.findMany({
			select: {
				point: true,
			},
		});
		const totalTransaction = await prisma.pointTransaction.count();

		const csp = userList.map((user) => user.point).join(",");
		const totalPoint = userList.reduce((acc, user) => acc + user.point, 0);
		const totalUser = userList.length;

		const pointMean = totalPoint / totalUser;
		const pointMax = Math.max(...userList.map((user) => user.point));
		const pointMin = Math.min(...userList.map((user) => user.point));
		const pointSd = Math.sqrt(
			userList.reduce(
				(acc, user) => acc + Math.pow(user.point - pointMean, 2),
				0
			) / totalUser
		);

		return prisma.economy.create({
			data: {
				pointMean,
				pointMax,
				pointMin,
				pointSd,
				totalPoint,
				totalUser,
				totalTransaction,
				csp,
			},
		});
	}

    async getStatistics() {
        const economy = await this.getLatestEconomy();
        // Most rewarded by Hourly Reward
        // Most rewarded by Random Approached
        // Most active player (Most transaction count)
    }
}
