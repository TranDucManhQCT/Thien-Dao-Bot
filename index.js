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
    StringSelectMenuBuilder,
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
  const MISSIONS_FILE = path.join(DATA_DIR, 'missions.json');
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
  const SHOP_PAGE_BUTTON_PREFIX = 'thien_dao_shop_page:';
  const MISSION_SELECT_CUSTOM_ID = 'thien_dao_mission_select';
  const MISSION_CREATE_PARTY_PREFIX = 'thien_dao_mission_create:';
  const MISSION_JOIN_PARTY_PREFIX = 'thien_dao_mission_join:';
  const MISSION_LEAVE_PARTY_PREFIX = 'thien_dao_mission_leave:';
  const MISSION_START_PREFIX = 'thien_dao_mission_start:';
  const MISSION_FIGHT_PREFIX = 'thien_dao_mission_fight:';
  const MISSION_ESCAPE_PREFIX = 'thien_dao_mission_escape:';
  const MISSION_REFRESH_BUTTON = 'thien_dao_mission_refresh';
  const MISSION_MY_STATUS_BUTTON = 'thien_dao_mission_my_status';


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
const GITHUB_DAILY_TUVI_CAP = 1500;
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

  const SHOP_ITEMS = [
    {
      key: 'git_kiem',
      name: 'Git Kiếm',
      type: 'artifact',
      price: 300,
      effect: '+5% tu vi từ GitHub commit.',
    },
    {
      key: 'sql_tran_ban',
      name: 'SQL Trận Bàn',
      type: 'artifact',
      price: 300,
      effect: '+5% tu vi nếu đang tu công pháp database.',
    },
    {
      key: 'docker_ho_lo',
      name: 'Docker Hồ Lô',
      type: 'artifact',
      price: 300,
      effect: '+5% tu vi nếu đang tu công pháp devops.',
    },
    {
      key: 'ide_khai_ngo',
      name: 'IDE Khai Ngộ',
      type: 'artifact',
      price: 500,
      effect: 'Giảm ảnh hưởng Tâm Ma ở các cơ chế sau.',
    },
    {
      key: 'ban_phim_linh_khi',
      name: 'Bàn Phím Linh Khí',
      type: 'artifact',
      price: 500,
      effect: '+3% mọi nguồn tu vi.',
    },
    {
      key: 'chuot_tram_bug',
      name: 'Chuột Trảm Bug',
      type: 'artifact',
      price: 400,
      effect: '+5% tu vi GitHub khi commit có fix/bug/hotfix.',
    },
    {
      key: 'hoi_nguyen_dan',
      name: 'Hồi Nguyên Đan',
      type: 'pill',
      price: 120,
      effect: '+80 tu vi.',
      tuViGain: 80,
    },
    {
      key: 'linh_khi_dan',
      name: 'Linh Khí Đan',
      type: 'pill',
      price: 220,
      effect: '+150 tu vi.',
      tuViGain: 150,
    },
    {
      key: 'tinh_tam_dan',
      name: 'Tĩnh Tâm Đan',
      type: 'pill',
      price: 180,
      effect: 'Xóa trạng thái Tâm Ma nếu có.',
      clearTamMa: true,
    },
    {
      key: 'cong_hien_dan',
      name: 'Công Hiến Đan',
      type: 'pill',
      price: 200,
      effect: '+50 cống hiến khả dụng và tổng cống hiến.',
      congHienGain: 50,
    },
    {
      key: 'tui_tho',
      name: 'Túi Thô',
      type: 'bag',
      price: 100,
      effect: 'Sức chứa 5 vật phẩm.',
      capacity: 5,
      grade: 1,
    },
    {
      key: 'tui_linh_moc',
      name: 'Túi Linh Mộc',
      type: 'bag',
      price: 300,
      effect: 'Sức chứa 10 vật phẩm.',
      capacity: 10,
      grade: 2,
    },
    {
      key: 'tui_huyen_thiet',
      name: 'Túi Huyền Thiết',
      type: 'bag',
      price: 700,
      effect: 'Sức chứa 20 vật phẩm.',
      capacity: 20,
      grade: 3,
    },
    {
      key: 'tui_can_khon',
      name: 'Túi Càn Khôn',
      type: 'bag',
      price: 1500,
      effect: 'Sức chứa 40 vật phẩm.',
      capacity: 40,
      grade: 4,
    },
    {
      key: 'tui_tien_thien',
      name: 'Túi Tiên Thiên',
      type: 'bag',
      price: 3000,
      effect: 'Sức chứa 80 vật phẩm.',
      capacity: 80,
      grade: 5,
    },
  ];
  const DEFAULT_STORAGE_BAG = 'tui_tho';
  const BE_QUAN_OPTIONS = {
    '1h': { label: '1 giờ', durationMs: 60 * 60 * 1000, reward: 30 },
    '2h': { label: '2 giờ', durationMs: 2 * 60 * 60 * 1000, reward: 70 },
    '4h': { label: '4 giờ', durationMs: 4 * 60 * 60 * 1000, reward: 160 },
    '8h': { label: '8 giờ', durationMs: 8 * 60 * 60 * 1000, reward: 360 },
  };

  const MISSION_DEFAULT_OPEN_LIMIT = 5;
  const MISSION_MIN_OPEN_LIMIT = 3;
  const MISSION_MAX_OPEN_LIMIT = 15;
  const MISSION_MAX_PARTY_SIZE = 3;
  const MISSION_STATUS_OPEN = 'open';
  const MISSION_STATUS_REVEALED = 'revealed';
  const MISSION_STATUS_COMPLETED = 'completed';
  const MISSION_REST_LIGHT_MS = 2 * 60 * 60 * 1000;
  const MISSION_REST_HEAVY_MS = 8 * 60 * 60 * 1000;
  const MISSION_AURAS = [
    'Khí tức yếu ớt',
    'Khí tức âm lãnh',
    'Khí tức bất ổn',
    'Khí tức cuồng bạo',
    'Khí tức áp đảo',
    'Không thể dò xét',
  ];

  const MISSION_TEMPLATES = [
    { key: 'tieu_bug_yeu', type: 'hunt', name: 'Tiểu Bug Yêu', minRealmIndex: 0 },
    { key: 'loan_chat_quy', type: 'hunt', name: 'Loạn Chat Quỷ', minRealmIndex: 0 },
    { key: 'tam_ma_luoi_hoc', type: 'hunt', name: 'Tâm Ma Lười Học', minRealmIndex: 0 },
    { key: 'spam_ma', type: 'hunt', name: 'Spam Ma', minRealmIndex: 0 },
    { key: 'muu_git_yeu', type: 'hunt', name: 'Mù Git Yêu', minRealmIndex: 1 },
    { key: 'deadline_ma_anh', type: 'hunt', name: 'Deadline Ma Ảnh', minRealmIndex: 1 },
    { key: 'merge_conflict_quy', type: 'hunt', name: 'Merge Conflict Quỷ', minRealmIndex: 1 },
    { key: 'loi_deploy_yeu', type: 'hunt', name: 'Lỗi Deploy Yêu', minRealmIndex: 2 },
    { key: 'database_doc_long', type: 'hunt', name: 'Database Độc Long', minRealmIndex: 2 },
    { key: 'api_ta_linh', type: 'hunt', name: 'API Tà Linh', minRealmIndex: 2 },
    { key: 'ui_huyen_yeu', type: 'hunt', name: 'UI Huyễn Yêu', minRealmIndex: 2 },
    { key: 'docker_am_quy', type: 'hunt', name: 'Docker Âm Quỷ', minRealmIndex: 3 },
    { key: 'vercel_ta_ma', type: 'hunt', name: 'Vercel Tà Ma', minRealmIndex: 3 },
    { key: 'supabase_doc_xa', type: 'hunt', name: 'Supabase Độc Xà', minRealmIndex: 3 },
    { key: 'auth_ma_anh', type: 'hunt', name: 'Auth Ma Ảnh', minRealmIndex: 3 },
    { key: 'no_ky_thuat_cu_thu', type: 'hunt', name: 'Nợ Kỹ Thuật Cự Thú', minRealmIndex: 4 },
    { key: 'hu_khong_bug_vuong', type: 'hunt', name: 'Hư Không Bug Vương', minRealmIndex: 4 },
    { key: 'ta_ma_deploy', type: 'hunt', name: 'Tà Ma Deploy', minRealmIndex: 4 },
    { key: 'thien_kiep_bug_vuong', type: 'hunt', name: 'Thiên Kiếp Bug Vương', minRealmIndex: 5 },
    { key: 'hon_loan_server_quy', type: 'hunt', name: 'Hỗn Loạn Server Quỷ', minRealmIndex: 5 },
    { key: 'nghiep_luc_ma_quan', type: 'hunt', name: 'Nghiệp Lực Ma Quân', minRealmIndex: 5 },
    { key: 'van_kiep_ta_long', type: 'hunt', name: 'Vạn Kiếp Tà Long', minRealmIndex: 6 },
    { key: 'thien_dao_nghich_ma', type: 'hunt', name: 'Thiên Đạo Nghịch Ma', minRealmIndex: 6 },
    { key: 'hon_don_ma_ton', type: 'hunt', name: 'Hỗn Độn Ma Tôn', minRealmIndex: 7 },
    { key: 'diet_the_yeu_hoang', type: 'hunt', name: 'Diệt Thế Yêu Hoàng', minRealmIndex: 8 },

    { key: 'quet_tap_niem_dong', type: 'clean', name: 'Quét Tạp Niệm Động', minRealmIndex: 0 },
    { key: 'don_son_mon', type: 'clean', name: 'Dọn Sơn Môn', minRealmIndex: 0 },
    { key: 'lau_linh_bai', type: 'clean', name: 'Lau Linh Bài', minRealmIndex: 0 },
    { key: 'gom_linh_thach_tan_mat', type: 'clean', name: 'Gom Linh Thạch Tản Mát', minRealmIndex: 0 },
    { key: 'thanh_tay_ue_khi', type: 'clean', name: 'Thanh Tẩy Uế Khí', minRealmIndex: 1 },
    { key: 'don_tang_kinh_loan_cac', type: 'clean', name: 'Dọn Tàng Kinh Loạn Các', minRealmIndex: 1 },
    { key: 'sap_lai_phap_khi', type: 'clean', name: 'Sắp Lại Pháp Khí', minRealmIndex: 1 },
    { key: 'quet_bui_chap_phap_duong', type: 'clean', name: 'Quét Bụi Chấp Pháp Đường', minRealmIndex: 1 },
    { key: 'sua_phap_tran_lech', type: 'clean', name: 'Sửa Pháp Trận Lệch', minRealmIndex: 2 },
    { key: 'khoi_thong_linh_mach', type: 'clean', name: 'Khơi Thông Linh Mạch', minRealmIndex: 2 },
    { key: 'don_bi_canh_cu', type: 'clean', name: 'Dọn Bí Cảnh Cũ', minRealmIndex: 2 },
    { key: 'trung_tu_luyen_ma_duong', type: 'clean', name: 'Trùng Tu Luyện Mã Đường', minRealmIndex: 2 },
    { key: 'khai_quang_son_mon', type: 'clean', name: 'Khai Quang Sơn Môn', minRealmIndex: 3 },
    { key: 'tay_tran_dao_truong', type: 'clean', name: 'Tẩy Trần Đạo Trường', minRealmIndex: 3 },
    { key: 'lap_lai_tang_kinh_muc', type: 'clean', name: 'Lập Lại Tàng Kinh Mục', minRealmIndex: 3 },
    { key: 'thanh_ly_yeu_khi', type: 'clean', name: 'Thanh Lý Yêu Khí', minRealmIndex: 3 },
    { key: 'don_ma_vuc_hon_don', type: 'clean', name: 'Dọn Ma Vực Hỗn Độn', minRealmIndex: 4 },
    { key: 'tu_bo_ho_tong_tran', type: 'clean', name: 'Tu Bổ Hộ Tông Trận', minRealmIndex: 4 },
    { key: 'chinh_don_chan_truyen_cac', type: 'clean', name: 'Chỉnh Đốn Chân Truyền Các', minRealmIndex: 4 },
    { key: 'thanh_loc_nghiep_chuong', type: 'clean', name: 'Thanh Lọc Nghiệp Chướng', minRealmIndex: 5 },
    { key: 'tong_mon_dai_thanh_tay', type: 'clean', name: 'Tông Môn Đại Thanh Tẩy', minRealmIndex: 5 },
    { key: 'lap_lai_thien_dao_bang', type: 'clean', name: 'Lập Lại Thiên Đạo Bảng', minRealmIndex: 6 },
    { key: 'trung_kien_dao_tam_dien', type: 'clean', name: 'Trùng Kiến Đạo Tâm Điện', minRealmIndex: 7 },
    { key: 'quet_sach_hu_khong_vet_nut', type: 'clean', name: 'Quét Sạch Hư Không Vết Nứt', minRealmIndex: 8 },
  ];

  const HUNT_REWARD_TOTAL_BY_REALM = [150, 300, 750, 1500, 3000, 5400, 9000, 12000, 16000, 22000, 30000];
  const CLEAN_REWARD_TOTAL_BY_REALM = [90, 180, 450, 900, 1800, 3200, 5400, 7200, 9600, 13200, 18000];
  const MISSION_TUVI_TOTAL_BY_REALM = [30, 90, 180, 360, 720, 1200, 1800, 2600, 3600, 5000, 7000];



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
    ensureMissionsFile();
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

        if (interaction.commandName === 'trangthai') {
          await handleTrangThai(interaction);
          return;
        }

        if (interaction.commandName === 'bequan') {
          await handleBeQuan(interaction);
          return;
        }

        if (interaction.commandName === 'xuatquan') {
          await handleXuatQuan(interaction);
          return;
        }

        if (interaction.commandName === 'shop') {
          await handleShop(interaction);
          return;
        }

        if (interaction.commandName === 'mua') {
          await handleMua(interaction);
          return;
        }

        if (interaction.commandName === 'tuido') {
          await handleTuiDo(interaction);
          return;
        }

        if (interaction.commandName === 'trangbi') {
          await handleTrangBi(interaction);
          return;
        }

        if (interaction.commandName === 'dung') {
          await handleDungItem(interaction);
          return;
        }

        if (interaction.commandName === 'tangitem') {
          await handleTangItem(interaction);
          return;
        }

        if (interaction.commandName === 'nhiemvu') {
          await handleNhiemVu(interaction);
          return;
        }

        if (interaction.commandName === 'setupnhiemvu') {
          await handleSetupNhiemVu(interaction);
          return;
        }
      }

      if (interaction.isStringSelectMenu()) {
        if (interaction.customId === MISSION_SELECT_CUSTOM_ID) {
          await handleMissionSelect(interaction);
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
          return;
        }

        if (interaction.customId.startsWith(SHOP_PAGE_BUTTON_PREFIX)) {
          await handleShopPage(interaction);
          return;
        }

        if (interaction.customId === MISSION_REFRESH_BUTTON) {
          await handleMissionRefresh(interaction);
          return;
        }

        if (interaction.customId === MISSION_MY_STATUS_BUTTON) {
          await handleMissionMyStatus(interaction);
          return;
        }

        if (interaction.customId.startsWith(MISSION_CREATE_PARTY_PREFIX)) {
          await handleMissionCreateParty(interaction);
          return;
        }

        if (interaction.customId.startsWith(MISSION_JOIN_PARTY_PREFIX)) {
          await handleMissionJoinParty(interaction);
          return;
        }

        if (interaction.customId.startsWith(MISSION_LEAVE_PARTY_PREFIX)) {
          await handleMissionLeaveParty(interaction);
          return;
        }

        if (interaction.customId.startsWith(MISSION_START_PREFIX)) {
          await handleMissionStart(interaction);
          return;
        }

        if (interaction.customId.startsWith(MISSION_FIGHT_PREFIX)) {
          await handleMissionFight(interaction);
          return;
        }

        if (interaction.customId.startsWith(MISSION_ESCAPE_PREFIX)) {
          await handleMissionEscape(interaction);
          return;
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
    const bagText = userData ? `${getStorageBag(userData).name} (${getInventoryUsed(userData)}/${getStorageCapacity(userData)} ô)` : 'Chưa có';
    const equippedArtifact = userData ? getEquippedArtifact(userData) : null;
    const artifactText = equippedArtifact ? `${equippedArtifact.name} - ${equippedArtifact.effect}` : 'Chưa trang bị pháp bảo';

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
          name: 'Hành trang',
          value: [
            `Pháp bảo: ${artifactText}`,
            `Túi trữ vật: ${bagText}`,
            `Cống hiến khả dụng: ${userData ? getSpendableCongHien(userData) : 0}`,
          ].join('\n'),
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
        { name: 'Ngày luyện commit gần nhất', value: userData.lastGithubRewardDate ?? 'Chưa có', inline: false },
        { name: 'Số lần hóa đạo hôm nay', value: `${userData.githubDailyRewardCount ?? 0}`, inline: true },
        { name: 'Điểm GitHub hôm nay', value: `${userData.githubDailyExp ?? 0}/${GITHUB_DAILY_TUVI_CAP}`, inline: true },
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
  const isFirstGithubRewardToday = userData.lastGithubRewardDate !== today;

  if (isFirstGithubRewardToday) {
    userData.githubDailyExp = 0;
    userData.githubDailyRewardCount = 0;
  }

  if (userData.githubDailyExp >= GITHUB_DAILY_TUVI_CAP) {
    await interaction.editReply(`Đạo cơ hôm nay đã hấp thu đến cực hạn: **${userData.githubDailyExp}/${GITHUB_DAILY_TUVI_CAP} tu vi**. Ngươi vẫn có thể xem GitHub, nhưng tu vi hôm nay không tăng thêm.`);
    return;
  }

  try {
    const events = await fetchGithubEvents(userData.githubUsername);
    const githubActivity = getGithubActivityToday(events);
    const commitCount = githubActivity.commitCount;

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
    const nextStreak = getNextGithubStreak(userData, today);
    const streakBonus = Math.min(nextStreak * 5, 50);
    const repoBonus = Math.min(Math.max(0, githubActivity.repoCount - 1) * 8, 32);
    const rawBeforeCap = base + commitBonus + streakBonus + repoBonus;
    const rawGain = Math.min(rawBeforeCap, GITHUB_DAILY_EXP_CAP);
    const multiplier = getTuViRewardMultiplier(userData, member, 'github', githubActivity);
    const calculatedGain = Math.floor(rawGain * multiplier.value);
    const remainingDailyGain = Math.max(0, GITHUB_DAILY_TUVI_CAP - userData.githubDailyExp);
    const gain = Math.min(calculatedGain, remainingDailyGain);
    const cappedText = gain < calculatedGain
      ? `\nĐã chạm giới hạn ngày, chỉ nhận phần còn lại: ${gain}/${calculatedGain}.`
      : '';

    userData.tuViExp += gain;
    userData.lastGithubRewardDate = today;
    userData.githubDailyExp += gain;
    userData.githubDailyRewardCount += 1;
    userData.githubTotalExp += gain;
    userData.githubStreak = isFirstGithubRewardToday ? nextStreak : userData.githubStreak;

    const syncResult = await syncTuViRoles(interaction.guild, member, userData.tuViExp);

    if (!syncResult.ok) {
      await interaction.editReply(syncResult.message);
      return;
    }

    saveUsers(users);

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle('Commit Hóa Đạo')
      .setDescription(`${member} nhận **+${gain} tu vi exp** từ commit GitHub.${cappedText}`)
      .addFields(
        { name: 'Kết quả', value: `Hôm nay: ${userData.githubDailyExp}/${GITHUB_DAILY_TUVI_CAP} tu vi\nTổng dự trữ: ${userData.tuViExp} tu vi\nTu vi hiện tại: ${syncResult.tuVi.realm} ${syncResult.tuVi.minor}`, inline: false },
        { name: 'Nguồn điểm', value: `Commit hôm nay: ${commitCount} (+${commitBonus})\nRepo hôm nay: ${githubActivity.repoCount} (+${repoBonus})\nStreak: ${userData.githubStreak} ngày (+${streakBonus})`, inline: false },
        { name: 'Bonus đang áp dụng', value: `${multiplier.summary}\nTổng hệ số: x${multiplier.value.toFixed(2)}`, inline: false },
        { name: 'Ghi chú', value: 'Điểm được nhập kho đạo cơ. Cảnh giới chỉ đổi khi đạo hữu chủ động dùng `/dotpha`.', inline: false },
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
        : `Đã đủ tu vi để dùng /dotpha lên ${nextTuVi.realm} ${nextTuVi.minor}. Có thể giữ điểm lại để luyện căn, dưỡng linh mạch hoặc xử lý trạng thái xấu.`
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
      const syncResult = await syncTuViRoles(interaction.guild, member, userData.tuViExp, { targetLevel: level + 1 });

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

    const event = pickCoDuyenEvent(userData);
    const effectKey = event.effectKey ?? event.key;
    userData.lastCoDuyenAt = now;

    let detail = event.description ?? '';
    let effect = '';
    let syncTuVi = false;
    let syncDisciple = false;
    const previousLuckBonus = userData.coDuyenLuckBonus ?? 0;

    if (previousLuckBonus > 0 && effectKey !== 'thien_co') {
      userData.coDuyenLuckBonus = 0;
    }

    if (effectKey === 'tang_kinh') {
      const gain = applyTuViMultiplier(userData, 80);
      const foundFragment = Math.random() < 0.35;

      userData.tuViExp += gain;
      detail = detail || 'Ngươi vô tình nghe được tiếng chuông cổ vọng ra từ Tàng Kinh Các. Một quyển tàn kinh tự bay đến trước mặt.';
      effect = `+${gain} tu vi exp.`;

      if (foundFragment) {
        userData.tanQuyenCount += 1;
        setTemporaryStatus(userData, 'Cơ Duyên Gia Thân', ONE_DAY_MS, { tuViMultiplierValue: 1.15 });
        effect += ' Lại nhận thêm một mảnh Tàn Quyển, tu vi nhận được trong ngày tăng x1.15.';
      }

      syncTuVi = true;
    }

    if (effectKey === 'cao_nhan') {
      addCongHien(userData, 30);
      detail = detail || 'Một vị lão giả không rõ lai lịch chỉ nhìn qua đạo tâm của ngươi rồi cười nhạt: “Sai ở chỗ tâm chưa tĩnh.”';
      effect = '+30 cống hiến.';

      if (isTemporaryStatusActive(userData, 'Tâm Ma Quấn Thân')) {
        userData.temporaryStatus = null;
        userData.temporaryStatusExpireAt = 0;
        userData.dotPhaPenaltyUntil = 0;
        effect += ' Tâm Ma Quấn Thân được hóa giải.';
      } else if (Date.now() < (userData.dotPhaPenaltyUntil ?? 0)) {
        userData.dotPhaPenaltyUntil = 0;
        effect += ' Tâm ma trong đạo tâm được giảm bớt.';
      }

      syncDisciple = true;
    }

    if (effectKey === 'tam_ma') {
      setTemporaryStatus(userData, 'Tâm Ma Quấn Thân', ONE_DAY_MS, { dotPhaPenalty: true });
      detail = detail || 'Trong lúc nhập định, ngươi thấy chính mình ở một tương lai thất bại, đạo tâm dao động.';
      effect = 'Tâm Ma Quấn Thân trong 24 giờ, giảm tỉ lệ đột phá.';
    }

    if (effectKey === 'tan_quyen') {
      userData.tanQuyenCount += 1;
      setTemporaryStatus(userData, 'Cơ Duyên Gia Thân', ONE_DAY_MS, { tuViMultiplierValue: 1.15 });
      detail = detail || 'Trong đống cổ thư mục nát, ngươi tìm được một mảnh công pháp thất truyền.';
      effect = 'Nhận Tàn Quyển, công pháp đang tu được cộng hưởng nhẹ. Tu vi nhận được trong ngày tăng x1.15.';
    }

    if (effectKey === 'linh_khi') {
      setTemporaryStatus(userData, 'Linh Khí Bạo Phát', ONE_DAY_MS, { tuViMultiplierValue: 2 });
      detail = detail || 'Linh khí trong động phủ đột nhiên cuộn trào, kinh mạch mở rộng, đạo cơ rung chuyển.';
      effect = 'Tu vi nhận được trong hôm nay tăng x2.';
    }

    if (effectKey === 'dao_tam') {
      setTemporaryStatus(userData, 'Đạo Tâm Kiên Định', ONE_DAY_MS, { dotPhaBonus: true });
      detail = detail || 'Sau một đêm tĩnh tọa, ngươi không còn bị tạp niệm quấy nhiễu.';
      effect = 'Tăng tỉ lệ đột phá lần sau.';
    }

    if (effectKey === 'nghich_luu') {
      detail = detail || 'Linh khí hấp thu quá nhanh khiến kinh mạch rối loạn.';
      effect = 'Không nhận thưởng, nhưng cooldown /coduyen vẫn được tính.';
    }

    if (effectKey === 'thien_co') {
      userData.coDuyenLuckBonus = Math.min(30, (userData.coDuyenLuckBonus ?? 0) + 10);
      detail = detail || 'Thiên đạo hôm nay không đáp lại lời cầu duyên của ngươi.';
      effect = `Không nhận thưởng. May mắn lần cầu duyên sau tăng nhẹ (+${userData.coDuyenLuckBonus}% cát duyên).`;
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
        { name: 'Nhóm', value: event.group, inline: true },
        { name: 'Đạo hữu', value: `${member}`, inline: true },
        { name: 'Hiệu ứng', value: effect || 'Không có.', inline: false },
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

    addCongHien(userData, congHienGain);
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



  // ===== Trảm Yêu Bảng / Nhiệm vụ có nút chọn =====
  function ensureMissionsFile() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(MISSIONS_FILE)) {
      const data = {
        date: null,
        openLimit: MISSION_DEFAULT_OPEN_LIMIT,
        missions: [],
      };
      fs.writeFileSync(MISSIONS_FILE, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    }
  }

  function loadMissionData() {
    ensureMissionsFile();

    try {
      const raw = fs.readFileSync(MISSIONS_FILE, 'utf8');
      const parsed = raw.trim() ? JSON.parse(raw) : {};

      return normalizeMissionData(parsed);
    } catch (error) {
      console.error('Khong the doc data/missions.json:', error);
      return normalizeMissionData({});
    }
  }

  function saveMissionData(data) {
    ensureMissionsFile();
    fs.writeFileSync(MISSIONS_FILE, `${JSON.stringify(normalizeMissionData(data), null, 2)}\n`, 'utf8');
  }

  function normalizeMissionData(data = {}) {
    const openLimit = Math.max(
      MISSION_MIN_OPEN_LIMIT,
      Math.min(MISSION_MAX_OPEN_LIMIT, Number(data.openLimit) || MISSION_DEFAULT_OPEN_LIMIT),
    );

    return {
      date: typeof data.date === 'string' ? data.date : null,
      openLimit,
      missions: Array.isArray(data.missions) ? data.missions.map(normalizeMission) : [],
    };
  }

  function normalizeMission(mission = {}) {
    return {
      id: String(mission.id || ''),
      templateKey: String(mission.templateKey || ''),
      type: mission.type === 'clean' ? 'clean' : 'hunt',
      name: String(mission.name || 'Vô danh nhiệm vụ'),
      aura: String(mission.aura || 'Khí tức mơ hồ'),
      requiredRealmIndex: Math.max(0, Math.min(TU_VI_REALMS.length - 1, Number(mission.requiredRealmIndex) || 0)),
      hiddenLevel: Math.max(0, Math.min(MAX_TU_VI_LEVEL, Number(mission.hiddenLevel) || 0)),
      rewardTotal: Math.max(0, Number(mission.rewardTotal) || 0),
      tuViRewardTotal: Math.max(0, Number(mission.tuViRewardTotal) || 0),
      status: [MISSION_STATUS_OPEN, MISSION_STATUS_REVEALED, MISSION_STATUS_COMPLETED].includes(mission.status)
        ? mission.status
        : MISSION_STATUS_OPEN,
      party: Array.isArray(mission.party) ? [...new Set(mission.party.map(String))].slice(0, MISSION_MAX_PARTY_SIZE) : [],
      leaderId: mission.leaderId ? String(mission.leaderId) : null,
      revealedAt: Number(mission.revealedAt) || 0,
      completedAt: Number(mission.completedAt) || 0,
      resultText: typeof mission.resultText === 'string' ? mission.resultText : null,
      enemyPower: Number(mission.enemyPower) || 0,
      partyPower: Number(mission.partyPower) || 0,
      winChance: Number(mission.winChance) || 0,
    };
  }

  function getMissionDataForToday() {
    const today = getTodayString();
    const data = loadMissionData();

    if (data.date !== today || !Array.isArray(data.missions) || data.missions.length === 0) {
      const refreshed = generateDailyMissions(data.openLimit, today);
      saveMissionData(refreshed);
      return refreshed;
    }

    return data;
  }

  function generateDailyMissions(openLimit = MISSION_DEFAULT_OPEN_LIMIT, date = getTodayString()) {
    const limit = Math.max(MISSION_MIN_OPEN_LIMIT, Math.min(MISSION_MAX_OPEN_LIMIT, Number(openLimit) || MISSION_DEFAULT_OPEN_LIMIT));
    const templates = [...MISSION_TEMPLATES].sort(() => Math.random() - 0.5).slice(0, limit);
    const missions = templates.map((template, index) => createMissionFromTemplate(template, index + 1, date));

    return {
      date,
      openLimit: limit,
      missions,
    };
  }

  function createMissionFromTemplate(template, order, date) {
    const requiredRealmIndex = Math.max(0, Math.min(TU_VI_REALMS.length - 1, Number(template.minRealmIndex) || 0));
    const minLevel = requiredRealmIndex * MINOR_REALMS.length;
    const hiddenLevel = Math.max(
      0,
      Math.min(MAX_TU_VI_LEVEL, minLevel + Math.floor(Math.random() * Math.min(6, MAX_TU_VI_LEVEL - minLevel + 1))),
    );
    const realmIndex = Math.floor(hiddenLevel / MINOR_REALMS.length);
    const rewardTable = template.type === 'clean' ? CLEAN_REWARD_TOTAL_BY_REALM : HUNT_REWARD_TOTAL_BY_REALM;

    return normalizeMission({
      id: `${date.replace(/-/g, '')}_${String(order).padStart(2, '0')}`,
      templateKey: template.key,
      type: template.type,
      name: template.name,
      aura: MISSION_AURAS[Math.floor(Math.random() * MISSION_AURAS.length)],
      requiredRealmIndex,
      hiddenLevel,
      rewardTotal: rewardTable[realmIndex] ?? rewardTable[rewardTable.length - 1],
      tuViRewardTotal: MISSION_TUVI_TOTAL_BY_REALM[realmIndex] ?? MISSION_TUVI_TOTAL_BY_REALM[MISSION_TUVI_TOTAL_BY_REALM.length - 1],
      status: MISSION_STATUS_OPEN,
      party: [],
      leaderId: null,
    });
  }

  function getMissionById(data, missionId) {
    return data.missions.find((mission) => mission.id === missionId) ?? null;
  }

  function getMissionIdFromCustomId(customId, prefix) {
    return customId.slice(prefix.length);
  }

  function getMissionTypeText(type) {
    return type === 'clean' ? 'Quét dọn bí cảnh' : 'Diệt quái';
  }

  function getMissionActionText(type) {
    return type === 'clean' ? 'Quét dọn' : 'Chiến đấu';
  }

  function getMissionEnemyText(type) {
    return type === 'clean' ? 'Uế khí / bí cảnh' : 'Yêu thú / tà ma';
  }

  function getMissionStatusText(mission) {
    if (mission.status === MISSION_STATUS_COMPLETED) {
      return 'Đã kết thúc';
    }

    if (mission.status === MISSION_STATUS_REVEALED) {
      return 'Đã chạm trán';
    }

    if (mission.party.length > 0) {
      return `Đang lập tiểu đội ${mission.party.length}/${MISSION_MAX_PARTY_SIZE}`;
    }

    return 'Chưa có tiểu đội';
  }

  function getMissionRealmTextFromLevel(level) {
    const info = getTuViByLevel(level);

    return `${info.realm} ${info.minor}`;
  }

  function getMissionRequiredText(mission) {
    return `${TU_VI_REALMS[mission.requiredRealmIndex] ?? 'Phàm Nhân'} trở lên`;
  }

  function getMissionPowerFromLevel(level) {
    const info = getTuViByLevel(level);
    const minorMultiplier = [1, 1.25, 1.5, 1.8][info.minorIndex] ?? 1;
    return Math.floor(100 * Math.pow(3, info.realmIndex) * minorMultiplier);
  }

  function getMissionMemberPower(userData) {
    const info = getTuViFromExp(Number(userData.tuViExp) || 0);
    return getMissionPowerFromLevel(info.level);
  }

  function getMissionEnemyPower(mission) {
    const basePower = getMissionPowerFromLevel(mission.hiddenLevel);
    return Math.floor(basePower * (mission.type === 'clean' ? 2.2 : 3));
  }

  function getMissionWinChance(ratio) {
    if (ratio >= 2) return 0.9;
    if (ratio >= 1.5) return 0.8;
    if (ratio >= 1) return 0.65;
    if (ratio >= 0.75) return 0.45;
    if (ratio >= 0.5) return 0.3;
    if (ratio >= 0.33) return 0.15;
    return 0.05;
  }

  function getMissionEscapeChance(ratio) {
    if (ratio >= 1.2) return 0.85;
    if (ratio >= 0.8) return 0.65;
    if (ratio >= 0.5) return 0.4;
    return 0.2;
  }

  function rollPercent(probability) {
    return Math.random() < Math.max(0, Math.min(1, probability));
  }

  function getMissionRestingText(userData) {
    const until = Number(userData.restingUntil) || 0;

    if (until <= Date.now()) {
      return 'Không';
    }

    return `${userData.restingReason || 'Tĩnh dưỡng'} - còn ${getRemainingTimeText(until - Date.now())}`;
  }

  function isMissionResting(userData) {
    return (Number(userData.restingUntil) || 0) > Date.now();
  }

  function normalizeMissionUserData(userData) {
    userData.lastMissionDate = typeof userData.lastMissionDate === 'string' ? userData.lastMissionDate : null;
    userData.restingUntil = Number(userData.restingUntil) || 0;
    userData.restingReason = typeof userData.restingReason === 'string' ? userData.restingReason : null;
    return userData;
  }

  function hasUsedMissionToday(userData) {
    normalizeMissionUserData(userData);
    return userData.lastMissionDate === getTodayString();
  }

  function findActiveMissionOfUser(data, userId) {
    return data.missions.find((mission) =>
      mission.status !== MISSION_STATUS_COMPLETED &&
      mission.party.includes(userId)
    ) ?? null;
  }

  function canJoinMission(mission, userData, data, userId) {
    normalizeMissionUserData(userData);

    if (mission.status !== MISSION_STATUS_OPEN) {
      return { ok: false, message: 'Nhiệm vụ này đã chạm trán hoặc đã kết thúc.' };
    }

    if (hasUsedMissionToday(userData)) {
      return { ok: false, message: 'Hôm nay đạo hữu đã tham gia một vụ, không thể nhận thêm.' };
    }

    if (isMissionResting(userData)) {
      return { ok: false, message: `Đạo hữu đang tĩnh dưỡng. Còn lại: ${getRemainingTimeText(userData.restingUntil - Date.now())}.` };
    }

    const activeMission = findActiveMissionOfUser(data, userId);

    if (activeMission && activeMission.id !== mission.id) {
      return { ok: false, message: `Đạo hữu đang ở tiểu đội nhiệm vụ **${activeMission.name}**.` };
    }

    const tuVi = getTuViFromExp(Number(userData.tuViExp) || 0);

    if (tuVi.realmIndex < mission.requiredRealmIndex) {
      return { ok: false, message: `Tu vi tối thiểu để nhận nhiệm vụ này là **${getMissionRequiredText(mission)}**.` };
    }

    if (mission.party.length >= MISSION_MAX_PARTY_SIZE && !mission.party.includes(userId)) {
      return { ok: false, message: 'Tiểu đội đã đủ người.' };
    }

    return { ok: true };
  }

  function buildMissionListEmbed(data) {
    const lines = data.missions.map((mission, index) => [
      `**${index + 1}. ${mission.name}**`,
      `Loại: ${getMissionTypeText(mission.type)}`,
      `Khí tức dò được: ${mission.aura}`,
      `Yêu cầu: ${getMissionRequiredText(mission)}`,
      `Tình trạng: ${getMissionStatusText(mission)}`,
    ].join('\n'));

    return new EmbedBuilder()
      .setColor(GOLD)
      .setTitle('Trảm Yêu Bảng Hôm Nay')
      .setDescription([
        `Ngày: **${data.date}**`,
        `Số nhiệm vụ mở: **${data.missions.length}/${data.openLimit}**`,
        'Mỗi đạo hữu chỉ được tham gia **1 vụ/ngày**.',
        'Tu vi thật của quái/uế khí sẽ bị che giấu đến khi tiểu đội xuất phát.',
        '',
        lines.join('\n\n') || 'Hôm nay chưa mở nhiệm vụ.',
      ].join('\n'))
      .setFooter({ text: 'Chọn nhiệm vụ bằng menu bên dưới để lập đội, tham gia hoặc xuất phát.' });
  }

  function buildMissionSelectRow(data) {
    const options = data.missions.slice(0, 25).map((mission, index) => ({
      label: `${index + 1}. ${mission.name}`.slice(0, 100),
      description: `${getMissionTypeText(mission.type)} • ${mission.aura}`.slice(0, 100),
      value: mission.id,
    }));

    return new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(MISSION_SELECT_CUSTOM_ID)
        .setPlaceholder('Chọn một nhiệm vụ hôm nay')
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions(options),
    );
  }

  function buildMissionListRows(data) {
    const rows = [];

    if (data.missions.length > 0) {
      rows.push(buildMissionSelectRow(data));
    }

    rows.push(
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(MISSION_REFRESH_BUTTON)
          .setLabel('Làm mới bảng')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId(MISSION_MY_STATUS_BUTTON)
          .setLabel('Trạng thái của ta')
          .setStyle(ButtonStyle.Primary),
      ),
    );

    return rows;
  }

  function buildMissionDetailEmbed(mission, users) {
    const isRevealed = mission.status !== MISSION_STATUS_OPEN;
    const partyLines = mission.party.length > 0
      ? mission.party.map((memberId, index) => {
        const userData = normalizeUserData(users[memberId] ?? createDefaultUserData());
        const tuVi = getTuViFromExp(Number(userData.tuViExp) || 0);
        const leaderMark = mission.leaderId === memberId ? 'Đội trưởng' : 'Thành viên';

        return `${index + 1}. <@${memberId}> — ${tuVi.realm} ${tuVi.minor} (${leaderMark})`;
      })
      : ['Chưa có ai trong tiểu đội.'];

    const fields = [
      { name: 'Loại', value: getMissionTypeText(mission.type), inline: true },
      { name: 'Khí tức dò được', value: mission.aura, inline: true },
      { name: 'Yêu cầu', value: getMissionRequiredText(mission), inline: true },
      { name: 'Tu vi thật', value: isRevealed ? getMissionRealmTextFromLevel(mission.hiddenLevel) : '???', inline: true },
      { name: 'Thưởng dự kiến', value: `${mission.rewardTotal} cống hiến tổng, chia 3 phần.\nMỗi thành viên nhận khoảng ${Math.floor(mission.rewardTotal / 3)} nếu thành công.`, inline: false },
      { name: 'Tiểu đội', value: partyLines.join('\n'), inline: false },
    ];

    if (mission.status === MISSION_STATUS_COMPLETED && mission.resultText) {
      fields.push({ name: 'Kết quả', value: mission.resultText.slice(0, 1024), inline: false });
    }

    if (mission.status === MISSION_STATUS_REVEALED) {
      fields.push(
        { name: 'Lực chiến tiểu đội', value: `${mission.partyPower || 'Chưa tính'}`, inline: true },
        { name: `Lực chiến ${getMissionEnemyText(mission.type)}`, value: `${mission.enemyPower || getMissionEnemyPower(mission)}`, inline: true },
        { name: 'Tỉ lệ thắng ước tính', value: mission.winChance ? `${Math.round(mission.winChance * 100)}%` : 'Chưa tính', inline: true },
      );
    }

    return new EmbedBuilder()
      .setColor(mission.type === 'clean' ? 0x4ade80 : 0xef4444)
      .setTitle(`${mission.type === 'clean' ? 'Dọn Bí Cảnh' : 'Trảm Yêu Lệnh'} — ${mission.name}`)
      .setDescription(
        mission.status === MISSION_STATUS_OPEN
          ? 'Tu vi thật đang bị che giấu. Hãy lập tiểu đội rồi xuất phát.'
          : mission.status === MISSION_STATUS_REVEALED
            ? `Đã chạm trán **${getMissionEnemyText(mission.type)}**. Đội trưởng chọn hành động tiếp theo.`
            : 'Nhiệm vụ đã kết thúc.',
      )
      .addFields(...fields)
      .setFooter({ text: 'Quái/uế khí được cân bằng mạnh xấp xỉ 3 tu sĩ cùng cảnh giới.' });
  }

  function buildMissionDetailRows(mission) {
    if (mission.status === MISSION_STATUS_COMPLETED) {
      return [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId(MISSION_REFRESH_BUTTON)
            .setLabel('Về Trảm Yêu Bảng')
            .setStyle(ButtonStyle.Secondary),
        ),
      ];
    }

    if (mission.status === MISSION_STATUS_REVEALED) {
      return [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId(`${MISSION_FIGHT_PREFIX}${mission.id}`)
            .setLabel(getMissionActionText(mission.type))
            .setStyle(mission.type === 'clean' ? ButtonStyle.Primary : ButtonStyle.Danger),
          new ButtonBuilder()
            .setCustomId(`${MISSION_ESCAPE_PREFIX}${mission.id}`)
            .setLabel('Chạy trốn')
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId(MISSION_REFRESH_BUTTON)
            .setLabel('Về bảng')
            .setStyle(ButtonStyle.Secondary),
        ),
      ];
    }

    return [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`${MISSION_CREATE_PARTY_PREFIX}${mission.id}`)
          .setLabel('Lập tiểu đội')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId(`${MISSION_JOIN_PARTY_PREFIX}${mission.id}`)
          .setLabel('Tham gia')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`${MISSION_LEAVE_PARTY_PREFIX}${mission.id}`)
          .setLabel('Rời đội')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId(`${MISSION_START_PREFIX}${mission.id}`)
          .setLabel('Xuất phát')
          .setStyle(ButtonStyle.Danger),
      ),
    ];
  }

  async function handleNhiemVu(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Trảm Yêu Bảng chỉ mở trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const data = getMissionDataForToday();
    await interaction.reply({
      embeds: [buildMissionListEmbed(data)],
      components: buildMissionListRows(data),
    });
  }

  async function handleSetupNhiemVu(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Lệnh này chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
      await interaction.reply({ content: 'Chỉ chưởng quản tông môn mới được chỉnh Trảm Yêu Bảng.', flags: MessageFlags.Ephemeral });
      return;
    }

    const amount = interaction.options.getInteger('soluong', true);
    const openLimit = Math.max(MISSION_MIN_OPEN_LIMIT, Math.min(MISSION_MAX_OPEN_LIMIT, amount));
    const data = generateDailyMissions(openLimit, getTodayString());
    saveMissionData(data);

    await interaction.reply({
      content: `Đã mở lại **${openLimit}** nhiệm vụ cho Trảm Yêu Bảng hôm nay.`,
      flags: MessageFlags.Ephemeral,
    });
  }

  async function handleMissionSelect(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const missionId = interaction.values[0];
    const data = getMissionDataForToday();
    const users = loadUsers();
    const mission = getMissionById(data, missionId);

    if (!mission) {
      await interaction.reply({ content: 'Không tìm thấy nhiệm vụ này.', flags: MessageFlags.Ephemeral });
      return;
    }

    await interaction.update({
      embeds: [buildMissionDetailEmbed(mission, users)],
      components: buildMissionDetailRows(mission),
    });
  }

  async function handleMissionRefresh(interaction) {
    const data = getMissionDataForToday();

    await interaction.update({
      embeds: [buildMissionListEmbed(data)],
      components: buildMissionListRows(data),
    });
  }

  async function handleMissionMyStatus(interaction) {
    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    normalizeMissionUserData(userData);
    const activeMission = findActiveMissionOfUser(getMissionDataForToday(), interaction.user.id);
    const tuVi = getTuViFromExp(Number(userData.tuViExp) || 0);

    await interaction.reply({
      content: [
        `Tu vi: **${tuVi.realm} ${tuVi.minor}**`,
        `Nhiệm vụ hôm nay: **${hasUsedMissionToday(userData) ? 'Đã dùng' : 'Chưa dùng'}**`,
        `Tĩnh dưỡng: **${getMissionRestingText(userData)}**`,
        `Tiểu đội hiện tại: **${activeMission ? activeMission.name : 'Không'}**`,
      ].join('\n'),
      flags: MessageFlags.Ephemeral,
    });
  }

  async function handleMissionCreateParty(interaction) {
    await mutateMissionParty(interaction, MISSION_CREATE_PARTY_PREFIX, 'create');
  }

  async function handleMissionJoinParty(interaction) {
    await mutateMissionParty(interaction, MISSION_JOIN_PARTY_PREFIX, 'join');
  }

  async function handleMissionLeaveParty(interaction) {
    await mutateMissionParty(interaction, MISSION_LEAVE_PARTY_PREFIX, 'leave');
  }

  async function mutateMissionParty(interaction, prefix, action) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const missionId = getMissionIdFromCustomId(interaction.customId, prefix);
    const data = getMissionDataForToday();
    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    normalizeMissionUserData(userData);
    const mission = getMissionById(data, missionId);

    if (!mission) {
      await interaction.reply({ content: 'Không tìm thấy nhiệm vụ này.', flags: MessageFlags.Ephemeral });
      return;
    }

    if (action === 'leave') {
      if (!mission.party.includes(interaction.user.id)) {
        await interaction.reply({ content: 'Đạo hữu chưa ở trong tiểu đội này.', flags: MessageFlags.Ephemeral });
        return;
      }

      mission.party = mission.party.filter((memberId) => memberId !== interaction.user.id);
      mission.leaderId = mission.party[0] ?? null;
      saveMissionData(data);
      await interaction.update({
        embeds: [buildMissionDetailEmbed(mission, users)],
        components: buildMissionDetailRows(mission),
      });
      return;
    }

    const canJoin = canJoinMission(mission, userData, data, interaction.user.id);

    if (!canJoin.ok) {
      await interaction.reply({ content: canJoin.message, flags: MessageFlags.Ephemeral });
      return;
    }

    if (action === 'create') {
      if (mission.party.length > 0 && mission.leaderId !== interaction.user.id) {
        await interaction.reply({ content: 'Nhiệm vụ này đã có tiểu đội. Hãy bấm **Tham gia**.', flags: MessageFlags.Ephemeral });
        return;
      }

      if (!mission.party.includes(interaction.user.id)) {
        mission.party.push(interaction.user.id);
      }

      mission.leaderId = interaction.user.id;
    }

    if (action === 'join') {
      if (!mission.party.includes(interaction.user.id)) {
        mission.party.push(interaction.user.id);
      }

      if (!mission.leaderId) {
        mission.leaderId = mission.party[0];
      }
    }

    saveMissionData(data);
    saveUsers(users);

    await interaction.update({
      embeds: [buildMissionDetailEmbed(mission, users)],
      components: buildMissionDetailRows(mission),
    });
  }

  async function handleMissionStart(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const missionId = getMissionIdFromCustomId(interaction.customId, MISSION_START_PREFIX);
    const data = getMissionDataForToday();
    const users = loadUsers();
    const mission = getMissionById(data, missionId);

    if (!mission) {
      await interaction.reply({ content: 'Không tìm thấy nhiệm vụ này.', flags: MessageFlags.Ephemeral });
      return;
    }

    if (mission.leaderId !== interaction.user.id) {
      await interaction.reply({ content: 'Chỉ đội trưởng mới được xuất phát.', flags: MessageFlags.Ephemeral });
      return;
    }

    if (mission.party.length === 0) {
      await interaction.reply({ content: 'Tiểu đội chưa có ai.', flags: MessageFlags.Ephemeral });
      return;
    }

    mission.status = MISSION_STATUS_REVEALED;
    mission.revealedAt = Date.now();
    mission.enemyPower = getMissionEnemyPower(mission);
    mission.partyPower = getMissionPartyPower(mission, users);
    mission.winChance = getMissionWinChance(mission.partyPower / Math.max(1, mission.enemyPower));

    saveMissionData(data);

    await interaction.update({
      embeds: [buildMissionDetailEmbed(mission, users)],
      components: buildMissionDetailRows(mission),
    });
  }

  function getMissionPartyPower(mission, users) {
    return mission.party.reduce((total, memberId) => {
      const userData = getOrCreateUser(users, memberId);
      return total + getMissionMemberPower(userData);
    }, 0);
  }

  async function handleMissionFight(interaction) {
    await resolveMission(interaction, MISSION_FIGHT_PREFIX, 'fight');
  }

  async function handleMissionEscape(interaction) {
    await resolveMission(interaction, MISSION_ESCAPE_PREFIX, 'escape');
  }

  async function resolveMission(interaction, prefix, action) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const missionId = getMissionIdFromCustomId(interaction.customId, prefix);
    const data = getMissionDataForToday();
    const users = loadUsers();
    const mission = getMissionById(data, missionId);

    if (!mission) {
      await interaction.reply({ content: 'Không tìm thấy nhiệm vụ này.', flags: MessageFlags.Ephemeral });
      return;
    }

    if (mission.status !== MISSION_STATUS_REVEALED) {
      await interaction.reply({ content: 'Nhiệm vụ này chưa chạm trán hoặc đã kết thúc.', flags: MessageFlags.Ephemeral });
      return;
    }

    if (mission.leaderId !== interaction.user.id) {
      await interaction.reply({ content: 'Chỉ đội trưởng mới được quyết định hành động.', flags: MessageFlags.Ephemeral });
      return;
    }

    if (mission.party.length === 0) {
      await interaction.reply({ content: 'Tiểu đội trống, không thể xử lý.', flags: MessageFlags.Ephemeral });
      return;
    }

    mission.enemyPower = mission.enemyPower || getMissionEnemyPower(mission);
    mission.partyPower = getMissionPartyPower(mission, users);
    const ratio = mission.partyPower / Math.max(1, mission.enemyPower);

    const result = action === 'escape'
      ? await resolveMissionEscape(interaction.guild, mission, users, ratio)
      : await resolveMissionFight(interaction.guild, mission, users, ratio);

    mission.status = MISSION_STATUS_COMPLETED;
    mission.completedAt = Date.now();
    mission.winChance = action === 'escape' ? getMissionEscapeChance(ratio) : getMissionWinChance(ratio);
    mission.resultText = result.summary;

    saveUsers(users);
    saveMissionData(data);

    await interaction.update({
      embeds: [buildMissionDetailEmbed(mission, users)],
      components: buildMissionDetailRows(mission),
    });
  }

  async function resolveMissionFight(guild, mission, users, ratio) {
    const chance = getMissionWinChance(ratio);
    const success = rollPercent(chance);
    const isCounterKill = success && ratio < 1;
    const rewardMultiplier = isCounterKill ? 1.2 : 1;
    const tuViMultiplier = isCounterKill ? 1.1 : 1;
    const rewardEach = Math.floor((mission.rewardTotal / MISSION_MAX_PARTY_SIZE) * rewardMultiplier);
    const tuViEach = Math.floor((mission.tuViRewardTotal / MISSION_MAX_PARTY_SIZE) * tuViMultiplier);
    const lines = [];

    if (success) {
      lines.push(isCounterKill ? '**Phản sát thành công!**' : '**Chinh phạt thành công!**');
      lines.push(`Tỉ lệ thắng: ${Math.round(chance * 100)}%`);
      lines.push(`Mỗi thành viên nhận: +${rewardEach} cống hiến, +${tuViEach} tu vi.`);

      for (const memberId of mission.party) {
        const userData = getOrCreateUser(users, memberId);
        normalizeMissionUserData(userData);
        addCongHien(userData, rewardEach);
        userData.tuViExp = Math.max(0, (Number(userData.tuViExp) || 0) + tuViEach);
        userData.lastMissionDate = getTodayString();
        await syncMissionMemberRoles(guild, memberId, userData);
      }

      return { summary: lines.join('\n') };
    }

    const injury = mission.type === 'clean'
      ? getMissionInjury(ratio, 0.03, 0.15, MISSION_REST_LIGHT_MS, MISSION_REST_HEAVY_MS)
      : getMissionInjury(ratio, 0.05, 0.25, MISSION_REST_LIGHT_MS, MISSION_REST_HEAVY_MS);

    lines.push('**Trọng thương!**');
    lines.push(`Tỉ lệ thắng: ${Math.round(chance * 100)}%`);
    lines.push(`Mỗi thành viên mất khoảng ${Math.round(injury.percent * 100)}% tu vi và phải tĩnh dưỡng ${getRemainingTimeText(injury.restMs)}.`);

    for (const memberId of mission.party) {
      const userData = getOrCreateUser(users, memberId);
      applyMissionInjury(userData, injury.percent, injury.restMs, mission.type === 'clean' ? 'Nhiễm uế khí' : 'Trọng thương');
      userData.lastMissionDate = getTodayString();
      await syncMissionMemberRoles(guild, memberId, userData);
    }

    return { summary: lines.join('\n') };
  }

  async function resolveMissionEscape(guild, mission, users, ratio) {
    const chance = getMissionEscapeChance(ratio);
    const escaped = rollPercent(chance);
    const lines = [];

    if (escaped) {
      lines.push('**Thoát khỏi bí cảnh.**');
      lines.push(`Tỉ lệ chạy thoát: ${Math.round(chance * 100)}%`);
      lines.push('Không nhận thưởng, không mất tu vi. Nhiệm vụ hôm nay đã được tính.');

      for (const memberId of mission.party) {
        const userData = getOrCreateUser(users, memberId);
        normalizeMissionUserData(userData);
        userData.lastMissionDate = getTodayString();
      }

      return { summary: lines.join('\n') };
    }

    const injury = mission.type === 'clean'
      ? getMissionInjury(ratio, 0.02, 0.1, 60 * 60 * 1000, 4 * 60 * 60 * 1000)
      : getMissionInjury(ratio, 0.05, 0.15, 2 * 60 * 60 * 1000, 8 * 60 * 60 * 1000);

    lines.push('**Chạy trốn thất bại.**');
    lines.push(`Tỉ lệ chạy thoát: ${Math.round(chance * 100)}%`);
    lines.push(`Bị phản kích, mất khoảng ${Math.round(injury.percent * 100)}% tu vi và tĩnh dưỡng ${getRemainingTimeText(injury.restMs)}.`);

    for (const memberId of mission.party) {
      const userData = getOrCreateUser(users, memberId);
      applyMissionInjury(userData, injury.percent, injury.restMs, mission.type === 'clean' ? 'Uế khí phản phệ' : 'Yêu thú phản kích');
      userData.lastMissionDate = getTodayString();
      await syncMissionMemberRoles(guild, memberId, userData);
    }

    return { summary: lines.join('\n') };
  }

  function getMissionInjury(ratio, minPercent, maxPercent, minRestMs, maxRestMs) {
    const danger = Math.max(0, Math.min(1, 1 - ratio));
    const randomFactor = 0.75 + Math.random() * 0.5;
    const percent = Math.max(minPercent, Math.min(maxPercent, (minPercent + (maxPercent - minPercent) * danger) * randomFactor));
    const restMs = Math.floor(minRestMs + (maxRestMs - minRestMs) * Math.max(0, Math.min(1, danger)));

    return { percent, restMs };
  }

  function applyMissionInjury(userData, percent, restMs, reason) {
    normalizeMissionUserData(userData);
    const currentExp = Math.max(0, Number(userData.tuViExp) || 0);
    const loss = Math.ceil(currentExp * percent);
    userData.tuViExp = Math.max(0, currentExp - loss);
    userData.restingUntil = Date.now() + restMs;
    userData.restingReason = reason;
  }

  async function syncMissionMemberRoles(guild, memberId, userData) {
    const member = await guild.members.fetch(memberId).catch(() => null);

    if (!member) {
      return;
    }

    await syncTuViRoles(guild, member, userData.tuViExp).catch(() => null);
    await syncDiscipleRole(guild, member, userData.congHienExp).catch(() => null);
  }


  async function handleTrangThai(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Trạng thái chỉ xem được trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    normalizeInventoryData(userData);
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const statusResult = await resolveTemporaryStatusEffects(interaction.guild, member, userData);

    if (!statusResult.ok) {
      await interaction.reply({ content: statusResult.message, flags: MessageFlags.Ephemeral });
      return;
    }

    saveUsers(users);

    const bag = getStorageBag(userData);
    const equippedArtifact = getEquippedArtifact(userData);
    normalizeMissionUserData(userData);
    const beQuanText = getBeQuanStatusText(userData);
    const statusText = formatTemporaryStatus(userData);
    const restingText = getMissionRestingText(userData);
    const missionUsedText = hasUsedMissionToday(userData) ? 'Đã dùng nhiệm vụ hôm nay' : 'Chưa dùng nhiệm vụ hôm nay';
    const inventoryText = `${getInventoryUsed(userData)}/${getStorageCapacity(userData)} ô`;

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle(`Trạng Thái - ${member.displayName}`)
      .addFields(
        { name: 'Trạng thái tạm thời', value: statusText === 'Không có' ? 'Đạo tâm bình ổn, chưa có trạng thái đặc biệt.' : statusText, inline: false },
        { name: 'Bế quan', value: beQuanText, inline: false },
        { name: 'Tĩnh dưỡng / nhiệm vụ', value: `${restingText}\n${missionUsedText}`, inline: false },
        { name: 'Túi trữ vật', value: `${bag.name} - ${inventoryText}`, inline: true },
        { name: 'Cống hiến khả dụng', value: `${getSpendableCongHien(userData)}`, inline: true },
        { name: 'Pháp bảo đang trang bị', value: equippedArtifact ? `${equippedArtifact.name}\n${equippedArtifact.effect}` : 'Chưa trang bị pháp bảo.', inline: false },
      )
      .setFooter({ text: 'Dùng /shop để đổi pháp bảo, đan dược và túi trữ vật.' });

    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  }

  async function handleBeQuan(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Bế quan chỉ có thể mở trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const option = interaction.options.getString('thoigian', true);
    const config = BE_QUAN_OPTIONS[option];

    if (!config) {
      await interaction.reply({ content: 'Thời gian bế quan không hợp lệ.', flags: MessageFlags.Ephemeral });
      return;
    }

    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    normalizeInventoryData(userData);

    if (isInBeQuan(userData)) {
      await interaction.reply({ content: `Đạo hữu đang bế quan. Còn lại: ${getRemainingTimeText((userData.beQuanUntil || userData.temporaryStatusExpireAt) - Date.now())}.`, flags: MessageFlags.Ephemeral });
      return;
    }

    const now = Date.now();
    userData.beQuanStartedAt = now;
    userData.beQuanUntil = now + config.durationMs;
    userData.beQuanReward = config.reward;
    userData.beQuanRewardExp = config.reward;
    userData.beQuanRewardClaimed = false;
    userData.temporaryStatus = 'Bế Quan';
    userData.temporaryStatusExpireAt = userData.beQuanUntil;

    saveUsers(users);

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle('Bế Quan Khai Mở')
      .setDescription(`${interaction.user} đã nhập động phủ bế quan trong **${config.label}**.`)
      .addFields(
        { name: 'Thưởng dự kiến', value: `+${config.reward} tu vi`, inline: true },
        { name: 'Kết thúc sau', value: getRemainingTimeText(config.durationMs), inline: true },
        { name: 'Lưu ý', value: 'Dùng `/xuatquan` khi đủ thời gian để nhận tu vi. Xuất quan sớm sẽ mất thưởng và có thể gặp Tâm Ma Dao Động.', inline: false },
      );

    await interaction.reply({ embeds: [embed] });
  }

  async function handleXuatQuan(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Xuất quan chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    await interaction.deferReply();

    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    normalizeInventoryData(userData);

    if (!isInBeQuan(userData)) {
      await interaction.editReply('Đạo hữu hiện không bế quan.');
      return;
    }

    const member = await interaction.guild.members.fetch(interaction.user.id);
    const now = Date.now();
    const enoughTime = now >= (userData.beQuanUntil || userData.temporaryStatusExpireAt || 0);
    let title = 'Xuất Quan';
    let description = '';
    let fields = [];

    if (enoughTime) {
      const baseReward = userData.beQuanReward || userData.beQuanRewardExp || 0;
      const rewardInfo = applyArtifactTuViBonus(userData, member, applyTuViMultiplier(userData, baseReward), 'general');
      userData.tuViExp += rewardInfo.amount;
      userData.beQuanRewardClaimed = true;
      clearBeQuanState(userData);

      const syncResult = await syncTuViRoles(interaction.guild, member, userData.tuViExp);

      if (!syncResult.ok) {
        await interaction.editReply(syncResult.message);
        return;
      }

      title = 'Xuất Quan Thành Công';
      description = `${member} kết thúc bế quan, đạo cơ ngưng thực hơn trước.`;
      fields = [
        { name: 'Tu vi nhận được', value: `+${rewardInfo.amount} tu vi`, inline: true },
        { name: 'Bonus', value: rewardInfo.summary, inline: false },
        { name: 'Tu vi hiện tại', value: `${syncResult.tuVi.realm} ${syncResult.tuVi.minor}`, inline: true },
      ];
    } else {
      const gotTamMa = Math.random() < 0.2;
      clearBeQuanState(userData);

      if (gotTamMa) {
        setTemporaryStatus(userData, 'Tâm Ma Quấn Thân', 6 * 60 * 60 * 1000, { dotPhaPenalty: true });
      }

      const statusSync = await syncTemporaryStatusRole(interaction.guild, member, userData);

      if (!statusSync.ok) {
        await interaction.editReply(statusSync.message);
        return;
      }

      title = 'Xuất Quan Sớm';
      description = `${member} rời động phủ khi bế quan chưa viên mãn.`;
      fields = [
        { name: 'Kết quả', value: gotTamMa ? 'Không nhận thưởng và bị Tâm Ma Quấn Thân 6 giờ.' : 'Không nhận thưởng.', inline: false },
      ];
    }

    saveUsers(users);

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle(title)
      .setDescription(description)
      .addFields(fields);

    await interaction.editReply({ embeds: [embed] });
  }

  async function handleShop(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Shop chỉ mở trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    normalizeInventoryData(userData);
    saveUsers(users);

    await interaction.reply({
      embeds: [buildShopEmbed(userData, 0)],
      components: buildShopPageRows(interaction.user.id, 0),
      flags: MessageFlags.Ephemeral,
    });
  }

  async function handleShopPage(interaction) {
    const [ownerId, pageText] = interaction.customId.slice(SHOP_PAGE_BUTTON_PREFIX.length).split(':');

    if (interaction.user.id !== ownerId) {
      await interaction.reply({ content: 'Trang shop này không phải của đạo hữu.', flags: MessageFlags.Ephemeral });
      return;
    }

    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    const page = Math.max(0, Math.min(getShopPages().length - 1, Number(pageText) || 0));

    normalizeInventoryData(userData);
    saveUsers(users);

    await interaction.update({
      embeds: [buildShopEmbed(userData, page)],
      components: buildShopPageRows(interaction.user.id, page),
    });
  }

  async function handleMua(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Chỉ có thể mua vật phẩm trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const key = interaction.options.getString('item', true);
    const item = getShopItemByKey(key);

    if (!item) {
      await interaction.editReply('Không tìm thấy vật phẩm trong shop.');
      return;
    }

    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    normalizeInventoryData(userData);
    const balance = getSpendableCongHien(userData);

    if (balance < item.price) {
      await interaction.editReply(`Không đủ cống hiến. Cần **${item.price}**, hiện có **${balance}**, còn thiếu **${item.price - balance}**.`);
      return;
    }

    if (item.type === 'bag') {
      const currentBag = getStorageBag(userData);

      if ((item.grade ?? 0) <= (currentBag.grade ?? 0)) {
        await interaction.editReply(`Đạo hữu đang dùng **${currentBag.name}**. Chỉ có thể mua túi phẩm cấp cao hơn.`);
        return;
      }

      userData.congHienBalance = balance - item.price;
      addItemToInventory(userData, item.key);
      userData.storageBag = item.key;
    } else {
      if (!hasInventorySpace(userData)) {
        await interaction.editReply(`Túi trữ vật đã đầy (**${getInventoryUsed(userData)}/${getStorageCapacity(userData)}**). Hãy đổi túi cao hơn hoặc tặng bớt vật phẩm.`);
        return;
      }

      if (item.type === 'artifact' && userData.inventory.includes(item.key)) {
        await interaction.editReply(`Đạo hữu đã sở hữu **${item.name}** rồi.`);
        return;
      }

      userData.congHienBalance = balance - item.price;
      addItemToInventory(userData, item.key);
    }

    saveUsers(users);

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle('Đổi Vật Phẩm Thành Công')
      .setDescription(`${interaction.user} đã đổi **${item.name}**.`)
      .addFields(
        { name: 'Loại', value: getItemTypeText(item.type), inline: true },
        { name: 'Giá', value: `${item.price} cống hiến`, inline: true },
        { name: 'Cống hiến còn lại', value: `${userData.congHienBalance}`, inline: true },
        { name: 'Hiệu ứng', value: item.effect, inline: false },
      );

    await interaction.editReply({ embeds: [embed] });
  }

  async function handleTuiDo(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Túi đồ chỉ xem được trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const targetUser = interaction.options?.getUser?.('thanhvien') ?? interaction.user;
    const users = loadUsers();
    const userData = getOrCreateUser(users, targetUser.id);
    normalizeInventoryData(userData);
    saveUsers(users);

    const member = await interaction.guild.members.fetch(targetUser.id);
    const bag = getStorageBag(userData);
    const equippedArtifact = getEquippedArtifact(userData);
    const lines = formatInventoryLines(userData);

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle(`Túi Đồ - ${member.displayName}`)
      .addFields(
        { name: 'Túi trữ vật', value: `${bag.name} (${getInventoryUsed(userData)}/${getStorageCapacity(userData)} ô)`, inline: false },
        { name: 'Pháp bảo trang bị', value: equippedArtifact ? `${equippedArtifact.name}\n${equippedArtifact.effect}` : 'Chưa trang bị.', inline: false },
        { name: 'Cống hiến khả dụng', value: `${getSpendableCongHien(userData)}`, inline: true },
        { name: 'Vật phẩm', value: lines.length > 0 ? lines.join('\n') : 'Túi trống.', inline: false },
      );

    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  }

  async function handleTrangBi(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Trang bị chỉ dùng trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const key = interaction.options.getString('item', true);
    const item = getShopItemByKey(key);

    if (!item || !['artifact', 'bag'].includes(item.type)) {
      await interaction.reply({ content: 'Chỉ có thể trang bị pháp bảo hoặc túi trữ vật.', flags: MessageFlags.Ephemeral });
      return;
    }

    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    normalizeInventoryData(userData);

    if (!userData.inventory.includes(item.key) && item.key !== DEFAULT_STORAGE_BAG) {
      await interaction.reply({ content: `Đạo hữu chưa sở hữu **${item.name}**.`, flags: MessageFlags.Ephemeral });
      return;
    }

    if (item.type === 'artifact') {
      userData.equippedArtifact = item.key;
      saveUsers(users);
      await interaction.reply({ content: `Đã trang bị pháp bảo **${item.name}**. Hiệu ứng: ${item.effect}`, flags: MessageFlags.Ephemeral });
      return;
    }

    const currentBag = getStorageBag(userData);

    if ((item.grade ?? 0) < (currentBag.grade ?? 0)) {
      await interaction.reply({ content: `Không thể đổi xuống túi phẩm cấp thấp hơn **${currentBag.name}**.`, flags: MessageFlags.Ephemeral });
      return;
    }

    if (getInventoryUsed(userData) > (item.capacity ?? 5)) {
      await interaction.reply({ content: `Túi **${item.name}** không đủ chứa vật phẩm hiện tại.`, flags: MessageFlags.Ephemeral });
      return;
    }

    userData.storageBag = item.key;
    saveUsers(users);

    await interaction.reply({ content: `Đã dùng **${item.name}** làm túi trữ vật chính. Sức chứa: ${item.capacity} vật phẩm.`, flags: MessageFlags.Ephemeral });
  }

  async function handleDungItem(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Chỉ có thể dùng vật phẩm trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const key = interaction.options.getString('item', true);
    const item = getShopItemByKey(key);

    if (!item || item.type !== 'pill') {
      await interaction.editReply('Chỉ có thể dùng đan dược.');
      return;
    }

    const users = loadUsers();
    const userData = getOrCreateUser(users, interaction.user.id);
    normalizeInventoryData(userData);

    if (!userData.inventory.includes(item.key)) {
      await interaction.editReply(`Đạo hữu chưa có **${item.name}** trong túi.`);
      return;
    }

    const member = await interaction.guild.members.fetch(interaction.user.id);
    let resultText = '';

    if (item.tuViGain) {
      const rewardInfo = applyArtifactTuViBonus(userData, member, applyTuViMultiplier(userData, item.tuViGain), 'general');
      userData.tuViExp += rewardInfo.amount;
      const syncResult = await syncTuViRoles(interaction.guild, member, userData.tuViExp);

      if (!syncResult.ok) {
        await interaction.editReply(syncResult.message);
        return;
      }

      resultText = `+${rewardInfo.amount} tu vi.\n${rewardInfo.summary}`;
    }

    if (item.congHienGain) {
      addCongHien(userData, item.congHienGain);
      const syncResult = await syncDiscipleRole(interaction.guild, member, userData.congHienExp);

      if (!syncResult.ok) {
        await interaction.editReply(syncResult.message);
        return;
      }

      resultText = `+${item.congHienGain} cống hiến.`;
    }

    if (item.clearTamMa) {
      if (String(userData.temporaryStatus || '').includes('Tâm Ma')) {
        userData.temporaryStatus = null;
        userData.temporaryStatusExpireAt = 0;
        userData.dotPhaPenaltyUntil = 0;
        resultText = 'Tâm Ma đã được hóa giải.';
      } else {
        resultText = 'Đạo tâm vốn bình ổn, đan dược hóa thành thanh khí.';
      }
    }

    removeItemFromInventory(userData, item.key);
    saveUsers(users);

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle('Dùng Đan Dược')
      .setDescription(`${member} đã dùng **${item.name}**.`)
      .addFields({ name: 'Hiệu quả', value: resultText || item.effect, inline: false });

    await interaction.editReply({ embeds: [embed] });
  }

  async function handleTangItem(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({ content: 'Chỉ có thể tặng vật phẩm trong tông môn.', flags: MessageFlags.Ephemeral });
      return;
    }

    const targetUser = interaction.options.getUser('thanhvien', true);
    const key = interaction.options.getString('item', true);
    const item = getShopItemByKey(key);

    if (!item) {
      await interaction.reply({ content: 'Không tìm thấy vật phẩm.', flags: MessageFlags.Ephemeral });
      return;
    }

    if (targetUser.bot || targetUser.id === interaction.user.id) {
      await interaction.reply({ content: 'Không thể tặng vật phẩm cho bot hoặc chính mình.', flags: MessageFlags.Ephemeral });
      return;
    }

    const users = loadUsers();
    const senderData = getOrCreateUser(users, interaction.user.id);
    const targetData = getOrCreateUser(users, targetUser.id);
    normalizeInventoryData(senderData);
    normalizeInventoryData(targetData);

    if (!senderData.inventory.includes(item.key)) {
      await interaction.reply({ content: `Đạo hữu không có **${item.name}** trong túi.`, flags: MessageFlags.Ephemeral });
      return;
    }

    if (senderData.equippedArtifact === item.key || senderData.storageBag === item.key) {
      await interaction.reply({ content: 'Không thể tặng vật phẩm đang trang bị hoặc túi trữ vật đang dùng.', flags: MessageFlags.Ephemeral });
      return;
    }

    if (!hasInventorySpace(targetData)) {
      await interaction.reply({ content: `${targetUser} đã đầy túi trữ vật.`, flags: MessageFlags.Ephemeral });
      return;
    }

    removeItemFromInventory(senderData, item.key);
    addItemToInventory(targetData, item.key);

    saveUsers(users);

    const embed = new EmbedBuilder()
      .setColor(GOLD)
      .setTitle('Trao Đổi Vật Phẩm')
      .setDescription(`${interaction.user} đã tặng **${item.name}** cho ${targetUser}.`)
      .addFields(
        { name: 'Loại', value: getItemTypeText(item.type), inline: true },
        { name: 'Hiệu ứng', value: item.effect, inline: false },
      );

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
    const oldCongHienExp = userData.congHienExp;
    userData.congHienExp = Math.max(userData.congHienExp, getDiscipleRankRequiredExp(targetRank));
    if (userData.congHienExp > oldCongHienExp) {
      userData.congHienBalance = Math.max(getSpendableCongHien(userData), userData.congHienExp);
    }
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

  function getLinhCanClassificationMultiplier(member) {
    const multiplierMap = {
      'Tạp Linh Căn': 1,
      'Tứ Linh Căn': 1.02,
      'Tam Linh Căn': 1.04,
      'Nhị Linh Căn': 1.06,
      'Nhất Linh Căn': 1.08,
    };
    const roleName = CLASSIFICATION_ROLES.find((name) => member.roles.cache.some((role) => role.name === name));

    return {
      value: roleName ? multiplierMap[roleName] : 1,
      text: roleName ?? 'Chưa khai mở linh căn',
    };
  }

  function getLinhCanQualityMultiplier(member) {
    const multiplierMap = {
      'Hạ Phẩm Linh Căn': 1,
      'Trung Phẩm Linh Căn': 1.03,
      'Thượng Phẩm Linh Căn': 1.06,
      'Cực Phẩm Linh Căn': 1.1,
      'Thiên Phẩm Linh Căn': 1.15,
    };
    const roleName = QUALITY_ROLES.find((name) => member.roles.cache.some((role) => role.name === name));

    return {
      value: roleName ? multiplierMap[roleName] : 1,
      text: roleName ?? 'Chưa xác định phẩm chất',
    };
  }

  function getCongPhapMultiplier(member) {
    const roleName = CONG_PHAP_ROLE_NAMES.find((name) => member.roles.cache.some((role) => role.name === name));

    return {
      value: roleName ? 1.05 : 1,
      text: roleName ?? 'Chưa chọn công pháp',
    };
  }


  function normalizeInventoryData(userData) {
    if (!Array.isArray(userData.inventory)) {
      userData.inventory = [];
    }

    if (!userData.storageBag || !getShopItemByKey(userData.storageBag) || getShopItemByKey(userData.storageBag)?.type !== 'bag') {
      userData.storageBag = DEFAULT_STORAGE_BAG;
    }

    if (userData.equippedArtifact && !userData.inventory.includes(userData.equippedArtifact)) {
      userData.equippedArtifact = null;
    }

    if (typeof userData.congHienBalance !== 'number') {
      userData.congHienBalance = Math.max(0, Number(userData.congHienExp) || 0);
    }

    userData.beQuanStartedAt = Number(userData.beQuanStartedAt) || 0;
    userData.beQuanUntil = Number(userData.beQuanUntil || userData.temporaryStatusExpireAt) || 0;
    userData.beQuanReward = Number(userData.beQuanReward || userData.beQuanRewardExp) || 0;
    normalizeMissionUserData(userData);

    return userData;
  }

  function getShopItemByKey(key) {
    return SHOP_ITEMS.find((item) => item.key === key) ?? null;
  }

  function getShopPages() {
    return [
      { type: 'artifact', title: 'Pháp Bảo', note: 'Trang bị để tăng hiệu quả tu luyện.' },
      { type: 'pill', title: 'Đan Dược', note: 'Dùng trực tiếp bằng /dung item.' },
      { type: 'bag', title: 'Túi Trữ Vật', note: 'Mở rộng sức chứa hành trang.' },
    ];
  }

  function buildShopEmbed(userData, pageIndex = 0) {
    const pages = getShopPages();
    const safePageIndex = Math.max(0, Math.min(pages.length - 1, pageIndex));
    const page = pages[safePageIndex];
    const lines = SHOP_ITEMS
      .filter((item) => item.type === page.type)
      .map((item) => `\`${item.key}\` - **${item.name}**\nGiá: ${item.price} cống hiến\n${item.effect}`);

    return new EmbedBuilder()
      .setColor(GOLD)
      .setTitle(`Shop Tông Môn - ${page.title}`)
      .setDescription([
        `Cống hiến khả dụng: **${getSpendableCongHien(userData)}**`,
        `Trang ${safePageIndex + 1}/${pages.length} - ${page.note}`,
        'Dùng `/mua item` để đổi vật phẩm.',
      ].join('\n'))
      .addFields({ name: page.title, value: lines.join('\n\n') || 'Trang này chưa có vật phẩm.', inline: false });
  }

  function buildShopPageRows(userId, pageIndex = 0) {
    const pages = getShopPages();
    const previousPage = pageIndex <= 0 ? pages.length - 1 : pageIndex - 1;
    const nextPage = pageIndex >= pages.length - 1 ? 0 : pageIndex + 1;

    return [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`${SHOP_PAGE_BUTTON_PREFIX}${userId}:${previousPage}`)
          .setLabel('Trang trước')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId(`${SHOP_PAGE_BUTTON_PREFIX}${userId}:${nextPage}`)
          .setLabel('Trang sau')
          .setStyle(ButtonStyle.Primary),
      ),
    ];
  }

  function getStorageBag(userData) {
    normalizeInventoryData(userData);
    return getShopItemByKey(userData.storageBag) ?? getShopItemByKey(DEFAULT_STORAGE_BAG);
  }

  function getStorageCapacity(userData) {
    return getStorageBag(userData)?.capacity ?? 5;
  }

  function getInventoryUsed(userData) {
    normalizeInventoryData(userData);
    return userData.inventory.length;
  }

  function hasInventorySpace(userData, slots = 1) {
    normalizeInventoryData(userData);
    return getInventoryUsed(userData) + slots <= getStorageCapacity(userData);
  }

  function addItemToInventory(userData, key) {
    normalizeInventoryData(userData);
    userData.inventory.push(key);
  }

  function removeItemFromInventory(userData, key) {
    normalizeInventoryData(userData);
    const index = userData.inventory.indexOf(key);

    if (index >= 0) {
      userData.inventory.splice(index, 1);
      return true;
    }

    return false;
  }

  function getItemTypeText(type) {
    return {
      artifact: 'Pháp bảo',
      pill: 'Đan dược',
      bag: 'Túi trữ vật',
    }[type] ?? 'Vật phẩm';
  }

  function getSpendableCongHien(userData) {
    normalizeInventoryData(userData);
    return Math.max(0, Number(userData.congHienBalance) || 0);
  }

  function addCongHien(userData, amount) {
    normalizeInventoryData(userData);
    const value = Number(amount) || 0;
    userData.congHienExp = Math.max(0, (Number(userData.congHienExp) || 0) + value);
    userData.congHienBalance = Math.max(0, (Number(userData.congHienBalance) || 0) + value);
  }

  function getEquippedArtifact(userData) {
    normalizeInventoryData(userData);
    const item = getShopItemByKey(userData.equippedArtifact);

    return item?.type === 'artifact' ? item : null;
  }

  function getEquippedArtifactMultiplier(userData, member, source = 'general', context = {}) {
    const artifact = getEquippedArtifact(userData);
    const parts = [];
    let value = 1;

    if (!artifact) {
      return { value, summary: 'Không có pháp bảo đang trang bị.' };
    }

    if (artifact.key === 'ban_phim_linh_khi') {
      value *= 1.03;
      parts.push('Bàn Phím Linh Khí +3% mọi nguồn tu vi');
    }

    if (source === 'github' && artifact.key === 'git_kiem') {
      value *= 1.05;
      parts.push('Git Kiếm +5% tu vi GitHub');
    }

    if (source === 'github' && artifact.key === 'chuot_tram_bug' && /fix|bug|hotfix/i.test(context.messageText ?? '')) {
      value *= 1.05;
      parts.push('Chuột Trảm Bug +5% vì đạo tích trảm bug');
    }

    if (artifact.key === 'sql_tran_ban' && getMemberCongPhapText(member).includes('database')) {
      value *= 1.05;
      parts.push('SQL Trận Bàn +5% do hợp database công pháp');
    }

    if (artifact.key === 'docker_ho_lo' && getMemberCongPhapText(member).includes('devops')) {
      value *= 1.05;
      parts.push('Docker Hồ Lô +5% do hợp devops công pháp');
    }

    return {
      value,
      summary: parts.length > 0 ? parts.join('\n') : `${artifact.name} đang trang bị, không có bonus cho nguồn này.`,
    };
  }

  function applyArtifactTuViBonus(userData, member, amount, source = 'general', context = {}) {
    const artifact = getEquippedArtifactMultiplier(userData, member, source, context);
    const finalAmount = Math.floor((Number(amount) || 0) * artifact.value);

    return {
      amount: finalAmount,
      summary: artifact.value > 1
        ? `${artifact.summary}\nHệ số pháp bảo: x${artifact.value.toFixed(2)}`
        : artifact.summary,
    };
  }

  function formatInventoryLines(userData) {
    normalizeInventoryData(userData);

    if (userData.inventory.length === 0) {
      return [];
    }

    const counts = userData.inventory.reduce((map, key) => {
      map[key] = (map[key] ?? 0) + 1;
      return map;
    }, {});

    return Object.entries(counts).map(([key, count]) => {
      const item = getShopItemByKey(key);
      const equippedMark = userData.equippedArtifact === key || userData.storageBag === key ? ' `[đang dùng]`' : '';

      return item
        ? `\`${key}\` - **${item.name}** x${count}${equippedMark}`
        : `\`${key}\` x${count}`;
    });
  }

  function isInBeQuan(userData) {
    normalizeInventoryData(userData);
    return userData.temporaryStatus === 'Bế Quan'
      && !userData.beQuanRewardClaimed
      && (userData.beQuanUntil > 0 || userData.temporaryStatusExpireAt > 0);
  }

  function clearBeQuanState(userData) {
    userData.beQuanStartedAt = 0;
    userData.beQuanUntil = 0;
    userData.beQuanReward = 0;
    userData.beQuanRewardExp = 0;
    userData.beQuanRewardClaimed = true;

    if (userData.temporaryStatus === 'Bế Quan') {
      userData.temporaryStatus = null;
      userData.temporaryStatusExpireAt = 0;
    }
  }

  function getBeQuanStatusText(userData) {
    if (!isInBeQuan(userData)) {
      return 'Không bế quan.';
    }

    const endAt = userData.beQuanUntil || userData.temporaryStatusExpireAt;
    const remaining = endAt - Date.now();

    if (remaining <= 0) {
      return `Bế quan đã viên mãn. Dùng \`/xuatquan\` để nhận +${userData.beQuanReward || userData.beQuanRewardExp || 0} tu vi.`;
    }

    return `Đang bế quan. Còn lại: ${getRemainingTimeText(remaining)}. Thưởng dự kiến: +${userData.beQuanReward || userData.beQuanRewardExp || 0} tu vi.`;
  }

  function getRemainingTimeText(ms) {
    const totalSeconds = Math.max(0, Math.ceil((Number(ms) || 0) / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours} giờ ${minutes} phút`;
    }

    if (minutes > 0) {
      return `${minutes} phút ${seconds} giây`;
    }

    return `${seconds} giây`;
  }

  function getTuViRewardMultiplier(userData, member, source = 'github', context = {}) {
    normalizeInventoryData(userData);
    const statusMultiplier = Date.now() < (userData?.tuViMultiplierUntil ?? 0)
      ? Math.max(1, userData.tuViMultiplierValue ?? 1)
      : 1;
    const congPhap = getCongPhapMultiplier(member);
    const classification = getLinhCanClassificationMultiplier(member);
    const quality = getLinhCanQualityMultiplier(member);
    const artifact = getEquippedArtifactMultiplier(userData, member, source, context);
    const value = statusMultiplier * congPhap.value * classification.value * quality.value * artifact.value;
    const parts = [
      `Cơ duyên/trạng thái x${statusMultiplier.toFixed(2)}`,
      `${congPhap.text} x${congPhap.value.toFixed(2)}`,
      `${classification.text} x${classification.value.toFixed(2)}`,
      `${quality.text} x${quality.value.toFixed(2)}`,
      `${artifact.summary} x${artifact.value.toFixed(2)}`,
    ];

    return {
      value,
      text: parts.join('\n'),
      summary: parts.join('\n'),
    };
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

      await syncTuViRoles(guild, member, userData.tuViExp, { targetLevel: event.targetLevel });
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
    normalizeInventoryData(userData);

    if (isInBeQuan(userData)) {
      return syncTemporaryStatusRole(guild, member, userData);
    }

    if (!isTemporaryStatusActive(userData) && userData.temporaryStatus) {
      userData.temporaryStatus = null;
      userData.temporaryStatusExpireAt = 0;
      userData.tuViMultiplierUntil = 0;
      userData.tuViMultiplierValue = 1;
    }

    return syncTemporaryStatusRole(guild, member, userData);
  }

  function pickCoDuyenEvent(userData) {
    const catDuyenEvents = [
      { key: 'tang_kinh_chuong_co', effectKey: 'tang_kinh', name: 'Tàng Kinh Các Khai Mở', group: 'Cát duyên', description: 'Tiếng chuông cổ vọng ra từ Tàng Kinh Các. Một quyển tàn kinh tự bay đến trước mặt.' },
      { key: 'tang_kinh_thu_lau', effectKey: 'tang_kinh', name: 'Thư Lâu Tự Khai', group: 'Cát duyên', description: 'Kệ sách phủ bụi bỗng hé mở, để lộ một đoạn tâm pháp bị thất truyền.' },
      { key: 'tang_kinh_ngoc_gian', effectKey: 'tang_kinh', name: 'Ngọc Giản Phát Quang', group: 'Cát duyên', description: 'Một mảnh ngọc giản nóng lên trong tay áo, linh văn trên đó tự hiện thành đạo ý.' },
      { key: 'tang_kinh_kinh_van', effectKey: 'tang_kinh', name: 'Kinh Văn Vọng Tâm', group: 'Cát duyên', description: 'Một câu kinh vô danh vang trong thức hải, giúp kinh mạch vận chuyển thông thuận hơn.' },
      { key: 'tang_kinh_bia_da', effectKey: 'tang_kinh', name: 'Bia Đá Lưu Ảnh', group: 'Cát duyên', description: 'Trên bia đá sau núi, vết kiếm cũ hóa thành hình ảnh tiền nhân diễn pháp.' },
      { key: 'tang_kinh_muc_truc', effectKey: 'tang_kinh', name: 'Mộc Trúc Tàng Pháp', group: 'Cát duyên', description: 'Một ống trúc mục nát rơi xuống, bên trong giấu vài dòng khẩu quyết cổ.' },
      { key: 'tang_kinh_dao_am', effectKey: 'tang_kinh', name: 'Đạo Âm Sót Lại', group: 'Cát duyên', description: 'Gió qua mái điện mang theo đạo âm mơ hồ, ngươi chợt hiểu thêm một tầng tu luyện.' },
      { key: 'cao_nhan_lao_gia', effectKey: 'cao_nhan', name: 'Cao Nhân Chỉ Điểm', group: 'Cát duyên', description: 'Một vị lão giả không rõ lai lịch nhìn qua đạo tâm rồi cười nhạt: “Sai ở chỗ tâm chưa tĩnh.”' },
      { key: 'cao_nhan_kiem_tu', effectKey: 'cao_nhan', name: 'Kiếm Tu Ghé Núi', group: 'Cát duyên', description: 'Một kiếm tu đi ngang cổng tông môn, chỉ một câu đã phá tan nghi hoặc trong lòng ngươi.' },
      { key: 'cao_nhan_dan_su', effectKey: 'cao_nhan', name: 'Đan Sư Đàm Đạo', group: 'Cát duyên', description: 'Đan sư trong nội viện giảng về hỏa hầu, ngươi nghe mà tâm cảnh sáng rõ.' },
      { key: 'cao_nhan_tran_su', effectKey: 'cao_nhan', name: 'Trận Sư Bày Lời', group: 'Cát duyên', description: 'Một trận sư già mượn bàn cờ nói đạo, từng nước đi đều như gỡ nút thắt trong lòng.' },
      { key: 'cao_nhan_an_si', effectKey: 'cao_nhan', name: 'Ẩn Sĩ Bên Suối', group: 'Cát duyên', description: 'Bên suối sau núi, một ẩn sĩ nhắc ngươi bớt nóng vội, đạo tâm nhờ đó yên lại.' },
      { key: 'cao_nhan_thu_tich', effectKey: 'cao_nhan', name: 'Thủ Tịch Khai Ngộ', group: 'Cát duyên', description: 'Một thủ tịch đệ tử để lại vài lời nhận xét, đúng vào chỗ tu luyện còn thiếu của ngươi.' },
      { key: 'cao_nhan_mong_chi', effectKey: 'cao_nhan', name: 'Mộng Trung Chỉ Pháp', group: 'Cát duyên', description: 'Trong mộng, một bóng người điểm nhẹ vào mi tâm, tạp niệm theo đó tiêu tan.' },
      { key: 'linh_khi_bao_phat', effectKey: 'linh_khi', name: 'Linh Khí Bạo Phát', group: 'Cát duyên', description: 'Linh khí trong động phủ cuộn trào, kinh mạch mở rộng, đạo cơ rung chuyển.' },
      { key: 'linh_khi_tuyen_nhan', effectKey: 'linh_khi', name: 'Linh Tuyền Nhận Chủ', group: 'Cát duyên', description: 'Một mạch linh tuyền nhỏ hiện dưới chân núi, hơi nước thấm vào kinh mạch.' },
      { key: 'linh_khi_tinh_vu', effectKey: 'linh_khi', name: 'Tinh Vũ Tẩy Thân', group: 'Cát duyên', description: 'Mưa sao rơi qua đêm, từng điểm sáng như rửa sạch bụi trần trên đạo thể.' },
      { key: 'linh_khi_dong_phu', effectKey: 'linh_khi', name: 'Động Phủ Khai Mạch', group: 'Cát duyên', description: 'Vách động phủ nứt ra một khe nhỏ, linh khí tinh thuần theo đó tràn vào.' },
      { key: 'linh_khi_nguyen_ha', effectKey: 'linh_khi', name: 'Nguyên Hà Dâng Sóng', group: 'Cát duyên', description: 'Dòng nguyên hà sau núi dâng sóng, hơi linh lực như thủy triều vỗ vào đạo cơ.' },
      { key: 'linh_khi_thanh_lien', effectKey: 'linh_khi', name: 'Thanh Liên Tụ Khí', group: 'Cát duyên', description: 'Một đóa thanh liên nở trong ao tĩnh, hương sen kéo linh khí tụ quanh thân.' },
      { key: 'linh_khi_tu_truc', effectKey: 'linh_khi', name: 'Tử Trúc Sinh Quang', group: 'Cát duyên', description: 'Rừng tử trúc phát sáng trong sương sớm, mỗi nhịp thở đều thấm linh khí.' },
      { key: 'dao_tam_tinh_toa', effectKey: 'dao_tam', name: 'Đạo Tâm Kiên Định', group: 'Cát duyên', description: 'Sau một đêm tĩnh tọa, ngươi không còn bị tạp niệm quấy nhiễu.' },
      { key: 'dao_tam_pha_vong', effectKey: 'dao_tam', name: 'Phá Vọng Minh Tâm', group: 'Cát duyên', description: 'Ngươi nhìn thẳng vào điều mình sợ hãi, vọng niệm tan ra như sương sớm.' },
      { key: 'dao_tam_kiem_tam', effectKey: 'dao_tam', name: 'Kiếm Tâm Bất Loạn', group: 'Cát duyên', description: 'Một tiếng kiếm reo trong tâm hồ, mọi dao động bỗng trở nên tĩnh lặng.' },
      { key: 'dao_tam_thien_dinh', effectKey: 'dao_tam', name: 'Thiền Định Vô Trần', group: 'Cát duyên', description: 'Hơi thở chìm vào tĩnh lặng, bụi niệm không còn bám được lên đạo tâm.' },
      { key: 'dao_tam_bach_nguyet', effectKey: 'dao_tam', name: 'Bạch Nguyệt Chiếu Tâm', group: 'Cát duyên', description: 'Ánh trăng phủ lên sân đá, tâm cảnh của ngươi trong vắt như nước.' },
      { key: 'dao_tam_co_tung', effectKey: 'dao_tam', name: 'Cổ Tùng Ngộ Đạo', group: 'Cát duyên', description: 'Dưới gốc cổ tùng, ngươi hiểu ra đạo không ở xa, chỉ ở một niệm bền bỉ.' },
      { key: 'dao_tam_tam_an', effectKey: 'dao_tam', name: 'Tâm An Như Sơn', group: 'Cát duyên', description: 'Sấm xa vang ngoài núi, còn đạo tâm ngươi vững như bàn thạch.' },
      { key: 'tan_quyen_co_thu', effectKey: 'tan_quyen', name: 'Nhặt Được Tàn Quyển', group: 'Cát duyên', description: 'Trong đống cổ thư mục nát, ngươi tìm được một mảnh công pháp thất truyền.' },
      { key: 'tan_quyen_lac_la', effectKey: 'tan_quyen', name: 'Lá Vàng Ghi Pháp', group: 'Cát duyên', description: 'Một chiếc lá vàng rơi xuống lòng bàn tay, gân lá lại là lộ tuyến vận công.' },
      { key: 'tan_quyen_hoang_truc', effectKey: 'tan_quyen', name: 'Hoàng Trúc Tàn Thiên', group: 'Cát duyên', description: 'Trong ống trúc vàng nứt vỡ, một đoạn pháp quyết còn sót lại chưa tan.' },
      { key: 'tan_quyen_bach_cot', effectKey: 'tan_quyen', name: 'Bạch Cốt Lưu Văn', group: 'Cát duyên', description: 'Trên xương trắng nơi cổ chiến trường, đạo văn mờ nhạt vẫn còn lưu lại.' },
      { key: 'tan_quyen_tieu_dao', effectKey: 'tan_quyen', name: 'Tiêu Dao Tàn Chương', group: 'Cát duyên', description: 'Một trang giấy rách bị gió cuốn tới, chữ viết phóng khoáng như muốn thoát khỏi thiên địa.' },
      { key: 'tan_quyen_thach_bich', effectKey: 'tan_quyen', name: 'Thạch Bích Tàng Chương', group: 'Cát duyên', description: 'Vách đá sau thác nước lộ ra nửa đoạn công pháp khi ánh nắng chiếu đúng giờ.' },
      { key: 'tan_quyen_huyen_an', effectKey: 'tan_quyen', name: 'Huyền Án Vỡ Khóa', group: 'Cát duyên', description: 'Một chiếc án gỗ cũ tự bật khóa, trong ngăn rỗng chỉ có một tàn chương mỏng.' },
    ];
    const hungDuyenEvents = [
      { key: 'tam_ma_that_bai', effectKey: 'tam_ma', name: 'Tâm Ma Quấy Nhiễu', group: 'Hung duyên', description: 'Trong lúc nhập định, ngươi thấy chính mình ở một tương lai thất bại, đạo tâm dao động.' },
      { key: 'tam_ma_huyen_anh', effectKey: 'tam_ma', name: 'Huyễn Ảnh Tự Thân', group: 'Hung duyên', description: 'Một bóng người giống hệt ngươi đứng trong thức hải, cười nhạo mọi lựa chọn đã qua.' },
      { key: 'tam_ma_vong_niem', effectKey: 'tam_ma', name: 'Vọng Niệm Trùng Sinh', group: 'Hung duyên', description: 'Những ý nghĩ tưởng đã buông xuống bỗng quay lại, quấn lấy đạo tâm như tơ độc.' },
      { key: 'tam_ma_ac_mong', effectKey: 'tam_ma', name: 'Ác Mộng Nhập Định', group: 'Hung duyên', description: 'Một giấc mộng dài khiến tâm thần hao tổn, khi tỉnh dậy linh lực vẫn còn rối loạn.' },
      { key: 'tam_ma_nghiep_am', effectKey: 'tam_ma', name: 'Nghiệp Âm Gõ Cửa', group: 'Hung duyên', description: 'Tiếng gõ cửa vang lên lúc nửa đêm, nhưng ngoài động phủ không có một bóng người.' },
      { key: 'nghich_luu_kinh_mach', effectKey: 'nghich_luu', name: 'Linh Khí Nghịch Lưu', group: 'Hung duyên', description: 'Linh khí hấp thu quá nhanh khiến kinh mạch rối loạn.' },
      { key: 'nghich_luu_hoa_doc', effectKey: 'nghich_luu', name: 'Hỏa Độc Rối Mạch', group: 'Hung duyên', description: 'Một tia hỏa khí lẫn trong linh lực khiến vận công phải dừng lại giữa chừng.' },
      { key: 'nghich_luu_am_han', effectKey: 'nghich_luu', name: 'Âm Hàn Phản Phệ', group: 'Hung duyên', description: 'Khí lạnh từ lòng đất tràn lên, linh lực trong đan điền khựng lại.' },
      { key: 'nghich_luu_tap_khi', effectKey: 'nghich_luu', name: 'Tạp Khí Xâm Thân', group: 'Hung duyên', description: 'Một luồng tạp khí lẫn vào hơi thở, khiến buổi tu luyện hôm nay phải bỏ dở.' },
      { key: 'nghich_luu_mach_tac', effectKey: 'nghich_luu', name: 'Mạch Tắc Nửa Chu Thiên', group: 'Hung duyên', description: 'Chu thiên vận hành đến nửa vòng thì nghẽn lại, may mà chưa tổn thương căn cơ.' },
      { key: 'thien_co_may_mu', effectKey: 'thien_co', name: 'Thiên Cơ Che Mờ', group: 'Hung duyên', description: 'Thiên đạo hôm nay không đáp lại lời cầu duyên của ngươi.' },
      { key: 'thien_co_quai_tuong', effectKey: 'thien_co', name: 'Quẻ Tượng Vô Văn', group: 'Hung duyên', description: 'Quẻ bói hiện ra trắng xóa, như có màn sương che kín mọi dấu hiệu.' },
      { key: 'thien_co_tinh_lac', effectKey: 'thien_co', name: 'Tinh Lạc Không Tiếng', group: 'Hung duyên', description: 'Một vì sao rơi qua trời đêm nhưng không để lại điềm báo nào rõ ràng.' },
      { key: 'thien_co_van_mai', effectKey: 'thien_co', name: 'Vân Mải Che Đạo', group: 'Hung duyên', description: 'Mây dày phủ kín đỉnh núi, đạo ý hôm nay lặng im như chưa từng tới.' },
    ];
    const catDuyenChance = Math.min(85, 60 + (userData.coDuyenLuckBonus ?? 0));
    const pool = Math.random() * 100 < catDuyenChance ? catDuyenEvents : hungDuyenEvents;

    return pool[Math.floor(Math.random() * pool.length)];
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

    normalized.githubDailyExp = Number(normalized.githubDailyExp) || 0;
    normalized.githubDailyRewardCount = Number(normalized.githubDailyRewardCount) || 0;

    if (!Array.isArray(normalized.inventory)) {
      normalized.inventory = [];
    }

    if (!normalized.storageBag || !getShopItemByKey(normalized.storageBag) || getShopItemByKey(normalized.storageBag)?.type !== 'bag') {
      normalized.storageBag = DEFAULT_STORAGE_BAG;
    }

    if (normalized.equippedArtifact && !normalized.inventory.includes(normalized.equippedArtifact)) {
      normalized.equippedArtifact = null;
    }

    if (typeof normalized.congHienBalance !== 'number') {
      normalized.congHienBalance = Math.max(0, Number(normalized.congHienExp) || 0);
    }

    normalized.lastMissionDate = typeof normalized.lastMissionDate === 'string' ? normalized.lastMissionDate : null;
    normalized.restingUntil = Number(normalized.restingUntil) || 0;
    normalized.restingReason = typeof normalized.restingReason === 'string' ? normalized.restingReason : null;

    normalized.beQuanUntil = Number(normalized.beQuanUntil || normalized.temporaryStatusExpireAt) || 0;
    normalized.beQuanReward = Number(normalized.beQuanReward || normalized.beQuanRewardExp) || 0;

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
      githubDailyRewardCount: 0,
      githubTotalExp: 0,
      githubStreak: 0,
      tuViExp: 0,
      congHienExp: 0,
      lastMessageCongHienAt: 0,
      dailyMessageCongHien: 0,
      dailyMessageDate: getTodayString(),
      lastCoDuyenAt: 0,
      coDuyenLuckBonus: 0,
      tanQuyenCount: 0,
      temporaryStatus: null,
      temporaryStatusExpireAt: 0,
      tuViMultiplierUntil: 0,
      tuViMultiplierValue: 1,
      dotPhaPenaltyUntil: 0,
      dotPhaBonusUntil: 0,
      dotPhaCooldownUntil: 0,
      beQuanStartedAt: 0,
      beQuanUntil: 0,
      beQuanReward: 0,
      beQuanRewardExp: 0,
      beQuanRewardClaimed: true,
      congHienBalance: null,
      inventory: [],
      storageBag: DEFAULT_STORAGE_BAG,
      equippedArtifact: null,
      lastMissionDate: null,
      restingUntil: 0,
      restingReason: null,
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
    const assignedLevel = getAssignedTuViLevel(member);

    if (assignedLevel !== null) {
      return assignedLevel;
    }

    return getLevelFromExp(fallbackExp);
  }

  function getAssignedTuViLevel(member) {
    const realmIndex = TU_VI_REALMS.findIndex((roleName) =>
      member.roles.cache.some((role) => role.name === roleName),
    );
    const minorIndex = MINOR_REALMS.findIndex((roleName) =>
      member.roles.cache.some((role) => role.name === roleName),
    );

    if (realmIndex >= 0 && minorIndex >= 0) {
      return realmIndex * MINOR_REALMS.length + minorIndex;
    }

    return null;
  }

  async function syncTuViRoles(guild, member, tuViExp, options = {}) {
    await guild.roles.fetch();

    const targetLevel = Number.isInteger(options.targetLevel)
      ? options.targetLevel
      : options.fromExp
        ? getLevelFromExp(tuViExp)
        : getAssignedTuViLevel(member) ?? 0;
    const tuVi = getTuViByLevel(targetLevel);
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
    return getGithubActivityToday(events).commitCount;
  }

  function getGithubActivityToday(events) {
  const today = getTodayString();
  const repos = new Set();
  const messages = [];
  const commitCount = events
    .filter((event) => event.type === 'PushEvent' && getTodayString(new Date(event.created_at)) === today)
    .reduce((total, event) => {
      if (event.repo?.name) {
        repos.add(event.repo.name);
      }

      if (Array.isArray(event.payload?.commits)) {
        messages.push(
          ...event.payload.commits
            .map((commit) => commit?.message)
            .filter(Boolean),
        );
      }

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

    return {
      commitCount,
      repoCount: repos.size,
      repos: [...repos],
      messageText: messages.join('\n'),
    };
  }

  function getNextGithubStreak(userData, today) {
    if (userData.lastGithubRewardDate === today) {
      return userData.githubStreak || 1;
    }

    const yesterday = getTodayString(new Date(Date.now() - ONE_DAY_MS));

    if (userData.lastGithubRewardDate === yesterday) {
      return (userData.githubStreak || 0) + 1;
    }

    return 1;
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

    if (isInBeQuan(userData)) {
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

    addCongHien(userData, 1);
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
