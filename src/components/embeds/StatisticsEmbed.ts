import { EmbedBuilder } from "discord.js";
import { DiscordUser } from "../../../generated/prisma/client";

export function StatisticsEmbed({
	mean,
    maxUser,
    minUser,
    sd,
    totalPoints,
    totalPlayers,
}: {
	mean: number;
	maxUser: DiscordUser;
	minUser: DiscordUser;
	sd: number;
	totalPoints: number;
	totalPlayers: number;
}) {
	return new EmbedBuilder().setTitle("สถิติการใช้งาน").addFields(
		{
			name: "Mean",
			value: `\`${mean}\``,
			inline: true,
		},
        {
            name: "Standard Deviation",
            value: `\`${sd}\``,
            inline: false,
        },
		{
			name: "Max",
			value: `<@${maxUser.discordId}> 🪙\`${maxUser.point}\``,
			inline: true,
		},
		{
			name: "Min",
			value: `<@${minUser.discordId}> 🪙\`${minUser.point}\``,
			inline: false,
		},
		{
			name: "Total Points",
			value: `\`${totalPoints}\``,
			inline: true,
		},
		{
			name: "Total Players",
			value: `\`${totalPlayers}\``,
			inline: false,
		},
	);
}
