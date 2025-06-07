import { EmbedBuilder } from "discord.js";
import { RandomApproach } from "../../../../generated/prisma";

export function RandomApproachEmbed({
	data,
    discordId,
}: {
	data: RandomApproach;
    discordId?: string;
}) {


	return new EmbedBuilder()
		.setColor("Yellow")
		.setTitle("🌟 บางอย่างกำลังปรากฏขึ้นมา!!!")
		.setDescription(data.description!)
        .addFields(
            {
                name: "มูลค่า",
                value: `🪙\`${data.rewardPoints}\``,
                inline: true,
            },
            {
                name: "สถานะ",
                value: discordId ? `*ถูกแย่งโดย* <@${discordId}>` : "✅ *ยังไม่มีคนรับรางวัล*",
                inline: true,
            }
        )
}
