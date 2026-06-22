# Crafting 1440 System

Bản này thêm hệ chế tạo Đạo Nghiệp theo hướng: nghề tạo được vật phẩm, có tỉ lệ thất bại, độ thạo nghề tăng tỉ lệ thành công, fail vẫn có kết quả/phế phẩm/dị biến.

## Quy mô

- 1440 nguyên liệu chế tạo (`CRAFT_MATERIAL_CATALOG`)
- 1440 công thức chế tạo (`CRAFT_RECIPE_CATALOG`)
- 1440 bản vẽ/công thức khóa (`CRAFT_BLUEPRINT_CATALOG`)
- 1440 vật phẩm code-tu generated vẫn giữ từ item rework

## Lệnh mới

- `/congthuc`: xem công thức theo nghề/từ khóa/trang
- `/chetao`: chế vật phẩm theo mã công thức
- `/nguyenlieu`: xem kho nguyên liệu, thống kê craft
- `/phangiai`: phân giải vật phẩm lấy nguyên liệu
- `/hoccongthuc`: học bản vẽ công thức cao cấp
- `/chuyentinh`: chọn hướng chuyên tinh craft

## Chuyên tinh

- Ổn Định Đạo Lô: tăng thành công
- Thần Tốc Rèn Pháp: giảm cooldown/cost, nhưng dễ fail hơn
- Hoàn Mỹ Khắc Ấn: tăng hoàn mỹ, tốn hơn
- Tiết Kiệm Linh Tài: giảm nguyên liệu, giảm nhẹ tỉ lệ
- Dị Biến Cấm Lô: tăng dị biến/cursed item, rủi ro hơn

## Công thức success/fail

Tỉ lệ thành công lấy từ:

- base success của công thức
- cấp/tinh thông nghề
- số lần đã craft
- pháp cụ nghề đang trang bị
- chuyên tinh craft
- phạt nếu rank nghề thấp hơn yêu cầu

Kết quả có thể là:

- Thành công: nhận vật phẩm
- Hoàn mỹ: nhận phẩm chất cao hơn
- Lỗi nhẹ: fail nhưng thu hồi ít nguyên liệu, nhận exp nghề
- Lỗi nặng: mất nhiều nguyên liệu, nhận exp nghề thấp/vừa
- Dị biến: fail nhưng sinh vật phẩm nguyền/cấm khí

## Nguồn nguyên liệu

- Làm nghề hằng ngày
- Phân giải vật phẩm
- Boss/bí cảnh/nhiệm vụ về sau
- Bản vẽ có thể học bằng `/hoccongthuc`

## Tương thích dữ liệu

Dữ liệu cũ vẫn giữ. `daoNghe` được mở rộng thêm:

- `lastCraftAt`
- `knownBlueprints`
- `craftingSpec`
- `craftSuccessCount`
- `craftFailCount`
- `decomposeCount`
