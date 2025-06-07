import { EmbedBuilder } from "discord.js";
import RandomApproachConstant from "../../../constants/random-approach.constant";

export function RandomApproachAlreadyClaimedEmbed() {
	return new EmbedBuilder()
		.setAuthor({ name: RandomApproachConstant.Title })
		.setColor(RandomApproachConstant.Color)
		.setTitle("🚫 มีคนรับรางวัลไปแล้ว!")
		.setDescription("คุณมาช้าเกินไป ไว้โอกาสหน้านะ");
}
