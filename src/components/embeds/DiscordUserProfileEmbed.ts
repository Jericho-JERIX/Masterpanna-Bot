import { DiscordUser } from "../../../generated/prisma";
import { EmbedBuilder, GuildMember } from "discord.js";

export function DiscordUserProfileEmbed({
	discordUser,
	discordMember,
}: {
	discordUser: DiscordUser;
	discordMember: GuildMember;
}) {
	return new EmbedBuilder()
		.setTitle("🍆 ข้อมูลผู้ใช้งาน")
		.setDescription(`<@${discordUser.discordId}>`)
		.addFields({
			name: "🪙 แต้มทั้งหมด",
			value: `\`${discordUser.point}\``,
		})
		.setThumbnail(discordMember.user.displayAvatarURL());
}
