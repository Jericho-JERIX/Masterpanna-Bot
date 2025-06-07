import { EmbedBuilder } from "discord.js";

export function RandomApproachAlreadyClaimedEmbed() {
    return new EmbedBuilder()
    .setColor("Red")
    .setTitle("🚫 มีคนรับรางวัลไปแล้ว!")
    .setDescription("คุณมาช้าเกินไป ไว้โอกาสหน้านะ");
}