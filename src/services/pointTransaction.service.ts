import { PointTransaction } from "../../generated/prisma";
import { config } from "../config";
import prisma from "../databases";
import GraphProvider from "../providers/graph";
import { convertDateToDDMMYYYYHHMMSSString } from "../utils/date";

export default class PointTransactionService {
	private graphProvider: GraphProvider;

	constructor() {
		this.graphProvider = new GraphProvider();
	}

	async getPointAverageTime(transactionList: PointTransaction[]) {
		const transactions = await prisma.pointTransaction.findMany();
		const x = [];
		const y = [];

		for (const ts of transactionList) {
			const before = transactions.filter(
				(t) => t.createdAt < ts.createdAt
			);
			const averageBefore =
				before.reduce((acc, t) => acc + t.pointAfter, 0) /
				before.length;

			x.push(convertDateToDDMMYYYYHHMMSSString(ts.createdAt));
			y.push(averageBefore);
		}

		await this.graphProvider.createPointNetworthGraph(x, y);
	}

	async getPointGraph(discordId: string) {
		const user = await prisma.discordUser.findUnique({
			where: {
				discordId,
			},
		});

		if (!user) {
			throw new Error("User not found");
		}

        const lastDayDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
		const pointTransactions = await prisma.pointTransaction.findMany({
			where: {
				discordUserId: user.id,
				createdAt: {
					gte: lastDayDate,
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
        

		// Show DD/MM/YYYY - HH:MM:SS
		const pointTimeList = pointTransactions
			.map((transaction) =>
				convertDateToDDMMYYYYHHMMSSString(transaction.createdAt)
			).map((date) => date.split(" - ")[1].slice(0,5))
			.reverse();
		const pointList = pointTransactions
			.map((transaction) => transaction.pointAfter)
			.reverse();

		const x = []
        const y = []

        let previousTime = ""
        for (let i = 0; i < pointTimeList.length; i++) {
            if (pointTimeList[i] !== previousTime) {
                x.push(pointTimeList[i])
                y.push(pointList[i])
                previousTime = pointTimeList[i]
            }
        }

		await this.graphProvider.createPointNetworthGraph(x, y);

		return pointTransactions;
	}
}
