import { Users } from "../../../generated/prisma";
import { EmbedBuilder, GuildMember, User } from "discord.js";

export function UserProfileEmbed({
	user,
	discordMember,
}: {
	user: Users;
	discordMember: GuildMember;
}) {
	return new EmbedBuilder()
		.setTitle("🍆 ข้อมูลผู้ใช้งาน")
		.setDescription(`<@${user.discordId}>`)
		.addFields({
			name: "🪙 แต้มทั้งหมด",
			value: `\`${user.point}\``,
		})
		.setThumbnail(discordMember.user.displayAvatarURL());
}
