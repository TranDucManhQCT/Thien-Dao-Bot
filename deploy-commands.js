require('dotenv').config();

const Discord = require('discord.js');

let REST = Discord.REST;
let Routes = Discord.Routes;
let SlashCommandBuilder = Discord.SlashCommandBuilder;
let PermissionFlagsBits = Discord.PermissionFlagsBits;

// Compatible loader for hosts that still have discord.js v13 in node_modules.
// On v14 these are exported directly from discord.js. On v13 they live in subpackages.
try {
  if (!SlashCommandBuilder) {
    SlashCommandBuilder = require('@discordjs/builders').SlashCommandBuilder;
  }
} catch (error) {
  // Keep the explicit check below for a clearer error message.
}

try {
  if (!REST) {
    REST = require('@discordjs/rest').REST;
  }
} catch (error) {
  // Keep the explicit check below for a clearer error message.
}

try {
  if (!Routes) {
    try {
      Routes = require('discord-api-types/v10').Routes;
    } catch (error) {
      Routes = require('discord-api-types/v9').Routes;
    }
  }
} catch (error) {
  // Keep the explicit check below for a clearer error message.
}

const ADMIN_PERMISSION =
  PermissionFlagsBits?.Administrator ??
  Discord.PermissionsBitField?.Flags?.Administrator ??
  Discord.Permissions?.FLAGS?.ADMINISTRATOR ??
  '8';

if (typeof SlashCommandBuilder !== 'function') {
  console.error('SlashCommandBuilder khong kha dung. Hay xoa node_modules + package-lock.json roi npm install lai discord.js v14.');
  process.exit(1);
}

if (typeof REST !== 'function' || !Routes) {
  console.error('REST/Routes khong kha dung. Hay xoa node_modules + package-lock.json roi npm install lai.');
  process.exit(1);
}

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;


const professionChoices = [
  { name: 'Debug Đạo Sư', value: 'debug_dao_su' },
  { name: 'Core Forge Sư', value: 'core_forge_su' },
  { name: 'Runtime Trận Sư', value: 'runtime_tran_su' },
  { name: 'Patch Lệnh Sư', value: 'patch_lenh_su' },
  { name: 'Data Mạch Sư', value: 'data_mach_su' },
  { name: 'Cloud Pháp Sư', value: 'cloud_phap_su' },
  { name: 'Security Hộ Đạo Sư', value: 'security_ho_dao_su' },
  { name: 'AI Diễn Toán Sư', value: 'ai_dien_toan_su' },
  { name: 'Frontend Huyễn Diện Sư', value: 'frontend_huyen_dien_su' },
  { name: 'Git Mệnh Sư', value: 'git_menh_su' },
];

const missionTierChoices = [
  { name: 'Nhiệm vụ Tạp Dịch', value: 'tap_dich' },
  { name: 'Nhiệm vụ Ngoại Môn', value: 'ngoai_mon' },
  { name: 'Nhiệm vụ Nội Môn', value: 'noi_mon' },
  { name: 'Nhiệm vụ Trưởng Lão', value: 'truong_lao' },
];

const itemCombatChoices = [
  { name: 'Tất cả', value: 'tatca' },
  { name: 'Sát thương / chí mạng', value: 'sat_thuong' },
  { name: 'Phòng thủ', value: 'phong_thu' },
  { name: 'Hồi phục / hồi khí', value: 'hoi_phuc' },
  { name: 'Khống chế', value: 'khong_che' },
  { name: 'Khắc Bug / giải lỗi', value: 'khac_bug' },
  { name: 'Đi party / boss dài', value: 'party' },
  { name: 'Đánh boss', value: 'boss' },
];


if (!DISCORD_TOKEN || !CLIENT_ID) {
  console.error('Thieu DISCORD_TOKEN hoac CLIENT_ID trong .env');
  process.exit(1);
}

const commands = [
  new SlashCommandBuilder()
    .setName('setup-linhcan')
    .setDescription('Dựng Thiên Môn Nhập Đạo cho tông môn.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(ADMIN_PERMISSION),
  new SlashCommandBuilder()
    .setName('setupnhapmon')
    .setDescription('Dựng Thiên Môn Nhập Đạo cho người mới vào tông môn.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(ADMIN_PERMISSION),
  new SlashCommandBuilder()
    .setName('linhcan')
    .setDescription('Dò Linh Mạch / Căn Cơ trong Động Phủ Nhập Môn.')
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
    .setDescription('Xem hồ sơ tu luyện của bản thân hoặc một đạo hữu.')
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName('thanhvien')
        .setDescription('Đạo hữu muốn xem hồ sơ.')
        .setRequired(false),
    ),
  new SlashCommandBuilder()
    .setName('homnay')
    .setDescription('Daily Hub: xem hôm nay nên làm gì, lượt còn lại và gợi ý nhanh.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('goiy')
    .setDescription('Gợi ý build, nhiệm vụ, shop và hướng nâng nhân vật.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('setup-congphap')
    .setDescription('Dựng bia chọn Công Pháp Tu Luyện cho tông môn.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(ADMIN_PERMISSION),
  new SlashCommandBuilder()
    .setName('skill')
    .setDescription('Xem bộ skill turn-based của công pháp đang tu.')
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName('thanhvien')
        .setDescription('Đạo hữu muốn xem skill.')
        .setRequired(false),
    ),
  new SlashCommandBuilder()
    .setName('capcongphap')
    .setDescription('Xem cấp bậc công pháp, thuần thục, tâm đắc và lộ trình mở skill.')
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName('thanhvien')
        .setDescription('Đạo hữu muốn xem cấp bậc công pháp.')
        .setRequired(false),
    ),
  new SlashCommandBuilder()
    .setName('congphap')
    .setDescription('Xem công pháp, cấp bậc, thuần thục hoặc thử ngộ pháp để mở skill.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('hanhdong')
        .setDescription('Hành động với công pháp.')
        .setRequired(false)
        .addChoices(
          { name: 'Xem công pháp', value: 'xem' },
          { name: 'Ngộ pháp / đột phá công pháp', value: 'ngophap' },
        ),
    ),
  new SlashCommandBuilder()
    .setName('linkgithub')
    .setDescription('Liên kết GitHub để nhận tu vi từ commit.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('username')
        .setDescription('GitHub username của đạo hữu.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('verifygithub')
    .setDescription('Xác minh GitHub bằng mã trong bio.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('github')
    .setDescription('Xem trạng thái liên kết GitHub.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('checkcommit')
    .setDescription('Commit Hóa Đạo: luyện hóa public commit GitHub thành tu vi.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('conghien')
    .setDescription('Xem điểm cống hiến và cấp đệ tử.')
    .setDMPermission(false),

  new SlashCommandBuilder()
    .setName('nghenghiep')
    .setDescription('Đạo Nghiệp code-tu tiên: chọn nghề, làm nghề, chế tạo và xem kho nghề.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('hanhdong')
        .setDescription('Hành động nghề nghiệp.')
        .setRequired(false)
        .addChoices(
          { name: 'Xem Đạo Nghiệp', value: 'xem' },
          { name: 'Chọn nghề', value: 'chon' },
          { name: 'Làm việc nghề hôm nay', value: 'lamviec' },
          { name: 'Chế tạo vật phẩm nghề', value: 'chetao' },
          { name: 'Xem công thức nghề', value: 'congthuc' },
          { name: 'Xem nguyên liệu craft', value: 'nguyenlieu' },
          { name: 'Xem kho đạo tài', value: 'kho' },
        ),
    )
    .addStringOption((option) =>
      option
        .setName('nghe')
        .setDescription('Nghề muốn chọn.')
        .setRequired(false)
        .addChoices(...professionChoices),
    ),

  new SlashCommandBuilder()
    .setName('congthuc')
    .setDescription('Xem công thức đã mở khóa của Đạo Nghiệp hiện tại, 3 món mỗi trang.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('tukhoa')
        .setDescription('Tìm trong công thức đã mở khóa của nghề hiện tại.')
        .setRequired(false),
    )
    .addIntegerOption((option) =>
      option
        .setName('trang')
        .setDescription('Trang công thức muốn xem, tối đa 3 công thức/trang.')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(480),
    ),

  new SlashCommandBuilder()
    .setName('chetao')
    .setDescription('Chế vật phẩm từ công thức đã mở khóa của nghề hiện tại.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('congthuc')
        .setDescription('Mã công thức đã mở khóa, lấy bằng /congthuc. Bỏ trống để xem danh sách.')
        .setRequired(false),
    ),

  new SlashCommandBuilder()
    .setName('nguyenlieu')
    .setDescription('Xem kho nguyên liệu chế tạo và bản vẽ đã ngộ.')
    .setDMPermission(false),

  new SlashCommandBuilder()
    .setName('phangiai')
    .setDescription('Phân giải vật phẩm để nhận nguyên liệu craft.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('item')
        .setDescription('Mã vật phẩm muốn phân giải.')
        .setRequired(true),
    ),

  new SlashCommandBuilder()
    .setName('hoccongthuc')
    .setDescription('Học/ngộ bản vẽ công thức chế tạo cao cấp.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('congthuc')
        .setDescription('Mã công thức muốn học, lấy bằng /congthuc.')
        .setRequired(true),
    ),

  new SlashCommandBuilder()
    .setName('chuyentinh')
    .setDescription('Chọn hướng chuyên tinh chế tạo của Đạo Nghiệp.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('huong')
        .setDescription('Hướng chuyên tinh.')
        .setRequired(true)
        .addChoices(
          { name: 'Ổn Định Đạo Lô', value: 'on_dinh' },
          { name: 'Thần Tốc Rèn Pháp', value: 'than_toc' },
          { name: 'Hoàn Mỹ Khắc Ấn', value: 'hoan_my' },
          { name: 'Tiết Kiệm Linh Tài', value: 'tiet_kiem' },
          { name: 'Dị Biến Cấm Lô', value: 'di_bien' },
        ),
    ),

  new SlashCommandBuilder()
    .setName('vatpham')
    .setDescription('Vạn Vật Đạo Khố: xem vật phẩm Source hợp lệ, nghề phù hợp và vai trò combat.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('hanhdong')
        .setDescription('Cách xem vật phẩm.')
        .setRequired(false)
        .addChoices(
          { name: 'Tổng quan', value: 'tongquan' },
          { name: 'Theo nghề', value: 'theonghe' },
          { name: 'Theo combat', value: 'theocombat' },
          { name: 'Tìm vật phẩm', value: 'tim' },
        ),
    )
    .addStringOption((option) =>
      option
        .setName('nghe')
        .setDescription('Lọc theo Đạo Nghiệp.')
        .setRequired(false)
        .addChoices(...professionChoices),
    )
    .addStringOption((option) =>
      option
        .setName('combat')
        .setDescription('Lọc theo vai trò combat.')
        .setRequired(false)
        .addChoices(...itemCombatChoices),
    )
    .addStringOption((option) =>
      option
        .setName('tukhoa')
        .setDescription('Tìm theo tên, hệ, công dụng.')
        .setRequired(false),
    ),
  new SlashCommandBuilder()
    .setName('diemdanh')
    .setDescription('Điểm danh mỗi ngày để nhận tu vi, cống hiến và giữ streak.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('nangthanphan')
    .setDescription('Tiêu cống hiến để nâng thân phận đệ tử.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('thientuong')
    .setDescription('Xem thiên tượng hôm nay của tông môn.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('xemmenh')
    .setDescription('Soi Mệnh Cách. Có thể bỏ ngày sinh nếu đã dùng /linhcan trước đó.')
    .setDMPermission(false)
    .addIntegerOption((option) =>
      option
        .setName('ngay')
        .setDescription('Ngày sinh. Bỏ trống nếu đã xem mệnh trước đó.')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(31),
    )
    .addIntegerOption((option) =>
      option
        .setName('thang')
        .setDescription('Tháng sinh. Bỏ trống nếu đã xem mệnh trước đó.')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(12),
    )
    .addIntegerOption((option) =>
      option
        .setName('nam')
        .setDescription('Năm sinh. Bỏ trống nếu đã xem mệnh trước đó.')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(9999),
    ),
  new SlashCommandBuilder()
    .setName('dohuyenmach')
    .setDescription('Dò Huyền Mạch / Đạo Thể. Có thể bỏ ngày sinh nếu đã dùng /linhcan trước đó.')
    .setDMPermission(false)
    .addIntegerOption((option) =>
      option
        .setName('ngay')
        .setDescription('Ngày sinh. Bỏ trống nếu đã dò huyền mạch trước đó.')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(31),
    )
    .addIntegerOption((option) =>
      option
        .setName('thang')
        .setDescription('Tháng sinh. Bỏ trống nếu đã dò huyền mạch trước đó.')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(12),
    )
    .addIntegerOption((option) =>
      option
        .setName('nam')
        .setDescription('Năm sinh. Bỏ trống nếu đã dò huyền mạch trước đó.')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(9999),
    ),
  new SlashCommandBuilder()
    .setName('tuvi')
    .setDescription('Xem cảnh giới và tu vi exp từ GitHub.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('dotpha')
    .setDescription('Đột phá tiểu cảnh hoặc mở Thiên Lôi Độ Kiếp khi vượt đại cảnh.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('thienkiep')
    .setDescription('Xem các đạo hữu đang Thiên Lôi Độ Kiếp.')
    .setDMPermission(false),

  new SlashCommandBuilder()
    .setName('kyngo')
    .setDescription('Cầu một lần Kỳ Ngộ code-tu: nhận buff/debuff phần trăm có thời hạn.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('tamma')
    .setDescription('Xem hoặc hóa giải Tâm Ma hiện tại.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('hanhdong')
        .setDescription('Hành động với Tâm Ma.')
        .setRequired(false)
        .addChoices(
          { name: 'Xem trạng thái', value: 'xem' },
          { name: 'Tịnh tâm bằng Tịnh Tâm Đan', value: 'tinhtam' },
        ),
    ),
  new SlashCommandBuilder()
    .setName('tulinh')
    .setDescription('Xem, tụ luyện hoặc nâng cấp Tụ Linh Trận cá nhân.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('hanhdong')
        .setDescription('Hành động với Tụ Linh Trận.')
        .setRequired(false)
        .addChoices(
          { name: 'Xem Tụ Linh Trận', value: 'xem' },
          { name: 'Tụ luyện nhận tu vi', value: 'tuluyen' },
          { name: 'Nâng cấp Tụ Linh Trận', value: 'nangcap' },
        ),
    ),
  new SlashCommandBuilder()
    .setName('sukien')
    .setDescription('Mở hoặc xem sự kiện tông môn đang diễn ra.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('dauphap')
    .setDescription('Đấu pháp với một đạo hữu khác.')
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName('thanhvien')
        .setDescription('Đạo hữu muốn đấu pháp.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('luandao')
    .setDescription('Mở một đàn luận đạo code.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('cauhoi')
        .setDescription('Câu hỏi luận đạo code.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('giaidap')
    .setDescription('Gửi lời giải đáp cho một đàn luận đạo.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('id')
        .setDescription('ID luận đạo.')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('noidung')
        .setDescription('Nội dung giải đáp.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('chamdiem')
    .setDescription('Chấm điểm câu trả lời luận đạo.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('id')
        .setDescription('ID luận đạo.')
        .setRequired(true),
    )
    .addUserOption((option) =>
      option
        .setName('thanhvien')
        .setDescription('Người trả lời được chấm.')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('ketqua')
        .setDescription('Kết quả chấm.')
        .setRequired(true)
        .addChoices(
          { name: 'Hữu ích', value: 'huu_ich' },
          { name: 'Code tốt', value: 'code_tot' },
        ),
    ),
  new SlashCommandBuilder()
    .setName('truyenthua')
    .setDescription('Nhận một đệ tử vào truyền thừa.')
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName('de_tu')
        .setDescription('Đệ tử được nhận truyền thừa.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('bangxephang')
    .setDescription('Xem bảng xếp hạng tông môn.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('loai')
        .setDescription('Loại bảng xếp hạng.')
        .setRequired(true)
        .addChoices(
          { name: 'Tu vi', value: 'tuvi' },
          { name: 'Cống hiến', value: 'conghien' },
          { name: 'GitHub', value: 'github' },
          { name: 'Streak', value: 'streak' },
        ),
    ),

  new SlashCommandBuilder()
    .setName('trangthai')
    .setDescription('Xem trạng thái, bế quan, túi trữ vật và pháp bảo hiện tại.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('bequan')
    .setDescription('Bế quan tu luyện; trong lúc bế quan chỉ được xem chỉ số và xuất quan.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('thoigian')
        .setDescription('Thời gian bế quan.')
        .setRequired(true)
        .addChoices(
          { name: '1 giờ', value: '1h' },
          { name: '2 giờ', value: '2h' },
          { name: '4 giờ', value: '4h' },
          { name: '8 giờ', value: '8h' },
        ),
    ),
  new SlashCommandBuilder()
    .setName('xuatquan')
    .setDescription('Xuất quan, kết thúc bế quan và nhận kết quả tu luyện.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Xem Bảo Khố Đạo Cụ Source theo thân phận và shop ngày.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('mua')
    .setDescription('Dùng cống hiến để đổi vật phẩm đang hiển thị trong Bảo Khố Đạo Cụ Source.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('item')
        .setDescription('Mã vật phẩm muốn đổi. Xem mã hiện tại bằng /shop.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('banphapbao')
    .setDescription('Hiến pháp bảo không dùng cho tông môn để nhận lại 70% giá trị cống hiến.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('item')
        .setDescription('Mã pháp bảo muốn hiến. Xem mã bằng /tuido.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('tuido')
    .setDescription('Xem túi trữ vật và vật phẩm đang sở hữu.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('trangbi')
    .setDescription('Trang bị vũ khí, giáp, pháp cụ, module hoặc phù đã sở hữu.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('item')
        .setDescription('Mã vật phẩm muốn trang bị. Xem mã bằng /tuido.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('thaotrangbi')
    .setDescription('Tháo một slot trang bị hoặc tháo toàn bộ trang bị đang dùng.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('slot')
        .setDescription('Slot muốn tháo.')
        .setRequired(true)
        .addChoices(
          { name: 'Vũ khí chính', value: 'weapon' },
          { name: 'Pháp bảo lõi', value: 'artifact' },
          { name: 'Giáp/Đạo bào', value: 'armor' },
          { name: 'Pháp cụ nghề', value: 'tool' },
          { name: 'Phù hộ thân', value: 'talisman' },
          { name: 'Tháo toàn bộ', value: 'all' },
        ),
    ),
  new SlashCommandBuilder()
    .setName('dung')
    .setDescription('Dùng Source Đan/Dịch hoặc vật phẩm tiêu hao trong túi trữ vật.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('item')
        .setDescription('Mã vật phẩm tiêu hao muốn dùng. Xem mã bằng /tuido.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('tangitem')
    .setDescription('Tặng vật phẩm trong túi cho đồng môn khác.')
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName('thanhvien')
        .setDescription('Đồng môn nhận vật phẩm.')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('item')
        .setDescription('Mã vật phẩm muốn tặng. Xem mã bằng /tuido.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('ketbai')
    .setDescription('Gửi lời mời kết bái huynh đệ với một đạo hữu.')
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName('thanhvien')
        .setDescription('Đạo hữu muốn kết bái.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('ketdaolu')
    .setDescription('Gửi lời mời kết đạo lữ với một đạo hữu.')
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName('thanhvien')
        .setDescription('Đạo hữu muốn kết đạo lữ.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('baisu')
    .setDescription('Gửi lời xin bái sư tới một đạo hữu.')
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName('suphu')
        .setDescription('Đạo hữu muốn bái làm sư phụ.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('nhando')
    .setDescription('Gửi lời nhận một đạo hữu làm đồ đệ.')
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName('detu')
        .setDescription('Đạo hữu muốn nhận làm đồ đệ.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('quanhe')
    .setDescription('Xem quan hệ của bản thân hoặc một đạo hữu khác.')
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName('thanhvien')
        .setDescription('Đạo hữu muốn xem quan hệ. Bỏ trống để xem bản thân.')
        .setRequired(false),
    ),
  new SlashCommandBuilder()
    .setName('huyquanhe')
    .setDescription('Hủy quan hệ kết bái, đạo lữ hoặc sư đồ của chính mình.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('loai')
        .setDescription('Loại quan hệ muốn hủy.')
        .setRequired(true)
        .addChoices(
          { name: 'Kết bái', value: 'ketbai' },
          { name: 'Đạo lữ', value: 'daolu' },
          { name: 'Sư đồ', value: 'sudo' },
        ),
    )
    .addUserOption((option) =>
      option
        .setName('thanhvien')
        .setDescription('Đạo hữu đang có quan hệ với bạn.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('nangpham')
    .setDescription('Nâng phẩm vật phẩm bằng Refactor Linh Thạch và điểm cống hiến.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('item')
        .setDescription('Mã vật phẩm muốn nâng phẩm. Xem mã bằng /tuido.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('nhiemvu')
    .setDescription('Mở Nhiệm Vụ Nội Tông: đa số xử lý/điều tra, chỉ Trấn Áp/Đối Đầu mới combat.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('cap')
        .setDescription('Cấp bảng nhiệm vụ muốn xem.')
        .setRequired(false)
        .addChoices(...missionTierChoices),
    ),
  new SlashCommandBuilder()
    .setName('bangnhiemvu')
    .setDescription('Dựng nhanh một bảng nhiệm vụ công khai ở kênh hiện tại.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(ADMIN_PERMISSION)
    .addStringOption((option) =>
      option
        .setName('cap')
        .setDescription('Cấp bảng nhiệm vụ cần dựng công khai.')
        .setRequired(false)
        .addChoices(...missionTierChoices),
    ),
  new SlashCommandBuilder()
    .setName('setupbangnhiemvu')
    .setDescription('Dựng 1 bảng nhiệm vụ công khai cố định trong kênh hiện tại.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(ADMIN_PERMISSION)
    .addStringOption((option) =>
      option
        .setName('cap')
        .setDescription('Cấp bảng nhiệm vụ cần dựng công khai.')
        .setRequired(true)
        .addChoices(...missionTierChoices),
    ),
  new SlashCommandBuilder()
    .setName('taonhiemvu')
    .setDescription('Tạo/reset bảng nhiệm vụ hôm nay cho một cấp thân phận.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(ADMIN_PERMISSION)
    .addStringOption((option) =>
      option
        .setName('cap')
        .setDescription('Cấp nhiệm vụ cần tạo lại.')
        .setRequired(true)
        .addChoices(...missionTierChoices),
    ),
  new SlashCommandBuilder()
    .setName('xuatson')
    .setDescription('Mở bảng Xuất Sơn cá nhân: nhận công án rồi vào khung hành động bằng nút.' )
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('setupxuatson')
    .setDescription('Dựng bảng công án Xuất Sơn public: ai đang làm, ai chưa nhận, nút nhận.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(ADMIN_PERMISSION),
  new SlashCommandBuilder()
    .setName('doiconghien')
    .setDescription('Đổi vật chứng/nguyên liệu Dị Lỗi lấy điểm cống hiến tông môn.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('vatpham')
        .setDescription('Mã nguyên liệu hoặc vật chứng trong /nguyenlieu.')
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName('soluong')
        .setDescription('Số lượng muốn đổi.')
        .setRequired(false)
        .setMinValue(1),
    ),
  new SlashCommandBuilder()
    .setName('bicanh')
    .setDescription('Mở Bí Cảnh Ngày: 1 lượt/ngày, nhiều tầng, 360 biến cố và boss cuối.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('setupbicanh')
    .setDescription('Dựng bảng Bí Cảnh Ngày cố định trong kênh hiện tại.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(ADMIN_PERMISSION),
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
