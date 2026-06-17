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

## Lệnh

### `/setup-linhcan`

Chỉ admin dùng. Bot gửi embed **Linh Căn Đài** kèm nút **Khai Mở Linh Căn Đài**.

Khi thành viên bấm nút, bot tạo ticket riêng `linh-can-username`. Chỉ người bấm, bot, **Trưởng Lão** và **Chấp Pháp Sứ** xem được ticket.
Mọi thành viên nhìn thấy kênh đặt Linh Căn Đài đều có thể bấm nút mở ticket, không cần role đệ tử.

### `/linhcan ngay thang nam`

Chỉ dùng trong ticket `linh-can-*`. Bot tính kết quả theo công thức V2:
Lệnh này không cần quyền admin và không giới hạn theo role đệ tử.

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
85-94  -> Nhị Linh Căn  = 2 hệ
95-99  -> Nhất Linh Căn = 1 hệ
```

Bot lấy các hệ có điểm cao nhất theo số hệ tương ứng. Sau khi kiểm tra, bot gán role phân loại linh căn, gán role hệ ngũ hành, và gán `Tán Tu` nếu người dùng chưa có cấp đệ tử.

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

Khi `/linhcan` thành công, bot xóa role phẩm chất cũ nếu có và gán role phẩm chất mới. Bot không xóa role phân loại linh căn hoặc role hệ ngũ hành khi cập nhật phẩm chất.

Embed kết quả màu vàng kim hiển thị Can Chi năm sinh, phân loại linh căn, hệ linh căn, độ thuần linh căn, phẩm chất linh căn, điểm ngũ hành và vai trò hiện tại. Embed có hai nút:

- Xin Thu Nhận Đệ Tử
- Xin Bái Sư

Nếu bot thiếu `Manage Roles` hoặc role bot nằm dưới role linh căn cần gán, bot sẽ báo lỗi tiếng Việt rõ ràng.

### Xin Thu Nhận Đệ Tử

Nút này tạo ticket `thu-nhan-username`. Chỉ người mở, bot, **Trưởng Lão** và **Chấp Pháp Sứ** xem được.

Trong ticket có nút:

- Chấp Nhận Thu Nhận
- Từ Chối
- Đóng Ticket

Chỉ **Trưởng Lão** hoặc **Chấp Pháp Sứ** được duyệt. Khi chấp nhận, bot xóa `Tán Tu` và gán `Ngoại Môn Đệ Tử`.

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

Khi chấp nhận, bot gán `Thân Truyền Đệ Tử` và không xóa role Ngoại Môn, Nội Môn hoặc Chân Truyền. Bot không tự động gán Nội Môn Đệ Tử trở lên; các cấp đó để quản trị duyệt thủ công.

### `/profile`

Hiển thị đạo hồ của thành viên:

- Đạo danh
- Cấp đệ tử
- Linh căn
- Hệ ngũ hành
- Phẩm chất linh căn
- Công pháp tu luyện
- Tu vi
- Tiểu cảnh

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
