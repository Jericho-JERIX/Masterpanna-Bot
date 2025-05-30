import { EmbedBuilder } from "discord.js";
import HourlyRewardConstant from "../../constants/hourly-reward.constant";

export function HourlyRewardEmbed({
	discordId,
	recievedPoints,
	totalPoints,
}: {
	discordId: string;
	recievedPoints: number;
	totalPoints: number;
}) {
	let addedDescriptionList =
		HourlyRewardConstant.Description[recievedPoints - 1];
    const icon = HourlyRewardConstant.Icon[recievedPoints - 1];
	let addDescription =
		addedDescriptionList[
			Math.floor(Math.random() * addedDescriptionList.length)
		];

	let description = `*"${addDescription}"*\n<@${discordId}> ${icon} คุณได้รับ **${recievedPoints}** แต้ม`;

	return new EmbedBuilder()
		.setTitle("💸 รายได้ประจำชั่วโมง")
		.setDescription(description)
		.setColor("#11ff00")
		.setThumbnail(
			"https://lh3.googleusercontent.com/ySO8jPtih1VUK9Etoa2Jer53EMP0Y_6tFYD2aZtH8m3p5_T3uyXPLnqx54WOfCFt5uDoxVUJUazDPBy33HofpJ5hm_oMSSXBdSTqjPBk"
		)
		.setFooter({ text: `ตอนนี้คุณมี ${totalPoints} แต้ม` });
}
