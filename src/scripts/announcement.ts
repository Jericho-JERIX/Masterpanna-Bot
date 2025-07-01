import prisma from "../databases";

async function mostLuckyHourlyReward() {
    const rewardList = await prisma.pointTransaction.findMany({
        where: {
            description: {
                contains: "Hourly Reward"
            }
        }
    })

    const table: { [key: string]: {
        point3: number,
        point1: number,
        total: number
    } } = {}

    for (const reward of rewardList) {
        if (!table[reward.discordUserId]) {
            table[reward.discordUserId] = {
                point3: 0,
                point1: 0,
                total: 0
            }
        }

        if (reward.amount === 3 || reward.amount === 1) {
            table[reward.discordUserId].total += reward.amount
        }

        if (reward.amount === 3) {
            table[reward.discordUserId].point3 += 1
        } else if (reward.amount === 1) {
            table[reward.discordUserId].point1 += 1
        }
    }

    const result = Object.entries(table).map(([key, value]) => {
        if (value.total <= 10) {
            return {
                id: key,
                pctP3: 0,
                pctP1: 0,
                ...value
            }
        } else {
            return {
                id: key,
                pctP3: value.point3 / value.total,
                pctP1: value.point1 / value.total,
                ...value
            }
        }
    })

    const mostPoint3 = result.sort((a, b) => b.pctP3 - a.pctP3)[0]
    const mostPoint1 = result.sort((a, b) => b.pctP1 - a.pctP1)[0]

    console.log(mostPoint3)
    console.log(mostPoint1)

}

mostLuckyHourlyReward()