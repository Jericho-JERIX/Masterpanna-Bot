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

	// async getPointAverageTime(transactionList: PointTransaction[]) {
	// 	const transactions = await prisma.pointTransaction.findMany();
	// 	const x = [];
	// 	const y = [];

	// 	for (const ts of transactionList) {
	// 		const before = transactions.filter(
	// 			(t) => t.createdAt < ts.createdAt
	// 		);
	// 		const averageBefore =
	// 			before.reduce((acc, t) => acc + t.pointAfter, 0) /
	// 			before.length;

	// 		x.push(convertDateToDDMMYYYYHHMMSSString(ts.createdAt));
	// 		y.push(averageBefore);
	// 	}

	// 	await this.graphProvider.createPointNetworthGraph(x, y);
	// }

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
		const economyList = await prisma.economy.findMany({
			where: {
				createdAt: {
					gte: lastDayDate,
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		// Show DD/MM/YYYY - HH:MM:SS
		const timeList = economyList
			.map((e) => e.createdAt)
			.reverse();

		const pointList = pointTransactions
			.map((transaction) => ({
                point: transaction.pointAfter,
                createAt: transaction.createdAt
            }))
			.reverse();

        const economyMeanList = economyList.map((e) => e.pointMean).reverse();

		const x = [];
		const y1 = [];
		const y2 = [];

        let pi = 0;
		for (let i = 0; i < timeList.length; i++) {
            while (pi < pointList.length - 1 && pointList[pi].createAt < timeList[i]) {
                pi++;
            }

            x.push(convertDateToDDMMYYYYHHMMSSString(timeList[i]).split(" - ")[1].slice(0, 5));
            y1.push(pointList[pi].point);
            y2.push(economyMeanList[i].toFixed(1));
		}

        await this.graphProvider.createPointNetworthGraph(x, y1, y2);

		return pointTransactions;
	}
}
