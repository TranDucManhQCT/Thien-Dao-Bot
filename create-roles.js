require('dotenv').config();

const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');

const { DISCORD_TOKEN, GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !GUILD_ID) {
  console.error('Thieu DISCORD_TOKEN hoac GUILD_ID trong .env');
  process.exit(1);
}

const OWNER_PERMISSIONS = [PermissionFlagsBits.Administrator];

const SECT_MASTER_PERMISSIONS = [
  PermissionFlagsBits.ManageGuild,
  PermissionFlagsBits.ManageRoles,
  PermissionFlagsBits.ManageChannels,
  PermissionFlagsBits.ManageMessages,
  PermissionFlagsBits.KickMembers,
  PermissionFlagsBits.BanMembers,
  PermissionFlagsBits.ModerateMembers,
  PermissionFlagsBits.ViewAuditLog,
  PermissionFlagsBits.ViewChannel,
  PermissionFlagsBits.SendMessages,
  PermissionFlagsBits.EmbedLinks,
  PermissionFlagsBits.AttachFiles,
  PermissionFlagsBits.ReadMessageHistory,
  PermissionFlagsBits.UseApplicationCommands,
];

const ELDER_PERMISSIONS = [
  PermissionFlagsBits.ManageChannels,
  PermissionFlagsBits.ManageMessages,
  PermissionFlagsBits.KickMembers,
  PermissionFlagsBits.ModerateMembers,
  PermissionFlagsBits.ViewAuditLog,
  PermissionFlagsBits.ViewChannel,
  PermissionFlagsBits.SendMessages,
  PermissionFlagsBits.EmbedLinks,
  PermissionFlagsBits.AttachFiles,
  PermissionFlagsBits.ReadMessageHistory,
  PermissionFlagsBits.UseApplicationCommands,
];

const LAW_ENFORCER_PERMISSIONS = [
  PermissionFlagsBits.ManageMessages,
  PermissionFlagsBits.KickMembers,
  PermissionFlagsBits.ModerateMembers,
  PermissionFlagsBits.ViewAuditLog,
  PermissionFlagsBits.ViewChannel,
  PermissionFlagsBits.SendMessages,
  PermissionFlagsBits.EmbedLinks,
  PermissionFlagsBits.AttachFiles,
  PermissionFlagsBits.ReadMessageHistory,
  PermissionFlagsBits.UseApplicationCommands,
];

const OFFICER_PERMISSIONS = [
  PermissionFlagsBits.ManageMessages,
  PermissionFlagsBits.ViewChannel,
  PermissionFlagsBits.SendMessages,
  PermissionFlagsBits.EmbedLinks,
  PermissionFlagsBits.AttachFiles,
  PermissionFlagsBits.ReadMessageHistory,
  PermissionFlagsBits.UseApplicationCommands,
];

const GUIDE_PERMISSIONS = [
  PermissionFlagsBits.ViewChannel,
  PermissionFlagsBits.SendMessages,
  PermissionFlagsBits.EmbedLinks,
  PermissionFlagsBits.AttachFiles,
  PermissionFlagsBits.ReadMessageHistory,
  PermissionFlagsBits.UseApplicationCommands,
];

const MEMBER_PERMISSIONS = [
  PermissionFlagsBits.ViewChannel,
  PermissionFlagsBits.SendMessages,
  PermissionFlagsBits.EmbedLinks,
  PermissionFlagsBits.AttachFiles,
  PermissionFlagsBits.AddReactions,
  PermissionFlagsBits.ReadMessageHistory,
  PermissionFlagsBits.UseApplicationCommands,
  PermissionFlagsBits.Connect,
  PermissionFlagsBits.Speak,
  PermissionFlagsBits.UseVAD,
];

const CONG_PHAP_ROLES = [
  { name: '⚛️ React Huyễn Diện Công', color: 0x61dafb },
  { name: '🟦 TypeScript Chân Kinh', color: 0x3178c6 },
  { name: '🟨 JavaScript Tâm Pháp', color: 0xf7df1e },
  { name: '🟩 Node Hậu Đạo Quyết', color: 0x3c873a },
  { name: '🗄️ SQL Địa Mạch Kinh', color: 0x64748b },
  { name: '🐘 PostgreSQL Địa Mạch Kinh', color: 0x336791 },
  { name: '🎨 Figma Huyễn Hình Thuật', color: 0xf24e1e },
  { name: '☁️ Docker Vân Hạ Pháp', color: 0x2496ed },
].map((role) => ({
  ...role,
  permissions: [],
}));

const roleConfigs = [
  { name: 'Đạo Tổ', color: 0xf8fafc, permissions: OWNER_PERMISSIONS },
  { name: 'Thái Thượng Trưởng Lão', color: 0xfef3c7, permissions: SECT_MASTER_PERMISSIONS },
  { name: 'Tông Chủ', color: 0xfcd34d, permissions: SECT_MASTER_PERMISSIONS },
  { name: 'Phó Tông Chủ', color: 0xfbbf24, permissions: SECT_MASTER_PERMISSIONS },
  { name: 'Đại Trưởng Lão', color: 0xc084fc, permissions: ELDER_PERMISSIONS },
  { name: 'Trưởng Lão', color: 0xa855f7, permissions: ELDER_PERMISSIONS },
  { name: 'Chấp Pháp Trưởng Lão', color: 0x14b8a6, permissions: LAW_ENFORCER_PERMISSIONS },
  { name: 'Chấp Pháp Sứ', color: 0x0f766e, permissions: LAW_ENFORCER_PERMISSIONS },
  { name: 'Chấp Sự', color: 0x64748b, permissions: OFFICER_PERMISSIONS },
  { name: 'Dẫn Đạo Sư', color: 0x38bdf8, permissions: GUIDE_PERMISSIONS },
  { name: 'Đường Chủ', color: 0x818cf8, permissions: OFFICER_PERMISSIONS },
  { name: 'Đại Đạo Tông', color: 0x94a3b8, permissions: MEMBER_PERMISSIONS },
  { name: 'Tạp Linh Căn', color: 0x9ca3af },
  { name: 'Tứ Linh Căn', color: 0x60a5fa },
  { name: 'Tam Linh Căn', color: 0x34d399 },
  { name: 'Nhị Linh Căn', color: 0xfbbf24 },
  { name: 'Nhất Linh Căn', color: 0xf59e0b },
  { name: 'Kim Linh Căn', color: 0xfacc15 },
  { name: 'Mộc Linh Căn', color: 0x22c55e },
  { name: 'Thủy Linh Căn', color: 0x38bdf8 },
  { name: 'Hỏa Linh Căn', color: 0xef4444 },
  { name: 'Thổ Linh Căn', color: 0xa16207 },
  ...CONG_PHAP_ROLES,
];

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('clientReady', async () => {
  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    const roles = await guild.roles.fetch();

    for (const config of roleConfigs) {
      const existed = roles.find((role) => role.name === config.name);

      if (existed) {
        if (config.permissions !== undefined) {
          await existed.edit({
            colors: { primaryColor: config.color },
            permissions: config.permissions,
            mentionable: false,
            reason: 'Thien Dao Bot cap nhat quyen role tong mon.',
          });

          console.log(`Da cap nhat quyen role: ${config.name}`);
          continue;
        }

        console.log(`Da co role: ${config.name}`);
        continue;
      }

      await guild.roles.create({
        name: config.name,
        colors: { primaryColor: config.color },
        permissions: config.permissions ?? [],
        mentionable: false,
        reason: 'Thien Dao Bot tao role tong mon va linh can.',
      });

      console.log(`Da tao role: ${config.name}`);
    }
  } catch (error) {
    console.error('Khong the tao role:', error);
    process.exitCode = 1;
  } finally {
    client.destroy();
  }
});

client.login(DISCORD_TOKEN);
