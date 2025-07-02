import { GuildMember, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../scripts/types/SlashCommand";
import DiscordUserService from "../../services/discordUser.service";
import { ManagePointEmbed } from "../../components/embeds/ManagePointEmbed";
import AdminService from "../../services/admin.service";

export const ManagePoint: SlashCommand = {
    slashCommandBuilder: new SlashCommandBuilder()
    .setName("manage-point")
    .setDescription("จัดการแต้มของผู้ใช้งาน")
    .addUserOption(option => option
        .setName("user")
        .setDescription("รหัสผ่านของผู้ใช้งาน")
        .setRequired(true)
    )
    .addNumberOption(option => option
        .setName("amount")
        .setDescription("จำนวนแต้ม")
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("reason")
        .setDescription("เหตุผลในการเพิ่มหรือลบแต้ม")
    ),

    async onCommandExecuted(interaction) {
        const us = new DiscordUserService();
        const as = new AdminService();

        if (!as.isGuildMemberIsAdmin(interaction.member as GuildMember)) {
            await interaction.reply({
                content: "คุณไม่มีสิทธิในการใช้งานคำสั่งนี้",
                ephemeral: true,
            })
            return;
        }

        const discordUser = interaction.options.getUser("user", true);
        const amount = interaction.options.getNumber("amount", true);
        const reason = interaction.options.getString("reason");

        const result = await us.addPoint(discordUser.id, amount, {
            description: `Manage Point by ${interaction.member?.user.username} (${interaction.member?.user.id}) with reason: ${reason}`
        });

        const receiver = interaction.guild?.members.cache.get(discordUser.id);

        if (!receiver) {
            await interaction.reply({
                content: "ไม่พบผู้ใช้งานที่ต้องการจัดการแต้ม",
                ephemeral: true,
            })
            return;
        }

        await interaction.reply({
            ...(reason && { content: `<@${discordUser.id}>` }),
            embeds: [
                ManagePointEmbed({
                    receiver: receiver,
                    receiverDiscordUser: result,
                    donor: interaction.member as GuildMember,
                    amount,
                    reason: reason || "-",
                })
            ],
            ephemeral: !reason,
        })

    },
    
}