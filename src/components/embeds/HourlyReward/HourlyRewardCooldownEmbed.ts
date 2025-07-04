import { EmbedBuilder } from "discord.js";
import { convertMillisecondsToHHMMSSString } from "../../../utils/date";
import HourlyRewardUtils from "../../../utils/hourly-reward";
import HourlyRewardConstant from "../../../constants/hourly-reward.constant";

export function HourlyRewardCooldownEmbed({
	discordId,
	totalPoints,
	lastClaimedAt,
}: {
	discordId: string;
	totalPoints: number;
	lastClaimedAt: Date;
}) {
	const timeLeft =
		HourlyRewardUtils.getResetDate(lastClaimedAt).getTime() -
		new Date().getTime();

	return new EmbedBuilder()
		.setAuthor({ name: HourlyRewardConstant.Title })
		.setTitle("🚫 ยังไม่ถึงเวลาที่สามารถรับแต้มได้")
		.setDescription(
			`<@${discordId}> ตอนนี้ยังไม่สามารถรับแต้มได้ รอก่อนนะจ๊ะ`
		)
		.addFields({
			name: "🕒 สามารถรับได้ในอีก",
			value: `\`${convertMillisecondsToHHMMSSString(timeLeft)}\``,
		})
		.setColor(HourlyRewardConstant.Color)
		.setThumbnail(
			"https://lh3.googleusercontent.com/ySO8jPtih1VUK9Etoa2Jer53EMP0Y_6tFYD2aZtH8m3p5_T3uyXPLnqx54WOfCFt5uDoxVUJUazDPBy33HofpJ5hm_oMSSXBdSTqjPBk"
		)
		.setFooter({ text: `ตอนนี้คุณมี ${totalPoints} แต้ม` });
}
