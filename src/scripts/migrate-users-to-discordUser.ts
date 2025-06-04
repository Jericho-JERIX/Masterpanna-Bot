import prisma from "../databases";

export async function migrateDiscordUsersToDiscordUser() {
    const discordUsers = await prisma.discordUser.findMany();
    for (const discordUser of discordUsers) {
        await prisma.discordUser.create({
            data: discordUser,
        });
    }
}

migrateDiscordUsersToDiscordUser();
