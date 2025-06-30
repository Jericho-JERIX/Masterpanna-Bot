import { DiscordUser } from "../../../generated/prisma";

export interface GetProfile extends DiscordUser {
    totalTransactions: number;
    pph: number;
}