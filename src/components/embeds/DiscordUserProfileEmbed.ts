import { DiscordUser } from "../../../generated/prisma";
import { EmbedBuilder, GuildMember } from "discord.js";
import { ce, coin } from "../../utils/ui";

export function DiscordUserProfileEmbed({
	discordUser,
	discordMember,
    totalTransactions=0,
    pph=0,
}: {
	discordUser: DiscordUser;
	discordMember: GuildMember;
    totalTransactions?: number | string;
    pph?: number | string;
}) {
	return new EmbedBuilder()
		.setTitle("🍆 ข้อมูลผู้ใช้งาน")
		.setDescription(`<@${discordUser.id}>`)
		.addFields({
			name: "Points",
			value: `${coin(discordUser.point)}`,
            inline: true,
		})
        .addFields({
            name: "Transactions",
            value: `${ce("📝", totalTransactions)}`,
            inline: true,
        })
        .addFields({
            name: "Points Per Hour",
            value: `${ce("🔥", pph)}`,
            inline: true,
        })
		.setThumbnail(discordMember.user.displayAvatarURL());
}
