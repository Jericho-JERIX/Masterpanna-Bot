import prisma from "../databases";
import CooldownError from "../errors/hourly-reward.error";
import HourlyRewardUtils from "../utils/hourly-reward";

export default class UsersService {
    
    constructor() {
    }

    async getUserByDiscordId(discordId: string) {
        return prisma.users.findUniqueOrThrow({
            where: {
                discordId
            }
        })
    }

    async getUserList() {
        return prisma.users.findMany({
            orderBy: {
                point: "desc",
            },
        });
    }

    async createIfUserNotExists(discordId: string) {
        const user = await prisma.users.findUnique({
            where: {
                discordId
            }
        })

        if (!user) {
            await prisma.users.create({
                data: {
                    discordId
                }
            })
        }
    }
    
    async recieveHourlyReward(discordId: string) {

        const user = await prisma.users.findUniqueOrThrow({
            where: {
                discordId
            }
        })

        const now = new Date();
        const lastClaimedAt: Date | null = user.lastClaimedAt ?? null;

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

        const result = await prisma.users.update({
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

        const user = await this.getUserByDiscordId(discordId);

        let newPoint = user.point + amount;

        if (newPoint < 0) {
            newPoint = 0;
        }

        return prisma.users.update({
            where: {
                discordId
            },
            data: {
                point: newPoint
            }
        })
    }
    
}