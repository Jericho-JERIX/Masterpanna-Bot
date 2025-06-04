import { EmbedBuilder } from "discord.js";
import { Users } from "../../../generated/prisma";

export function LeaderboardsEmbed({
    userList,
    mobileView = false,
}:{
    userList: Users[]
    mobileView?: boolean
}) {

    const rankingEmoji = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

    const numberList = userList.map((_, index) => `${rankingEmoji[index]}`);
    const nameList = userList.map((user) => `<@${user.discordId}>`);
    const pointList = userList.map((user) => `🪙\`${user.point}\``);

    if (mobileView) {

        const mobileViewList = userList.map((user, index) => `${rankingEmoji[index]} <@${user.discordId}> 🪙\`${user.point}\``)

        return new EmbedBuilder()
            .setTitle("🏆 Top Leaderboards")
            .setDescription(mobileViewList.join("\n"))
            .setFooter({
                text: 'Updated at ' + new Date().toLocaleString()
            })
    }
    return new EmbedBuilder()
        .setTitle("🏆 Top Leaderboards")
        .addFields({
            name: "Ranking",
            value: numberList.join("\n"),
            inline: true
        }, {
            name: "Discord",
            value: nameList.join("\n"),
            inline: true
        }, {
            name: "Points",
            value: pointList.join("\n"),
            inline: true
        })
        .setFooter({
            text: 'Updated at ' + new Date().toLocaleString()
        })
}