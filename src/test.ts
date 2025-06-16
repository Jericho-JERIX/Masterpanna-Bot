import prisma from "./databases"
import PointTransactionService from "./services/pointTransaction.service"

(async () => {
    const ps = new PointTransactionService();

    const transactions = await ps.getPointGraph("619175426132148234");

    // console.log(transactions);
})()