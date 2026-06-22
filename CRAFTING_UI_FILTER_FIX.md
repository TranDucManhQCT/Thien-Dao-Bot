# CRAFTING UI FILTER FIX

## Mục tiêu

- `/congthuc` không còn xổ toàn bộ 1440 công thức.
- Chỉ hiển thị công thức thuộc Đạo Nghiệp hiện tại của người dùng.
- Chỉ hiển thị công thức đã mở khóa:
  - công thức không cần bản vẽ được xem là mở khóa nền;
  - công thức cần bản vẽ chỉ hiện sau khi người dùng đã ngộ/học bản vẽ.
- Mỗi trang tối đa 3 công thức.
- Mỗi công thức hiển thị rõ nguyên liệu cần, số đang có, cống hiến cần và tỉ lệ chế tạo.
- `/chetao` chỉ nhận công thức đã mở khóa của nghề hiện tại.
- Text hiển thị được rút gọn, lọc ký tự markdown dễ phá layout.

## Lệnh ảnh hưởng

- `/congthuc tukhoa:<text> trang:<số>`
- `/chetao congthuc:<mã>`
- `/nghenghiep hanhdong:congthuc`
- `/nghenghiep hanhdong:chetao`

## Ghi chú

Catalog nội bộ vẫn giữ:

- 1440 vật phẩm generated
- 1440 công thức
- 1440 nguyên liệu
- 1440 bản vẽ

Nhưng UI không phơi hết 1440 ra trước mặt người chơi nữa. Máy móc cũng cần tự trọng.
