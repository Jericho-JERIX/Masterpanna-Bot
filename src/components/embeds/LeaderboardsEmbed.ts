import { EmbedBuilder } from "discord.js";
import { DiscordUser } from "../../../generated/prisma";
import { config } from "../../config";

export function LeaderboardsEmbed({
	discordUserList,
	mobileView = false,
}: {
	discordUserList: DiscordUser[];
	mobileView?: boolean;
}) {
	const rankingEmoji = [
		"🥇",
		"🥈",
		"🥉",
		"4️⃣",
		"5️⃣",
		"6️⃣",
		"7️⃣",
		"8️⃣",
		"9️⃣",
		"🔟",
	];

	const numberList = discordUserList.map(
		(_, index) => `${rankingEmoji[index]}`
	);
	const nameList = discordUserList.map(
		(discordUser) => `<@${discordUser.id}>`
	);
	const pointList = discordUserList.map(
		(discordUser) => `🪙\`${discordUser.point}\``
	);

	if (mobileView) {
		const mobileViewList = discordUserList.map(
			(discordUser, index) =>
				`${rankingEmoji[index]} <@${discordUser.id}> 🪙\`${discordUser.point}\``
		);

		return new EmbedBuilder()
			.setTitle("🏆 Top Leaderboards")
			.setDescription(mobileViewList.join("\n"))
			.setFooter({
				text:
					"Updated at " +
					new Date().toLocaleString(config.timeFormat, {
						timeZone: config.timezone,
					}),
			});
	}
	return new EmbedBuilder()
		.setTitle("🏆 Top Leaderboards")
		.addFields(
			{
				name: "Ranking",
				value: numberList.join("\n"),
				inline: true,
			},
			{
				name: "Discord",
				value: nameList.join("\n"),
				inline: true,
			},
			{
				name: "Points",
				value: pointList.join("\n"),
				inline: true,
			}
		)
		.setFooter({
			text:
				"Updated at " +
				new Date().toLocaleString(config.timeFormat, {
					timeZone: config.timezone,
				}),
		});
}
