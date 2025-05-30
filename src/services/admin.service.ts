import { GuildMember } from "discord.js";
import { config } from "../config";

export default class AdminService {

    constructor() {
    }

    isGuildMemberIsAdmin(guildMember: GuildMember) {
        const roleList = guildMember.roles.cache.map(role => role.id);
        const isContainInAdminRoleIdList = config.adminRoleIdList.some(roleId => roleList.includes(roleId));
        const isContainInAdminUserIdList = config.adminUserIdList.includes(guildMember.user.id);
        return isContainInAdminRoleIdList || isContainInAdminUserIdList;
    }
}