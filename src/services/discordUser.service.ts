import prisma from "../databases";
import CooldownError from "../errors/hourly-reward.error";
import HourlyRewardUtils from "../utils/hourly-reward";

export default class DiscordUserService {
    
    constructor() {
    }

    async getById(id: string) {
        return prisma.discordUser.findUniqueOrThrow({
            where: {
                id
            }
        })
    }

    async getDiscordUserByDiscordId(discordId: string) {
        return prisma.discordUser.findUniqueOrThrow({
            where: {
                discordId
            }
        })
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
                discordId
            }
        })

        if (!discordUser) {
            await prisma.discordUser.create({
                data: {
                    discordId
                }
            })
        }
    }

    async addPoint(discordId: string, amount: number, { description }: { description?: string } = {}) {

        const discordUser = await this.getDiscordUserByDiscordId(discordId);

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
                discordUserId: discordUser.id
            }
        })

        return prisma.discordUser.update({
            where: {
                id: discordUser.id
            },
            data: {
                point: newPoint
            }
        })
    }
    
}