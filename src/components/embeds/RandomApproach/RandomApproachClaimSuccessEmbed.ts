import { EmbedBuilder } from "discord.js";
import { coin } from "../../../utils/ui";
import RandomApproachConstant from "../../../constants/random-approach.constant";

export function RandomApproachClaimSuccessEmbed({
    discordId,
    rewardPoints,
    point,
    timeDiffMs,
}: {
    discordId: string;
    rewardPoints: number;
    point: number;
    timeDiffMs: number;
}) {
	return new EmbedBuilder()
    .setAuthor({ name: RandomApproachConstant.Title })
    .setColor(RandomApproachConstant.Color)
    .setTitle("✅ รางวัลนี้เป็นของคุณ!")
    .setDescription(
        `<@${discordId}> ได้รับ ${coin(
            rewardPoints
        )} แต้ม โดยใช้เวลา \`${timeDiffMs/1000}\` วินาที`
    )
    .setFooter({
        text: `ตอนนี้คุณมี ${point} แต้ม`,
    });
}
