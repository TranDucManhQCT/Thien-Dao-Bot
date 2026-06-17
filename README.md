# Thiên Đạo Bot

Bot Discord tiếng Việt dùng `discord.js` v14 cho tông môn tu tiên, hỗ trợ mở ticket riêng để kiểm tra linh căn và gán role tự động.

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

### `/linhcan ngay thang nam`

Chỉ dùng trong ticket linh căn. Bot tính kết quả theo công thức:

```js
seed = ngay * 31 + thang * 17 + nam
phamChat = seed % 100
hanhStart = seed % 5
```

Ngũ hành gồm:

```txt
Kim, Mộc, Thủy, Hỏa, Thổ
```

Phân loại:

```txt
0-39   -> Tạp Linh Căn  = 5 hệ
40-64  -> Tứ Linh Căn   = 4 hệ
65-84  -> Tam Linh Căn  = 3 hệ
85-94  -> Nhị Linh Căn  = 2 hệ
95-99  -> Nhất Linh Căn = 1 hệ
```

Bot xóa linh căn cũ, gán role phân loại mới, gán role hệ mới, trả embed màu vàng kim và hiện nút **Đóng Linh Căn Đài**. Bấm nút đóng sẽ xóa ticket sau 5 giây.

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
