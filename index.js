require('dotenv').config();

const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  Client,
  EmbedBuilder,
  GatewayIntentBits,
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
const CONG_PHAP_BUTTON_PREFIX = 'thien_dao_cong_phap:';

const ELEMENTS = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
const CLASSIFICATION_ROLES = [
  'Tạp Linh Căn',
  'Tứ Linh Căn',
  'Tam Linh Căn',
  'Nhị Linh Căn',
  'Nhất Linh Căn',
];
const ELEMENT_ROLE_NAMES = ELEMENTS.map((element) => `${element} Linh Căn`);
const STAFF_ROLE_NAMES = ['Trưởng Lão', 'Chấp Pháp Sứ'];
const ALL_LINH_CAN_ROLE_NAMES = [...CLASSIFICATION_ROLES, ...ELEMENT_ROLE_NAMES];
const CONG_PHAP_OPTIONS = [
  { key: 'react', emoji: '⚛️', name: 'React Huyễn Diện Công', roleName: '⚛️ React Huyễn Diện Công' },
  { key: 'typescript', emoji: '🟦', name: 'TypeScript Chân Kinh', roleName: '🟦 TypeScript Chân Kinh' },
  { key: 'javascript', emoji: '🟨', name: 'JavaScript Tâm Pháp', roleName: '🟨 JavaScript Tâm Pháp' },
  { key: 'node', emoji: '🟩', name: 'Node Hậu Đạo Quyết', roleName: '🟩 Node Hậu Đạo Quyết' },
  { key: 'sql', emoji: '🗄️', name: 'SQL Địa Mạch Kinh', roleName: '🗄️ SQL Địa Mạch Kinh' },
  { key: 'postgresql', emoji: '🐘', name: 'PostgreSQL Địa Mạch Kinh', roleName: '🐘 PostgreSQL Địa Mạch Kinh' },
  { key: 'figma', emoji: '🎨', name: 'Figma Huyễn Hình Thuật', roleName: '🎨 Figma Huyễn Hình Thuật' },
  { key: 'docker', emoji: '☁️', name: 'Docker Vân Hạ Pháp', roleName: '☁️ Docker Vân Hạ Pháp' },
];
const CONG_PHAP_ROLE_NAMES = CONG_PHAP_OPTIONS.map((option) => option.roleName);

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

      if (interaction.customId.startsWith(CONG_PHAP_BUTTON_PREFIX)) {
        await handleSelectCongPhap(interaction);
      }
    }
  } catch (error) {
    console.error('Loi xu ly interaction:', error);

    const payload = {
      content: 'Thiên cơ nhiễu loạn, bot gặp lỗi khi xử lý yêu cầu.',
      ephemeral: true,
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
    await interaction.reply({ content: 'Lệnh này chỉ dùng trong tông môn.', ephemeral: true });
    return;
  }

  if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
    await interaction.reply({ content: 'Chỉ chưởng quản tông môn mới được dựng Linh Căn Đài.', ephemeral: true });
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
  await interaction.reply({ content: 'Đã dựng Linh Căn Đài.', ephemeral: true });
}

async function handleSetupCongPhap(interaction) {
  if (!interaction.inGuild()) {
    await interaction.reply({ content: 'Lệnh này chỉ dùng trong tông môn.', ephemeral: true });
    return;
  }

  if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
    await interaction.reply({ content: 'Chỉ chưởng quản tông môn mới được dựng bia Công Pháp.', ephemeral: true });
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
  await interaction.reply({ content: 'Đã dựng bia Công Pháp Tu Luyện.', ephemeral: true });
}

async function handleSelectCongPhap(interaction) {
  if (!interaction.inGuild()) {
    await interaction.reply({ content: 'Công pháp chỉ có thể chọn trong tông môn.', ephemeral: true });
    return;
  }

  const selectedKey = interaction.customId.slice(CONG_PHAP_BUTTON_PREFIX.length);
  const selected = CONG_PHAP_OPTIONS.find((option) => option.key === selectedKey);

  if (!selected) {
    await interaction.reply({ content: 'Công pháp này không còn trong pháp các.', ephemeral: true });
    return;
  }

  await interaction.deferReply({ ephemeral: true });
  await interaction.guild.roles.fetch();

  const member = await interaction.guild.members.fetch(interaction.user.id);
  const targetRole = interaction.guild.roles.cache.find((role) => role.name === selected.roleName);

  if (!targetRole) {
    await interaction.editReply(`Thiếu role công pháp **${selected.roleName}**. Hãy chạy \`npm run create:roles\` rồi thử lại.`);
    return;
  }

  const oldRoles = member.roles.cache.filter(
    (role) => CONG_PHAP_ROLE_NAMES.includes(role.name) && role.id !== targetRole.id,
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
    await interaction.reply({ content: 'Hồ sơ đạo hữu chỉ xem được trong tông môn.', ephemeral: true });
    return;
  }

  const targetUser = interaction.options.getUser('thanhvien') ?? interaction.user;
  const member = await interaction.guild.members.fetch(targetUser.id);
  const linhCanText = getMemberLinhCanText(member);
  const congPhapText = getMemberCongPhapText(member);

  const embed = new EmbedBuilder()
    .setColor(GOLD)
    .setTitle(`Đạo Hồ - ${member.displayName}`)
    .setThumbnail(targetUser.displayAvatarURL({ size: 256 }))
    .addFields(
      { name: 'Đạo danh', value: `${member}`, inline: true },
      { name: 'Linh căn', value: linhCanText, inline: false },
      { name: 'Công pháp tu luyện', value: congPhapText, inline: false },
    )
    .setFooter({ text: 'Thiên Đạo ghi nhận đạo tâm và căn cơ của môn nhân.' });

  await interaction.reply({ embeds: [embed] });
}

async function handleOpenTicket(interaction) {
  if (!interaction.inGuild()) {
    await interaction.reply({ content: 'Ticket chỉ có thể mở trong tông môn.', ephemeral: true });
    return;
  }

  await interaction.deferReply({ ephemeral: true });

  const guild = interaction.guild;
  const member = await guild.members.fetch(interaction.user.id);
  const channels = await guild.channels.fetch();
  await guild.roles.fetch();

  const existingTicket = channels.find(
    (channel) =>
      channel.type === ChannelType.GuildText &&
      channel.topic?.includes(`${TICKET_TOPIC_PREFIX}${interaction.user.id}`),
  );

  if (existingTicket) {
    await interaction.editReply(`Đạo hữu đã có Linh Căn Đài riêng: ${existingTicket}`);
    return;
  }

  const staffRoles = guild.roles.cache.filter((role) => STAFF_ROLE_NAMES.includes(role.name));
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
        PermissionFlagsBits.UseApplicationCommands,
      ],
    })),
  ];

  const channel = await guild.channels.create({
    name: `linh-can-${toChannelSlug(member.user.username, member.id)}`,
    type: ChannelType.GuildText,
    topic: `${TICKET_TOPIC_PREFIX}${interaction.user.id}`,
    permissionOverwrites: overwrites,
    reason: 'Mo ticket Linh Can Dai.',
  });

  const embed = new EmbedBuilder()
    .setColor(GOLD)
    .setTitle('Linh Căn Đài Riêng')
    .setDescription('Đạo hữu hãy dùng `/linhcan ngay thang nam` tại đây để khai mở căn cơ.')
    .setFooter({ text: 'Kết quả chỉ hiển thị trong ticket này.' });

  await channel.send({ content: `${interaction.user}`, embeds: [embed] });
  await interaction.editReply(`Linh Căn Đài riêng đã mở: ${channel}`);
}

async function handleLinhCan(interaction) {
  if (!interaction.inGuild() || !isLinhCanTicket(interaction.channel)) {
    await interaction.reply({
      content: 'Lệnh `/linhcan` chỉ được dùng trong ticket Linh Căn Đài riêng.',
      ephemeral: true,
    });
    return;
  }

  const ownerId = getTicketOwnerId(interaction.channel);

  if (ownerId && interaction.user.id !== ownerId) {
    await interaction.reply({
      content: 'Chỉ đạo hữu mở Linh Căn Đài này mới được dùng lệnh khai căn.',
      ephemeral: true,
    });
    return;
  }

  const ngay = interaction.options.getInteger('ngay', true);
  const thang = interaction.options.getInteger('thang', true);
  const nam = interaction.options.getInteger('nam', true);

  if (!isValidDate(ngay, thang, nam)) {
    await interaction.reply({ content: 'Ngày sinh không hợp lệ, đạo hữu hãy nhập lại.', ephemeral: true });
    return;
  }

  await interaction.deferReply();

  await interaction.guild.roles.fetch();
  const member = await interaction.guild.members.fetch(interaction.user.id);
  const result = calculateLinhCan(ngay, thang, nam);
  const roleCheck = resolveResultRoles(interaction.guild, result);

  if (roleCheck.missing.length > 0) {
    await interaction.editReply(
      `Thiếu role: ${roleCheck.missing.join(', ')}. Hãy chạy \`npm run create:roles\` rồi thử lại.`,
    );
    return;
  }

  const oldRoles = member.roles.cache.filter((role) => ALL_LINH_CAN_ROLE_NAMES.includes(role.name));

  if (oldRoles.size > 0) {
    await member.roles.remove(oldRoles, 'Xoa linh can cu truoc khi gan moi.');
  }

  await member.roles.add(roleCheck.roles, 'Gan linh can moi theo Linh Can Dai.');

  const embed = new EmbedBuilder()
    .setColor(GOLD)
    .setTitle('Kim Quang Khai Mở')
    .setDescription(`${member} đã thức tỉnh **${result.displayName}**.`)
    .addFields(
      { name: 'Phẩm chất', value: `${result.phamChat}/99`, inline: true },
      { name: 'Phân loại', value: result.classification, inline: true },
      { name: 'Ngũ hành', value: result.elements.join(' - '), inline: false },
    )
    .setFooter({ text: 'Linh căn cũ đã được xóa trước khi gán kết quả mới.' });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(CLOSE_TICKET_BUTTON)
      .setLabel('Đóng Linh Căn Đài')
      .setStyle(ButtonStyle.Danger),
  );

  await interaction.editReply({ embeds: [embed], components: [row] });
}

async function handleCloseTicket(interaction) {
  if (!interaction.inGuild() || !isLinhCanTicket(interaction.channel)) {
    await interaction.reply({ content: 'Nút này chỉ dùng trong ticket Linh Căn Đài.', ephemeral: true });
    return;
  }

  const ownerId = getTicketOwnerId(interaction.channel);

  if (ownerId && interaction.user.id !== ownerId && !isStaff(interaction.member)) {
    await interaction.reply({ content: 'Chỉ chủ ticket hoặc trưởng lão mới được đóng Linh Căn Đài.', ephemeral: true });
    return;
  }

  await interaction.reply({ content: 'Linh Căn Đài sẽ khép lại sau 5 giây.', ephemeral: true });

  setTimeout(() => {
    interaction.channel
      .delete('Dong ticket Linh Can Dai.')
      .catch((error) => console.error('Khong the xoa ticket:', error));
  }, 5000);
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

function getMemberLinhCanText(member) {
  const classification = CLASSIFICATION_ROLES.find((roleName) =>
    member.roles.cache.some((role) => role.name === roleName),
  );
  const elements = ELEMENT_ROLE_NAMES.filter((roleName) =>
    member.roles.cache.some((role) => role.name === roleName),
  ).map((roleName) => roleName.replace(' Linh Căn', ''));

  if (!classification && elements.length === 0) {
    return 'Chưa khai mở linh căn.';
  }

  if (!classification) {
    return `${elements.join(' - ')} Linh Căn`;
  }

  if (elements.length === 0) {
    return classification;
  }

  return `${classification}: ${elements.join(' - ')} Linh Căn`;
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

function calculateLinhCan(ngay, thang, nam) {
  const seed = ngay * 31 + thang * 17 + nam;
  const phamChat = seed % 100;
  const hanhStart = seed % 5;
  const classification = getClassification(phamChat);
  const elements = getElements(hanhStart, classification.count);
  const displayName = `${elements.join(' - ')} Linh Căn`;

  return {
    seed,
    phamChat,
    hanhStart,
    classification: classification.name,
    count: classification.count,
    elements,
    displayName,
  };
}

function getClassification(phamChat) {
  if (phamChat <= 39) {
    return { name: 'Tạp Linh Căn', count: 5 };
  }

  if (phamChat <= 64) {
    return { name: 'Tứ Linh Căn', count: 4 };
  }

  if (phamChat <= 84) {
    return { name: 'Tam Linh Căn', count: 3 };
  }

  if (phamChat <= 94) {
    return { name: 'Nhị Linh Căn', count: 2 };
  }

  return { name: 'Nhất Linh Căn', count: 1 };
}

function getElements(hanhStart, count) {
  if (count === ELEMENTS.length) {
    return [...ELEMENTS];
  }

  return Array.from({ length: count }, (_, index) => ELEMENTS[(hanhStart + index) % ELEMENTS.length]);
}

function resolveResultRoles(guild, result) {
  const requiredRoleNames = [result.classification, ...result.elements.map((element) => `${element} Linh Căn`)];
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
  return channel?.type === ChannelType.GuildText && channel.topic?.startsWith(TICKET_TOPIC_PREFIX);
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
