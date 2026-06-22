# Thiên Đạo · Manifest 1440 Nội Dung

Chuẩn mới: mỗi hệ lớn dùng mục tiêu `CONTENT_SYSTEM_TARGET_COUNT = 1440`.

## Hệ đã nối trực tiếp trong code

- Nhiệm vụ: `createCodeTuMissionCatalog(CONTENT_SYSTEM_TARGET_COUNT)`.
- Quái/boss: `createCodeTuMonsterCatalog(CONTENT_SYSTEM_TARGET_COUNT)`.
- Kỳ ngộ: `createCodeTuKyNgoCatalog(CONTENT_SYSTEM_TARGET_COUNT)`.
- Thiên tượng: `createCodeTuThienTuongCatalog(CONTENT_SYSTEM_TARGET_COUNT)`.
- Bí cảnh: dùng pool kỳ ngộ/quái 1440 cho biến cố và boss.
- Vật phẩm: `createCodeTuItemCatalog(CONTENT_SYSTEM_TARGET_COUNT)` + vật phẩm nghề.

## Schema thống nhất

Mỗi nội dung nên có:

```txt
id / key
title / name
system
type
tier / contentTier
requiredRealm
requiredIdentity
recommendedProfessions
danger
powerScale
rewardScale
tags
outcomes
```

## Gắn nghề + thân phận

Nhiệm vụ và vật phẩm giờ có:

- `missionKind`: `don` hoặc `bang`.
- `recommendedProfessions`: nghề hợp.
- `contentTier`: tier scale chung.
- `powerScale`: ngân sách lực chiến.
- `rewardScale`: ngân sách thưởng.

## UI

Không hiện `#1/1440` trong UI thường. Người chơi cần thấy nội dung phong phú, không cần nhìn bot khoe bảng tính như vừa học Excel.
