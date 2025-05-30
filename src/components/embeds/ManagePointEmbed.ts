import { EmbedBuilder, GuildMember } from "discord.js";
import { Users } from "../../../generated/prisma";

export function ManagePointEmbed({
	donor,
	receiver,
    receiverUser,
	amount,
	reason,
}: {
	donor: GuildMember;
	receiver: GuildMember;
    receiverUser: Users;
	amount: number;
	reason: string;
}) {
	const title = amount > 0 ? "📈 ได้รับแต้ม" : "📉 ลดแต้ม";
    const color = amount > 0 ? "Green" : "Red";

	return new EmbedBuilder()
		.setTitle(title)
		.setDescription(
			`<@${receiver.user.id}> ${amount > 0 ? "ได้รับ" : "ถูกลด"} ${amount} แต้มจาก <@${donor.user.id}>`
		)
		.addFields(
			{
				name: "จำนวนแต้ม",
				value: `🪙\`${amount.toString()}\``,
			},
            {
                name: "เหตุผล",
                value: reason,
            }
		)
		.setColor(color)
		.setThumbnail(receiver.user.displayAvatarURL())
        .setFooter({ text: `ตอนนี้คุณมี ${receiverUser.point} แต้ม` });
}
