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
  new SlashCommandBuilder()
    .setName('setup-congphap')
    .setDescription('Dựng bia chọn Công Pháp Tu Luyện cho tông môn.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
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
    .setName('coduyen')
    .setDescription('Cầu một lần cơ duyên trong ngày.')
    .setDMPermission(false),
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
    .setDescription('Bế quan tu luyện trong một khoảng thời gian.')
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
    .setDescription('Xuất quan và nhận tu vi nếu đã bế quan đủ thời gian.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Xem Shop Tông Môn: pháp bảo, đan dược và túi trữ vật.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('mua')
    .setDescription('Dùng điểm cống hiến để mua vật phẩm trong Shop Tông Môn.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('item')
        .setDescription('Mã vật phẩm muốn mua. Xem mã bằng /shop, ví dụ: git_kiem.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('tuido')
    .setDescription('Xem túi trữ vật và vật phẩm đang sở hữu.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('trangbi')
    .setDescription('Trang bị pháp bảo hoặc dùng túi trữ vật đã sở hữu.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('item')
        .setDescription('Mã vật phẩm muốn trang bị hoặc dùng. Ví dụ: git_kiem.')
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('dung')
    .setDescription('Dùng đan dược trong túi trữ vật.')
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName('item')
        .setDescription('Mã đan dược muốn dùng. Ví dụ: hoi_nguyen_dan.')
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
    .setDescription('Mở Trảm Yêu Bảng hôm nay bằng menu và nút chọn hiện đại.')
    .setDMPermission(false),
  new SlashCommandBuilder()
    .setName('setupnhiemvu')
    .setDescription('Thiết lập số nhiệm vụ mở trong Trảm Yêu Bảng hôm nay.')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addIntegerOption((option) =>
      option
        .setName('soluong')
        .setDescription('Số nhiệm vụ mở hôm nay, mặc định 5, giới hạn 3-15.')
        .setRequired(true)
        .setMinValue(3)
        .setMaxValue(15),
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
