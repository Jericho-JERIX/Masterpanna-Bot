import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../scripts/types/SlashCommand";
import UsersService from "../services/users.service";
import { LeaderboardsEmbed } from "../components/embeds/LeaderboardsEmbed";

export const Leaderboards: SlashCommand = {
    slashCommandBuilder: new SlashCommandBuilder()
        .setName("leaderboards")
        .setDescription("แสดงตารางจัดอันดับ"),
    
    async onCommandExecuted(interaction) {
        const us = new UsersService();
        const userList = await us.getUserList();
        const leaderboardEmbed = LeaderboardsEmbed({
            userList: userList.slice(0, 10),
        });
        await interaction.reply({ embeds: [leaderboardEmbed] });
    }
        
}