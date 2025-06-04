import { ButtonBuilder, ButtonStyle } from "discord.js";

export function MobileViewButton() {
    return new ButtonBuilder()
        .setCustomId("mobile-view")
        .setLabel("ดูในรูปแบบมือถือ")
        .setStyle(ButtonStyle.Primary)
}
