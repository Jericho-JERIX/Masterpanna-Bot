import { EmbedBuilder } from "discord.js";

export function UnableToPlayNowEmbed() {
	return new EmbedBuilder()
        .setTitle("⚠️ หมดช่วงเวลากิจกรรมแล้ว")
        .setDescription("กิจกรรมนี้จบลงแล้ว รางวัลจากการร่วมกิจกรรมสามารถติดตามได้ที่นี่: https://www.twitch.tv/masterpanna_s\nขอบคุณที่เข้าร่วมกิจกรรมกับเรา แล้วเดี๋ยวเรามาเจอกันใหม่ในลีคต่อไปนะครับ 🙏")
        .setColor("#FF0000")
}
