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
    
    async recieveHourlyReward(discordId: string) {

        const discordUser = await prisma.discordUser.findUniqueOrThrow({
            where: {
                discordId
            }
        })

        const now = new Date();
        const lastClaimedAt: Date | null = discordUser.lastClaimedAt ?? null;

        if (lastClaimedAt && HourlyRewardUtils.getResetDate(lastClaimedAt) >= now) {
            throw new CooldownError();
        }
        

        const chance = Math.random();
        let recievedPoints = 1;

        if (chance < 0.4) {
            recievedPoints = 2;
        }
        if (chance < 0.1) {
            recievedPoints = 3;
        }

        const result = await prisma.discordUser.update({
            where: {
                discordId
            },
            data: {
                lastClaimedAt: now,
                point: {
                    increment: recievedPoints
                }
            }
        });

        return {
            ...result,
            recievedPoints
        };
    }

    async addPoint(discordId: string, amount: number) {

        const discordUser = await this.getDiscordUserByDiscordId(discordId);

        let newPoint = discordUser.point + amount;

        if (newPoint < 0) {
            newPoint = 0;
        }

        return prisma.discordUser.update({
            where: {
                discordId
            },
            data: {
                point: newPoint
            }
        })
    }
    
}