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
}