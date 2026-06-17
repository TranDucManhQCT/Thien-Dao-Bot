require('dotenv').config();

const { REST, Routes, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !CLIENT_ID) {
  console.error('Thieu DISCORD_TOKEN hoac CLIENT_ID trong .env');
  process.exit(1);
}

const commands = [
  new SlashCommandBuilder()
    .setName('setup-linhcan')
    .setDescription('Dựng Linh Căn Đài cho tông môn.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  new SlashCommandBuilder()
    .setName('linhcan')
    .setDescription('Kiểm tra linh căn trong ticket riêng.')
    .setDMPermission(false)
    .addIntegerOption((option) =>
      option
        .setName('ngay')
        .setDescription('Ngày sinh.')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(31),
    )
    .addIntegerOption((option) =>
      option
        .setName('thang')
        .setDescription('Tháng sinh.')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(12),
    )
    .addIntegerOption((option) =>
      option
        .setName('nam')
        .setDescription('Năm sinh.')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(9999),
    ),
  new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Xem đạo hồ của bản thân hoặc một đạo hữu.')
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName('thanhvien')
        .setDescription('Đạo hữu muốn xem hồ sơ.')
        .setRequired(false),
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

async function deployCommands() {
  const route = GUILD_ID
    ? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)
    : Routes.applicationCommands(CLIENT_ID);

  await rest.put(route, { body: commands });

  console.log(
    GUILD_ID
      ? `Da dang ky slash commands cho guild ${GUILD_ID}.`
      : 'Da dang ky slash commands global. Global commands co the mat mot luc moi hien.',
  );
}

deployCommands().catch((error) => {
  console.error('Khong the dang ky slash commands:', error);
  process.exit(1);
});
