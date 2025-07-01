import prisma from "../databases";

async function aftermatchAnnouncement() {

    
    const mostPoints = await prisma.discordUser.findFirstOrThrow({
        orderBy: {
            point: "desc"
        },
    })

    console.log(`Most Points: ${mostPoints.discordId} - ${mostPoints.point} points`);

    const hrTransactions = await prisma.pointTransaction.findMany({
        where: {
            description: {
                contains: "Hourly Reward"
            }
        }
    })

    const hrTable: Record<string, [number, number]> = {};
    for (const transaction of hrTransactions) {
        if (!hrTable[transaction.discordUserId]) {
            hrTable[transaction.discordUserId] = [0, 0]
        }
        hrTable[transaction.discordUserId][0] += transaction.amount;
        hrTable[transaction.discordUserId][1] += 1;
    }

    const hrTableSorted = Object.entries(hrTable).sort((a, b) => b[1][0] - a[1][0]);
    let [hrId, [hrPoint, hrCount]] = hrTableSorted[0]

    console.log(`Most Hourly Reward: ${hrId} - ${hrPoint} points - ${hrCount} times from ${hrTransactions.length} times`);

    //

    const raTransactions = await prisma.pointTransaction.findMany({
        where: {
            description: {
                contains: "Random Approach"
            }
        }
    })

    const raTable: Record<string, [number, number]> = {};
    for (const transaction of raTransactions) {
        if (!raTable[transaction.discordUserId]) {
            raTable[transaction.discordUserId] = [0, 0]
        }
        raTable[transaction.discordUserId][0] += transaction.amount;
        raTable[transaction.discordUserId][1] += 1;
    }

    const raTableSorted = Object.entries(raTable).sort((a, b) => b[1][0] - a[1][0]);
    let [raId, [raPoint, raCount]] = raTableSorted[0]

    console.log(`Most Random Approach: ${raId} - ${raPoint} points - ${raCount} times from ${raTransactions.length} times`);


}

aftermatchAnnouncement();