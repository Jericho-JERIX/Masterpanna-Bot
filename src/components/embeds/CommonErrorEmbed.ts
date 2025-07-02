import { EmbedBuilder } from "discord.js";

export function CommonErrorEmbed() {
    return new EmbedBuilder()
        .setColor("Red")
        .setTitle("เกิดข้อผิดพลาดในการจัดการข้อมูล")
        .setDescription("โปรดลองใหม่อีกครั้ง")
}
