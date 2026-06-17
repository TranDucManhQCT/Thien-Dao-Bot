  const fs = require('fs');
  const path = require('path');

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
  const DATA_DIR = path.join(__dirname, 'data');
  const USERS_FILE = path.join(DATA_DIR, 'users.json');
  const LUANDAO_FILE = path.join(DATA_DIR, 'luandao.json');
  const TRIBULATIONS_FILE = path.join(DATA_DIR, 'tribulations.json');
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
  const TRIBULATION_SUPPORT_BUTTON_PREFIX = 'thien_dao_tribulation_support:';
  const TRIBULATION_SNEAK_BUTTON_PREFIX = 'thien_dao_tribulation_sneak:';

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
  const SENIOR_DISCIPLE_APPROVER_ROLE_NAMES = [
    'Đạo Tổ',
    'Thái Thượng Trưởng Lão',
    'Tông Chủ',
    'Phó Tông Chủ',
    'Đại Trưởng Lão',
    'Trưởng Lão',
  ];
  const JUNIOR_DISCIPLE_APPROVER_ROLE_NAMES = [
    'Chấp Pháp Trưởng Lão',
    'Chấp Pháp Sứ',
    'Chấp Sự',
    'Dẫn Đạo Sư',
    'Đường Chủ',
  ];
  const DISCIPLE_APPROVER_ROLE_NAMES = [
    ...SENIOR_DISCIPLE_APPROVER_ROLE_NAMES,
    ...JUNIOR_DISCIPLE_APPROVER_ROLE_NAMES,
  ];
  const SECT_POSITION_ROLE_NAMES = [
    'Đạo Tổ',
    'Thái Thượng Trưởng Lão',
    'Tông Chủ',
    'Phó Tông Chủ',
    'Đại Trưởng Lão',
    'Trưởng Lão',
    'Chấp Pháp Trưởng Lão',
    'Đường Chủ',
    'Chấp Pháp Sứ',
    'Chấp Sự',
    'Dẫn Đạo Sư',
  ];
  const MASTER_STAFF_ROLE_NAMES = ['Trưởng Lão', 'Đường Chủ'];
  const ALL_QUALITY_ROLE_NAMES = [...QUALITY_ROLES];
  const TEMPORARY_STATUS_ROLE_NAMES = [
    'Tâm Ma Quấn Thân',
    'Bế Quan',
    'Linh Khí Bạo Phát',
    'Cơ Duyên Gia Thân',
    'Đạo Tâm Kiên Định',
    'Đạo Cơ Rạn Nứt',
    'Thiên Lôi Tôi Thể',
    'Nghiệp Lực',
  ];
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
  const TU_VI_REALMS = [
    'Phàm Nhân',
    'Luyện Khí',
    'Trúc Cơ',
    'Kim Đan',
    'Nguyên Anh',
    'Hóa Thần',
    'Luyện Hư',
    'Hợp Thể',
    'Đại Thừa',
    'Độ Kiếp',
    'Phi Thăng',
  ];
  const MINOR_REALMS = ['Sơ Kỳ', 'Trung Kỳ', 'Hậu Kỳ', 'Đỉnh Phong'];
  const MAX_TU_VI_LEVEL = TU_VI_REALMS.length * MINOR_REALMS.length - 1;
  const MESSAGE_CONG_HIEN_COOLDOWN_MS = 90 * 1000;
  const DAILY_MESSAGE_CONG_HIEN_LIMIT = 50;
const MESSAGE_CONG_HIEN_BLOCKED_CHANNEL_PARTS = ['meme', 'trà-đàm', 'du-hí', 'ẩn-danh', 'góp-ý'];
const GITHUB_VERIFY_CODE_PREFIX = 'THIENDAO';
const GITHUB_DAILY_EXP_CAP = 120;
const LEGACY_USER_FIELDS = ['lastCultivateAt', 'lastBreakthroughAt', 'lastMessageExpAt', 'dailyMessageExp'];
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const CO_DUYEN_COOLDOWN_MS = ONE_DAY_MS;
const DOT_PHA_FAIL_COOLDOWN_MS = 12 * 60 * 60 * 1000;
const TRIBULATION_ACTION_COST = 50;
const LUAN_DAO_STAFF_ROLE_NAMES = [
    'Đạo Tổ',
    'Tông Chủ',
    'Phó Tông Chủ',
    'Trưởng Lão',
    'Đường Chủ',
    'Chấp Pháp Sứ',
    'Chấp Sự',
    'Dẫn Đạo Sư',
  ];
const AUTO_DISCIPLE_THRESHOLDS = [
    { roleName: 'Tán Tu', exp: 0 },
    { roleName: 'Ký Danh Đệ Tử', exp: 100 },
    { roleName: 'Tạp Dịch Đệ Tử', exp: 300 },
    { roleName: 'Ngoại Môn Đệ Tử', exp: 800 },
    { roleName: 'Nội Môn Đệ Tử', exp: 2000 },
    { roleName: 'Chân Truyền Đệ Tử', exp: 5000 },
  ];
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
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once('clientReady', () => {
    ensureUsersFile();
    ensureLuanDaoFile();
    ensureTribulationsFile();
    scheduleActiveTribulations();
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

        if (interaction.commandName === 'linkgithub') {
          await handleLinkGithub(interaction);
          return;
        }

        if (interaction.commandName === 'verifygithub') {
          await handleVerifyGithub(interaction);
          return;
        }

        if (interaction.commandName === 'github') {
          await handleGithub(interaction);
          return;
        }

        if (interaction.commandName === 'checkcommit') {
          await handleCheckCommit(interaction);
          return;
        }

        if (interaction.commandName === 'conghien') {
          await handleCongHien(interaction);
          return;
        }

        if (interaction.commandName === 'tuvi') {
          await handleTuVi(interaction);
          return;
        }

        if (interaction.commandName === 'dotpha') {
          await handleDotPha(interaction);
          return;
        }

        if (interaction.commandName === 'thienkiep') {
          await handleThienKiep(interaction);
          return;
        }

        if (interaction.commandName === 'coduyen') {
          await handleCoDuyen(interaction);
          return;
        }

        if (interaction.commandName === 'luandao') {
          await handleLuanDao(interaction);
          return;
        }

        if (interaction.commandName === 'giaidap') {
          await handleGiaiDap(interaction);
          return;
        }

        if (interaction.commandName === 'chamdiem') {
          await handleChamDiem(interaction);
          return;
        }

        if (interaction.commandName === 'truyenthua') {
          await handleTruyenThua(interaction);
          return;
        }

        if (interaction.commandName === 'bangxephang') {
          await handleBangXepHang(interaction);
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
          await handleRejectTicket(interaction, DISCIPLE_APPROVER_ROLE_NAMES, 'Đơn xin thu nhận đã bị từ chối.');
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
          return;
        }

        if (interaction.customId.startsWith(TRIBULATION_SUPPORT_BUTTON_PREFIX)) {
          await handleTribulationAction(interaction, 'support');
          return;
        }

        if (interaction.customId.startsWith(TRIBULATION_SNEAK_BUTTON_PREFIX)) {
          await handleTribulationAction(interaction, 'sneak');
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

  client.on('messageCreate', async (message) => {
    try {
      await handleMessageCultivation(message);
    } catch (error) {
      console.error('Loi cong diem cong hien khi chat:', error);
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

    const recentMessages = await interaction.channel.messages.fetch({ limit: 30 }).catch(() => null);

    if (recentMessages) {
      const oldPanel = recentMessages.find((message) =>
        message.author.id === client.user.id &&
        message.embeds?.[0]?.title === 'Linh Căn Đài'
      );

      if (oldPanel) {
        await oldPanel.delete().catch(() => null);
      }
    }

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

    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    saveUsers(users);

    const refreshedMember = await interaction.guild.members.fetch(interaction.user.id);
    const hasTuViRole = refreshedMember.roles.cache.some((role) => TU_VI_REALMS.includes(role.name));
    const hasMinorRole = refreshedMember.roles.cache.some((role) => MINOR_REALMS.includes(role.name));

    if (!hasTuViRole || !hasMinorRole) {
      const syncResult = await syncTuViRoles(interaction.guild, refreshedMember, userData.tuViExp);

      if (!syncResult.ok) {
        await interaction.editReply(syncResult.message);
        return;
      }
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
      await interaction.reply({
        content: 'Hồ sơ đạo hữu chỉ xem được trong tông môn.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const targetUser = interaction.options.getUser('thanhvien') ?? interaction.user;
    const member = await interaction.guild.members.fetch(targetUser.id);
    const users = loadUsers();
    const userData = users[targetUser.id] ? getOrCreateUser(users, targetUser.id) : null;

    if (userData) {
      const statusResult = await resolveTemporaryStatusEffects(interaction.guild, member, userData);

      if (!statusResult.ok) {
        await interaction.reply({ content: statusResult.message, flags: MessageFlags.Ephemeral });
        return;
      }

      saveUsers(users);
    }

    const linhCanText = getMemberLinhCanClassificationText(member);
    const elementText = getMemberElementText(member);
    const qualityText = getMemberQualityText(member);
    const congPhapText = getMemberCongPhapText(member);

    const tuViLevel = userData ? getCurrentTuViLevel(member, userData.tuViExp) : 0;
    const tuVi = userData ? getTuViByLevel(tuViLevel) : null;

    const congHienExp = userData?.congHienExp ?? 0;
    const sectPosition = getMemberSectPosition(member);
    const sectIdentity = getSectIdentityText(member, userData);
    const discipleRank = getDiscipleRankDisplay(member, userData);
    const nextContribution = sectPosition
      ? 'Không áp dụng cho chức vị tông môn'
      : getNextContributionText(congHienExp, getMemberHighestAutoDiscipleRank(member));

    const githubText = userData?.githubUsername
      ? `${userData.githubUsername}\n${userData.githubVerified ? 'Đã xác minh' : 'Chưa xác minh'}`
      : 'Chưa liên kết';
    const masterText = userData?.masterId ? `<@${userData.masterId}>` : 'Chưa có';
    const discipleCount = Array.isArray(userData?.disciples) ? userData.disciples.length : 0;
    const temporaryStatusText = formatTemporaryStatus(userData);

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle(`Đạo Hồ - ${member.displayName}`)
      .setThumbnail(targetUser.displayAvatarURL({ size: 256 }))
      .addFields(
        {
          name: 'Đạo danh',
          value: `${member}`,
          inline: false,
        },
        {
          name: 'Thân phận tông môn',
          value: [
            `Thân phận: ${sectIdentity}`,
            `Cấp đệ tử: ${discipleRank}`,
            `Điểm cống hiến: ${congHienExp}`,
            `Mốc tiếp theo: ${nextContribution}`,
          ].join('\n'),
          inline: false,
        },
        {
          name: 'Tu luyện',
          value: [
            `Tu vi: ${tuVi ? `${tuVi.realm} ${tuVi.minor}` : 'Chưa nhập đạo'}`,
            `Tu vi exp: ${userData ? userData.tuViExp : 0}`,
            `Trạng thái: ${temporaryStatusText}`,
          ].join('\n'),
          inline: false,
        },
        {
          name: 'Căn cơ',
          value: [
            `Linh căn: ${linhCanText}`,
            `Hệ ngũ hành: ${elementText}`,
            `Phẩm chất linh căn: ${qualityText}`,
          ].join('\n'),
          inline: false,
        },
        {
          name: 'Công pháp tu luyện',
          value: congPhapText,
          inline: false,
        },
        {
          name: 'Truyền thừa',
          value: [
            `Sư phụ: ${masterText}`,
            `Đệ tử: ${discipleCount}`,
          ].join('\n'),
          inline: false,
        },
        {
          name: 'GitHub',
          value: githubText,
          inline: false,
        },
      )
      .setFooter({
        text: 'Thiên Đạo ghi nhận đạo tâm, căn cơ, tu vi và cống hiến của môn nhân.',
      });

    await interaction.reply({ embeds: [embed] });
  }

  async function handleLinkGithub(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Lệnh này chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const username = interaction.options.getString('username', true).trim();
    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    const verifyCode = `${GITHUB_VERIFY_CODE_PREFIX}-${interaction.user.id}`;

    userData.githubUsername = username;
    userData.githubVerifyCode = verifyCode;
    userData.githubVerified = false;
    saveUsers(users);

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle('Liên Kết GitHub')
      .setDescription(`${interaction.user} hãy thêm mã xác minh vào GitHub bio để Thiên Đạo nhận ra đạo hữu.`)
      .addFields(
        { name: 'GitHub username', value: username, inline: true },
        { name: 'Mã xác minh', value: `\`${verifyCode}\``, inline: false },
        { name: 'Bước tiếp theo', value: 'Vào GitHub profile, thêm mã trên vào bio, rồi dùng `/verifygithub`.', inline: false },
      )
      .setFooter({ text: 'Không cần token GitHub, chỉ kiểm tra public profile.' });

    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  }

  async function handleVerifyGithub(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Lệnh này chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);

    if (!userData.githubUsername || !userData.githubVerifyCode) {
      await interaction.reply({ content: 'Ngươi chưa liên kết GitHub. Hãy dùng `/linkgithub username` trước.', flags: MessageFlags.Ephemeral });
      return;
    }

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    try {
      const githubUser = await fetchGithubUser(userData.githubUsername);
      const bio = githubUser.bio ?? '';

      if (!bio.includes(userData.githubVerifyCode)) {
        await interaction.editReply(`Chưa tìm thấy mã \`${userData.githubVerifyCode}\` trong GitHub bio của **${userData.githubUsername}**.`);
        return;
      }

      userData.githubVerified = true;
      userData.githubUsername = githubUser.login;
      saveUsers(users);

      const embed = new EmbedBuilder()
        .setColor(GOLD)
        .setTitle('GitHub Đã Xác Minh')
        .setDescription(`${interaction.user} đã được Thiên Đạo xác nhận đạo tích GitHub.`)
        .addFields(
          { name: 'GitHub', value: githubUser.login, inline: true },
          { name: 'Trạng thái', value: 'Đã xác minh', inline: true },
        );

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Loi verify GitHub:', error);
      await interaction.editReply('Thiên Đạo chưa thể quan sát GitHub lúc này, hãy thử lại sau.');
    }
  }

  async function handleGithub(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Lệnh này chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    saveUsers(users);

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle('Đạo Tích GitHub')
      .addFields(
        { name: 'GitHub', value: userData.githubUsername ?? 'Chưa liên kết', inline: true },
        { name: 'Xác minh', value: userData.githubVerified ? 'Đã xác minh' : 'Chưa xác minh', inline: true },
        { name: 'Lần nhận thưởng commit gần nhất', value: userData.lastGithubRewardDate ?? 'Chưa có', inline: false },
        { name: 'Điểm GitHub hôm nay', value: `${userData.githubDailyExp ?? 0}/${GITHUB_DAILY_EXP_CAP}`, inline: true },
      )
      .setFooter({ text: 'Dùng /linkgithub username rồi /verifygithub để mở đạo lộ commit.' });

    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  }

  async function handleCheckCommit(interaction) {
  if (!interaction.inGuild()) {
    await interaction.reply({
      content: 'Lệnh này chỉ dùng trong tông môn.',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  await interaction.deferReply({ flags: MessageFlags.Ephemeral });

  const users = loadUsers();
  const userData = getOrCreateUser(users, interaction.user.id);

  if (!userData.githubUsername || !userData.githubVerified) {
    await interaction.editReply('Ngươi cần liên kết và xác minh GitHub trước khi nhận tu vi từ commit.');
    return;
  }

  const member = await interaction.guild.members.fetch(interaction.user.id);
  const statusResult = await resolveTemporaryStatusEffects(interaction.guild, member, userData);

  if (!statusResult.ok) {
    await interaction.editReply(statusResult.message);
    return;
  }

  const today = getTodayString();

  if (userData.lastGithubRewardDate === today) {
    await interaction.editReply('Hôm nay ngươi đã nhận thưởng tu vi từ commit rồi.');
    return;
  }

  try {
    const events = await fetchGithubEvents(userData.githubUsername);
    const commitCount = checkGithubCommitsToday(events);

    console.log('===== CHECK COMMIT DEBUG =====');
    console.log('Discord user:', interaction.user.id);
    console.log('GitHub username:', userData.githubUsername);
    console.log('GitHub verified:', userData.githubVerified);
    console.log('Today:', getTodayString());
    console.log('Events length:', events.length);
    console.log('PushEvents today:', events.filter(e =>
      e.type === 'PushEvent' &&
      getTodayString(new Date(e.created_at)) === getTodayString()
    ).length);
    console.log('Commit count:', commitCount);
    console.log('Last reward date:', userData.lastGithubRewardDate);
    console.log('==============================');

    userData.lastGithubCheckAt = Date.now();

    if (commitCount <= 0) {
      saveUsers(users);
      await interaction.editReply('Chưa tìm thấy commit công khai hôm nay trên GitHub của ngươi.');
      return;
    }

    const base = 40;
    const commitBonus = Math.min(commitCount * 10, 60);
    const rawGain = Math.min(base + commitBonus, GITHUB_DAILY_EXP_CAP);
    const gain = applyTuViMultiplier(userData, rawGain);

    userData.tuViExp += gain;
    userData.lastGithubRewardDate = today;
    userData.githubDailyExp = gain;
    userData.githubTotalExp += gain;
    userData.githubStreak += 1;

    const syncResult = await syncTuViRoles(interaction.guild, member, userData.tuViExp);

    if (!syncResult.ok) {
      await interaction.editReply(syncResult.message);
      return;
    }

    saveUsers(users);

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle('GitHub Công Đức Quy Tụ')
      .setDescription(`${member} đã dùng commit hôm nay để bồi đắp đạo hạnh.`)
      .addFields(
        { name: 'GitHub username', value: userData.githubUsername, inline: true },
        { name: 'Commit hôm nay', value: `${commitCount}`, inline: true },
        { name: 'Điểm tu luyện nhận được', value: `+${gain}${gain !== rawGain ? ` (gốc ${rawGain})` : ''}`, inline: true },
        { name: 'Tổng tu vi exp', value: `${userData.tuViExp}`, inline: true },
        { name: 'Tu vi hiện tại', value: `${syncResult.tuVi.realm} ${syncResult.tuVi.minor}`, inline: true },
      );

    await interaction.editReply({ embeds: [embed] });
  } catch (error) {
    console.error('Loi check commit GitHub:', error);
    await interaction.editReply('Thiên Đạo chưa thể quan sát GitHub lúc này, hãy thử lại sau.');
  }
}

  async function handleTuVi(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Lệnh này chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const users = loadUsers();
    let userData = users[interaction.user.id];

    if (!userData) {
      await interaction.reply({ content: 'Ngươi chưa nhập đạo, hãy kiểm tra linh căn trước.', flags: MessageFlags.Ephemeral });
      return;
    }

    userData = getOrCreateUser(users, interaction.user.id);
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const level = getCurrentTuViLevel(member, userData.tuViExp);
    const tuVi = getTuViByLevel(level);
    const needed = getExpNeededForBreakthrough(userData.tuViExp, level);
    const nextTuVi = level >= MAX_TU_VI_LEVEL ? null : getTuViByLevel(level + 1);
    const breakthroughText = nextTuVi
      ? needed > 0
        ? `Còn thiếu ${needed} tu vi exp để đột phá lên ${nextTuVi.realm} ${nextTuVi.minor}.`
        : `Đã đủ tu vi để dùng /dotpha lên ${nextTuVi.realm} ${nextTuVi.minor}.`
      : 'Đã chạm đỉnh cảnh giới hiện tại của Thiên Đạo.';

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle(`Tu Vi - ${member.displayName}`)
      .addFields(
        { name: 'Tu vi hiện tại', value: tuVi.realm, inline: true },
        { name: 'Tiểu cảnh', value: tuVi.minor, inline: true },
        { name: 'Tu vi exp', value: `${userData.tuViExp}`, inline: true },
        { name: 'Mốc đột phá', value: breakthroughText, inline: false },
        { name: 'GitHub', value: userData.githubUsername ?? 'Chưa liên kết', inline: true },
        { name: 'Xác minh GitHub', value: userData.githubVerified ? 'Đã xác minh' : 'Chưa xác minh', inline: true },
        { name: 'Thưởng commit gần nhất', value: userData.lastGithubRewardDate ?? 'Chưa có', inline: true },
      )
      .setFooter({ text: 'Tu vi tăng qua hoạt động GitHub public commit.' });

    await interaction.reply({ embeds: [embed] });
  }

  async function handleDotPha(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Đột phá chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const statusResult = await resolveTemporaryStatusEffects(interaction.guild, member, userData);

    if (!statusResult.ok) {
      await interaction.reply({ content: statusResult.message, flags: MessageFlags.Ephemeral });
      return;
    }

    if (Date.now() < userData.dotPhaCooldownUntil) {
      await interaction.reply({
        content: `Đạo cơ còn rung chuyển, hãy chờ đến ${formatTimestamp(userData.dotPhaCooldownUntil)} rồi thử lại.`,
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const level = getCurrentTuViLevel(member, userData.tuViExp);
    const currentTuVi = getTuViByLevel(level);
    const nextTuVi = level >= MAX_TU_VI_LEVEL ? null : getTuViByLevel(level + 1);
    const needed = getExpNeededForBreakthrough(userData.tuViExp, level);

    if (!nextTuVi) {
      await interaction.reply({ content: 'Ngươi đã chạm đỉnh cảnh giới hiện tại của Thiên Đạo.', flags: MessageFlags.Ephemeral });
      return;
    }

    if (needed > 0) {
      await interaction.reply({
        content: `Còn thiếu ${needed} tu vi exp để đột phá lên ${nextTuVi.realm} ${nextTuVi.minor}.`,
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    if (currentTuVi.minor !== 'Đỉnh Phong') {
      userData.tuViExp = Math.max(userData.tuViExp, expRequiredForLevel(level));
      const syncResult = await syncTuViRoles(interaction.guild, member, userData.tuViExp);

      if (!syncResult.ok) {
        await interaction.reply({ content: syncResult.message, flags: MessageFlags.Ephemeral });
        return;
      }

      saveUsers(users);

      const embed = new EmbedBuilder()
        .setColor(GOLD)
        .setTitle('Đột Phá Tiểu Cảnh')
        .setDescription(`${member} vận chuyển chu thiên, đạo cơ thông suốt.`)
        .addFields(
          { name: 'Trước', value: `${currentTuVi.realm} ${currentTuVi.minor}`, inline: true },
          { name: 'Sau', value: `${nextTuVi.realm} ${nextTuVi.minor}`, inline: true },
          { name: 'Tu vi exp', value: `${userData.tuViExp}`, inline: true },
        );

      await interaction.reply({ embeds: [embed] });
      return;
    }

    await startTribulation(interaction, users, userData, member, currentTuVi, nextTuVi, level);
  }

  async function handleThienKiep(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Thiên kiếp chỉ xem được trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const tribulations = loadTribulations();
    const now = Date.now();
    const activeEvents = Object.values(tribulations.events)
      .filter((event) => event.guildId === interaction.guild.id && event.status === 'active')
      .sort((left, right) => left.endsAt - right.endsAt);

    for (const event of activeEvents.filter((event) => now >= event.endsAt)) {
      await finalizeTribulationEvent(interaction.client, event.id);
    }

    const refreshed = loadTribulations();
    const stillActive = Object.values(refreshed.events)
      .filter((event) => event.guildId === interaction.guild.id && event.status === 'active')
      .sort((left, right) => left.endsAt - right.endsAt)
      .slice(0, 10);

    const lines = stillActive.length > 0
      ? stillActive.map((event) =>
        `#${event.id} - <@${event.ownerId}>: ${event.fromRealm} Đỉnh Phong -> ${event.toRealm} Sơ Kỳ, còn ${formatDuration(event.endsAt - Date.now())}`,
      )
      : ['Hiện chưa có đạo hữu nào đang độ kiếp.'];

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle('Thiên Lôi Độ Kiếp')
      .setDescription(lines.join('\n'));

    if (stillActive.length > 0) {
      await interaction.reply({ embeds: [embed] });
      return;
    }

    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  }

  async function handleCongHien(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Lệnh này chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const sectPosition = getMemberSectPosition(member);
    const nextRank = sectPosition
      ? null
      : getNextDiscipleRank(userData.congHienExp, getMemberHighestAutoDiscipleRank(member));
    const today = getTodayString();

    if (userData.dailyMessageDate !== today) {
      userData.dailyMessageDate = today;
      userData.dailyMessageCongHien = 0;
      saveUsers(users);
    }

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle(`Cống Hiến - ${member.displayName}`)
      .addFields(
        { name: 'Điểm cống hiến hiện tại', value: `${userData.congHienExp}`, inline: true },
        { name: 'Cấp đệ tử hiện tại', value: getDiscipleRankDisplay(member, userData), inline: true },
      {
        name: 'Điểm cần để lên cấp tiếp theo',
        value: sectPosition
          ? 'Không áp dụng cho chức vị tông môn'
          : nextRank
            ? `${nextRank.exp - userData.congHienExp} điểm để lên ${nextRank.roleName}`
            : 'Đã đạt mốc tự động cao nhất',
        inline: false,
      },
        { name: 'Cống hiến hôm nay', value: `${userData.dailyMessageCongHien}/${DAILY_MESSAGE_CONG_HIEN_LIMIT}`, inline: true },
      )
      .setFooter({ text: 'Chat hợp lệ trong kênh học/code sẽ tăng cống hiến.' });

    await interaction.reply({ embeds: [embed] });
  }

  async function handleCoDuyen(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Cơ duyên chỉ hiển lộ trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    const now = Date.now();

    if (now - userData.lastCoDuyenAt < CO_DUYEN_COOLDOWN_MS) {
      const remaining = Math.ceil((CO_DUYEN_COOLDOWN_MS - (now - userData.lastCoDuyenAt)) / 3600000);
      await interaction.reply({ content: `Cơ duyên chưa tới, đạo hữu hãy quay lại sau khoảng ${remaining} giờ.`, flags: MessageFlags.Ephemeral });
      return;
    }

    await interaction.deferReply();

    const member = await interaction.guild.members.fetch(interaction.user.id);
    const statusResolve = await resolveTemporaryStatusEffects(interaction.guild, member, userData);

    if (!statusResolve.ok) {
      await interaction.editReply(statusResolve.message);
      return;
    }

    const event = pickCoDuyenEvent();
    userData.lastCoDuyenAt = now;

    let detail = '';
    let syncTuVi = false;
    let syncDisciple = false;

    if (event.key === 'tang_kinh') {
      const gain = applyTuViMultiplier(userData, 80);
      userData.tuViExp += gain;
      detail = `Đạo hữu lĩnh ngộ cổ thư, nhận **+${gain} tu vi exp**.`;
      syncTuVi = true;
    }

    if (event.key === 'cao_nhan') {
      userData.congHienExp += 30;
      detail = 'Đạo hữu được cao nhân chỉ điểm, nhận **+30 cống hiến**.';
      syncDisciple = true;
    }

    if (event.key === 'tam_ma') {
      setTemporaryStatus(userData, 'Tâm Ma Quấn Thân', ONE_DAY_MS, { dotPhaPenalty: true });
      detail = 'Tâm ma quấn thân, tỉ lệ đột phá sau này sẽ bị giảm khi hệ thống đột phá mở ra.';
    }

    if (event.key === 'be_quan') {
      setTemporaryStatus(userData, 'Bế Quan', 8 * 60 * 60 * 1000, { beQuanRewardExp: 120 });
      detail = 'Đạo hữu nhập Bế Quan 8 giờ. Trong lúc bế quan không nhận cống hiến chat, hết hạn nhận **+120 tu vi exp**.';
    }

    if (event.key === 'co_duyen') {
      setTemporaryStatus(userData, 'Cơ Duyên Gia Thân', ONE_DAY_MS, { tuViMultiplierValue: 1.25 });
      detail = 'Cơ duyên gia thân, tu vi nhận được trong ngày tăng **x1.25**.';
    }

    if (event.key === 'linh_khi') {
      setTemporaryStatus(userData, 'Linh Khí Bạo Phát', ONE_DAY_MS, { tuViMultiplierValue: 2 });
      detail = 'Linh khí bạo phát quanh đạo thân, tu vi nhận được trong ngày tăng **x2**.';
    }

    if (event.key === 'dao_tam') {
      setTemporaryStatus(userData, 'Đạo Tâm Kiên Định', ONE_DAY_MS, { dotPhaBonus: true });
      detail = 'Đạo tâm kiên định, tỉ lệ đột phá sau này sẽ được tăng khi hệ thống đột phá mở ra.';
    }

    if (syncTuVi) {
      const syncResult = await syncTuViRoles(interaction.guild, member, userData.tuViExp);

      if (!syncResult.ok) {
        await interaction.editReply(syncResult.message);
        return;
      }
    }

    if (syncDisciple) {
      const syncResult = await syncDiscipleRole(interaction.guild, member, userData.congHienExp);

      if (!syncResult.ok) {
        await interaction.editReply(syncResult.message);
        return;
      }
    }

    const statusSync = await syncTemporaryStatusRole(interaction.guild, member, userData);

    if (!statusSync.ok) {
      await interaction.editReply(statusSync.message);
      return;
    }

    saveUsers(users);

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle(`Cơ Duyên - ${event.name}`)
      .setDescription(detail)
      .addFields(
        { name: 'Đạo hữu', value: `${member}`, inline: true },
        { name: 'Trạng thái', value: formatTemporaryStatus(userData), inline: true },
      );

    await interaction.editReply({ embeds: [embed] });
  }

  async function handleLuanDao(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Luận đạo chỉ mở trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const question = interaction.options.getString('cauhoi', true).trim();

    if (question.length < 10) {
      await interaction.reply({ content: 'Câu hỏi luận đạo cần rõ hơn một chút.', flags: MessageFlags.Ephemeral });
      return;
    }

    await interaction.deferReply();

    const luanDao = loadLuanDao();
    const id = String(luanDao.nextId ?? 1);
    luanDao.nextId = Number(id) + 1;

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle(`Luận Đạo #${id}`)
      .setDescription(question)
      .addFields(
        { name: 'Người hỏi', value: `${interaction.user}`, inline: true },
        { name: 'Trạng thái', value: 'Đang luận đạo', inline: true },
      );

    const message = await interaction.channel.send({ embeds: [embed] });
    let thread = null;

    if (typeof message.startThread === 'function') {
      thread = await message.startThread({
        name: `luan-dao-${id}`,
        autoArchiveDuration: 1440,
        reason: 'Mo thread luan dao code.',
      }).catch(() => null);
    }

    luanDao.questions[id] = {
      id,
      channelId: interaction.channelId,
      threadId: thread?.id ?? null,
      messageId: message.id,
      questionerId: interaction.user.id,
      question,
      status: 'Đang luận đạo',
      answers: {},
      createdAt: Date.now(),
    };

    saveLuanDao(luanDao);

    await interaction.editReply(`Đã mở đàn luận đạo #${id}${thread ? ` tại ${thread}` : ''}.`);
  }

  async function handleGiaiDap(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Giải đáp chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const id = interaction.options.getString('id', true).trim();
    const content = interaction.options.getString('noidung', true).trim();
    const luanDao = loadLuanDao();
    const question = luanDao.questions[id];

    if (!question) {
      await interaction.reply({ content: `Không tìm thấy luận đạo #${id}.`, flags: MessageFlags.Ephemeral });
      return;
    }

    if (content.length < 5) {
      await interaction.reply({ content: 'Nội dung giải đáp quá ngắn.', flags: MessageFlags.Ephemeral });
      return;
    }

    question.answers = question.answers && typeof question.answers === 'object' ? question.answers : {};

    if (question.answers[interaction.user.id]?.graded) {
      await interaction.reply({ content: 'Câu trả lời của đạo hữu đã được chấm, không thể sửa lại.', flags: MessageFlags.Ephemeral });
      return;
    }

    question.answers[interaction.user.id] = {
      answererId: interaction.user.id,
      content,
      createdAt: Date.now(),
      graded: false,
      result: null,
    };
    saveLuanDao(luanDao);

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle(`Giải Đáp Luận Đạo #${id}`)
      .setDescription(content)
      .addFields(
        { name: 'Người giải đáp', value: `${interaction.user}`, inline: true },
        { name: 'Câu hỏi', value: question.question.slice(0, 900), inline: false },
      );

    const targetChannel = question.threadId
      ? await interaction.client.channels.fetch(question.threadId).catch(() => null)
      : null;

    if (targetChannel?.isTextBased()) {
      await targetChannel.send({ embeds: [embed] });
    } else {
      await interaction.channel.send({ embeds: [embed] });
    }

    await interaction.reply({ content: `Đã ghi giải đáp cho luận đạo #${id}.`, flags: MessageFlags.Ephemeral });
  }

  async function handleChamDiem(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Chấm điểm chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const id = interaction.options.getString('id', true).trim();
    const targetUser = interaction.options.getUser('thanhvien', true);
    const result = interaction.options.getString('ketqua', true);
    const luanDao = loadLuanDao();
    const question = luanDao.questions[id];

    if (!question) {
      await interaction.reply({ content: `Không tìm thấy luận đạo #${id}.`, flags: MessageFlags.Ephemeral });
      return;
    }

    if (interaction.user.id !== question.questionerId && !hasStaffPermission(interaction.member)) {
      await interaction.reply({ content: 'Chỉ người hỏi hoặc quản sự tông môn được chấm luận đạo này.', flags: MessageFlags.Ephemeral });
      return;
    }

    if (question.questionerId === targetUser.id) {
      await interaction.reply({ content: 'Người hỏi không được tự chấm câu trả lời của mình.', flags: MessageFlags.Ephemeral });
      return;
    }

    const answer = question.answers[targetUser.id];

    if (!answer) {
      await interaction.reply({ content: `${targetUser} chưa có câu trả lời trong luận đạo #${id}.`, flags: MessageFlags.Ephemeral });
      return;
    }

    if (answer.graded) {
      await interaction.reply({ content: 'Câu trả lời này đã được chấm rồi.', flags: MessageFlags.Ephemeral });
      return;
    }

    await interaction.deferReply();

    const users = loadUsers();
    const userData = getOrCreateUser(users, targetUser.id);
    const targetMember = await interaction.guild.members.fetch(targetUser.id);
    const statusResult = await resolveTemporaryStatusEffects(interaction.guild, targetMember, userData);

    if (!statusResult.ok) {
      await interaction.editReply(statusResult.message);
      return;
    }

    let congHienGain = 25;
    let tuViGain = 0;

    if (result === 'code_tot') {
      congHienGain = 40;
      tuViGain = applyTuViMultiplier(userData, 60);
      userData.tuViExp += tuViGain;
    }

    userData.congHienExp += congHienGain;
    answer.graded = true;
    answer.result = result;
    answer.gradedBy = interaction.user.id;
    answer.gradedAt = Date.now();
    question.status = 'Đã chấm điểm';

    const tuViSync = tuViGain > 0
      ? await syncTuViRoles(interaction.guild, targetMember, userData.tuViExp)
      : { ok: true };

    if (!tuViSync.ok) {
      await interaction.editReply(tuViSync.message);
      return;
    }

    const discipleSync = await syncDiscipleRole(interaction.guild, targetMember, userData.congHienExp);

    if (!discipleSync.ok) {
      await interaction.editReply(discipleSync.message);
      return;
    }

    saveUsers(users);
    saveLuanDao(luanDao);

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle(`Chấm Điểm Luận Đạo #${id}`)
      .setDescription(`${targetUser} được ghi nhận công lao luận đạo.`)
      .addFields(
        { name: 'Kết quả', value: result === 'code_tot' ? 'Code tốt' : 'Hữu ích', inline: true },
        { name: 'Cống hiến', value: `+${congHienGain}`, inline: true },
        { name: 'Tu vi', value: tuViGain > 0 ? `+${tuViGain}` : 'Không cộng', inline: true },
      );

    await interaction.editReply({ embeds: [embed] });
  }

  async function handleTruyenThua(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Truyền thừa chỉ lập trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const discipleUser = interaction.options.getUser('de_tu', true);
    const masterMember = await interaction.guild.members.fetch(interaction.user.id);
    const discipleMember = await interaction.guild.members.fetch(discipleUser.id);
    const masterRoles = ['Trưởng Lão', 'Đường Chủ', 'Thân Truyền Đệ Tử', 'Chân Truyền Đệ Tử', 'Thánh Tử', 'Thánh Nữ'];
    const discipleRoles = ['Ngoại Môn Đệ Tử', 'Nội Môn Đệ Tử', 'Chân Truyền Đệ Tử'];

    if (!hasAnyRole(masterMember, masterRoles)) {
      await interaction.reply({ content: 'Đạo hữu chưa đủ tư cách nhận truyền thừa.', flags: MessageFlags.Ephemeral });
      return;
    }

    if (!hasAnyRole(discipleMember, discipleRoles)) {
      await interaction.reply({ content: 'Người được chọn phải là Ngoại Môn, Nội Môn hoặc Chân Truyền Đệ Tử.', flags: MessageFlags.Ephemeral });
      return;
    }

    const users = loadUsers();
    const masterData = getOrCreateUser(users, interaction.user.id);
    const discipleData = getOrCreateUser(users, discipleUser.id);

    if (discipleData.masterId) {
      await interaction.reply({ content: `${discipleUser} đã có sư phụ rồi.`, flags: MessageFlags.Ephemeral });
      return;
    }

    discipleData.masterId = interaction.user.id;

    if (!masterData.disciples.includes(discipleUser.id)) {
      masterData.disciples.push(discipleUser.id);
    }

    saveUsers(users);

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle('Truyền Thừa Đã Lập')
      .setDescription(`${interaction.user} nhận ${discipleUser} vào đạo thống truyền thừa.`)
      .addFields(
        { name: 'Sư phụ', value: `${interaction.user}`, inline: true },
        { name: 'Đệ tử', value: `${discipleUser}`, inline: true },
      );

    await interaction.reply({ embeds: [embed] });
  }

  async function handleBangXepHang(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Bảng xếp hạng chỉ xem được trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const type = interaction.options.getString('loai', true);
    const users = loadUsers();
    const config = {
      tuvi: { title: 'Tu Vi', value: (data) => data.tuViExp ?? 0, suffix: 'tu vi exp' },
      conghien: { title: 'Cống Hiến', value: (data) => data.congHienExp ?? 0, suffix: 'cống hiến' },
      github: { title: 'GitHub', value: (data) => data.githubTotalExp || data.githubDailyExp || 0, suffix: 'điểm GitHub' },
      streak: { title: 'GitHub Streak', value: (data) => data.githubStreak ?? 0, suffix: 'ngày' },
    }[type];

    const ranking = Object.entries(users)
      .map(([userId, data]) => ({ userId, value: config.value(data) }))
      .filter((entry) => entry.value > 0)
      .sort((left, right) => right.value - left.value)
      .slice(0, 10);

    const lines = ranking.length > 0
      ? ranking.map((entry, index) => `${index + 1}. <@${entry.userId}> - **${entry.value}** ${config.suffix}`)
      : ['Chưa có đạo hữu nào lưu danh.'];

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle(`Bảng Xếp Hạng ${config.title}`)
      .setDescription(lines.join('\n'));

    await interaction.reply({ embeds: [embed] });
  }

  async function startTribulation(interaction, users, userData, member, currentTuVi, nextTuVi, level) {
    const tribulations = loadTribulations();
    const existing = Object.values(tribulations.events).find(
      (event) => event.ownerId === interaction.user.id && event.status === 'active',
    );

    if (existing) {
      await interaction.reply({
        content: `Ngươi đang có thiên kiếp chưa xong: #${existing.id}. Dùng /thienkiep để xem.`,
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const id = createTribulationId(interaction.user.id);
    const now = Date.now();
    const durationMs = getTribulationDurationMs(currentTuVi.realmIndex);
    const event = {
      id,
      guildId: interaction.guild.id,
      channelId: interaction.channelId,
      messageId: null,
      ownerId: interaction.user.id,
      status: 'active',
      currentLevel: level,
      targetLevel: level + 1,
      fromRealm: currentTuVi.realm,
      toRealm: nextTuVi.realm,
      createdAt: now,
      endsAt: now + durationMs,
      strikeCount: getTribulationStrikeCount(currentTuVi.realmIndex),
      supportPower: 0,
      sneakPower: 0,
      supporters: {},
      sneakers: {},
      chance: null,
      roll: null,
      result: null,
    };

    tribulations.events[id] = event;
    saveTribulations(tribulations);

    const embed = buildTribulationEmbed(event, member, userData);
    const message = await interaction.reply({
      embeds: [embed],
      components: buildTribulationRows(event.id),
      fetchReply: true,
    });

    event.messageId = message.id;
    saveTribulations(tribulations);
    scheduleTribulationFinalizer(event);
  }

  async function handleTribulationAction(interaction, actionType) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Thiên kiếp chỉ diễn ra trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const prefix = actionType === 'support'
      ? TRIBULATION_SUPPORT_BUTTON_PREFIX
      : TRIBULATION_SNEAK_BUTTON_PREFIX;
    const eventId = interaction.customId.slice(prefix.length);
    const tribulations = loadTribulations();
    const event = tribulations.events[eventId];

    if (!event || event.status !== 'active') {
      await interaction.reply({ content: 'Thiên kiếp này đã tản hoặc không còn tồn tại.', flags: MessageFlags.Ephemeral });
      return;
    }

    if (Date.now() >= event.endsAt) {
      await finalizeTribulationEvent(interaction.client, event.id);
      await interaction.reply({ content: 'Thiên kiếp vừa kết thúc, kết quả đã được Thiên Đạo phán định.', flags: MessageFlags.Ephemeral });
      return;
    }

    if (actionType === 'sneak' && interaction.user.id === event.ownerId) {
      await interaction.reply({ content: 'Không thể tự đánh lén chính mình.', flags: MessageFlags.Ephemeral });
      return;
    }

    const users = loadUsers();
    const actorData = getOrCreateUser(users, interaction.user.id);

    if (actorData.tuViExp < TRIBULATION_ACTION_COST) {
      await interaction.reply({
        content: `Cần ${TRIBULATION_ACTION_COST} tu vi exp để ${actionType === 'support' ? 'hộ kiếp' : 'đánh lén'}.`,
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    actorData.tuViExp -= TRIBULATION_ACTION_COST;

    if (actionType === 'support') {
      event.supportPower += TRIBULATION_ACTION_COST;
      event.supporters[interaction.user.id] = (event.supporters[interaction.user.id] ?? 0) + TRIBULATION_ACTION_COST;
    } else {
      event.sneakPower += TRIBULATION_ACTION_COST;
      event.sneakers[interaction.user.id] = (event.sneakers[interaction.user.id] ?? 0) + TRIBULATION_ACTION_COST;
    }

    saveUsers(users);
    saveTribulations(tribulations);

    await refreshTribulationMessage(interaction.client, event);
    await interaction.reply({
      content: actionType === 'support'
        ? `Đã tiêu ${TRIBULATION_ACTION_COST} tu vi exp để hộ kiếp.`
        : `Đã tiêu ${TRIBULATION_ACTION_COST} tu vi exp để đánh lén.`,
      flags: MessageFlags.Ephemeral,
    });
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

    const member = await interaction.guild.members.fetch(interaction.user.id);
    const sectPosition = getMemberSectPosition(member);

    if (sectPosition) {
      await interaction.editReply(`Đạo hữu đang giữ chức vị **${sectPosition}**, không cần xin thu nhận đệ tử.`);
      return;
    }

    const channel = await createPrivateTicket(interaction, {
      channelPrefix: 'thu-nhan',
      topicPrefix: THU_NHAN_TOPIC_PREFIX,
      staffRoleNames: DISCIPLE_APPROVER_ROLE_NAMES,
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
          'Trưởng Lão trở lên duyệt sẽ thu vào Nội Môn. Chấp Pháp, Dẫn Đạo, Chấp Sự duyệt sẽ thu vào Ngoại Môn.',
        ].join('\n'),
      )
      .setFooter({ text: 'Cấp đệ tử được quyết theo chức vị người duyệt.' });

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
    const sectPosition = getMemberSectPosition(member);

    if (sectPosition) {
      await interaction.editReply(`Đạo hữu đang giữ chức vị **${sectPosition}**, không cần xin bái sư theo luồng đệ tử.`);
      return;
    }

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

    const approval = getDiscipleApprovalTarget(interaction.member);

    if (!approval) {
      await interaction.reply({
        content: 'Chỉ Trưởng Lão trở lên hoặc các chức vụ Chấp Pháp, Dẫn Đạo, Chấp Sự, Đường Chủ mới được duyệt đơn này.',
        flags: MessageFlags.Ephemeral,
      });
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
    const targetSectPosition = getMemberSectPosition(member);

    if (targetSectPosition) {
      await interaction.editReply(`${member} đang giữ chức vị **${targetSectPosition}**, không cần duyệt thu nhận đệ tử.`);
      return;
    }

    const autoRoleNames = AUTO_DISCIPLE_THRESHOLDS.map((entry) => entry.roleName);
    const currentAutoRank = getMemberHighestAutoDiscipleRank(member);
    const targetRank = getHigherDiscipleRank(currentAutoRank, approval.roleName);
    const targetRole = findRoleByName(interaction.guild, targetRank);
    const missing = targetRole ? [] : [targetRank];

    if (missing.length > 0) {
      await interaction.editReply(`Thiếu role: ${missing.join(', ')}. Hãy chạy \`npm run create:roles\` rồi thử lại.`);
      return;
    }

    const oldDiscipleRoles = member.roles.cache.filter(
      (role) => autoRoleNames.includes(role.name) && role.id !== targetRole.id,
    );
    const rolesToAdd = member.roles.cache.has(targetRole.id) ? [] : [targetRole];
    const blocker = await getDiscipleRoleManageBlocker(interaction.guild, [
      ...rolesToAdd,
      ...oldDiscipleRoles.values(),
    ]);

    if (blocker) {
      await interaction.editReply(blocker);
      return;
    }

    try {
      if (oldDiscipleRoles.size > 0) {
        await member.roles.remove(oldDiscipleRoles, 'Thu nhan de tu: xoa cap de tu cu.');
      }

      if (rolesToAdd.length > 0) {
        await member.roles.add(rolesToAdd, `Thu nhan de tu: gan ${targetRank}.`);
      }
    } catch (error) {
      if (error.code === 50013) {
        await interaction.editReply('Thiên Đạo chưa đủ quyền Quản Lý Vai Trò hoặc role Thiên Đạo đang nằm dưới role cần gán.');
        return;
      }

      throw error;
    }

    const users = loadUsers();
    const userData = getOrCreateUser(users, ownerId);
    userData.congHienExp = Math.max(userData.congHienExp, getDiscipleRankRequiredExp(targetRank));
    saveUsers(users);

    await interaction.editReply(`${member} đã được ${approval.sourceText} thu nhận làm **${targetRank}**.`);
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
    const targetSectPosition = getMemberSectPosition(member);

    if (targetSectPosition) {
      await interaction.editReply(`${member} đang giữ chức vị **${targetSectPosition}**, không cần duyệt bái sư theo luồng đệ tử.`);
      return;
    }

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
    const sectPosition = getMemberSectPosition(member);
    const currentDiscipleRole = getMemberDiscipleRank(member);
    const existingLinhCanRoles = getExistingLinhCanRoles(member);

    if (existingLinhCanRoles.size > 0) {
      await interaction.editReply(
        'Linh căn đã được Thiên Đạo khắc vào căn cơ, không thể tự ý khai lại. Nếu có sai sót, hãy báo Trưởng Lão xử lý thủ công.',
      );
      return;
    }

    const shouldAssignTanTu = !sectPosition && !currentDiscipleRole;
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

    const oldLinhCanRoles = getExistingLinhCanRoles(member);
    const rolesToAssign = shouldAssignTanTu ? [...roleCheck.roles, tanTuRole] : roleCheck.roles;
    const rolesToAdd = rolesToAssign.filter((role) => !member.roles.cache.has(role.id));
    const blocker = await getLinhCanRoleManageBlocker(interaction.guild, [
      ...rolesToAdd,
      ...oldLinhCanRoles.values(),
    ]);

    if (blocker) {
      await interaction.editReply(blocker);
      return;
    }

    try {
      if (oldLinhCanRoles.size > 0) {
        await member.roles.remove(oldLinhCanRoles, 'Xoa linh can cu truoc khi gan moi.');
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

    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    saveUsers(users);

    const refreshedMember = await interaction.guild.members.fetch(interaction.user.id);
    const hasTuViRole = refreshedMember.roles.cache.some((role) => TU_VI_REALMS.includes(role.name));
    const hasMinorRole = refreshedMember.roles.cache.some((role) => MINOR_REALMS.includes(role.name));

    if (!hasTuViRole || !hasMinorRole) {
      const syncResult = await syncTuViRoles(interaction.guild, refreshedMember, userData.tuViExp);

      if (!syncResult.ok) {
        await interaction.editReply(syncResult.message);
        return;
      }
    }

    const nextDiscipleRole = sectPosition ?? currentDiscipleRole ?? 'Tán Tu';
    const actionRows = buildLinhCanActionRows(nextDiscipleRole);

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
        { name: 'Vai trò hiện tại', value: nextDiscipleRole, inline: true },
        {
          name: 'Bước tiếp theo',
          value: getLinhCanNextStepText(nextDiscipleRole),
          inline: false,
        },
      )
      .setFooter({ text: 'Linh căn đã định, không thể tự ý khai lại.' });

    await interaction.editReply({
      embeds: [embed],
      components: actionRows,
    });
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
      : DISCIPLE_APPROVER_ROLE_NAMES;

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

  function buildLinhCanActionRows(discipleRoleName) {
    const row = new ActionRowBuilder();

    const needJoinSectRoles = [
      null,
      'Tán Tu',
      'Ký Danh Đệ Tử',
      'Tạp Dịch Đệ Tử',
    ];

    if (needJoinSectRoles.includes(discipleRoleName)) {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(REQUEST_DISCIPLE_BUTTON)
          .setLabel('Xin Thu Nhận Đệ Tử')
          .setStyle(ButtonStyle.Success),
      );

      return [row];
    }

    if (BAI_SU_ELIGIBLE_ROLES.includes(discipleRoleName)) {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(REQUEST_MASTER_BUTTON)
          .setLabel('Xin Bái Sư')
          .setStyle(ButtonStyle.Primary),
      );

      return [row];
    }

    return [];
  }

  function getLinhCanNextStepText(discipleRoleName) {
    if (isSectPositionRoleName(discipleRoleName)) {
      return 'Đạo hữu đang giữ chức vị tông môn, không cần xin thu nhận đệ tử.';
    }

    if (!discipleRoleName || ['Tán Tu', 'Ký Danh Đệ Tử', 'Tạp Dịch Đệ Tử'].includes(discipleRoleName)) {
      return 'Đạo hữu cần xin thu nhận vào tông môn trước.';
    }

    if (BAI_SU_ELIGIBLE_ROLES.includes(discipleRoleName)) {
      return 'Đạo hữu đã đủ điều kiện xin bái sư.';
    }

    if (['Thân Truyền Đệ Tử', 'Thánh Tử', 'Thánh Nữ'].includes(discipleRoleName)) {
      return 'Đạo hữu đã có truyền thừa cao, không cần xin bái sư tại đây.';
    }

    return 'Tiếp tục tu luyện và tích lũy cống hiến.';
  }

  function getMemberDiscipleRank(member) {
    return [...DISCIPLE_RANK_ROLES]
      .reverse()
      .find((roleName) => member.roles.cache.some((role) => role.name === roleName)) ?? null;
  }

  function getMemberSectPosition(member) {
    return SECT_POSITION_ROLE_NAMES.find((roleName) =>
      member.roles.cache.some((role) => role.name === roleName),
    ) ?? null;
  }

  function isSectPositionRoleName(roleName) {
    return SECT_POSITION_ROLE_NAMES.includes(roleName);
  }

  function getMemberHighestAutoDiscipleRank(member) {
    const autoRoleNames = AUTO_DISCIPLE_THRESHOLDS.map((entry) => entry.roleName);

    return [...autoRoleNames]
      .reverse()
      .find((roleName) => member.roles.cache.some((role) => role.name === roleName)) ?? null;
  }

  function getDiscipleApprovalTarget(member) {
    if (hasAnyRole(member, SENIOR_DISCIPLE_APPROVER_ROLE_NAMES)) {
      return {
        roleName: 'Nội Môn Đệ Tử',
        sourceText: 'Trưởng Lão trở lên',
      };
    }

    if (hasAnyRole(member, JUNIOR_DISCIPLE_APPROVER_ROLE_NAMES)) {
      return {
        roleName: 'Ngoại Môn Đệ Tử',
        sourceText: 'chức vụ chấp hành tông môn',
      };
    }

    return null;
  }

  function getHigherDiscipleRank(currentRoleName, targetRoleName) {
    if (!currentRoleName) {
      return targetRoleName;
    }

    const autoRoleNames = AUTO_DISCIPLE_THRESHOLDS.map((entry) => entry.roleName);
    const currentIndex = autoRoleNames.indexOf(currentRoleName);
    const targetIndex = autoRoleNames.indexOf(targetRoleName);

    return currentIndex > targetIndex ? currentRoleName : targetRoleName;
  }

  function getDiscipleRankRequiredExp(roleName) {
    return AUTO_DISCIPLE_THRESHOLDS.find((entry) => entry.roleName === roleName)?.exp ?? 0;
  }

  function getSectIdentityText(member, userData) {
    const sectPosition = getMemberSectPosition(member);

    if (sectPosition) {
      return sectPosition;
    }

    const role = getMemberDiscipleRank(member);

    if (!role) {
      return userData ? getDiscipleRankFromContribution(userData.congHienExp).roleName : 'Chưa nhập đạo';
    }

    return role === 'Tán Tu' ? 'Tán Tu - chưa nhập môn' : role;
  }

  function getDiscipleRankDisplay(member, userData) {
    const sectPosition = getMemberSectPosition(member);

    if (sectPosition) {
      return 'Không áp dụng - chức vị tông môn';
    }

    const role = getMemberDiscipleRank(member);

    if (!role || role === 'Tán Tu') {
      return 'Chưa phải đệ tử chính thức';
    }

    return role;
  }

  function getNextContributionText(congHienExp, currentRoleName = null) {
    const nextRank = getNextDiscipleRank(congHienExp, currentRoleName);

    if (!nextRank) {
      return 'Đã đạt mốc tự động cao nhất';
    }

    return `${nextRank.exp - congHienExp} điểm nữa để lên ${nextRank.roleName}`;
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

  function getExistingLinhCanRoles(member) {
    const linhCanRoleNames = [
      ...CLASSIFICATION_ROLES,
      ...ELEMENT_ROLE_NAMES,
      ...ALL_QUALITY_ROLE_NAMES,
    ];

    return member.roles.cache.filter((role) => linhCanRoleNames.includes(role.name));
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

  function getLinhCanQualityBonus(member) {
    const bonusMap = {
      'Hạ Phẩm Linh Căn': 0,
      'Trung Phẩm Linh Căn': 5,
      'Thượng Phẩm Linh Căn': 10,
      'Cực Phẩm Linh Căn': 15,
      'Thiên Phẩm Linh Căn': 20,
    };
    const roleName = QUALITY_ROLES.find((name) => member.roles.cache.some((role) => role.name === name));

    return roleName ? bonusMap[roleName] : 0;
  }

  function getTribulationBaseChance(realmIndex) {
    const chances = [90, 82, 75, 68, 60, 52, 45, 38, 32, 25, 20];

    return chances[Math.max(0, Math.min(chances.length - 1, realmIndex))];
  }

  function getTribulationChance(event, member, userData) {
    const tuVi = getTuViByLevel(event.currentLevel);
    const hasCongPhap = CONG_PHAP_ROLE_NAMES.some((roleName) =>
      member.roles.cache.some((role) => role.name === roleName),
    );
    let chance = getTribulationBaseChance(tuVi.realmIndex);

    chance += getLinhCanQualityBonus(member);
    chance += hasCongPhap ? 5 : 0;
    chance += Math.floor((event.supportPower ?? 0) / 50);
    chance -= Math.floor((event.sneakPower ?? 0) / 50);

    if (isTemporaryStatusActive(userData, 'Tâm Ma Quấn Thân') || Date.now() < (userData.dotPhaPenaltyUntil ?? 0)) {
      chance -= 10;
    }

    if (isTemporaryStatusActive(userData, 'Nghiệp Lực')) {
      chance -= 15;
    }

    if (isTemporaryStatusActive(userData, 'Đạo Tâm Kiên Định') || Date.now() < (userData.dotPhaBonusUntil ?? 0)) {
      chance += 10;
    }

    return Math.max(10, Math.min(90, chance));
  }

  function buildTribulationRows(eventId) {
    return [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`${TRIBULATION_SUPPORT_BUTTON_PREFIX}${eventId}`)
          .setLabel('Hộ Kiếp')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`${TRIBULATION_SNEAK_BUTTON_PREFIX}${eventId}`)
          .setLabel('Đánh Lén')
          .setStyle(ButtonStyle.Danger),
      ),
    ];
  }

  function buildTribulationEmbed(event, member, userData, finalText = null) {
    const chance = member && userData ? getTribulationChance(event, member, userData) : event.chance;

    return new EmbedBuilder()
      .setColor(GOLD)
      .setTitle(finalText ? 'Thiên Lôi Đã Dứt' : 'Thiên Lôi Độ Kiếp')
      .setDescription(finalText ?? `${member} đang từ **${event.fromRealm} Đỉnh Phong** vượt lên **${event.toRealm} Sơ Kỳ**.`)
      .addFields(
        { name: 'Đợt thiên lôi', value: `${event.strikeCount}`, inline: true },
        { name: 'Hộ kiếp', value: `${event.supportPower ?? 0}`, inline: true },
        { name: 'Đánh lén', value: `${event.sneakPower ?? 0}`, inline: true },
        { name: 'Tỉ lệ hiện tại', value: `${chance ?? '?'}%`, inline: true },
        { name: 'Kết thúc', value: formatTimestamp(event.endsAt), inline: true },
      )
      .setFooter({ text: `Mỗi lần Hộ Kiếp/Đánh Lén tiêu ${TRIBULATION_ACTION_COST} tu vi exp.` });
  }

  async function refreshTribulationMessage(clientInstance, event) {
    const channel = await clientInstance.channels.fetch(event.channelId).catch(() => null);

    if (!channel?.isTextBased()) {
      return;
    }

    const message = await channel.messages.fetch(event.messageId).catch(() => null);

    if (!message) {
      return;
    }

    const guild = await clientInstance.guilds.fetch(event.guildId).catch(() => null);
    const member = guild ? await guild.members.fetch(event.ownerId).catch(() => null) : null;
    const users = loadUsers();
    const userData = users[event.ownerId] ? getOrCreateUser(users, event.ownerId) : null;

    await message.edit({
      embeds: [buildTribulationEmbed(event, member, userData)],
      components: buildTribulationRows(event.id),
    });
  }

  async function finalizeTribulationEvent(clientInstance, eventId) {
    const tribulations = loadTribulations();
    const event = tribulations.events[eventId];

    if (!event || event.status !== 'active' || Date.now() < event.endsAt) {
      return;
    }

    const guild = await clientInstance.guilds.fetch(event.guildId).catch(() => null);
    const member = guild ? await guild.members.fetch(event.ownerId).catch(() => null) : null;

    if (!guild || !member) {
      event.status = 'expired';
      event.result = 'Không tìm thấy người độ kiếp.';
      saveTribulations(tribulations);
      return;
    }

    const users = loadUsers();
    const userData = getOrCreateUser(users, event.ownerId);
    const chance = getTribulationChance(event, member, userData);
    const roll = Math.floor(Math.random() * 100) + 1;
    const success = roll <= chance;
    let finalText;

    event.chance = chance;
    event.roll = roll;
    event.completedAt = Date.now();

    if (success) {
      userData.tuViExp = Math.max(userData.tuViExp, expRequiredForLevel(event.currentLevel));
      const greatSuccess = roll <= Math.max(3, Math.floor(chance * 0.08));

      if (greatSuccess) {
        userData.tuViExp += 120;
        setTemporaryStatus(userData, 'Thiên Lôi Tôi Thể', ONE_DAY_MS);
        finalText = `<@${event.ownerId}> độ kiếp đại thành công, thiên lôi tôi thể, bước vào **${event.toRealm} Sơ Kỳ**.`;
      } else {
        finalText = `<@${event.ownerId}> vượt qua thiên lôi, bước vào **${event.toRealm} Sơ Kỳ**.`;
      }

      await syncTuViRoles(guild, member, userData.tuViExp);
      await syncTemporaryStatusRole(guild, member, userData);

      for (const sneakerId of Object.keys(event.sneakers ?? {})) {
        const sneakerData = getOrCreateUser(users, sneakerId);
        const sneakerMember = await guild.members.fetch(sneakerId).catch(() => null);

        sneakerData.tuViExp = Math.max(0, sneakerData.tuViExp - 25);
        setTemporaryStatus(sneakerData, 'Nghiệp Lực', ONE_DAY_MS);

        if (sneakerMember) {
          await syncTemporaryStatusRole(guild, sneakerMember, sneakerData);
        }
      }

      event.status = greatSuccess ? 'great_success' : 'success';
    } else {
      const loss = Math.max(50, Math.floor(userData.tuViExp * 0.15));
      const minimumExp = expMinimumForLevel(event.currentLevel);

      userData.tuViExp = Math.max(minimumExp, userData.tuViExp - loss);
      userData.dotPhaCooldownUntil = Date.now() + DOT_PHA_FAIL_COOLDOWN_MS;
      setTemporaryStatus(
        userData,
        Math.random() < 0.5 ? 'Đạo Cơ Rạn Nứt' : 'Tâm Ma Quấn Thân',
        DOT_PHA_FAIL_COOLDOWN_MS,
        { dotPhaPenalty: true },
      );
      await syncTemporaryStatusRole(guild, member, userData);
      event.status = 'failed';
      finalText = `<@${event.ownerId}> độ kiếp thất bại, đạo cơ tổn thương nhưng cảnh giới không tụt.`;
    }

    event.result = finalText;
    saveUsers(users);
    saveTribulations(tribulations);

    const channel = await clientInstance.channels.fetch(event.channelId).catch(() => null);
    const message = channel?.isTextBased()
      ? await channel.messages.fetch(event.messageId).catch(() => null)
      : null;

    if (message) {
      await message.edit({
        embeds: [buildTribulationEmbed(event, member, userData, `${finalText}\n\nTỉ lệ: **${chance}%** | Thiên số: **${roll}/100**`)],
        components: [],
      });
    }
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

  function hasStaffPermission(member) {
    return member.permissions?.has(PermissionFlagsBits.Administrator) || hasAnyRole(member, LUAN_DAO_STAFF_ROLE_NAMES);
  }

  function applyTuViMultiplier(userData, amount) {
    if (Date.now() < (userData?.tuViMultiplierUntil ?? 0)) {
      return Math.floor(amount * (userData.tuViMultiplierValue ?? 1));
    }

    return amount;
  }

  function isTemporaryStatusActive(userData, statusName = null) {
    if (!userData?.temporaryStatus || Date.now() >= (userData.temporaryStatusExpireAt ?? 0)) {
      return false;
    }

    return statusName ? userData.temporaryStatus === statusName : true;
  }

  function formatTemporaryStatus(userData) {
    if (!isTemporaryStatusActive(userData)) {
      return 'Không có';
    }

    const expireText = new Date(userData.temporaryStatusExpireAt).toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
    });

    return `${userData.temporaryStatus} (đến ${expireText})`;
  }

  function setTemporaryStatus(userData, statusName, durationMs, options = {}) {
    const now = Date.now();

    userData.temporaryStatus = statusName;
    userData.temporaryStatusExpireAt = now + durationMs;
    userData.tuViMultiplierUntil = options.tuViMultiplierValue
      ? now + durationMs
      : userData.tuViMultiplierUntil;
    userData.tuViMultiplierValue = options.tuViMultiplierValue
      ? Math.max(userData.tuViMultiplierValue ?? 1, options.tuViMultiplierValue)
      : userData.tuViMultiplierValue;
    userData.dotPhaPenaltyUntil = options.dotPhaPenalty ? now + durationMs : userData.dotPhaPenaltyUntil;
    userData.dotPhaBonusUntil = options.dotPhaBonus ? now + durationMs : userData.dotPhaBonusUntil;

    if (statusName === 'Bế Quan') {
      userData.beQuanStartedAt = now;
      userData.beQuanRewardExp = options.beQuanRewardExp ?? 120;
      userData.beQuanRewardClaimed = false;
    }
  }

  async function syncTemporaryStatusRole(guild, member, userData) {
    await guild.roles.fetch();

    const activeStatus = isTemporaryStatusActive(userData) ? userData.temporaryStatus : null;
    const oldStatusRoles = member.roles.cache.filter(
      (role) => TEMPORARY_STATUS_ROLE_NAMES.includes(role.name) && role.name !== activeStatus,
    );
    const activeRole = activeStatus ? findRoleByName(guild, activeStatus) : null;
    const rolesToAdd = activeRole && !member.roles.cache.has(activeRole.id) ? [activeRole] : [];
    const rolesToManage = [...oldStatusRoles.values(), ...rolesToAdd];

    if (activeStatus && !activeRole) {
      return {
        ok: false,
        message: `Thiếu role trạng thái: ${activeStatus}. Hãy chạy \`npm run create:roles\` rồi thử lại.`,
      };
    }

    if (rolesToManage.length === 0) {
      return { ok: true };
    }

    const blocker = await getDiscipleRoleManageBlocker(guild, rolesToManage);

    if (blocker) {
      return { ok: false, message: blocker };
    }

    if (oldStatusRoles.size > 0) {
      await member.roles.remove(oldStatusRoles, 'Dong bo role trang thai tam thoi.');
    }

    if (rolesToAdd.length > 0) {
      await member.roles.add(rolesToAdd, 'Gan role trang thai tam thoi.');
    }

    return { ok: true };
  }

  async function resolveTemporaryStatusEffects(guild, member, userData) {
    if (
      userData.temporaryStatus === 'Bế Quan'
      && !userData.beQuanRewardClaimed
      && Date.now() >= userData.temporaryStatusExpireAt
    ) {
      userData.tuViExp += userData.beQuanRewardExp;
      userData.beQuanRewardClaimed = true;
      userData.temporaryStatus = null;
      userData.temporaryStatusExpireAt = 0;
      const syncResult = await syncTuViRoles(guild, member, userData.tuViExp);

      if (!syncResult.ok) {
        return syncResult;
      }
    }

    if (!isTemporaryStatusActive(userData) && userData.temporaryStatus) {
      userData.temporaryStatus = null;
      userData.temporaryStatusExpireAt = 0;
      userData.tuViMultiplierUntil = 0;
      userData.tuViMultiplierValue = 1;
    }

    return syncTemporaryStatusRole(guild, member, userData);
  }

  function pickCoDuyenEvent() {
    const events = [
      { key: 'tang_kinh', name: 'Tàng Kinh Các Khai Mở' },
      { key: 'cao_nhan', name: 'Cao Nhân Chỉ Điểm' },
      { key: 'tam_ma', name: 'Tâm Ma Quấn Thân' },
      { key: 'be_quan', name: 'Bế Quan' },
      { key: 'co_duyen', name: 'Cơ Duyên Gia Thân' },
      { key: 'linh_khi', name: 'Linh Khí Bạo Phát' },
      { key: 'dao_tam', name: 'Đạo Tâm Kiên Định' },
    ];

    return events[Math.floor(Math.random() * events.length)];
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

  function ensureUsersFile() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, '{}\n', 'utf8');
    }
  }

  function ensureLuanDaoFile() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(LUANDAO_FILE)) {
      fs.writeFileSync(LUANDAO_FILE, JSON.stringify({ nextId: 1, questions: {} }, null, 2) + '\n', 'utf8');
    }
  }

  function loadUsers() {
    ensureUsersFile();

    try {
      const raw = fs.readFileSync(USERS_FILE, 'utf8');
      const users = raw.trim() ? JSON.parse(raw) : {};

      for (const userId of Object.keys(users)) {
        users[userId] = normalizeUserData(users[userId]);
      }

      return users;
    } catch (error) {
      console.error('Khong the doc data/users.json:', error);
      return {};
    }
  }

  function saveUsers(users) {
    ensureUsersFile();
    const normalizedUsers = {};

    for (const [userId, userData] of Object.entries(users)) {
      normalizedUsers[userId] = normalizeUserData(userData);
    }

    fs.writeFileSync(USERS_FILE, `${JSON.stringify(normalizedUsers, null, 2)}\n`, 'utf8');
  }

  function loadLuanDao() {
    ensureLuanDaoFile();

    try {
      const raw = fs.readFileSync(LUANDAO_FILE, 'utf8');
      const data = raw.trim() ? JSON.parse(raw) : {};

      return {
        nextId: Number(data.nextId) > 0 ? Number(data.nextId) : 1,
        questions: data.questions && typeof data.questions === 'object' ? data.questions : {},
      };
    } catch (error) {
      console.error('Khong the doc data/luandao.json:', error);
      return { nextId: 1, questions: {} };
    }
  }

  function saveLuanDao(data) {
    ensureLuanDaoFile();
    const normalized = {
      nextId: Number(data.nextId) > 0 ? Number(data.nextId) : 1,
      questions: data.questions && typeof data.questions === 'object' ? data.questions : {},
    };

    fs.writeFileSync(LUANDAO_FILE, `${JSON.stringify(normalized, null, 2)}\n`, 'utf8');
  }

  function ensureTribulationsFile() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(TRIBULATIONS_FILE)) {
      fs.writeFileSync(TRIBULATIONS_FILE, JSON.stringify({ events: {} }, null, 2) + '\n', 'utf8');
    }
  }

  function loadTribulations() {
    ensureTribulationsFile();

    try {
      const raw = fs.readFileSync(TRIBULATIONS_FILE, 'utf8');
      const data = raw.trim() ? JSON.parse(raw) : {};

      return {
        events: data.events && typeof data.events === 'object' ? data.events : {},
      };
    } catch (error) {
      console.error('Khong the doc data/tribulations.json:', error);
      return { events: {} };
    }
  }

  function saveTribulations(data) {
    ensureTribulationsFile();

    fs.writeFileSync(
      TRIBULATIONS_FILE,
      `${JSON.stringify({ events: data.events && typeof data.events === 'object' ? data.events : {} }, null, 2)}\n`,
      'utf8',
    );
  }

  function getOrCreateUser(users, userId) {
    if (!users[userId]) {
      users[userId] = createDefaultUserData();
      return users[userId];
    }

    users[userId] = normalizeUserData(users[userId]);

    return users[userId];
  }

  function normalizeUserData(userData = {}) {
    const normalized = {
      ...createDefaultUserData(),
      ...(userData && typeof userData === 'object' ? userData : {}),
    };

    if (!Array.isArray(normalized.disciples)) {
      normalized.disciples = [];
    }

    if (!normalized.githubTotalExp && normalized.githubDailyExp > 0) {
      normalized.githubTotalExp = normalized.githubDailyExp;
    }

    if (!normalized.tuViMultiplierValue || normalized.tuViMultiplierValue < 1) {
      normalized.tuViMultiplierValue = 1;
    }

    normalized.beQuanRewardClaimed = Boolean(normalized.beQuanRewardClaimed);

    for (const field of LEGACY_USER_FIELDS) {
      delete normalized[field];
    }

    return normalized;
  }

  function createDefaultUserData() {
    return {
      githubUsername: null,
      githubVerifyCode: null,
      githubVerified: false,
      lastGithubCheckAt: 0,
      lastGithubRewardDate: null,
      githubDailyExp: 0,
      githubTotalExp: 0,
      githubStreak: 0,
      tuViExp: 0,
      congHienExp: 0,
      lastMessageCongHienAt: 0,
      dailyMessageCongHien: 0,
      dailyMessageDate: getTodayString(),
      lastCoDuyenAt: 0,
      temporaryStatus: null,
      temporaryStatusExpireAt: 0,
      tuViMultiplierUntil: 0,
      tuViMultiplierValue: 1,
      dotPhaPenaltyUntil: 0,
      dotPhaBonusUntil: 0,
      dotPhaCooldownUntil: 0,
      beQuanStartedAt: 0,
      beQuanRewardExp: 0,
      beQuanRewardClaimed: true,
      masterId: null,
      disciples: [],
    };
  }

  function expRequiredForLevel(level) {
    return Math.floor(300 * Math.pow(level + 1, 2.2));
  }

  function getLevelFromExp(tuViExp) {
    return Math.min(MAX_TU_VI_LEVEL, Math.floor(Math.pow(tuViExp / 300, 1 / 2.2)));
  }

  function getTuViFromExp(tuViExp) {
    return getTuViByLevel(getLevelFromExp(tuViExp));
  }

  function getTuViByLevel(level) {
    const clampedLevel = Math.max(0, Math.min(MAX_TU_VI_LEVEL, level));
    const realmIndex = Math.floor(clampedLevel / MINOR_REALMS.length);
    const minorIndex = clampedLevel % MINOR_REALMS.length;

    return {
      level: clampedLevel,
      realmIndex,
      minorIndex,
      realm: TU_VI_REALMS[realmIndex],
      minor: MINOR_REALMS[minorIndex],
    };
  }

  function expMinimumForLevel(level) {
    return level <= 0 ? 0 : expRequiredForLevel(level - 1);
  }

  function getExpNeededForBreakthrough(tuViExp, level) {
    if (level >= MAX_TU_VI_LEVEL) {
      return 0;
    }

    return Math.max(0, expRequiredForLevel(level) - tuViExp);
  }

  function formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
    });
  }

  function formatDuration(ms) {
    const safeMs = Math.max(0, ms);
    const minutes = Math.floor(safeMs / 60000);
    const seconds = Math.floor((safeMs % 60000) / 1000);

    return `${minutes} phút ${seconds} giây`;
  }

  function createTribulationId(userId) {
    return `${Date.now().toString(36)}-${userId.slice(-4)}`;
  }

  function getTribulationDurationMs(realmIndex) {
    return (10 + Math.max(0, realmIndex) * 2) * 60 * 1000;
  }

  function getTribulationStrikeCount(realmIndex) {
    return 5 + Math.floor(Math.max(0, realmIndex) / 2);
  }

  function scheduleTribulationFinalizer(event) {
    const delay = Math.max(1000, event.endsAt - Date.now());

    setTimeout(() => {
      finalizeTribulationEvent(client, event.id).catch((error) => {
        console.error('Loi phan dinh thien kiep:', error);
      });
    }, delay);
  }

  function scheduleActiveTribulations() {
    const tribulations = loadTribulations();

    for (const event of Object.values(tribulations.events)) {
      if (event.status !== 'active') {
        continue;
      }

      if (Date.now() >= event.endsAt) {
        finalizeTribulationEvent(client, event.id).catch((error) => {
          console.error('Loi phan dinh thien kiep khi khoi dong:', error);
        });
        continue;
      }

      scheduleTribulationFinalizer(event);
    }
  }

  function getCurrentTuViLevel(member, fallbackExp = 0) {
    const realmIndex = TU_VI_REALMS.findIndex((roleName) =>
      member.roles.cache.some((role) => role.name === roleName),
    );
    const minorIndex = MINOR_REALMS.findIndex((roleName) =>
      member.roles.cache.some((role) => role.name === roleName),
    );

    if (realmIndex >= 0 && minorIndex >= 0) {
      return realmIndex * MINOR_REALMS.length + minorIndex;
    }

    return getLevelFromExp(fallbackExp);
  }

  async function syncTuViRoles(guild, member, tuViExp) {
    await guild.roles.fetch();

    const tuVi = getTuViFromExp(tuViExp);
    const realmRole = findRoleByName(guild, tuVi.realm);
    const minorRole = findRoleByName(guild, tuVi.minor);
    const missing = [
      realmRole ? null : tuVi.realm,
      minorRole ? null : tuVi.minor,
    ].filter(Boolean);

    if (missing.length > 0) {
      return {
        ok: false,
        message: `Thiếu role tu vi: ${missing.join(', ')}. Hãy chạy \`npm run create:roles\` rồi thử lại.`,
      };
    }

    const oldRealmRoles = member.roles.cache.filter(
      (role) => TU_VI_REALMS.includes(role.name) && role.id !== realmRole.id,
    );
    const oldMinorRoles = member.roles.cache.filter(
      (role) => MINOR_REALMS.includes(role.name) && role.id !== minorRole.id,
    );
    const rolesToAdd = [realmRole, minorRole].filter((role) => !member.roles.cache.has(role.id));
    const blocker = await getTuViRoleManageBlocker(guild, [
      ...rolesToAdd,
      ...oldRealmRoles.values(),
      ...oldMinorRoles.values(),
    ]);

    if (blocker) {
      return { ok: false, message: blocker };
    }

    if (oldRealmRoles.size > 0) {
      await member.roles.remove(oldRealmRoles, 'Dong bo role canh gioi tu vi.');
    }

    if (oldMinorRoles.size > 0) {
      await member.roles.remove(oldMinorRoles, 'Dong bo role tieu canh tu vi.');
    }

    if (rolesToAdd.length > 0) {
      await member.roles.add(rolesToAdd, 'Dong bo role tu vi.');
    }

    return { ok: true, tuVi };
  }

  async function syncDiscipleRole(guild, member, congHienExp) {
    await guild.roles.fetch();

    const autoRoleNames = AUTO_DISCIPLE_THRESHOLDS.map((entry) => entry.roleName);
    const sectPosition = getMemberSectPosition(member);

    if (sectPosition) {
      const oldRoles = member.roles.cache.filter((role) => autoRoleNames.includes(role.name));

      if (oldRoles.size > 0) {
        const blocker = await getDiscipleRoleManageBlocker(guild, [...oldRoles.values()]);

        if (blocker) {
          return { ok: false, message: blocker };
        }

        await member.roles.remove(oldRoles, 'Xoa cap de tu tu dong cho chuc vi tong mon.');
      }

      return { ok: true, rank: { roleName: sectPosition } };
    }

    const rank = getDiscipleRankFromContribution(congHienExp);
    const currentAutoRank = getMemberHighestAutoDiscipleRank(member);
    const targetRank = getHigherDiscipleRank(currentAutoRank, rank.roleName);
    const targetRole = findRoleByName(guild, targetRank);

    if (!targetRole) {
      return {
        ok: false,
        message: `Thiếu role cấp đệ tử: ${targetRank}. Hãy chạy \`npm run create:roles\` rồi thử lại.`,
      };
    }

    const oldRoles = member.roles.cache.filter(
      (role) => autoRoleNames.includes(role.name) && role.id !== targetRole.id,
    );
    const rolesToAdd = member.roles.cache.has(targetRole.id) ? [] : [targetRole];
    const blocker = await getDiscipleRoleManageBlocker(guild, [...rolesToAdd, ...oldRoles.values()]);

    if (blocker) {
      return { ok: false, message: blocker };
    }

    if (oldRoles.size > 0) {
      await member.roles.remove(oldRoles, 'Dong bo cap de tu theo diem cong hien.');
    }

    if (rolesToAdd.length > 0) {
      await member.roles.add(rolesToAdd, 'Dong bo cap de tu theo diem cong hien.');
    }

    return { ok: true, rank: { roleName: targetRank } };
  }

  function getDiscipleRankFromContribution(congHienExp) {
    return [...AUTO_DISCIPLE_THRESHOLDS]
      .reverse()
      .find((entry) => congHienExp >= entry.exp) ?? AUTO_DISCIPLE_THRESHOLDS[0];
  }

  function getNextDiscipleRank(congHienExp, currentRoleName = null) {
    const currentIndex = AUTO_DISCIPLE_THRESHOLDS.findIndex((entry) => entry.roleName === currentRoleName);
    const minimumIndex = currentIndex >= 0 ? currentIndex + 1 : 0;

    return AUTO_DISCIPLE_THRESHOLDS.find((entry, index) => index >= minimumIndex && entry.exp > congHienExp) ?? null;
  }

  async function fetchGithubUser(username) {
    return fetchGithubJson(`https://api.github.com/users/${encodeURIComponent(username)}`);
  }

  async function fetchGithubEvents(username) {
    return fetchGithubJson(`https://api.github.com/users/${encodeURIComponent(username)}/events/public`);
  }

  async function fetchGithubJson(url) {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'Thien-Dao-Bot',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API ${response.status}`);
    }

    return response.json();
  }

  function checkGithubCommitsToday(events) {
  const today = getTodayString();

  return events
    .filter((event) => {
      return event.type === 'PushEvent'
        && getTodayString(new Date(event.created_at)) === today;
    })
    .reduce((total, event) => {
      // Ưu tiên payload.size vì GitHub PushEvent thường có size = số commit trong push
      if (typeof event.payload?.size === 'number') {
        return total + Math.max(event.payload.size, 1);
      }

      // Nếu có mảng commits thì đếm commits
      if (Array.isArray(event.payload?.commits)) {
        return total + Math.max(event.payload.commits.length, 1);
      }

      // Nếu chỉ thấy PushEvent nhưng không có size/commits thì vẫn tính 1 lần push
      return total + 1;
    }, 0);
  }

  async function getTuViRoleManageBlocker(guild, roles) {
    const botMember = await guild.members.fetchMe();

    if (!botMember.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return 'Thiên Đạo chưa đủ quyền Quản Lý Vai Trò hoặc role Thiên Đạo đang nằm dưới role tu vi cần gán.';
    }

    const blockedRole = roles.find((role) => role?.managed || role?.position >= botMember.roles.highest.position);

    if (blockedRole) {
      return 'Thiên Đạo chưa đủ quyền Quản Lý Vai Trò hoặc role Thiên Đạo đang nằm dưới role tu vi cần gán.';
    }

    return null;
  }

  async function handleMessageCultivation(message) {
    if (!message.guild || message.author.bot) {
      return;
    }

    if (message.content.trim().length < 5) {
      return;
    }

    const channelName = message.channel?.name?.toLowerCase() ?? '';

    if (MESSAGE_CONG_HIEN_BLOCKED_CHANNEL_PARTS.some((part) => channelName.includes(part))) {
      return;
    }

    const users = loadUsers();
    const userData = getOrCreateUser(users, message.author.id);
    const member = await message.guild.members.fetch(message.author.id);
    const statusResult = await resolveTemporaryStatusEffects(message.guild, member, userData);

    if (!statusResult.ok) {
      console.error(statusResult.message);
      return;
    }

    if (isTemporaryStatusActive(userData, 'Bế Quan')) {
      saveUsers(users);
      return;
    }

    const now = Date.now();

    if (now - userData.lastMessageCongHienAt < MESSAGE_CONG_HIEN_COOLDOWN_MS) {
      return;
    }

    const today = getTodayString();

    if (userData.dailyMessageDate !== today) {
      userData.dailyMessageDate = today;
      userData.dailyMessageCongHien = 0;
    }

    if (userData.dailyMessageCongHien >= DAILY_MESSAGE_CONG_HIEN_LIMIT) {
      return;
    }

    userData.congHienExp += 1;
    userData.lastMessageCongHienAt = now;
    userData.dailyMessageCongHien += 1;
    saveUsers(users);

    const syncResult = await syncDiscipleRole(message.guild, member, userData.congHienExp);

    if (!syncResult.ok) {
      console.error(syncResult.message);
    }
  }

  function getTodayString(date = new Date()) {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(date);
    const year = parts.find((part) => part.type === 'year')?.value;
    const month = parts.find((part) => part.type === 'month')?.value;
    const day = parts.find((part) => part.type === 'day')?.value;

    return `${year}-${month}-${day}`;
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
