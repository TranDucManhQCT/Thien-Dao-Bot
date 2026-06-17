require('dotenv').config();

const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  MessageFlags,
  PermissionFlagsBits,
} = require('discord.js');

const { DISCORD_TOKEN } = process.env;

if (!DISCORD_TOKEN) {
  console.error('Thieu DISCORD_TOKEN trong .env');
  process.exit(1);
}

const GOLD = 0xffd700;
const OPEN_TICKET_BUTTON = 'thien_dao_open_linh_can_ticket';
const CLOSE_TICKET_BUTTON = 'thien_dao_close_linh_can_ticket';
const TICKET_TOPIC_PREFIX = 'linhcan-owner:';
const THU_NHAN_TOPIC_PREFIX = 'thu-nhan-owner:';
const BAI_SU_TOPIC_PREFIX = 'bai-su-owner:';
const REQUEST_DISCIPLE_BUTTON = 'thien_dao_request_disciple';
const REQUEST_MASTER_BUTTON = 'thien_dao_request_master';
const ACCEPT_DISCIPLE_BUTTON = 'thien_dao_accept_disciple';
const REJECT_DISCIPLE_BUTTON = 'thien_dao_reject_disciple';
const ACCEPT_MASTER_BUTTON = 'thien_dao_accept_master';
const REJECT_MASTER_BUTTON = 'thien_dao_reject_master';
const CLOSE_REQUEST_TICKET_BUTTON = 'thien_dao_close_request_ticket';
const CONG_PHAP_BUTTON_PREFIX = 'thien_dao_cong_phap:';

const ELEMENTS = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
const CAN_NAMES = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI_NAMES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
const CLASSIFICATION_ROLES = [
  'Tạp Linh Căn',
  'Tứ Linh Căn',
  'Tam Linh Căn',
  'Nhị Linh Căn',
  'Nhất Linh Căn',
];
const QUALITY_ROLES = [
  'Hạ Phẩm Linh Căn',
  'Trung Phẩm Linh Căn',
  'Thượng Phẩm Linh Căn',
  'Cực Phẩm Linh Căn',
  'Thiên Phẩm Linh Căn',
];
const ELEMENT_ROLE_NAMES = ELEMENTS.map((element) => `${element} Linh Căn`);
const STAFF_ROLE_NAMES = ['Trưởng Lão', 'Chấp Pháp Sứ'];
const MASTER_STAFF_ROLE_NAMES = ['Trưởng Lão', 'Đường Chủ'];
const ALL_QUALITY_ROLE_NAMES = [...QUALITY_ROLES];
const DISCIPLE_RANK_ROLES = [
  'Tán Tu',
  'Ký Danh Đệ Tử',
  'Tạp Dịch Đệ Tử',
  'Ngoại Môn Đệ Tử',
  'Nội Môn Đệ Tử',
  'Chân Truyền Đệ Tử',
  'Thân Truyền Đệ Tử',
  'Thánh Tử',
  'Thánh Nữ',
];
const BAI_SU_ELIGIBLE_ROLES = ['Ngoại Môn Đệ Tử', 'Nội Môn Đệ Tử', 'Chân Truyền Đệ Tử'];
const CONG_PHAP_OPTIONS = [
  { key: 'frontend', emoji: '💻', name: 'frontend-huyễn-diện', roleName: '💻 frontend-huyễn-diện' },
  { key: 'backend', emoji: '⚙️', name: 'backend-hậu-đạo', roleName: '⚙️ backend-hậu-đạo' },
  { key: 'fullstack', emoji: '🌐', name: 'fullstack-vạn-pháp', roleName: '🌐 fullstack-vạn-pháp' },
  { key: 'mobile', emoji: '📱', name: 'mobile-linh-khí', roleName: '📱 mobile-linh-khí' },
  { key: 'database', emoji: '🗄️', name: 'database-địa-mạch', roleName: '🗄️ database-địa-mạch' },
  { key: 'ai', emoji: '🧠', name: 'ai-cơ-trí', roleName: '🧠 ai-cơ-trí' },
  { key: 'devops', emoji: '☁️', name: 'devops-vân-hạ', roleName: '☁️ devops-vân-hạ' },
  { key: 'security', emoji: '🛡️', name: 'security-hộ-pháp', roleName: '🛡️ security-hộ-pháp' },
  { key: 'game', emoji: '🎮', name: 'game-mộng-cảnh', roleName: '🎮 game-mộng-cảnh' },
  { key: 'uiux', emoji: '🎨', name: 'uiux-huyễn-hình', roleName: '🎨 uiux-huyễn-hình' },
  { key: 'system', emoji: '🏗️', name: 'system-kiến-trúc-pháp', roleName: '🏗️ system-kiến-trúc-pháp' },
];
const CONG_PHAP_ROLE_NAMES = CONG_PHAP_OPTIONS.map((option) => option.roleName);
const LEGACY_CONG_PHAP_ROLE_NAMES = [
  '⚛️ React Huyễn Diện Công',
  '🟦 TypeScript Chân Kinh',
  '🟨 JavaScript Tâm Pháp',
  '🟩 Node Hậu Đạo Quyết',
  '🗄️ SQL Địa Mạch Kinh',
  '🐘 PostgreSQL Địa Mạch Kinh',
  '🎨 Figma Huyễn Hình Thuật',
  '☁️ Docker Vân Hạ Pháp',
];
const ALL_CONG_PHAP_ROLE_NAMES = [...CONG_PHAP_ROLE_NAMES, ...LEGACY_CONG_PHAP_ROLE_NAMES];

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once('clientReady', () => {
  console.log(`Thien Dao da nhap the: ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  try {
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === 'setup-linhcan') {
        await handleSetupLinhCan(interaction);
        return;
      }

      if (interaction.commandName === 'linhcan') {
        await handleLinhCan(interaction);
        return;
      }

      if (interaction.commandName === 'setup-congphap') {
        await handleSetupCongPhap(interaction);
        return;
      }

      if (interaction.commandName === 'profile') {
        await handleProfile(interaction);
        return;
      }
    }

    if (interaction.isButton()) {
      if (interaction.customId === OPEN_TICKET_BUTTON) {
        await handleOpenTicket(interaction);
        return;
      }

      if (interaction.customId === CLOSE_TICKET_BUTTON) {
        await handleCloseTicket(interaction);
        return;
      }

      if (interaction.customId === REQUEST_DISCIPLE_BUTTON) {
        await handleRequestDisciple(interaction);
        return;
      }

      if (interaction.customId === REQUEST_MASTER_BUTTON) {
        await handleRequestMaster(interaction);
        return;
      }

      if (interaction.customId === ACCEPT_DISCIPLE_BUTTON) {
        await handleAcceptDisciple(interaction);
        return;
      }

      if (interaction.customId === REJECT_DISCIPLE_BUTTON) {
        await handleRejectTicket(interaction, STAFF_ROLE_NAMES, 'Đơn xin thu nhận đã bị từ chối.');
        return;
      }

      if (interaction.customId === ACCEPT_MASTER_BUTTON) {
        await handleAcceptMaster(interaction);
        return;
      }

      if (interaction.customId === REJECT_MASTER_BUTTON) {
        await handleRejectTicket(interaction, MASTER_STAFF_ROLE_NAMES, 'Đơn xin bái sư đã bị từ chối.');
        return;
      }

      if (interaction.customId === CLOSE_REQUEST_TICKET_BUTTON) {
        await handleCloseAnyTicket(interaction);
        return;
      }

      if (interaction.customId.startsWith(CONG_PHAP_BUTTON_PREFIX)) {
        await handleSelectCongPhap(interaction);
      }
    }
  } catch (error) {
    console.error('Loi xu ly interaction:', error);

    const payload = {
      content: 'Thiên cơ nhiễu loạn, bot gặp lỗi khi xử lý yêu cầu.',
      flags: MessageFlags.Ephemeral,
    };

    if (interaction.deferred || interaction.replied) {
      await interaction.followUp(payload).catch(() => null);
      return;
    }

    await interaction.reply(payload).catch(() => null);
  }
});

async function handleSetupLinhCan(interaction) {
  if (!interaction.inGuild()) {
    await interaction.reply({ content: 'Lệnh này chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
    return;
  }

  if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
    await interaction.reply({ content: 'Chỉ chưởng quản tông môn mới được dựng Linh Căn Đài.', flags: MessageFlags.Ephemeral });
    return;
  }

  const embed = new EmbedBuilder()
    .setColor(GOLD)
    .setTitle('Linh Căn Đài')
    .setDescription('Đạo hữu muốn khai mở căn cơ hãy bấm nút bên dưới. Linh Căn Đài sẽ lập một động phủ riêng để kiểm tra.')
    .setFooter({ text: 'Thiên Đạo Tông Môn' });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(OPEN_TICKET_BUTTON)
      .setLabel('Khai Mở Linh Căn Đài')
      .setStyle(ButtonStyle.Primary),
  );

  await interaction.channel.send({ embeds: [embed], components: [row] });
  await interaction.reply({ content: 'Đã dựng Linh Căn Đài.', flags: MessageFlags.Ephemeral });
}

async function handleSetupCongPhap(interaction) {
  if (!interaction.inGuild()) {
    await interaction.reply({ content: 'Lệnh này chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
    return;
  }

  if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
    await interaction.reply({ content: 'Chỉ chưởng quản tông môn mới được dựng bia Công Pháp.', flags: MessageFlags.Ephemeral });
    return;
  }

  const embed = new EmbedBuilder()
    .setColor(GOLD)
    .setTitle('Công Pháp Tu Luyện')
    .setDescription(
      [
        'Đạo hữu hãy chọn một môn công pháp làm đạo pháp chính.',
        'Mỗi người chỉ được giữ một công pháp chủ tu; pháp môn cũ sẽ được thu hồi trước khi truyền thụ pháp môn mới.',
      ].join('\n'),
    )
    .setFooter({ text: 'Thiên Đạo Tông Môn - Chọn kỹ đạo tâm, tu cho vững căn cơ.' });

  await interaction.channel.send({ embeds: [embed], components: buildCongPhapRows() });
  await interaction.reply({ content: 'Đã dựng bia Công Pháp Tu Luyện.', flags: MessageFlags.Ephemeral });
}

async function handleSelectCongPhap(interaction) {
  if (!interaction.inGuild()) {
    await interaction.reply({ content: 'Công pháp chỉ có thể chọn trong tông môn.', flags: MessageFlags.Ephemeral });
    return;
  }

  const selectedKey = interaction.customId.slice(CONG_PHAP_BUTTON_PREFIX.length);
  const selected = CONG_PHAP_OPTIONS.find((option) => option.key === selectedKey);

  if (!selected) {
    await interaction.reply({ content: 'Công pháp này không còn trong pháp các.', flags: MessageFlags.Ephemeral });
    return;
  }

  await interaction.deferReply({ flags: MessageFlags.Ephemeral });
  await interaction.guild.roles.fetch();

  const member = await interaction.guild.members.fetch(interaction.user.id);
  const targetRole = interaction.guild.roles.cache.find((role) => role.name === selected.roleName);

  if (!targetRole) {
    await interaction.editReply(`Thiếu role công pháp **${selected.roleName}**. Hãy chạy \`npm run create:roles\` rồi thử lại.`);
    return;
  }

  const oldRoles = member.roles.cache.filter(
    (role) => ALL_CONG_PHAP_ROLE_NAMES.includes(role.name) && role.id !== targetRole.id,
  );
  const blocker = await getRoleManageBlocker(interaction.guild, [targetRole, ...oldRoles.values()]);

  if (blocker) {
    await interaction.editReply(blocker);
    return;
  }

  try {
    if (oldRoles.size > 0) {
      await member.roles.remove(oldRoles, 'Thu hoi cong phap cu truoc khi truyen cong phap moi.');
    }

    if (!member.roles.cache.has(targetRole.id)) {
      await member.roles.add(targetRole, 'Truyen cong phap chinh cho dao huu.');
    }
  } catch (error) {
    if (error.code === 50013) {
      await interaction.editReply(
        'Bot thiếu quyền Manage Roles hoặc role bot đang nằm dưới role công pháp. Hãy kéo role bot lên cao hơn các role công pháp rồi thử lại.',
      );
      return;
    }

    throw error;
  }

  const embed = new EmbedBuilder()
    .setColor(GOLD)
    .setTitle('Pháp Môn Đã Định')
    .setDescription(`${member} đã chọn **${selected.roleName}** làm công pháp chủ tu.`)
    .addFields(
      {
        name: 'Công pháp tu luyện',
        value: selected.roleName,
        inline: false,
      },
      {
        name: 'Lời truyền pháp',
        value: oldRoles.size > 0 ? 'Công pháp cũ đã được thu hồi, đạo tâm quy về một mối.' : 'Đạo tâm sơ lập, từ nay chuyên chú một pháp môn.',
        inline: false,
      },
    )
    .setFooter({ text: 'Dùng /profile để xem công pháp đang tu luyện.' });

  await interaction.editReply({ embeds: [embed] });
}

async function handleProfile(interaction) {
  if (!interaction.inGuild()) {
    await interaction.reply({ content: 'Hồ sơ đạo hữu chỉ xem được trong tông môn.', flags: MessageFlags.Ephemeral });
    return;
  }

  const targetUser = interaction.options.getUser('thanhvien') ?? interaction.user;
  const member = await interaction.guild.members.fetch(targetUser.id);
  const discipleRank = getMemberDiscipleRank(member) ?? 'Chưa có cấp đệ tử';
  const linhCanText = getMemberLinhCanClassificationText(member);
  const elementText = getMemberElementText(member);
  const qualityText = getMemberQualityText(member);
  const congPhapText = getMemberCongPhapText(member);

  const embed = new EmbedBuilder()
    .setColor(GOLD)
    .setTitle(`Đạo Hồ - ${member.displayName}`)
    .setThumbnail(targetUser.displayAvatarURL({ size: 256 }))
    .addFields(
      { name: 'Đạo danh', value: `${member}`, inline: true },
      { name: 'Cấp đệ tử', value: discipleRank, inline: true },
      { name: 'Linh căn', value: linhCanText, inline: false },
      { name: 'Hệ ngũ hành', value: elementText, inline: false },
      { name: 'Phẩm chất linh căn', value: qualityText, inline: false },
      { name: 'Công pháp tu luyện', value: congPhapText, inline: false },
      { name: 'Tu vi', value: 'Chưa xác lập', inline: true },
      { name: 'Tiểu cảnh', value: 'Chưa xác lập', inline: true },
    )
    .setFooter({ text: 'Thiên Đạo ghi nhận đạo tâm và căn cơ của môn nhân.' });

  await interaction.reply({ embeds: [embed] });
}

async function handleOpenTicket(interaction) {
  if (!interaction.inGuild()) {
    await interaction.reply({ content: 'Ticket chỉ có thể mở trong tông môn.', flags: MessageFlags.Ephemeral });
    return;
  }

  await interaction.deferReply({ flags: MessageFlags.Ephemeral });

  const channel = await createPrivateTicket(interaction, {
    channelPrefix: 'linh-can',
    topicPrefix: TICKET_TOPIC_PREFIX,
    staffRoleNames: STAFF_ROLE_NAMES,
    existingMessage: 'Đạo hữu đã có Linh Căn Đài riêng',
    reason: 'Mo ticket Linh Can Dai.',
  });

  if (!channel) {
    return;
  }

  const embed = new EmbedBuilder()
    .setColor(GOLD)
    .setTitle('Linh Căn Đài Riêng')
    .setDescription('Đạo hữu hãy dùng `/linhcan ngay thang nam` tại đây để khai mở căn cơ.')
    .setFooter({ text: 'Kết quả chỉ hiển thị trong ticket này.' });

  await channel.send({ content: `${interaction.user}`, embeds: [embed] });
  await interaction.editReply(`Linh Căn Đài riêng đã mở: ${channel}`);
}

async function handleRequestDisciple(interaction) {
  if (!interaction.inGuild()) {
    await interaction.reply({ content: 'Yêu cầu này chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
    return;
  }

  await interaction.deferReply({ flags: MessageFlags.Ephemeral });

  const channel = await createPrivateTicket(interaction, {
    channelPrefix: 'thu-nhan',
    topicPrefix: THU_NHAN_TOPIC_PREFIX,
    staffRoleNames: STAFF_ROLE_NAMES,
    existingMessage: 'Đạo hữu đã có ticket xin thu nhận',
    reason: 'Mo ticket xin thu nhan de tu.',
  });

  if (!channel) {
    return;
  }

  const embed = new EmbedBuilder()
    .setColor(GOLD)
    .setTitle('Đơn Xin Thu Nhận Đệ Tử')
    .setDescription(
      [
        `${interaction.user} đã dâng đơn xin nhập môn.`,
        'Trưởng Lão hoặc Chấp Pháp Sứ hãy xét căn cơ, đạo tâm rồi quyết định thu nhận.',
      ].join('\n'),
    )
    .setFooter({ text: 'Chấp nhận sẽ xóa Tán Tu và gán Ngoại Môn Đệ Tử.' });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(ACCEPT_DISCIPLE_BUTTON)
      .setLabel('Chấp Nhận Thu Nhận')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId(REJECT_DISCIPLE_BUTTON)
      .setLabel('Từ Chối')
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId(CLOSE_REQUEST_TICKET_BUTTON)
      .setLabel('Đóng Ticket')
      .setStyle(ButtonStyle.Secondary),
  );

  await channel.send({ content: `${interaction.user}`, embeds: [embed], components: [row] });
  await interaction.editReply(`Đơn xin thu nhận đã được lập tại ${channel}`);
}

async function handleRequestMaster(interaction) {
  if (!interaction.inGuild()) {
    await interaction.reply({ content: 'Yêu cầu này chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
    return;
  }

  await interaction.deferReply({ flags: MessageFlags.Ephemeral });

  const member = await interaction.guild.members.fetch(interaction.user.id);

  if (!member.roles.cache.some((role) => BAI_SU_ELIGIBLE_ROLES.includes(role.name))) {
    await interaction.editReply('Ngươi cần được thu nhận vào tông môn trước khi xin bái sư.');
    return;
  }

  const channel = await createPrivateTicket(interaction, {
    channelPrefix: 'bai-su',
    topicPrefix: BAI_SU_TOPIC_PREFIX,
    staffRoleNames: MASTER_STAFF_ROLE_NAMES,
    existingMessage: 'Đạo hữu đã có ticket xin bái sư',
    reason: 'Mo ticket xin bai su.',
  });

  if (!channel) {
    return;
  }

  const embed = new EmbedBuilder()
    .setColor(GOLD)
    .setTitle('Đơn Xin Bái Sư')
    .setDescription(
      [
        `${interaction.user} đã dâng đơn xin bái sư.`,
        'Trưởng Lão hoặc Đường Chủ hãy xét đạo duyên rồi quyết định truyền thừa.',
      ].join('\n'),
    )
    .setFooter({ text: 'Chấp nhận sẽ gán Thân Truyền Đệ Tử và giữ nguyên cấp đệ tử hiện có.' });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(ACCEPT_MASTER_BUTTON)
      .setLabel('Chấp Nhận Bái Sư')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId(REJECT_MASTER_BUTTON)
      .setLabel('Từ Chối')
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId(CLOSE_REQUEST_TICKET_BUTTON)
      .setLabel('Đóng Ticket')
      .setStyle(ButtonStyle.Secondary),
  );

  await channel.send({ content: `${interaction.user}`, embeds: [embed], components: [row] });
  await interaction.editReply(`Đơn xin bái sư đã được lập tại ${channel}`);
}

async function handleAcceptDisciple(interaction) {
  if (!interaction.inGuild() || !isTicketWithPrefix(interaction.channel, THU_NHAN_TOPIC_PREFIX)) {
    await interaction.reply({ content: 'Nút này chỉ dùng trong ticket xin thu nhận.', flags: MessageFlags.Ephemeral });
    return;
  }

  if (!hasAnyRole(interaction.member, STAFF_ROLE_NAMES)) {
    await interaction.reply({ content: 'Chỉ Trưởng Lão hoặc Chấp Pháp Sứ được duyệt đơn này.', flags: MessageFlags.Ephemeral });
    return;
  }

  await interaction.deferReply();
  await interaction.guild.roles.fetch();

  const ownerId = getTicketOwnerIdByPrefix(interaction.channel, THU_NHAN_TOPIC_PREFIX);

  if (!ownerId) {
    await interaction.editReply('Không tìm thấy chủ ticket xin thu nhận.');
    return;
  }

  const member = await interaction.guild.members.fetch(ownerId);
  const tanTuRole = findRoleByName(interaction.guild, 'Tán Tu');
  const ngoaiMonRole = findRoleByName(interaction.guild, 'Ngoại Môn Đệ Tử');
  const missing = [
    tanTuRole ? null : 'Tán Tu',
    ngoaiMonRole ? null : 'Ngoại Môn Đệ Tử',
  ].filter(Boolean);

  if (missing.length > 0) {
    await interaction.editReply(`Thiếu role: ${missing.join(', ')}. Hãy chạy \`npm run create:roles\` rồi thử lại.`);
    return;
  }

  const blocker = await getDiscipleRoleManageBlocker(interaction.guild, [tanTuRole, ngoaiMonRole]);

  if (blocker) {
    await interaction.editReply(blocker);
    return;
  }

  try {
    if (member.roles.cache.has(tanTuRole.id)) {
      await member.roles.remove(tanTuRole, 'Thu nhan de tu: xoa Tan Tu.');
    }

    if (!member.roles.cache.has(ngoaiMonRole.id)) {
      await member.roles.add(ngoaiMonRole, 'Thu nhan de tu: gan Ngoai Mon De Tu.');
    }
  } catch (error) {
    if (error.code === 50013) {
      await interaction.editReply('Thiên Đạo chưa đủ quyền Quản Lý Vai Trò hoặc role Thiên Đạo đang nằm dưới role cần gán.');
      return;
    }

    throw error;
  }

  await interaction.editReply(`${member} đã được thu nhận làm **Ngoại Môn Đệ Tử**.`);
}

async function handleAcceptMaster(interaction) {
  if (!interaction.inGuild() || !isTicketWithPrefix(interaction.channel, BAI_SU_TOPIC_PREFIX)) {
    await interaction.reply({ content: 'Nút này chỉ dùng trong ticket xin bái sư.', flags: MessageFlags.Ephemeral });
    return;
  }

  if (!hasAnyRole(interaction.member, MASTER_STAFF_ROLE_NAMES)) {
    await interaction.reply({ content: 'Chỉ Trưởng Lão hoặc Đường Chủ được duyệt đơn này.', flags: MessageFlags.Ephemeral });
    return;
  }

  await interaction.deferReply();
  await interaction.guild.roles.fetch();

  const ownerId = getTicketOwnerIdByPrefix(interaction.channel, BAI_SU_TOPIC_PREFIX);

  if (!ownerId) {
    await interaction.editReply('Không tìm thấy chủ ticket xin bái sư.');
    return;
  }

  const member = await interaction.guild.members.fetch(ownerId);

  if (!member.roles.cache.some((role) => BAI_SU_ELIGIBLE_ROLES.includes(role.name))) {
    await interaction.editReply('Ngươi cần được thu nhận vào tông môn trước khi xin bái sư.');
    return;
  }

  const thanTruyenRole = findRoleByName(interaction.guild, 'Thân Truyền Đệ Tử');

  if (!thanTruyenRole) {
    await interaction.editReply('Thiếu role: Thân Truyền Đệ Tử. Hãy chạy `npm run create:roles` rồi thử lại.');
    return;
  }

  const blocker = await getDiscipleRoleManageBlocker(interaction.guild, [thanTruyenRole]);

  if (blocker) {
    await interaction.editReply(blocker);
    return;
  }

  try {
    if (!member.roles.cache.has(thanTruyenRole.id)) {
      await member.roles.add(thanTruyenRole, 'Chap nhan bai su: gan Than Truyen De Tu.');
    }
  } catch (error) {
    if (error.code === 50013) {
      await interaction.editReply('Thiên Đạo chưa đủ quyền Quản Lý Vai Trò hoặc role Thiên Đạo đang nằm dưới role cần gán.');
      return;
    }

    throw error;
  }

  await interaction.editReply(`${member} đã được chấp nhận bái sư và nhận role **Thân Truyền Đệ Tử**.`);
}

async function handleRejectTicket(interaction, allowedRoleNames, message) {
  if (!interaction.inGuild() || !isRequestTicket(interaction.channel)) {
    await interaction.reply({ content: 'Nút này chỉ dùng trong ticket xét duyệt.', flags: MessageFlags.Ephemeral });
    return;
  }

  if (!hasAnyRole(interaction.member, allowedRoleNames)) {
    await interaction.reply({ content: 'Ngươi không có quyền duyệt ticket này.', flags: MessageFlags.Ephemeral });
    return;
  }

  await interaction.reply({ content: message });
}

async function handleLinhCan(interaction) {
  if (!interaction.inGuild() || !isLinhCanTicket(interaction.channel)) {
    await interaction.reply({
      content: 'Lệnh này chỉ có thể dùng trong Linh Căn Đài riêng của ngươi.',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const ownerId = getTicketOwnerId(interaction.channel);

  if (ownerId && interaction.user.id !== ownerId) {
    await interaction.reply({
      content: 'Chỉ đạo hữu mở Linh Căn Đài này mới được dùng lệnh khai căn.',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const ngay = interaction.options.getInteger('ngay', true);
  const thang = interaction.options.getInteger('thang', true);
  const nam = interaction.options.getInteger('nam', true);

  if (!isValidDate(ngay, thang, nam)) {
    await interaction.reply({ content: 'Ngày sinh không hợp lệ, đạo hữu hãy nhập lại.', flags: MessageFlags.Ephemeral });
    return;
  }

  await interaction.deferReply();

  await interaction.guild.roles.fetch();
  const member = await interaction.guild.members.fetch(interaction.user.id);
  const result = calculateLinhCan(ngay, thang, nam);
  const roleCheck = resolveResultRoles(interaction.guild, result);
  const currentDiscipleRole = getMemberDiscipleRank(member);
  const shouldAssignTanTu = !currentDiscipleRole;
  const tanTuRole = shouldAssignTanTu ? findRoleByName(interaction.guild, 'Tán Tu') : null;

  if (roleCheck.missing.length > 0) {
    const missingQualityRoles = roleCheck.missing.filter((roleName) => QUALITY_ROLES.includes(roleName));

    if (missingQualityRoles.length > 0) {
      await interaction.editReply(
        `Thiếu role phẩm chất linh căn: ${missingQualityRoles.join(', ')}. Hãy chạy \`npm run create:roles\` rồi thử lại.`,
      );
      return;
    }

    await interaction.editReply(
      `Thiếu role: ${roleCheck.missing.join(', ')}. Hãy chạy \`npm run create:roles\` rồi thử lại.`,
    );
    return;
  }

  if (shouldAssignTanTu && !tanTuRole) {
    await interaction.editReply('Thiếu role: Tán Tu. Hãy chạy `npm run create:roles` rồi thử lại.');
    return;
  }

  const oldQualityRoles = member.roles.cache.filter(
    (role) => ALL_QUALITY_ROLE_NAMES.includes(role.name) && role.name !== result.quality,
  );
  const rolesToAssign = shouldAssignTanTu ? [...roleCheck.roles, tanTuRole] : roleCheck.roles;
  const rolesToAdd = rolesToAssign.filter((role) => !member.roles.cache.has(role.id));
  const blocker = await getLinhCanRoleManageBlocker(interaction.guild, [
    ...rolesToAdd,
    ...oldQualityRoles.values(),
  ]);

  if (blocker) {
    await interaction.editReply(blocker);
    return;
  }

  try {
    if (oldQualityRoles.size > 0) {
      await member.roles.remove(oldQualityRoles, 'Xoa pham chat linh can cu truoc khi gan moi.');
    }

    if (rolesToAdd.length > 0) {
      await member.roles.add(rolesToAdd, 'Gan linh can va pham chat moi theo Linh Can Dai.');
    }
  } catch (error) {
    if (error.code === 50013) {
      await interaction.editReply(
        'Thiên Đạo chưa đủ quyền Quản Lý Vai Trò hoặc role Thiên Đạo đang nằm dưới role linh căn cần gán.',
      );
      return;
    }

    throw error;
  }

  const embed = new EmbedBuilder()
    .setColor(GOLD)
    .setTitle('Kim Quang Khai Mở')
    .setDescription(`${member} đã thức tỉnh **${result.displayName}**.`)
    .addFields(
      { name: 'Can Chi năm sinh', value: result.canChi, inline: true },
      { name: 'Điểm phân loại', value: `${result.phanLoaiScore}/99`, inline: true },
      { name: 'Phân loại', value: result.classification, inline: true },
      { name: 'Hệ linh căn', value: `${result.elements.join(' - ')} Linh Căn`, inline: false },
      { name: 'Độ thuần linh căn', value: `${result.doThuan}/100`, inline: true },
      { name: 'Phẩm chất linh căn', value: result.quality, inline: true },
      { name: 'Điểm ngũ hành', value: formatElementScores(result.scores), inline: false },
      { name: 'Vai trò hiện tại', value: currentDiscipleRole ?? 'Tán Tu', inline: true },
    )
    .setFooter({ text: 'Phẩm chất linh căn cũ đã được xóa trước khi gán kết quả mới.' });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(REQUEST_DISCIPLE_BUTTON)
      .setLabel('Xin Thu Nhận Đệ Tử')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId(REQUEST_MASTER_BUTTON)
      .setLabel('Xin Bái Sư')
      .setStyle(ButtonStyle.Primary),
  );

  await interaction.editReply({ embeds: [embed], components: [row] });
}

async function handleCloseTicket(interaction) {
  if (!interaction.inGuild() || !isLinhCanTicket(interaction.channel)) {
    await interaction.reply({ content: 'Nút này chỉ dùng trong ticket Linh Căn Đài.', flags: MessageFlags.Ephemeral });
    return;
  }

  const ownerId = getTicketOwnerId(interaction.channel);

  if (ownerId && interaction.user.id !== ownerId && !isStaff(interaction.member)) {
    await interaction.reply({ content: 'Chỉ chủ ticket hoặc trưởng lão mới được đóng Linh Căn Đài.', flags: MessageFlags.Ephemeral });
    return;
  }

  await interaction.reply({ content: 'Linh Căn Đài sẽ khép lại sau 5 giây.', flags: MessageFlags.Ephemeral });

  setTimeout(() => {
    interaction.channel
      .delete('Dong ticket Linh Can Dai.')
      .catch((error) => console.error('Khong the xoa ticket:', error));
  }, 5000);
}

async function handleCloseAnyTicket(interaction) {
  if (!interaction.inGuild() || !isManagedTicket(interaction.channel)) {
    await interaction.reply({ content: 'Nút này chỉ dùng trong ticket của Thiên Đạo.', flags: MessageFlags.Ephemeral });
    return;
  }

  const ownerId = getManagedTicketOwnerId(interaction.channel);
  const staffRoleNames = isTicketWithPrefix(interaction.channel, BAI_SU_TOPIC_PREFIX)
    ? MASTER_STAFF_ROLE_NAMES
    : STAFF_ROLE_NAMES;

  if (ownerId && interaction.user.id !== ownerId && !hasAnyRole(interaction.member, staffRoleNames)) {
    await interaction.reply({ content: 'Chỉ chủ ticket hoặc người xét duyệt mới được đóng ticket này.', flags: MessageFlags.Ephemeral });
    return;
  }

  await interaction.reply({ content: 'Ticket sẽ khép lại sau 5 giây.', flags: MessageFlags.Ephemeral });

  setTimeout(() => {
    interaction.channel
      .delete('Dong ticket Thien Dao.')
      .catch((error) => console.error('Khong the xoa ticket:', error));
  }, 5000);
}

async function createPrivateTicket(interaction, options) {
  const guild = interaction.guild;
  const member = await guild.members.fetch(interaction.user.id);
  const channels = await guild.channels.fetch();
  await guild.roles.fetch();

  const existingTicket = channels.find(
    (channel) =>
      channel.type === ChannelType.GuildText &&
      channel.topic?.includes(`${options.topicPrefix}${interaction.user.id}`),
  );

  if (existingTicket) {
    await interaction.editReply(`${options.existingMessage}: ${existingTicket}`);
    return null;
  }

  const botMember = await guild.members.fetchMe();

  if (!botMember.permissions.has(PermissionFlagsBits.ManageChannels)) {
    await interaction.editReply('Thiên Đạo chưa đủ quyền Quản Lý Kênh để lập ticket riêng.');
    return null;
  }

  const staffRoles = guild.roles.cache.filter((role) => options.staffRoleNames.includes(role.name));
  const overwrites = [
    {
      id: guild.id,
      deny: [PermissionFlagsBits.ViewChannel],
    },
    {
      id: interaction.user.id,
      allow: [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.ReadMessageHistory,
        PermissionFlagsBits.UseApplicationCommands,
      ],
    },
    {
      id: client.user.id,
      allow: [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.EmbedLinks,
        PermissionFlagsBits.ReadMessageHistory,
        PermissionFlagsBits.ManageChannels,
      ],
    },
    ...staffRoles.map((role) => ({
      id: role.id,
      allow: [
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.ReadMessageHistory,
      ],
    })),
  ];

  try {
    return await guild.channels.create({
      name: `${options.channelPrefix}-${toChannelSlug(member.user.username, member.id)}`,
      type: ChannelType.GuildText,
      topic: `${options.topicPrefix}${interaction.user.id}`,
      permissionOverwrites: overwrites,
      reason: options.reason,
    });
  } catch (error) {
    if (error.code === 50013) {
      await interaction.editReply('Thiên Đạo chưa đủ quyền Quản Lý Kênh để lập ticket riêng.');
      return null;
    }

    throw error;
  }
}

function buildCongPhapRows() {
  const rows = [];

  for (let index = 0; index < CONG_PHAP_OPTIONS.length; index += 4) {
    const row = new ActionRowBuilder().addComponents(
      ...CONG_PHAP_OPTIONS.slice(index, index + 4).map((option) =>
        new ButtonBuilder()
          .setCustomId(`${CONG_PHAP_BUTTON_PREFIX}${option.key}`)
          .setEmoji(option.emoji)
          .setLabel(option.name)
          .setStyle(ButtonStyle.Secondary),
      ),
    );

    rows.push(row);
  }

  return rows;
}

function getMemberDiscipleRank(member) {
  return DISCIPLE_RANK_ROLES.find((roleName) => member.roles.cache.some((role) => role.name === roleName)) ?? null;
}

function getMemberLinhCanClassificationText(member) {
  return CLASSIFICATION_ROLES.find((roleName) =>
    member.roles.cache.some((role) => role.name === roleName),
  ) ?? 'Chưa khai mở linh căn.';
}

function getMemberElementText(member) {
  const elements = ELEMENT_ROLE_NAMES.filter((roleName) =>
    member.roles.cache.some((role) => role.name === roleName),
  ).map((roleName) => roleName.replace(' Linh Căn', ''));

  if (elements.length === 0) {
    return 'Chưa khai mở linh căn.';
  }

  return `${elements.join(' - ')} Linh Căn`;
}

function getMemberQualityText(member) {
  return QUALITY_ROLES.find((roleName) =>
    member.roles.cache.some((role) => role.name === roleName),
  ) ?? 'Chưa xác định phẩm chất linh căn.';
}

function getMemberCongPhapText(member) {
  const selected = CONG_PHAP_OPTIONS.filter((option) =>
    member.roles.cache.some((role) => role.name === option.roleName),
  );

  if (selected.length === 0) {
    return 'Chưa chọn công pháp chủ tu.';
  }

  if (selected.length === 1) {
    return selected[0].roleName;
  }

  return `${selected[0].roleName}\nCòn dư công pháp cũ, hãy bấm chọn lại một công pháp để quy nhất đạo tâm.`;
}

async function getRoleManageBlocker(guild, roles) {
  const botMember = await guild.members.fetchMe();

  if (!botMember.permissions.has(PermissionFlagsBits.ManageRoles)) {
    return 'Bot thiếu quyền Manage Roles nên chưa thể truyền thụ công pháp. Hãy cấp quyền Manage Roles rồi thử lại.';
  }

  const blockedRole = roles.find((role) => role?.managed || role?.position >= botMember.roles.highest.position);

  if (blockedRole) {
    return `Role **${blockedRole.name}** đang nằm ngang hoặc cao hơn role của bot. Hãy kéo role bot lên cao hơn các role công pháp rồi thử lại.`;
  }

  return null;
}

async function getLinhCanRoleManageBlocker(guild, roles) {
  const botMember = await guild.members.fetchMe();

  if (!botMember.permissions.has(PermissionFlagsBits.ManageRoles)) {
    return 'Thiên Đạo chưa đủ quyền Quản Lý Vai Trò hoặc role Thiên Đạo đang nằm dưới role linh căn cần gán.';
  }

  const blockedRole = roles.find((role) => role?.managed || role?.position >= botMember.roles.highest.position);

  if (blockedRole) {
    return 'Thiên Đạo chưa đủ quyền Quản Lý Vai Trò hoặc role Thiên Đạo đang nằm dưới role linh căn cần gán.';
  }

  return null;
}

async function getDiscipleRoleManageBlocker(guild, roles) {
  const botMember = await guild.members.fetchMe();

  if (!botMember.permissions.has(PermissionFlagsBits.ManageRoles)) {
    return 'Thiên Đạo chưa đủ quyền Quản Lý Vai Trò để gán cấp đệ tử.';
  }

  const blockedRole = roles.find((role) => role?.managed || role?.position >= botMember.roles.highest.position);

  if (blockedRole) {
    return `Role **${blockedRole.name}** đang nằm ngang hoặc cao hơn role Thiên Đạo. Hãy kéo role Thiên Đạo lên cao hơn role cần gán.`;
  }

  return null;
}

function formatElementScores(scores) {
  return ELEMENTS.map((element) => `${element}: ${scores[element]}`).join(' | ');
}

function findRoleByName(guild, roleName) {
  return guild.roles.cache.find((role) => role.name === roleName) ?? null;
}

function hasAnyRole(member, roleNames) {
  return member.roles?.cache?.some((role) => roleNames.includes(role.name)) ?? false;
}

function isTicketWithPrefix(channel, topicPrefix) {
  return channel?.type === ChannelType.GuildText && channel.topic?.startsWith(topicPrefix);
}

function getTicketOwnerIdByPrefix(channel, topicPrefix) {
  return channel?.topic?.startsWith(topicPrefix)
    ? channel.topic.slice(topicPrefix.length).trim()
    : null;
}

function isRequestTicket(channel) {
  return isTicketWithPrefix(channel, THU_NHAN_TOPIC_PREFIX) || isTicketWithPrefix(channel, BAI_SU_TOPIC_PREFIX);
}

function isManagedTicket(channel) {
  return isLinhCanTicket(channel) || isRequestTicket(channel);
}

function getManagedTicketOwnerId(channel) {
  if (isLinhCanTicket(channel)) {
    return getTicketOwnerId(channel);
  }

  if (isTicketWithPrefix(channel, THU_NHAN_TOPIC_PREFIX)) {
    return getTicketOwnerIdByPrefix(channel, THU_NHAN_TOPIC_PREFIX);
  }

  if (isTicketWithPrefix(channel, BAI_SU_TOPIC_PREFIX)) {
    return getTicketOwnerIdByPrefix(channel, BAI_SU_TOPIC_PREFIX);
  }

  return null;
}

function calculateLinhCan(ngay, thang, nam) {
  const canIndex = normalizeModulo(nam - 4, 10);
  const chiIndex = normalizeModulo(nam - 4, 12);
  const canName = CAN_NAMES[canIndex];
  const chiName = CHI_NAMES[chiIndex];
  const canElement = getCanElement(canIndex);
  const chiElement = getChiElement(chiIndex);
  const monthElement = getMonthElement(thang);
  const dayElement = getDayElement(ngay);
  const scores = Object.fromEntries(ELEMENTS.map((element) => [element, 0]));

  for (const element of [canElement, chiElement, monthElement, dayElement]) {
    scores[element] += 1;
  }

  const phanLoaiScore = (ngay * 31 + thang * 17 + nam + sumDigits(nam) * 13) % 100;
  const classification = getClassification(phanLoaiScore);
  const elements = getTopElements(scores, classification.count);
  const qualityResult = calculateQuality(scores, classification.count, {
    canElement,
    chiElement,
    monthElement,
  });
  const displayName = `${elements.join(' - ')} Linh Căn`;

  return {
    phanLoaiScore,
    canChi: `${canName} ${chiName}`,
    sourceElements: {
      thiênCan: canElement,
      địaChi: chiElement,
      thángSinh: monthElement,
      ngàySinh: dayElement,
    },
    scores,
    doThuan: qualityResult.doThuan,
    quality: qualityResult.name,
    strongestElement: qualityResult.strongestElement,
    classification: classification.name,
    count: classification.count,
    elements,
    displayName,
  };
}

function getClassification(phanLoaiScore) {
  if (phanLoaiScore <= 34) {
    return { name: 'Tạp Linh Căn', count: 5 };
  }

  if (phanLoaiScore <= 59) {
    return { name: 'Tứ Linh Căn', count: 4 };
  }

  if (phanLoaiScore <= 79) {
    return { name: 'Tam Linh Căn', count: 3 };
  }

  if (phanLoaiScore <= 94) {
    return { name: 'Nhị Linh Căn', count: 2 };
  }

  return { name: 'Nhất Linh Căn', count: 1 };
}

function getTopElements(scores, count) {
  return getSortedElementScores(scores)
    .slice(0, count)
    .map((entry) => entry.element);
}

function getSortedElementScores(scores) {
  return ELEMENTS.map((element, index) => ({ element, score: scores[element], index }))
    .sort((left, right) => right.score - left.score || left.index - right.index);
}

function calculateQuality(scores, soHe, sourceElements) {
  const sortedScores = getSortedElementScores(scores);
  const top1Entry = sortedScores[0];
  const top2Entry = sortedScores[1] ?? { score: 0 };
  const top1 = top1Entry.score;
  const top2 = top2Entry.score;
  const strongestElement = top1Entry.element;
  let doThuan = top1 * 20 + (top1 - top2) * 15 + (5 - soHe) * 10;

  if (sourceElements.canElement === strongestElement) {
    doThuan += 5;
  }

  if (sourceElements.chiElement === strongestElement) {
    doThuan += 5;
  }

  if (sourceElements.monthElement === strongestElement) {
    doThuan += 5;
  }

  doThuan = Math.max(0, Math.min(100, doThuan));

  return {
    doThuan,
    strongestElement,
    name: getQualityName(doThuan),
  };
}

function getQualityName(doThuan) {
  if (doThuan <= 29) {
    return 'Hạ Phẩm Linh Căn';
  }

  if (doThuan <= 54) {
    return 'Trung Phẩm Linh Căn';
  }

  if (doThuan <= 74) {
    return 'Thượng Phẩm Linh Căn';
  }

  if (doThuan <= 89) {
    return 'Cực Phẩm Linh Căn';
  }

  return 'Thiên Phẩm Linh Căn';
}

function getCanElement(canIndex) {
  if (canIndex <= 1) {
    return 'Mộc';
  }

  if (canIndex <= 3) {
    return 'Hỏa';
  }

  if (canIndex <= 5) {
    return 'Thổ';
  }

  if (canIndex <= 7) {
    return 'Kim';
  }

  return 'Thủy';
}

function getChiElement(chiIndex) {
  if ([0, 11].includes(chiIndex)) {
    return 'Thủy';
  }

  if ([2, 3].includes(chiIndex)) {
    return 'Mộc';
  }

  if ([5, 6].includes(chiIndex)) {
    return 'Hỏa';
  }

  if ([8, 9].includes(chiIndex)) {
    return 'Kim';
  }

  return 'Thổ';
}

function getMonthElement(month) {
  if (month <= 2) {
    return 'Mộc';
  }

  if (month <= 4) {
    return 'Hỏa';
  }

  if (month <= 7) {
    return 'Thổ';
  }

  if (month <= 9) {
    return 'Kim';
  }

  return 'Thủy';
}

function getDayElement(day) {
  const dayMap = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];

  return dayMap[day % 5];
}

function sumDigits(value) {
  return String(Math.abs(value))
    .split('')
    .reduce((total, digit) => total + Number(digit), 0);
}

function normalizeModulo(value, modulo) {
  return ((value % modulo) + modulo) % modulo;
}

function resolveResultRoles(guild, result) {
  const requiredRoleNames = [
    result.classification,
    ...result.elements.map((element) => `${element} Linh Căn`),
    result.quality,
  ];
  const roles = [];
  const missing = [];

  for (const roleName of requiredRoleNames) {
    const role = guild.roles.cache.find((guildRole) => guildRole.name === roleName);

    if (!role) {
      missing.push(roleName);
      continue;
    }

    roles.push(role);
  }

  return { roles, missing };
}

function isLinhCanTicket(channel) {
  return (
    channel?.type === ChannelType.GuildText &&
    channel.name?.startsWith('linh-can-') &&
    channel.topic?.startsWith(TICKET_TOPIC_PREFIX)
  );
}

function getTicketOwnerId(channel) {
  return channel?.topic?.startsWith(TICKET_TOPIC_PREFIX)
    ? channel.topic.slice(TICKET_TOPIC_PREFIX.length).trim()
    : null;
}

function isStaff(member) {
  return (
    member.permissions?.has(PermissionFlagsBits.Administrator) ||
    member.roles?.cache?.some((role) => STAFF_ROLE_NAMES.includes(role.name)) ||
    false
  );
}

function isValidDate(day, month, year) {
  const monthDays = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  return month >= 1 && month <= 12 && day >= 1 && day <= monthDays[month - 1];
}

function isLeapYear(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

function toChannelSlug(username, fallback) {
  const slug = username
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);

  return slug || fallback;
}

client.login(DISCORD_TOKEN);
