import { EmbedBuilder } from "discord.js";
import { RandomApproach } from "../../../../generated/prisma";
import RandomApproachConstant from "../../../constants/random-approach.constant";

export function RandomApproachEmbed({
	data,
    discordId,
}: {
	data: RandomApproach;
    discordId?: string;
}) {


	return new EmbedBuilder()
		.setColor(RandomApproachConstant.Color)
		.setTitle(RandomApproachConstant.Title)
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
