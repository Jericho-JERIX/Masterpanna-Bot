import { DiscordAPIError, GuildMember, User } from "discord.js";
import { config } from "../config";

export async function givePlayerRoleToUser(member: GuildMember) {
	const playerRole = member.guild.roles.cache.find(
		(role) => role.id === config.playerRoleId
	);
	if (!playerRole) {
		throw new Error("Player role not found");
	}
	if (!member.roles.cache.has(playerRole.id)) {
        try {
			await member.roles.add(playerRole);
		} catch (error) {
			if (error instanceof DiscordAPIError) {
				switch (error.code) {
                    case 50013:
                        console.error("Bot role is not higher than player role");
                        break;
                    default:
                        console.error(error);
                        break;
                }
			} else {
				console.error(error);
			}
		}
	}
}
