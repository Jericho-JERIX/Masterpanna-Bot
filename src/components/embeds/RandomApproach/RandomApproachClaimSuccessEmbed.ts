import { EmbedBuilder } from "discord.js";
import { coin } from "../../../utils/ui";
import RandomApproachConstant from "../../../constants/random-approach.constant";
import { DiscordUser, RandomApproach } from "../../../../generated/prisma";

export function RandomApproachClaimSuccessEmbed({
    discordId,
    rewardPoints,
    point,
    timeDiffMs,
    fastestRa,
}: {
    discordId: string;
    rewardPoints: number;
    point: number;
    timeDiffMs: number;
    fastestRa?: RandomApproach | null;
}) {
    let fastestMessage = "";
    if (fastestRa) {
        const timeDiffMs = fastestRa.claimedAt!.getTime() - fastestRa.createdAt.getTime();
        fastestMessage = `\n\n*🔥 เร็วที่สุดตอนนี้คือ \`${timeDiffMs/1000}\` วินาที โดย <@${fastestRa.claimedByDiscordId}>*`;
    }
	return new EmbedBuilder()
    .setAuthor({ name: RandomApproachConstant.Title })
    .setColor(RandomApproachConstant.Color)
    .setTitle("✅ รางวัลนี้เป็นของคุณ!")
    .setDescription(
        `<@${discordId}> ได้รับ ${coin(
            rewardPoints
        )} แต้ม โดยใช้เวลา \`${timeDiffMs/1000}\` วินาที${fastestMessage}`
    )
    .setFooter({
        text: `ตอนนี้คุณมี ${point} แต้ม`,
    });
}
