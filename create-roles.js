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
  { name: '💻 frontend-huyễn-diện', color: 0x38bdf8 },
  { name: '⚙️ backend-hậu-đạo', color: 0x94a3b8 },
  { name: '🌐 fullstack-vạn-pháp', color: 0x22c55e },
  { name: '📱 mobile-linh-khí', color: 0x60a5fa },
  { name: '🗄️ database-địa-mạch', color: 0x64748b },
  { name: '🧠 ai-cơ-trí', color: 0xa855f7 },
  { name: '☁️ devops-vân-hạ', color: 0x2496ed },
  { name: '🛡️ security-hộ-pháp', color: 0x0f766e },
  { name: '🎮 game-mộng-cảnh', color: 0xf97316 },
  { name: '🎨 uiux-huyễn-hình', color: 0xec4899 },
  { name: '🏗️ system-kiến-trúc-pháp', color: 0xf59e0b },
].map((role) => ({
  ...role,
  permissions: [],
}));

const DISCIPLE_ROLES = [
  { name: 'Tán Tu', color: 0x78716c },
  { name: 'Ký Danh Đệ Tử', color: 0xa8a29e },
  { name: 'Tạp Dịch Đệ Tử', color: 0x6b7280 },
  { name: 'Ngoại Môn Đệ Tử', color: 0x22c55e },
  { name: 'Nội Môn Đệ Tử', color: 0x3b82f6 },
  { name: 'Chân Truyền Đệ Tử', color: 0xa855f7 },
  { name: 'Thân Truyền Đệ Tử', color: 0xf59e0b },
  { name: 'Thánh Tử', color: 0xfacc15 },
  { name: 'Thánh Nữ', color: 0xec4899 },
].map((role) => ({
  ...role,
  permissions: [],
}));

const QUALITY_ROLES = [
  { name: 'Hạ Phẩm Linh Căn', color: 0x8d99ae },
  { name: 'Trung Phẩm Linh Căn', color: 0x52b788 },
  { name: 'Thượng Phẩm Linh Căn', color: 0xffd166 },
  { name: 'Cực Phẩm Linh Căn', color: 0xf77f00 },
  { name: 'Thiên Phẩm Linh Căn', color: 0xc77dff },
].map((role) => ({
  ...role,
  permissions: [],
}));

const TU_VI_ROLES = [
  { name: 'Phàm Nhân', color: 0x808080 },
  { name: 'Luyện Khí', color: 0x8ecae6 },
  { name: 'Trúc Cơ', color: 0x52b788 },
  { name: 'Kim Đan', color: 0xffd166 },
  { name: 'Nguyên Anh', color: 0xf4a261 },
  { name: 'Hóa Thần', color: 0x9d4edd },
  { name: 'Luyện Hư', color: 0x4361ee },
  { name: 'Hợp Thể', color: 0xc77dff },
  { name: 'Đại Thừa', color: 0xe76f51 },
  { name: 'Độ Kiếp', color: 0xcaf0f8 },
  { name: 'Phi Thăng', color: 0xfff8dc },
].map((role) => ({
  ...role,
  permissions: [],
}));

const MINOR_REALM_ROLES = [
  { name: 'Sơ Kỳ', color: 0xadb5bd },
  { name: 'Trung Kỳ', color: 0x74c69d },
  { name: 'Hậu Kỳ', color: 0xe9c46a },
  { name: 'Đỉnh Phong', color: 0xf3722c },
].map((role) => ({
  ...role,
  permissions: [],
}));

const TEMPORARY_STATUS_ROLES = [
  { name: 'Tâm Ma Quấn Thân', color: 0x7f1d1d },
  { name: 'Bế Quan', color: 0x334155 },
  { name: 'Linh Khí Bạo Phát', color: 0x38bdf8 },
  { name: 'Cơ Duyên Gia Thân', color: 0xfacc15 },
  { name: 'Đạo Tâm Kiên Định', color: 0x22c55e },
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
  ...DISCIPLE_ROLES,
  { name: 'Tạp Linh Căn', color: 0x9ca3af, permissions: [] },
  { name: 'Tứ Linh Căn', color: 0x60a5fa, permissions: [] },
  { name: 'Tam Linh Căn', color: 0x34d399, permissions: [] },
  { name: 'Nhị Linh Căn', color: 0xfbbf24, permissions: [] },
  { name: 'Nhất Linh Căn', color: 0xf59e0b, permissions: [] },
  { name: 'Kim Linh Căn', color: 0xfacc15, permissions: [] },
  { name: 'Mộc Linh Căn', color: 0x22c55e, permissions: [] },
  { name: 'Thủy Linh Căn', color: 0x38bdf8, permissions: [] },
  { name: 'Hỏa Linh Căn', color: 0xef4444, permissions: [] },
  { name: 'Thổ Linh Căn', color: 0xa16207, permissions: [] },
  ...QUALITY_ROLES,
  ...TU_VI_ROLES,
  ...MINOR_REALM_ROLES,
  ...TEMPORARY_STATUS_ROLES,
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
