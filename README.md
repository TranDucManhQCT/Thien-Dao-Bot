# Thiên Đạo Bot

Bot Discord tiếng Việt dùng `discord.js` v14 cho tông môn tu tiên, hỗ trợ mở ticket riêng để kiểm tra linh căn và gán role tự động.
Bot hiển thị công pháp tu luyện trong `/profile` nếu thành viên đã có role công pháp.

## Cài đặt

```bash
npm install
```

Tạo file `.env` theo mẫu:

```env
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_application_client_id
GUILD_ID=your_discord_server_id
```

Không hardcode token vào source code.

## Quyền bot cần có

- Manage Channels
- Manage Roles
- Send Messages
- Embed Links
- Read Message History
- Use Slash Commands

Bot phải có role cao hơn các role bot cần tạo, cập nhật, gán hoặc xóa.
Để tính cống hiến từ chat, hãy bật **Message Content Intent** trong Discord Developer Portal cho bot.

## Tạo role

```bash
npm run create:roles
```

Script sẽ tạo hoặc cập nhật các role chức vị tông môn kèm quyền:

- Đạo Tổ: Administrator
- Thái Thượng Trưởng Lão, Tông Chủ, Phó Tông Chủ: Manage Server, Manage Roles, Manage Channels, Manage Messages, Kick, Ban, Timeout, View Audit Log
- Đại Trưởng Lão, Trưởng Lão: Manage Channels, Manage Messages, Kick, Timeout, View Audit Log
- Chấp Pháp Trưởng Lão, Chấp Pháp Sứ: Manage Messages, Kick, Timeout, View Audit Log
- Chấp Sự, Đường Chủ: Manage Messages và quyền dùng kênh cơ bản
- Dẫn Đạo Sư: quyền dùng kênh cơ bản
- Đại Đạo Tông: quyền thành viên cơ bản, gồm xem kênh, nhắn tin, reaction, dùng slash command, tham gia và nói trong voice

Và các role linh căn:

- Tạp Linh Căn
- Tứ Linh Căn
- Tam Linh Căn
- Nhị Linh Căn
- Nhất Linh Căn
- Kim Linh Căn
- Mộc Linh Căn
- Thủy Linh Căn
- Hỏa Linh Căn
- Thổ Linh Căn

Và các role phẩm chất linh căn không có quyền nguy hiểm, `mentionable: false`:

- Hạ Phẩm Linh Căn `#8D99AE`
- Trung Phẩm Linh Căn `#52B788`
- Thượng Phẩm Linh Căn `#FFD166`
- Cực Phẩm Linh Căn `#F77F00`
- Thiên Phẩm Linh Căn `#C77DFF`

Và các role tu vi không có quyền nguy hiểm, `mentionable: false`:

- Phàm Nhân `#808080`
- Luyện Khí `#8ECAE6`
- Trúc Cơ `#52B788`
- Kim Đan `#FFD166`
- Nguyên Anh `#F4A261`
- Hóa Thần `#9D4EDD`
- Luyện Hư `#4361EE`
- Hợp Thể `#C77DFF`
- Đại Thừa `#E76F51`
- Độ Kiếp `#CAF0F8`
- Phi Thăng `#FFF8DC`

Và các role tiểu cảnh không có quyền nguy hiểm, `mentionable: false`:

- Sơ Kỳ `#ADB5BD`
- Trung Kỳ `#74C69D`
- Hậu Kỳ `#E9C46A`
- Đỉnh Phong `#F3722C`

Và các role cấp đệ tử không có quyền nguy hiểm, `mentionable: false`:

- Tán Tu
- Ký Danh Đệ Tử
- Tạp Dịch Đệ Tử
- Ngoại Môn Đệ Tử
- Nội Môn Đệ Tử
- Chân Truyền Đệ Tử
- Thân Truyền Đệ Tử
- Thánh Tử
- Thánh Nữ

Và các role trạng thái tạm thời không có quyền nguy hiểm, `mentionable: false`:

- Tâm Ma Quấn Thân
- Bế Quan
- Linh Khí Bạo Phát
- Cơ Duyên Gia Thân
- Đạo Tâm Kiên Định

Và các role công pháp không có quyền nguy hiểm, `mentionable: false`:

- 💻 frontend-huyễn-diện
- ⚙️ backend-hậu-đạo
- 🌐 fullstack-vạn-pháp
- 📱 mobile-linh-khí
- 🗄️ database-địa-mạch
- 🧠 ai-cơ-trí
- ☁️ devops-vân-hạ
- 🛡️ security-hộ-pháp
- 🎮 game-mộng-cảnh
- 🎨 uiux-huyễn-hình
- 🏗️ system-kiến-trúc-pháp

## Đăng ký slash command

```bash
npm run deploy:commands
```

Nếu có `GUILD_ID`, command được đăng ký trực tiếp vào server đó. Nếu bỏ `GUILD_ID`, command sẽ đăng ký global và có thể mất một lúc mới hiện.

## Chạy bot

```bash
npm start
```

## Dữ liệu người dùng

Bot lưu dữ liệu bằng file `data/users.json`. Nếu thư mục hoặc file chưa tồn tại, bot sẽ tự tạo và không ghi đè dữ liệu user cũ.

Dữ liệu mỗi thành viên có dạng:

```js
{
  "userId": {
    "githubUsername": null,
    "githubVerifyCode": null,
    "githubVerified": false,
    "lastGithubCheckAt": 0,
    "lastGithubRewardDate": null,
    "githubDailyExp": 0,
    "tuViExp": 0,
    "congHienExp": 0,
    "lastMessageCongHienAt": 0,
    "dailyMessageCongHien": 0,
    "dailyMessageDate": "YYYY-MM-DD"
  }
}
```

## Lệnh

### `/setup-linhcan`

Chỉ admin dùng. Bot gửi embed **Linh Căn Đài** kèm nút **Khai Mở Linh Căn Đài**.

Khi thành viên bấm nút, bot tạo ticket riêng `linh-can-username`. Chỉ người bấm, bot, **Trưởng Lão** và **Chấp Pháp Sứ** xem được ticket.
Mọi thành viên nhìn thấy kênh đặt Linh Căn Đài đều có thể bấm nút mở ticket, không cần role đệ tử.

### `/linhcan ngay thang nam`

Chỉ dùng trong ticket `linh-can-*`. Bot tính kết quả theo công thức V2:
Lệnh này không cần quyền admin và không giới hạn theo role đệ tử.
Mỗi thành viên chỉ được khai linh căn một lần. Nếu đã có role linh căn, bot sẽ không cho tự khai lại để tránh đổi kết quả theo ý muốn.

Ngũ hành gồm:

```txt
Kim, Mộc, Thủy, Hỏa, Thổ
```

Bot cộng điểm ngũ hành từ Thiên Can năm sinh, Địa Chi năm sinh, tháng sinh và ngày sinh. Can Chi năm sinh được tính bằng:

```js
canIndex = (nam - 4) % 10
chiIndex = (nam - 4) % 12
```

Điểm phân loại linh căn:

```js
phanLoaiScore = (ngay * 31 + thang * 17 + nam + tongChuSo(nam) * 13) % 100
```

Phân loại:

```txt
0-34   -> Tạp Linh Căn  = 5 hệ
35-59  -> Tứ Linh Căn   = 4 hệ
60-79  -> Tam Linh Căn  = 3 hệ
80-94  -> Nhị Linh Căn  = 2 hệ
95-99  -> Nhất Linh Căn = 1 hệ
```

Bot lấy các hệ có điểm cao nhất theo số hệ tương ứng. Sau khi kiểm tra, bot gán role phân loại linh căn, gán role hệ ngũ hành, và gán `Tán Tu` nếu người dùng chưa có cấp đệ tử.

Nếu người dùng chưa có role tu vi, bot gán `Phàm Nhân` và `Sơ Kỳ`.

Phẩm chất linh căn được tính riêng bằng độ thuần của điểm ngũ hành, không dùng công thức `% 100`:

```js
top1 = điểm hệ cao nhất
top2 = điểm hệ cao thứ hai
soHe = số hệ linh căn được gán
doThuan = top1 * 20 + (top1 - top2) * 15 + (5 - soHe) * 10
```

Nếu Thiên Can, Địa Chi hoặc tháng sinh cùng hành với hệ mạnh nhất, mỗi mục cộng thêm `5`. Điểm cuối được giới hạn trong khoảng `0-100`.

Bảng phẩm chất:

```txt
0-29   -> Hạ Phẩm Linh Căn
30-54  -> Trung Phẩm Linh Căn
55-74  -> Thượng Phẩm Linh Căn
75-89  -> Cực Phẩm Linh Căn
90-100 -> Thiên Phẩm Linh Căn
```

Khi `/linhcan` thành công, bot gán role phân loại, hệ ngũ hành và phẩm chất. Nếu dữ liệu cũ từng bị trùng role linh căn, bot có cơ chế xóa sạch role linh căn cũ trước khi gán kết quả mới.

Embed kết quả màu vàng kim hiển thị Can Chi năm sinh, phân loại linh căn, hệ linh căn, độ thuần linh căn, phẩm chất linh căn, điểm ngũ hành và vai trò hiện tại. Embed có hai nút:

- Xin Thu Nhận Đệ Tử
- Xin Bái Sư

Nếu bot thiếu `Manage Roles` hoặc role bot nằm dưới role linh căn cần gán, bot sẽ báo lỗi tiếng Việt rõ ràng.

### Xin Thu Nhận Đệ Tử

Nút này tạo ticket `thu-nhan-username`. Chỉ người mở, bot và các chức vụ xét duyệt thu nhận xem được.

Trong ticket có nút:

- Chấp Nhận Thu Nhận
- Từ Chối
- Đóng Ticket

Khi bấm **Chấp Nhận Thu Nhận**, cấp đệ tử được quyết theo chức vụ người duyệt:

- **Trưởng Lão trở lên** duyệt: bot xóa cấp đệ tử cũ và gán `Nội Môn Đệ Tử`.
- **Chấp Pháp**, **Dẫn Đạo Sư**, **Chấp Sự** hoặc **Đường Chủ** duyệt: bot xóa cấp đệ tử cũ và gán `Ngoại Môn Đệ Tử`.

Nếu người được duyệt đã có cấp cao hơn kết quả duyệt, bot giữ cấp cao hơn để tránh hạ cấp nhầm.

### Xin Bái Sư

Chỉ người có một trong các role sau được xin bái sư:

- Ngoại Môn Đệ Tử
- Nội Môn Đệ Tử
- Chân Truyền Đệ Tử

Nếu chưa đủ điều kiện, bot báo: `Ngươi cần được thu nhận vào tông môn trước khi xin bái sư.`

Nút này tạo ticket `bai-su-username`. Chỉ người mở, bot, **Trưởng Lão** và **Đường Chủ** xem được.

Trong ticket có nút:

- Chấp Nhận Bái Sư
- Từ Chối
- Đóng Ticket

Khi chấp nhận, bot gán `Thân Truyền Đệ Tử` và không xóa role Ngoại Môn, Nội Môn hoặc Chân Truyền.

### `/setup-congphap`

Chỉ admin dùng. Bot gửi embed **Công Pháp Tu Luyện** kèm nút chọn công pháp.

Khi thành viên bấm nút, bot xóa công pháp cũ rồi gán công pháp mới. Mỗi người chỉ giữ một công pháp chính và `/profile` sẽ hiển thị công pháp đang tu luyện.

### `/linkgithub username`

Lưu GitHub username và tạo mã xác minh:

```txt
THIENDAO-<discordUserId>
```

Đạo hữu thêm mã này vào GitHub bio, sau đó dùng `/verifygithub`.

### `/verifygithub`

Bot gọi GitHub API public profile:

```txt
https://api.github.com/users/<username>
```

Nếu bio có mã xác minh, bot lưu trạng thái `githubVerified = true`.

Nếu GitHub API lỗi hoặc rate limit, bot báo:

```txt
Thiên Đạo chưa thể quan sát GitHub lúc này, hãy thử lại sau.
```

### `/github`

Hiển thị GitHub đã liên kết, trạng thái xác minh, lần nhận thưởng commit gần nhất và điểm GitHub hôm nay.

### `/checkcommit`

Chỉ dùng khi GitHub đã xác minh. Bot kiểm tra public GitHub events:

```txt
https://api.github.com/users/<username>/events/public
```

Bot chỉ tính `PushEvent` trong ngày hiện tại và chỉ cho nhận thưởng một lần mỗi ngày.

Công thức điểm tu vi:

```js
base = 40;
commitBonus = Math.min(commitCount * 10, 60);
gain = base + commitBonus;
dailyCap = 120;
```

Nếu hôm nay có commit công khai, bot cộng điểm vào `tuViExp`, đồng bộ role tu vi bằng `syncTuViRoles(member)` và trả embed gồm GitHub username, số commit hôm nay, điểm nhận được, tổng tu vi exp và tu vi hiện tại.

Nếu chưa có commit công khai hôm nay, bot báo chưa tìm thấy commit.

### `/tuvi`

Hiển thị tu vi hiện tại, tiểu cảnh, tổng `tuViExp`, GitHub đã liên kết, trạng thái xác minh và lần nhận thưởng commit gần nhất.

### Chat server và điểm cống hiến

Chat trong server không tăng tu vi nữa. Khi thành viên gửi tin nhắn hợp lệ, bot cộng `+1` điểm cống hiến.

Điều kiện tính cống hiến:

- Bỏ qua bot.
- Bỏ qua tin nhắn dưới 5 ký tự.
- Cooldown 90 giây/người.
- Tối đa 50 cống hiến/ngày.

Bot không cộng điểm trong kênh có tên chứa:

- meme
- trà-đàm
- du-hí
- ẩn-danh
- góp-ý

Sau khi cộng cống hiến, bot lưu `data/users.json` và tự gọi `syncDiscipleRole(member)`.

### Thăng cấp bằng cống hiến

Bot tự xóa cấp đệ tử cũ rồi gán cấp mới tương ứng với điểm cống hiến:

```txt
Tán Tu                0
Ký Danh Đệ Tử         100
Tạp Dịch Đệ Tử        300
Ngoại Môn Đệ Tử       800
Nội Môn Đệ Tử         2000
Chân Truyền Đệ Tử     5000
```

Mốc càng cao càng khó, vì mỗi ngày chat hợp lệ chỉ nhận tối đa 50 cống hiến. Bot không tự gán `Thân Truyền Đệ Tử`, `Thánh Tử`, `Thánh Nữ`; các role này để quản trị hoặc hệ thống bái sư xét riêng.
Nếu thành viên đang giữ chức vị tông môn như `Đạo Tổ`, `Tông Chủ`, `Trưởng Lão`, `Chấp Pháp Sứ`, `Chấp Sự`, `Dẫn Đạo Sư` hoặc `Đường Chủ`, `/profile` sẽ ưu tiên hiển thị chức vị đó và bot không tự ép về cấp đệ tử.

### `/conghien`

Hiển thị điểm cống hiến hiện tại, cấp đệ tử hiện tại, điểm cần để lên cấp tiếp theo và cống hiến hôm nay.

### `/profile`

Hiển thị đạo hồ của thành viên:

- Đạo danh
- GitHub
- Trạng thái xác minh GitHub
- Tu vi exp
- Tu vi hiện tại
- Điểm cống hiến
- Cấp đệ tử
- Linh căn
- Hệ ngũ hành
- Phẩm chất linh căn
- Công pháp tu luyện
- Trạng thái đặc biệt
- Sư phụ và số lượng đệ tử

### `/coduyen`

Mỗi người dùng được cầu cơ duyên 24 giờ một lần. Cơ duyên có thể cộng tu vi, cộng cống hiến, mở trạng thái `Tâm Ma Quấn Thân`, `Bế Quan`, `Cơ Duyên Gia Thân`, `Linh Khí Bạo Phát` hoặc `Đạo Tâm Kiên Định`.

Các trạng thái đặc biệt có role tạm thời:

- `Tâm Ma Quấn Thân`: giảm tỉ lệ đột phá khi hệ thống đột phá được mở.
- `Bế Quan`: không nhận cống hiến chat trong thời gian bế quan, hết hạn nhận tu vi thưởng.
- `Linh Khí Bạo Phát`: x2 tu vi nhận được trong ngày.
- `Cơ Duyên Gia Thân`: tăng tu vi nhận được trong ngày.
- `Đạo Tâm Kiên Định`: tăng tỉ lệ đột phá khi hệ thống đột phá được mở.

`/profile` hiển thị trạng thái còn hạn và bot tự gỡ role trạng thái khi hết hạn.

### `/luandao cauhoi`

Tạo một đàn luận đạo code trong kênh hiện tại. Bot lưu dữ liệu vào `data/luandao.json` và cố mở thread riêng nếu Discord cho phép.

### `/giaidap id noidung`

Gửi lời giải đáp cho một đàn luận đạo. Bot lưu câu trả lời và gửi embed vào thread luận đạo nếu có.

### `/chamdiem id thanhvien ketqua`

Người hỏi hoặc quản sự tông môn được chấm câu trả lời. `huu_ich` cộng cống hiến, `code_tot` cộng cống hiến và tu vi.

### `/truyenthua de_tu`

Người đủ tư cách truyền thừa có thể nhận một đệ tử. Profile sẽ hiển thị `Sư phụ` và số lượng `Đệ tử`.

### `/bangxephang loai`

Hiển thị top 10 theo `tuvi`, `conghien`, `github` hoặc `streak`.

## Discloud

File `discloud.config` đã có:

```txt
NAME=Thien Dao
TYPE=bot
MAIN=index.js
RAM=100
VERSION=latest
START=npm start
```
