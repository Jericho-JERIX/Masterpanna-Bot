import prisma from "../databases";

export async function migrateDiscordUsersToDiscordUser() {
	const discordUsers = await prisma.discordUser.findMany();
	for (const discordUser of discordUsers) {
		await prisma.discordUser.upsert({
			where: {
				discordId: discordUser.discordId,
			},
			update: {
				point: discordUser.point,
				lastClaimedAt: discordUser.lastClaimedAt,
				createdAt: discordUser.createdAt,
				updatedAt: discordUser.updatedAt,
			},
			create: {
				discordId: discordUser.discordId,
				point: discordUser.point,
				lastClaimedAt: discordUser.lastClaimedAt,
				createdAt: discordUser.createdAt,
				updatedAt: discordUser.updatedAt,
			},
		});
	}
}

migrateDiscordUsersToDiscordUser();
