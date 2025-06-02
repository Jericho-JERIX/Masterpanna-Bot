import { EmbedBuilder } from "discord.js";
import { Users } from "../../../generated/prisma";

export function LeaderboardsEmbed({
    userList,
}:{
    userList: Users[]
}) {

    const numberList = userList.map((_, index) => `${index + 1}`);
    const nameList = userList.map((user) => `<@${user.discordId}>`);
    const pointList = userList.map((user) => `🪙\`${user.point}\``);

    return new EmbedBuilder()
        .setTitle("🏆 ตารางจัดอันดับ")
        .addFields({
            name: "ลำดับ",
            value: numberList.join("\n"),
            inline: true
        }, {
            name: "ชื่อ",
            value: nameList.join("\n"),
            inline: true
        }, {
            name: "แต้ม",
            value: pointList.join("\n"),
            inline: true
        })

}