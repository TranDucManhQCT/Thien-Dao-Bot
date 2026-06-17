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

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once('ready', () => {
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
    }

    if (interaction.isButton()) {
      if (interaction.customId === OPEN_TICKET_BUTTON) {
        await handleOpenTicket(interaction);
        return;
      }

      if (interaction.customId === CLOSE_TICKET_BUTTON) {
        await handleCloseTicket(interaction);
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
