# ITEM_REWORK_1440_FULL

Bản này đã làm lại hệ vật phẩm theo 3 giai đoạn:

## Giai đoạn 1 · Nền item
- Tách slot trang bị: `weapon`, `artifact`, `armor`, `tool`, `talisman`, `bag`.
- Thêm loại **armor / giáp / đạo bào**.
- Tool và talisman có chỉ số trực tiếp, combat profile, và được tính vào tổng chỉ số.
- Trang bị nhiều slot cùng lúc, có soft cap để không vỡ combat.
- Shop text đổi theo `DAILY_SHOP_LIMIT`, không còn ghi cứng 12 món.

## Giai đoạn 2 · Bản sắc item
- Thêm `itemRole`: `tu_luyen`, `dot_pha`, `combat`, `nhiem_vu`, `nghe`, `tien_ich`, `party`, `cam_dan`, `nang_pham`.
- Thêm `itemSet`: Git Mệnh, Deploy Hộ Đạo, Database Long Mạch, Debug Trảm Bug, AI Diễn Toán, Security Hộ Tông, Fullstack Vạn Tượng.
- Thêm trường mô tả cơ chế: `passiveEffect`, `activeEffect`, `procEffect`.
- Vật phẩm nghề có 5 món/10 nghề: tool, weapon, talisman/artifact, armor, pill.

## Giai đoạn 3 · Loot / crafting / catalog
- `createCodeTuItemCatalog(CONTENT_SYSTEM_TARGET_COUNT)` vẫn fill đủ **1440 vật phẩm code-tu**.
- Thêm 10 món drop hiếm từ bí cảnh/boss.
- Drop logic ưu tiên thêm `armor`.
- Chế tạo nghề có 50 món signature.
- Shop tổng vẫn có base item, weapon catalog, đạo nghề catalog, code-tu catalog.

## Slot trang bị
1. Vũ khí chính: `equippedWeapon`
2. Pháp bảo lõi: `equippedArtifact`
3. Giáp/Đạo bào: `equippedArmor`
4. Pháp cụ nghề: `equippedTool`
5. Phù hộ thân: `equippedTalisman`
6. Túi trữ vật: `storageBag`

## Set item
- **Set Git Mệnh**: cống hiến, tu vi, hồi khí/combo.
- **Set Deploy Hộ Đạo**: giảm trọng thương, shield, hồi phục.
- **Set Database Long Mạch**: khống chế, phòng thủ, đột phá.
- **Set Debug Trảm Bug**: giảm Tâm Ma, ăn mòn bug, chống legacy.
- **Set AI Diễn Toán**: chí mạng, chính xác, kỳ ngộ.
- **Set Security Hộ Tông**: phòng thủ, chống debuff, giảm phản phệ.
- **Set Fullstack Vạn Tượng**: công thủ cân bằng.

## Nhóm vật phẩm có trong bản mới
- Vũ khí: sát thương, crit, dot, hồi khí.
- Pháp bảo: đột phá, tu vi, cân bằng chỉ số.
- Giáp/Đạo bào: shield, def, giảm trọng thương, giảm mất tu vi.
- Pháp cụ nghề: tăng cống hiến/nghề, accuracy, qiGain, hỗ trợ nhiệm vụ.
- Phù/lệnh: rollback, safe deploy, chống Tâm Ma, hộ thân.
- Đan/dịch: tu luyện, đột phá, cấm đan có nguyền, đan nghề.
- Refactor thạch/nguyên liệu: nâng phẩm/luyện khí.
- Túi trữ vật: mở rộng ô đồ.


## Thống kê 1440 vật phẩm code-tu tự sinh
- tool: 359
- talisman: 181
- artifact: 181
- upgrade_stone: 180
- armor: 180
- pill: 180
- weapon: 179

## 10 drop hiếm / boss / bí cảnh
- `drop_bug_hon_tinh` · **Bug Hồn Tinh** · upgrade_stone · bug · set `debug_tram_bug`
- `drop_zero_day_manh_vo` · **Zero Day Mảnh Vỡ** · talisman · security · set `security_ho_tong`
- `drop_production_tro_tan` · **Production Tro Tàn** · armor · devops · set `deploy_ho_dao`
- `drop_deadlock_toa_hon_xich` · **Deadlock Tỏa Hồn Xích** · talisman · database · set `database_long_mach`
- `drop_prompt_di_thu` · **Prompt Dị Thư** · artifact · ai · set `ai_dien_toan`
- `drop_core_nguyen_thiet` · **Core Nguyên Thiết** · weapon · system · set `fullstack_van_tuong`
- `drop_runtime_huyet_an` · **Runtime Huyết Ấn** · tool · devops · set `deploy_ho_dao`
- `drop_cache_linh_tinh` · **Cache Linh Tinh** · pill · database · set `database_long_mach`
- `drop_hash_hon_ngoc` · **Hash Hồn Ngọc** · armor · security · set `security_ho_tong`
- `drop_commit_co_an` · **Commit Cổ Ấn** · artifact · git · set `git_menh`

## Danh sách 1440 vật phẩm code-tu tự sinh
1. `drop_bug_hon_tinh` · **Bug Hồn Tinh** · `upgrade_stone` · `bug` · tier `drop` · set `debug_tram_bug`
2. `drop_zero_day_manh_vo` · **Zero Day Mảnh Vỡ** · `talisman` · `security` · tier `drop` · set `security_ho_tong`
3. `drop_production_tro_tan` · **Production Tro Tàn** · `armor` · `devops` · tier `drop` · set `deploy_ho_dao`
4. `drop_deadlock_toa_hon_xich` · **Deadlock Tỏa Hồn Xích** · `talisman` · `database` · tier `drop` · set `database_long_mach`
5. `drop_prompt_di_thu` · **Prompt Dị Thư** · `artifact` · `ai` · tier `drop` · set `ai_dien_toan`
6. `drop_core_nguyen_thiet` · **Core Nguyên Thiết** · `weapon` · `system` · tier `drop` · set `fullstack_van_tuong`
7. `drop_runtime_huyet_an` · **Runtime Huyết Ấn** · `tool` · `devops` · tier `drop` · set `deploy_ho_dao`
8. `drop_cache_linh_tinh` · **Cache Linh Tinh** · `pill` · `database` · tier `drop` · set `database_long_mach`
9. `drop_hash_hon_ngoc` · **Hash Hồn Ngọc** · `armor` · `security` · tier `drop` · set `security_ho_tong`
10. `drop_commit_co_an` · **Commit Cổ Ấn** · `artifact` · `git` · tier `drop` · set `git_menh`
11. `vp_0011` · **Nội Môn Deploy Đạo Chuông** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
12. `vp_0012` · **Trưởng Lão Token Dò Mạch Nghi** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
13. `vp_0013` · **Ký Danh Firewall Phù** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
14. `vp_0014` · **Ngoại Môn Deploy Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
15. `vp_0015` · **Nội Môn Token Nguyên Thiết** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
16. `vp_0016` · **Trưởng Lão Firewall Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
17. `vp_0017` · **Ký Danh Refactor Ấn Kiếm** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
18. `vp_0018` · **Ngoại Môn Merge Vân Y** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
19. `vp_0019` · **Nội Môn Query Trận Bàn** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
20. `vp_0020` · **Trưởng Lão Debug Truy Tung Kính** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
21. `vp_0021` · **Ký Danh Runtime Rollback Chỉ** · `talisman` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
22. `vp_0022` · **Ngoại Môn Component Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
23. `vp_0023` · **Nội Môn Index Đạo Tài** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
24. `vp_0024` · **Trưởng Lão Cache Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
25. `vp_0025` · **Ký Danh Legacy Phi Luân** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
26. `vp_0026` · **Ngoại Môn Rollback Hộ Tâm Y** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
27. `vp_0027` · **Nội Môn Cache Hồn Châu** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
28. `vp_0028` · **Trưởng Lão Legacy Toolchain** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
29. `vp_0029` · **Ký Danh Rollback Ấn Phù** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
30. `vp_0030` · **Ngoại Môn Schema Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
31. `vp_0031` · **Nội Môn Prompt Linh Thạch** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
32. `vp_0032` · **Trưởng Lão Agent Bộ Linh Kiện** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
33. `vp_0033` · **Ký Danh Deploy Châm** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
34. `vp_0034` · **Ngoại Môn Token Giáp** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
35. `vp_0035` · **Nội Môn Firewall Linh Kính** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
36. `vp_0036` · **Trưởng Lão Refactor Thiên Nhãn** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
37. `vp_0037` · **Ký Danh Merge Phù** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
38. `vp_0038` · **Ngoại Môn Query Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
39. `vp_0039` · **Nội Môn Debug Bảo Linh Tinh** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
40. `vp_0040` · **Trưởng Lão Merge Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
41. `vp_0041` · **Ký Danh Query Đao** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
42. `vp_0042` · **Ngoại Môn Debug Vân Y** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
43. `vp_0043` · **Nội Môn Runtime Ngọc Giản** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
44. `vp_0044` · **Trưởng Lão Component Compiler Lò** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
45. `vp_0045` · **Ký Danh Index Rollback Chỉ** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
46. `vp_0046` · **Ngoại Môn Cache Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
47. `vp_0047` · **Nội Môn Legacy Core Mảnh** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
48. `vp_0048` · **Trưởng Lão Rollback Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
49. `vp_0049` · **Ký Danh Schema Lệnh Kích** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
50. `vp_0050` · **Ngoại Môn Prompt Hộ Tâm Y** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
51. `vp_0051` · **Nội Môn Agent Hồ Lô** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
52. `vp_0052` · **Trưởng Lão Deploy Chổi Pháp** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
53. `vp_0053` · **Ký Danh Prompt Ấn Phù** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
54. `vp_0054` · **Ngoại Môn Agent Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
55. `vp_0055` · **Nội Môn Deploy Nguyên Thiết** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
56. `vp_0056` · **Trưởng Lão Token Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
57. `vp_0057` · **Ký Danh Firewall Kiếm** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
58. `vp_0058` · **Ngoại Môn Refactor Giáp** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
59. `vp_0059` · **Nội Môn Merge Pháp Ấn** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
60. `vp_0060` · **Trưởng Lão Query Linh Bút** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
61. `vp_0061` · **Ký Danh Debug Phù** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
62. `vp_0062` · **Ngoại Môn Runtime Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
63. `vp_0063` · **Nội Môn Component Đạo Tài** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
64. `vp_0064` · **Trưởng Lão Index Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
65. `vp_0065` · **Ký Danh Cache Phù Nhận** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
66. `vp_0066` · **Ngoại Môn Component Vân Y** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
67. `vp_0067` · **Nội Môn Index Đạo Chuông** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
68. `vp_0068` · **Trưởng Lão Cache Dò Mạch Nghi** · `tool` · `git` · tier `truong_lao` · set `git_menh`
69. `vp_0069` · **Ký Danh Legacy Rollback Chỉ** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
70. `vp_0070` · **Ngoại Môn Rollback Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
71. `vp_0071` · **Nội Môn Schema Linh Thạch** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
72. `vp_0072` · **Trưởng Lão Prompt Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
73. `vp_0073` · **Ký Danh Agent Ấn Kiếm** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
74. `vp_0074` · **Ngoại Môn Deploy Hộ Tâm Y** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
75. `vp_0075` · **Nội Môn Token Trận Bàn** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
76. `vp_0076` · **Trưởng Lão Firewall Truy Tung Kính** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
77. `vp_0077` · **Ký Danh Refactor Ấn Phù** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
78. `vp_0078` · **Ngoại Môn Merge Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
79. `vp_0079` · **Nội Môn Firewall Bảo Linh Tinh** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
80. `vp_0080` · **Trưởng Lão Refactor Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
81. `vp_0081` · **Ký Danh Merge Phi Luân** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
82. `vp_0082` · **Ngoại Môn Query Giáp** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
83. `vp_0083` · **Nội Môn Debug Hồn Châu** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
84. `vp_0084` · **Trưởng Lão Runtime Toolchain** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
85. `vp_0085` · **Ký Danh Component Phù** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
86. `vp_0086` · **Ngoại Môn Index Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
87. `vp_0087` · **Nội Môn Cache Core Mảnh** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
88. `vp_0088` · **Trưởng Lão Legacy Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
89. `vp_0089` · **Ký Danh Rollback Châm** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
90. `vp_0090` · **Ngoại Môn Schema Vân Y** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
91. `vp_0091` · **Nội Môn Prompt Linh Kính** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
92. `vp_0092` · **Trưởng Lão Rollback Thiên Nhãn** · `tool` · `git` · tier `truong_lao` · set `git_menh`
93. `vp_0093` · **Ký Danh Schema Rollback Chỉ** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
94. `vp_0094` · **Ngoại Môn Prompt Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
95. `vp_0095` · **Nội Môn Agent Nguyên Thiết** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
96. `vp_0096` · **Trưởng Lão Deploy Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
97. `vp_0097` · **Ký Danh Token Đao** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
98. `vp_0098` · **Ngoại Môn Firewall Hộ Tâm Y** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
99. `vp_0099` · **Nội Môn Refactor Ngọc Giản** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
100. `vp_0100` · **Trưởng Lão Merge Compiler Lò** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
101. `vp_0101` · **Ký Danh Query Ấn Phù** · `talisman` · `bug` · tier `tap_dich` · set `debug_tram_bug`
102. `vp_0102` · **Ngoại Môn Debug Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
103. `vp_0103` · **Nội Môn Runtime Đạo Tài** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
104. `vp_0104` · **Trưởng Lão Component Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
105. `vp_0105` · **Ký Danh Debug Lệnh Kích** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
106. `vp_0106` · **Ngoại Môn Runtime Giáp** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
107. `vp_0107` · **Nội Môn Component Hồ Lô** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
108. `vp_0108` · **Trưởng Lão Index Chổi Pháp** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
109. `vp_0109` · **Ký Danh Cache Phù** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
110. `vp_0110` · **Ngoại Môn Legacy Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
111. `vp_0111` · **Nội Môn Rollback Linh Thạch** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
112. `vp_0112` · **Trưởng Lão Schema Bộ Linh Kiện** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
113. `vp_0113` · **Ký Danh Prompt Kiếm** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
114. `vp_0114` · **Ngoại Môn Agent Vân Y** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
115. `vp_0115` · **Nội Môn Deploy Pháp Ấn** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
116. `vp_0116` · **Trưởng Lão Token Linh Bút** · `tool` · `git` · tier `truong_lao` · set `git_menh`
117. `vp_0117` · **Ký Danh Firewall Rollback Chỉ** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
118. `vp_0118` · **Ngoại Môn Deploy Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
119. `vp_0119` · **Nội Môn Token Bảo Linh Tinh** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
120. `vp_0120` · **Trưởng Lão Firewall Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
121. `vp_0121` · **Ký Danh Refactor Phù Nhận** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
122. `vp_0122` · **Ngoại Môn Merge Hộ Tâm Y** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
123. `vp_0123` · **Nội Môn Query Đạo Chuông** · `artifact` · `git` · tier `noi_mon` · set `git_menh`
124. `vp_0124` · **Trưởng Lão Debug Dò Mạch Nghi** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
125. `vp_0125` · **Ký Danh Runtime Ấn Phù** · `talisman` · `bug` · tier `tap_dich` · set `debug_tram_bug`
126. `vp_0126` · **Ngoại Môn Component Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
127. `vp_0127` · **Nội Môn Index Core Mảnh** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
128. `vp_0128` · **Trưởng Lão Cache Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
129. `vp_0129` · **Ký Danh Legacy Ấn Kiếm** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
130. `vp_0130` · **Ngoại Môn Rollback Giáp** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
131. `vp_0131` · **Nội Môn Cache Trận Bàn** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
132. `vp_0132` · **Trưởng Lão Legacy Truy Tung Kính** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
133. `vp_0133` · **Ký Danh Rollback Phù** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
134. `vp_0134` · **Ngoại Môn Schema Tâm Dược** · `pill` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
135. `vp_0135` · **Nội Môn Prompt Nguyên Thiết** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
136. `vp_0136` · **Trưởng Lão Agent Bộ Linh Kiện** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
137. `vp_0137` · **Ký Danh Deploy Phi Luân** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
138. `vp_0138` · **Ngoại Môn Token Vân Y** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
139. `vp_0139` · **Nội Môn Firewall Hồn Châu** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
140. `vp_0140` · **Trưởng Lão Refactor Toolchain** · `tool` · `git` · tier `truong_lao` · set `git_menh`
141. `vp_0141` · **Ký Danh Merge Rollback Chỉ** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
142. `vp_0142` · **Ngoại Môn Query Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
143. `vp_0143` · **Nội Môn Debug Đạo Tài** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
144. `vp_0144` · **Trưởng Lão Merge Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
145. `vp_0145` · **Ký Danh Query Châm** · `weapon` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
146. `vp_0146` · **Ngoại Môn Debug Hộ Tâm Y** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
147. `vp_0147` · **Nội Môn Runtime Linh Kính** · `artifact` · `git` · tier `noi_mon` · set `git_menh`
148. `vp_0148` · **Trưởng Lão Component Thiên Nhãn** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
149. `vp_0149` · **Ký Danh Index Ấn Phù** · `talisman` · `bug` · tier `tap_dich` · set `debug_tram_bug`
150. `vp_0150` · **Ngoại Môn Cache Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
151. `vp_0151` · **Nội Môn Legacy Linh Thạch** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
152. `vp_0152` · **Trưởng Lão Rollback Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
153. `vp_0153` · **Ký Danh Schema Đao** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
154. `vp_0154` · **Ngoại Môn Prompt Giáp** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
155. `vp_0155` · **Nội Môn Agent Ngọc Giản** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
156. `vp_0156` · **Trưởng Lão Deploy Compiler Lò** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
157. `vp_0157` · **Ký Danh Prompt Phù** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
158. `vp_0158` · **Ngoại Môn Agent Tâm Dược** · `pill` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
159. `vp_0159` · **Nội Môn Deploy Bảo Linh Tinh** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
160. `vp_0160` · **Trưởng Lão Token Bộ Linh Kiện** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
161. `vp_0161` · **Ký Danh Firewall Lệnh Kích** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
162. `vp_0162` · **Ngoại Môn Refactor Vân Y** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
163. `vp_0163` · **Nội Môn Merge Hồ Lô** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
164. `vp_0164` · **Trưởng Lão Query Chổi Pháp** · `tool` · `git` · tier `truong_lao` · set `git_menh`
165. `vp_0165` · **Ký Danh Debug Rollback Chỉ** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
166. `vp_0166` · **Ngoại Môn Runtime Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
167. `vp_0167` · **Nội Môn Component Core Mảnh** · `upgrade_stone` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
168. `vp_0168` · **Trưởng Lão Index Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
169. `vp_0169` · **Ký Danh Cache Kiếm** · `weapon` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
170. `vp_0170` · **Ngoại Môn Component Hộ Tâm Y** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
171. `vp_0171` · **Nội Môn Index Pháp Ấn** · `artifact` · `git` · tier `noi_mon` · set `git_menh`
172. `vp_0172` · **Trưởng Lão Cache Linh Bút** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
173. `vp_0173` · **Ký Danh Legacy Ấn Phù** · `talisman` · `bug` · tier `tap_dich` · set `debug_tram_bug`
174. `vp_0174` · **Ngoại Môn Rollback Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
175. `vp_0175` · **Nội Môn Schema Nguyên Thiết** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
176. `vp_0176` · **Trưởng Lão Prompt Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
177. `vp_0177` · **Ký Danh Agent Phù Nhận** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
178. `vp_0178` · **Ngoại Môn Deploy Giáp** · `armor` · `git` · tier `ngoai_mon` · set `git_menh`
179. `vp_0179` · **Nội Môn Token Đạo Chuông** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
180. `vp_0180` · **Trưởng Lão Firewall Dò Mạch Nghi** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
181. `vp_0181` · **Ký Danh Refactor Phù** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
182. `vp_0182` · **Ngoại Môn Merge Tâm Dược** · `pill` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
183. `vp_0183` · **Nội Môn Firewall Đạo Tài** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
184. `vp_0184` · **Trưởng Lão Refactor Bộ Linh Kiện** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
185. `vp_0185` · **Ký Danh Merge Ấn Kiếm** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
186. `vp_0186` · **Ngoại Môn Query Vân Y** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
187. `vp_0187` · **Nội Môn Debug Trận Bàn** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
188. `vp_0188` · **Trưởng Lão Runtime Truy Tung Kính** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
189. `vp_0189` · **Ký Danh Component Rollback Chỉ** · `talisman` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
190. `vp_0190` · **Ngoại Môn Index Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
191. `vp_0191` · **Nội Môn Cache Linh Thạch** · `upgrade_stone` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
192. `vp_0192` · **Trưởng Lão Legacy Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
193. `vp_0193` · **Ký Danh Rollback Phi Luân** · `weapon` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
194. `vp_0194` · **Ngoại Môn Schema Hộ Tâm Y** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
195. `vp_0195` · **Nội Môn Prompt Hồn Châu** · `artifact` · `git` · tier `noi_mon` · set `git_menh`
196. `vp_0196` · **Trưởng Lão Rollback Toolchain** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
197. `vp_0197` · **Ký Danh Schema Ấn Phù** · `talisman` · `bug` · tier `tap_dich` · set `debug_tram_bug`
198. `vp_0198` · **Ngoại Môn Prompt Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
199. `vp_0199` · **Nội Môn Agent Bảo Linh Tinh** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
200. `vp_0200` · **Trưởng Lão Deploy Bộ Linh Kiện** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
201. `vp_0201` · **Ký Danh Token Châm** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
202. `vp_0202` · **Ngoại Môn Firewall Giáp** · `armor` · `git` · tier `ngoai_mon` · set `git_menh`
203. `vp_0203` · **Nội Môn Refactor Linh Kính** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
204. `vp_0204` · **Trưởng Lão Merge Thiên Nhãn** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
205. `vp_0205` · **Ký Danh Query Phù** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
206. `vp_0206` · **Ngoại Môn Debug Tâm Dược** · `pill` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
207. `vp_0207` · **Nội Môn Runtime Core Mảnh** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
208. `vp_0208` · **Trưởng Lão Component Bộ Linh Kiện** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
209. `vp_0209` · **Ký Danh Debug Đao** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
210. `vp_0210` · **Ngoại Môn Runtime Vân Y** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
211. `vp_0211` · **Nội Môn Component Ngọc Giản** · `artifact` · `bug` · tier `noi_mon` · set `debug_tram_bug`
212. `vp_0212` · **Trưởng Lão Index Compiler Lò** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
213. `vp_0213` · **Ký Danh Cache Rollback Chỉ** · `talisman` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
214. `vp_0214` · **Ngoại Môn Legacy Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
215. `vp_0215` · **Nội Môn Rollback Nguyên Thiết** · `upgrade_stone` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
216. `vp_0216` · **Trưởng Lão Schema Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
217. `vp_0217` · **Ký Danh Prompt Lệnh Kích** · `weapon` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
218. `vp_0218` · **Ngoại Môn Agent Hộ Tâm Y** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
219. `vp_0219` · **Nội Môn Deploy Hồ Lô** · `artifact` · `git` · tier `noi_mon` · set `git_menh`
220. `vp_0220` · **Trưởng Lão Token Chổi Pháp** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
221. `vp_0221` · **Ký Danh Firewall Ấn Phù** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
222. `vp_0222` · **Ngoại Môn Deploy Tâm Dược** · `pill` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
223. `vp_0223` · **Nội Môn Token Đạo Tài** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
224. `vp_0224` · **Trưởng Lão Firewall Bộ Linh Kiện** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
225. `vp_0225` · **Ký Danh Refactor Kiếm** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
226. `vp_0226` · **Ngoại Môn Merge Giáp** · `armor` · `git` · tier `ngoai_mon` · set `git_menh`
227. `vp_0227` · **Nội Môn Query Pháp Ấn** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
228. `vp_0228` · **Trưởng Lão Debug Linh Bút** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
229. `vp_0229` · **Ký Danh Runtime Phù** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
230. `vp_0230` · **Ngoại Môn Component Tâm Dược** · `pill` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
231. `vp_0231` · **Nội Môn Index Linh Thạch** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
232. `vp_0232` · **Trưởng Lão Cache Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
233. `vp_0233` · **Ký Danh Legacy Phù Nhận** · `weapon` · `git` · tier `tap_dich` · set `git_menh`
234. `vp_0234` · **Ngoại Môn Rollback Vân Y** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
235. `vp_0235` · **Nội Môn Cache Đạo Chuông** · `artifact` · `bug` · tier `noi_mon` · set `debug_tram_bug`
236. `vp_0236` · **Trưởng Lão Legacy Dò Mạch Nghi** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
237. `vp_0237` · **Ký Danh Rollback Rollback Chỉ** · `talisman` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
238. `vp_0238` · **Ngoại Môn Schema Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
239. `vp_0239` · **Nội Môn Prompt Bảo Linh Tinh** · `upgrade_stone` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
240. `vp_0240` · **Trưởng Lão Agent Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
241. `vp_0241` · **Ký Danh Deploy Ấn Kiếm** · `weapon` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
242. `vp_0242` · **Ngoại Môn Token Hộ Tâm Y** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
243. `vp_0243` · **Nội Môn Firewall Trận Bàn** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
244. `vp_0244` · **Trưởng Lão Refactor Truy Tung Kính** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
245. `vp_0245` · **Ký Danh Merge Ấn Phù** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
246. `vp_0246` · **Ngoại Môn Query Tâm Dược** · `pill` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
247. `vp_0247` · **Nội Môn Debug Core Mảnh** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
248. `vp_0248` · **Trưởng Lão Merge Bộ Linh Kiện** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
249. `vp_0249` · **Ký Danh Query Phi Luân** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
250. `vp_0250` · **Ngoại Môn Debug Giáp** · `armor` · `git` · tier `ngoai_mon` · set `git_menh`
251. `vp_0251` · **Nội Môn Runtime Hồn Châu** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
252. `vp_0252` · **Trưởng Lão Component Toolchain** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
253. `vp_0253` · **Ký Danh Index Phù** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
254. `vp_0254` · **Ngoại Môn Cache Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
255. `vp_0255` · **Nội Môn Legacy Nguyên Thiết** · `upgrade_stone` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
256. `vp_0256` · **Trưởng Lão Rollback Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
257. `vp_0257` · **Ký Danh Schema Châm** · `weapon` · `git` · tier `tap_dich` · set `git_menh`
258. `vp_0258` · **Ngoại Môn Prompt Vân Y** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
259. `vp_0259` · **Nội Môn Agent Linh Kính** · `artifact` · `bug` · tier `noi_mon` · set `debug_tram_bug`
260. `vp_0260` · **Trưởng Lão Deploy Thiên Nhãn** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
261. `vp_0261` · **Ký Danh Prompt Rollback Chỉ** · `talisman` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
262. `vp_0262` · **Ngoại Môn Agent Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
263. `vp_0263` · **Nội Môn Deploy Đạo Tài** · `upgrade_stone` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
264. `vp_0264` · **Trưởng Lão Token Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
265. `vp_0265` · **Ký Danh Firewall Đao** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
266. `vp_0266` · **Ngoại Môn Refactor Hộ Tâm Y** · `armor` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
267. `vp_0267` · **Nội Môn Merge Ngọc Giản** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
268. `vp_0268` · **Trưởng Lão Query Compiler Lò** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
269. `vp_0269` · **Ký Danh Debug Ấn Phù** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
270. `vp_0270` · **Ngoại Môn Runtime Tâm Dược** · `pill` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
271. `vp_0271` · **Nội Môn Component Linh Thạch** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
272. `vp_0272` · **Trưởng Lão Index Bộ Linh Kiện** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
273. `vp_0273` · **Ký Danh Cache Lệnh Kích** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
274. `vp_0274` · **Ngoại Môn Component Giáp** · `armor` · `git` · tier `ngoai_mon` · set `git_menh`
275. `vp_0275` · **Nội Môn Index Hồ Lô** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
276. `vp_0276` · **Trưởng Lão Cache Chổi Pháp** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
277. `vp_0277` · **Ký Danh Legacy Phù** · `talisman` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
278. `vp_0278` · **Ngoại Môn Rollback Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
279. `vp_0279` · **Nội Môn Schema Bảo Linh Tinh** · `upgrade_stone` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
280. `vp_0280` · **Trưởng Lão Prompt Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
281. `vp_0281` · **Ký Danh Agent Kiếm** · `weapon` · `git` · tier `tap_dich` · set `git_menh`
282. `vp_0282` · **Ngoại Môn Deploy Vân Y** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
283. `vp_0283` · **Nội Môn Token Pháp Ấn** · `artifact` · `bug` · tier `noi_mon` · set `debug_tram_bug`
284. `vp_0284` · **Trưởng Lão Firewall Linh Bút** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
285. `vp_0285` · **Ký Danh Refactor Rollback Chỉ** · `talisman` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
286. `vp_0286` · **Ngoại Môn Merge Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
287. `vp_0287` · **Nội Môn Firewall Core Mảnh** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
288. `vp_0288` · **Trưởng Lão Refactor Bộ Linh Kiện** · `tool` · `git` · tier `truong_lao` · set `git_menh`
289. `vp_0289` · **Ký Danh Merge Phù Nhận** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
290. `vp_0290` · **Ngoại Môn Query Hộ Tâm Y** · `armor` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
291. `vp_0291` · **Nội Môn Debug Đạo Chuông** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
292. `vp_0292` · **Trưởng Lão Runtime Dò Mạch Nghi** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
293. `vp_0293` · **Ký Danh Component Ấn Phù** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
294. `vp_0294` · **Ngoại Môn Index Tâm Dược** · `pill` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
295. `vp_0295` · **Nội Môn Cache Nguyên Thiết** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
296. `vp_0296` · **Trưởng Lão Legacy Bộ Linh Kiện** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
297. `vp_0297` · **Ký Danh Rollback Ấn Kiếm** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
298. `vp_0298` · **Ngoại Môn Schema Giáp** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
299. `vp_0299` · **Nội Môn Prompt Trận Bàn** · `artifact` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
300. `vp_0300` · **Trưởng Lão Rollback Truy Tung Kính** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
301. `vp_0301` · **Ký Danh Schema Phù** · `talisman` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
302. `vp_0302` · **Ngoại Môn Prompt Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
303. `vp_0303` · **Nội Môn Agent Đạo Tài** · `upgrade_stone` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
304. `vp_0304` · **Trưởng Lão Deploy Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
305. `vp_0305` · **Ký Danh Token Phi Luân** · `weapon` · `git` · tier `tap_dich` · set `git_menh`
306. `vp_0306` · **Ngoại Môn Firewall Vân Y** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
307. `vp_0307` · **Nội Môn Refactor Hồn Châu** · `artifact` · `bug` · tier `noi_mon` · set `debug_tram_bug`
308. `vp_0308` · **Trưởng Lão Merge Toolchain** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
309. `vp_0309` · **Ký Danh Query Rollback Chỉ** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
310. `vp_0310` · **Ngoại Môn Debug Tâm Dược** · `pill` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
311. `vp_0311` · **Nội Môn Runtime Linh Thạch** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
312. `vp_0312` · **Trưởng Lão Component Bộ Linh Kiện** · `tool` · `git` · tier `truong_lao` · set `git_menh`
313. `vp_0313` · **Ký Danh Debug Châm** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
314. `vp_0314` · **Ngoại Môn Runtime Hộ Tâm Y** · `armor` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
315. `vp_0315` · **Nội Môn Component Linh Kính** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
316. `vp_0316` · **Trưởng Lão Index Thiên Nhãn** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
317. `vp_0317` · **Ký Danh Cache Ấn Phù** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
318. `vp_0318` · **Ngoại Môn Legacy Tâm Dược** · `pill` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
319. `vp_0319` · **Nội Môn Rollback Bảo Linh Tinh** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
320. `vp_0320` · **Trưởng Lão Schema Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
321. `vp_0321` · **Ký Danh Prompt Đao** · `weapon` · `bug` · tier `tap_dich` · set `debug_tram_bug`
322. `vp_0322` · **Ngoại Môn Agent Giáp** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
323. `vp_0323` · **Nội Môn Deploy Ngọc Giản** · `artifact` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
324. `vp_0324` · **Trưởng Lão Token Compiler Lò** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
325. `vp_0325` · **Ký Danh Firewall Phù** · `talisman` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
326. `vp_0326` · **Ngoại Môn Deploy Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
327. `vp_0327` · **Nội Môn Token Core Mảnh** · `upgrade_stone` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
328. `vp_0328` · **Trưởng Lão Firewall Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
329. `vp_0329` · **Ký Danh Refactor Lệnh Kích** · `weapon` · `git` · tier `tap_dich` · set `git_menh`
330. `vp_0330` · **Ngoại Môn Merge Vân Y** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
331. `vp_0331` · **Nội Môn Query Hồ Lô** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
332. `vp_0332` · **Trưởng Lão Debug Chổi Pháp** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
333. `vp_0333` · **Ký Danh Runtime Rollback Chỉ** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
334. `vp_0334` · **Ngoại Môn Component Tâm Dược** · `pill` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
335. `vp_0335` · **Nội Môn Index Nguyên Thiết** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
336. `vp_0336` · **Trưởng Lão Cache Bộ Linh Kiện** · `tool` · `git` · tier `truong_lao` · set `git_menh`
337. `vp_0337` · **Ký Danh Legacy Kiếm** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
338. `vp_0338` · **Ngoại Môn Rollback Hộ Tâm Y** · `armor` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
339. `vp_0339` · **Nội Môn Cache Pháp Ấn** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
340. `vp_0340` · **Trưởng Lão Legacy Linh Bút** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
341. `vp_0341` · **Ký Danh Rollback Ấn Phù** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
342. `vp_0342` · **Ngoại Môn Schema Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
343. `vp_0343` · **Nội Môn Prompt Đạo Tài** · `upgrade_stone` · `git` · tier `noi_mon` · set `git_menh`
344. `vp_0344` · **Trưởng Lão Agent Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
345. `vp_0345` · **Ký Danh Deploy Phù Nhận** · `weapon` · `bug` · tier `tap_dich` · set `debug_tram_bug`
346. `vp_0346` · **Ngoại Môn Token Giáp** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
347. `vp_0347` · **Nội Môn Firewall Đạo Chuông** · `artifact` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
348. `vp_0348` · **Trưởng Lão Refactor Dò Mạch Nghi** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
349. `vp_0349` · **Ký Danh Merge Phù** · `talisman` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
350. `vp_0350` · **Ngoại Môn Query Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
351. `vp_0351` · **Nội Môn Debug Linh Thạch** · `upgrade_stone` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
352. `vp_0352` · **Trưởng Lão Merge Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
353. `vp_0353` · **Ký Danh Query Ấn Kiếm** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
354. `vp_0354` · **Ngoại Môn Debug Vân Y** · `armor` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
355. `vp_0355` · **Nội Môn Runtime Trận Bàn** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
356. `vp_0356` · **Trưởng Lão Component Truy Tung Kính** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
357. `vp_0357` · **Ký Danh Index Rollback Chỉ** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
358. `vp_0358` · **Ngoại Môn Cache Tâm Dược** · `pill` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
359. `vp_0359` · **Nội Môn Legacy Bảo Linh Tinh** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
360. `vp_0360` · **Trưởng Lão Rollback Bộ Linh Kiện** · `tool` · `git` · tier `truong_lao` · set `git_menh`
361. `vp_0361` · **Ký Danh Schema Phi Luân** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
362. `vp_0362` · **Ngoại Môn Prompt Hộ Tâm Y** · `armor` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
363. `vp_0363` · **Nội Môn Agent Hồn Châu** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
364. `vp_0364` · **Trưởng Lão Deploy Toolchain** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
365. `vp_0365` · **Ký Danh Prompt Ấn Phù** · `talisman` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
366. `vp_0366` · **Ngoại Môn Agent Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
367. `vp_0367` · **Nội Môn Deploy Core Mảnh** · `upgrade_stone` · `git` · tier `noi_mon` · set `git_menh`
368. `vp_0368` · **Trưởng Lão Token Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
369. `vp_0369` · **Ký Danh Firewall Châm** · `weapon` · `bug` · tier `tap_dich` · set `debug_tram_bug`
370. `vp_0370` · **Ngoại Môn Refactor Giáp** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
371. `vp_0371` · **Nội Môn Merge Linh Kính** · `artifact` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
372. `vp_0372` · **Trưởng Lão Query Thiên Nhãn** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
373. `vp_0373` · **Ký Danh Debug Phù** · `talisman` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
374. `vp_0374` · **Ngoại Môn Runtime Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
375. `vp_0375` · **Nội Môn Component Nguyên Thiết** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
376. `vp_0376` · **Trưởng Lão Index Bộ Linh Kiện** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
377. `vp_0377` · **Ký Danh Cache Đao** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
378. `vp_0378` · **Ngoại Môn Component Vân Y** · `armor` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
379. `vp_0379` · **Nội Môn Index Ngọc Giản** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
380. `vp_0380` · **Trưởng Lão Cache Compiler Lò** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
381. `vp_0381` · **Ký Danh Legacy Rollback Chỉ** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
382. `vp_0382` · **Ngoại Môn Rollback Tâm Dược** · `pill` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
383. `vp_0383` · **Nội Môn Schema Đạo Tài** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
384. `vp_0384` · **Trưởng Lão Prompt Bộ Linh Kiện** · `tool` · `git` · tier `truong_lao` · set `git_menh`
385. `vp_0385` · **Ký Danh Agent Lệnh Kích** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
386. `vp_0386` · **Ngoại Môn Deploy Hộ Tâm Y** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
387. `vp_0387` · **Nội Môn Token Hồ Lô** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
388. `vp_0388` · **Trưởng Lão Firewall Chổi Pháp** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
389. `vp_0389` · **Ký Danh Refactor Ấn Phù** · `talisman` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
390. `vp_0390` · **Ngoại Môn Merge Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
391. `vp_0391` · **Nội Môn Firewall Linh Thạch** · `upgrade_stone` · `git` · tier `noi_mon` · set `git_menh`
392. `vp_0392` · **Trưởng Lão Refactor Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
393. `vp_0393` · **Ký Danh Merge Kiếm** · `weapon` · `bug` · tier `tap_dich` · set `debug_tram_bug`
394. `vp_0394` · **Ngoại Môn Query Giáp** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
395. `vp_0395` · **Nội Môn Debug Pháp Ấn** · `artifact` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
396. `vp_0396` · **Trưởng Lão Runtime Linh Bút** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
397. `vp_0397` · **Ký Danh Component Phù** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
398. `vp_0398` · **Ngoại Môn Index Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
399. `vp_0399` · **Nội Môn Cache Bảo Linh Tinh** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
400. `vp_0400` · **Trưởng Lão Legacy Bộ Linh Kiện** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
401. `vp_0401` · **Ký Danh Rollback Phù Nhận** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
402. `vp_0402` · **Ngoại Môn Schema Vân Y** · `armor` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
403. `vp_0403` · **Nội Môn Prompt Đạo Chuông** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
404. `vp_0404` · **Trưởng Lão Rollback Dò Mạch Nghi** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
405. `vp_0405` · **Ký Danh Schema Rollback Chỉ** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
406. `vp_0406` · **Ngoại Môn Prompt Tâm Dược** · `pill` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
407. `vp_0407` · **Nội Môn Agent Core Mảnh** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
408. `vp_0408` · **Trưởng Lão Deploy Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
409. `vp_0409` · **Ký Danh Token Ấn Kiếm** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
410. `vp_0410` · **Ngoại Môn Firewall Hộ Tâm Y** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
411. `vp_0411` · **Nội Môn Refactor Trận Bàn** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
412. `vp_0412` · **Trưởng Lão Merge Truy Tung Kính** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
413. `vp_0413` · **Ký Danh Query Ấn Phù** · `talisman` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
414. `vp_0414` · **Ngoại Môn Debug Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
415. `vp_0415` · **Nội Môn Runtime Nguyên Thiết** · `upgrade_stone` · `git` · tier `noi_mon` · set `git_menh`
416. `vp_0416` · **Trưởng Lão Component Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
417. `vp_0417` · **Ký Danh Debug Phi Luân** · `weapon` · `bug` · tier `tap_dich` · set `debug_tram_bug`
418. `vp_0418` · **Ngoại Môn Runtime Giáp** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
419. `vp_0419` · **Nội Môn Component Hồn Châu** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
420. `vp_0420` · **Trưởng Lão Index Toolchain** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
421. `vp_0421` · **Ký Danh Cache Phù** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
422. `vp_0422` · **Ngoại Môn Legacy Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
423. `vp_0423` · **Nội Môn Rollback Đạo Tài** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
424. `vp_0424` · **Trưởng Lão Schema Bộ Linh Kiện** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
425. `vp_0425` · **Ký Danh Prompt Châm** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
426. `vp_0426` · **Ngoại Môn Agent Vân Y** · `armor` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
427. `vp_0427` · **Nội Môn Deploy Linh Kính** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
428. `vp_0428` · **Trưởng Lão Token Thiên Nhãn** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
429. `vp_0429` · **Ký Danh Firewall Rollback Chỉ** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
430. `vp_0430` · **Ngoại Môn Deploy Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
431. `vp_0431` · **Nội Môn Token Linh Thạch** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
432. `vp_0432` · **Trưởng Lão Firewall Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
433. `vp_0433` · **Ký Danh Refactor Đao** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
434. `vp_0434` · **Ngoại Môn Merge Hộ Tâm Y** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
435. `vp_0435` · **Nội Môn Query Ngọc Giản** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
436. `vp_0436` · **Trưởng Lão Debug Compiler Lò** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
437. `vp_0437` · **Ký Danh Runtime Ấn Phù** · `talisman` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
438. `vp_0438` · **Ngoại Môn Component Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
439. `vp_0439` · **Nội Môn Index Bảo Linh Tinh** · `upgrade_stone` · `git` · tier `noi_mon` · set `git_menh`
440. `vp_0440` · **Trưởng Lão Cache Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
441. `vp_0441` · **Ký Danh Legacy Lệnh Kích** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
442. `vp_0442` · **Ngoại Môn Rollback Giáp** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
443. `vp_0443` · **Nội Môn Cache Hồ Lô** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
444. `vp_0444` · **Trưởng Lão Legacy Chổi Pháp** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
445. `vp_0445` · **Ký Danh Rollback Phù** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
446. `vp_0446` · **Ngoại Môn Schema Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
447. `vp_0447` · **Nội Môn Prompt Core Mảnh** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
448. `vp_0448` · **Trưởng Lão Agent Bộ Linh Kiện** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
449. `vp_0449` · **Ký Danh Deploy Kiếm** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
450. `vp_0450` · **Ngoại Môn Token Vân Y** · `armor` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
451. `vp_0451` · **Nội Môn Firewall Pháp Ấn** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
452. `vp_0452` · **Trưởng Lão Refactor Linh Bút** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
453. `vp_0453` · **Ký Danh Merge Rollback Chỉ** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
454. `vp_0454` · **Ngoại Môn Query Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
455. `vp_0455` · **Nội Môn Debug Nguyên Thiết** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
456. `vp_0456` · **Trưởng Lão Merge Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
457. `vp_0457` · **Ký Danh Query Phù Nhận** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
458. `vp_0458` · **Ngoại Môn Debug Hộ Tâm Y** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
459. `vp_0459` · **Nội Môn Runtime Đạo Chuông** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
460. `vp_0460` · **Trưởng Lão Component Dò Mạch Nghi** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
461. `vp_0461` · **Ký Danh Index Ấn Phù** · `talisman` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
462. `vp_0462` · **Ngoại Môn Cache Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
463. `vp_0463` · **Nội Môn Legacy Đạo Tài** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
464. `vp_0464` · **Trưởng Lão Rollback Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
465. `vp_0465` · **Ký Danh Schema Ấn Kiếm** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
466. `vp_0466` · **Ngoại Môn Prompt Giáp** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
467. `vp_0467` · **Nội Môn Agent Trận Bàn** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
468. `vp_0468` · **Trưởng Lão Deploy Truy Tung Kính** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
469. `vp_0469` · **Ký Danh Prompt Phù** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
470. `vp_0470` · **Ngoại Môn Agent Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
471. `vp_0471` · **Nội Môn Deploy Linh Thạch** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
472. `vp_0472` · **Trưởng Lão Token Bộ Linh Kiện** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
473. `vp_0473` · **Ký Danh Firewall Phi Luân** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
474. `vp_0474` · **Ngoại Môn Refactor Vân Y** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
475. `vp_0475` · **Nội Môn Merge Hồn Châu** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
476. `vp_0476` · **Trưởng Lão Query Toolchain** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
477. `vp_0477` · **Ký Danh Debug Rollback Chỉ** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
478. `vp_0478` · **Ngoại Môn Runtime Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
479. `vp_0479` · **Nội Môn Component Bảo Linh Tinh** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
480. `vp_0480` · **Trưởng Lão Index Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
481. `vp_0481` · **Ký Danh Cache Châm** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
482. `vp_0482` · **Ngoại Môn Component Hộ Tâm Y** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
483. `vp_0483` · **Nội Môn Index Linh Kính** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
484. `vp_0484` · **Trưởng Lão Cache Thiên Nhãn** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
485. `vp_0485` · **Ký Danh Legacy Ấn Phù** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
486. `vp_0486` · **Ngoại Môn Rollback Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
487. `vp_0487` · **Nội Môn Schema Core Mảnh** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
488. `vp_0488` · **Trưởng Lão Prompt Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
489. `vp_0489` · **Ký Danh Agent Đao** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
490. `vp_0490` · **Ngoại Môn Deploy Giáp** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
491. `vp_0491` · **Nội Môn Token Ngọc Giản** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
492. `vp_0492` · **Trưởng Lão Firewall Compiler Lò** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
493. `vp_0493` · **Ký Danh Refactor Phù** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
494. `vp_0494` · **Ngoại Môn Merge Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
495. `vp_0495` · **Nội Môn Firewall Nguyên Thiết** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
496. `vp_0496` · **Trưởng Lão Refactor Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
497. `vp_0497` · **Ký Danh Merge Lệnh Kích** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
498. `vp_0498` · **Ngoại Môn Query Vân Y** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
499. `vp_0499` · **Nội Môn Debug Hồ Lô** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
500. `vp_0500` · **Trưởng Lão Runtime Chổi Pháp** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
501. `vp_0501` · **Ký Danh Component Rollback Chỉ** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
502. `vp_0502` · **Ngoại Môn Index Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
503. `vp_0503` · **Nội Môn Cache Đạo Tài** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
504. `vp_0504` · **Trưởng Lão Legacy Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
505. `vp_0505` · **Ký Danh Rollback Kiếm** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
506. `vp_0506` · **Ngoại Môn Schema Hộ Tâm Y** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
507. `vp_0507` · **Nội Môn Prompt Pháp Ấn** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
508. `vp_0508` · **Trưởng Lão Rollback Linh Bút** · `tool` · `git` · tier `truong_lao` · set `git_menh`
509. `vp_0509` · **Ký Danh Schema Ấn Phù** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
510. `vp_0510` · **Ngoại Môn Prompt Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
511. `vp_0511` · **Nội Môn Agent Linh Thạch** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
512. `vp_0512` · **Trưởng Lão Deploy Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
513. `vp_0513` · **Ký Danh Token Phù Nhận** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
514. `vp_0514` · **Ngoại Môn Firewall Giáp** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
515. `vp_0515` · **Nội Môn Refactor Đạo Chuông** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
516. `vp_0516` · **Trưởng Lão Merge Dò Mạch Nghi** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
517. `vp_0517` · **Ký Danh Query Phù** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
518. `vp_0518` · **Ngoại Môn Debug Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
519. `vp_0519` · **Nội Môn Runtime Bảo Linh Tinh** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
520. `vp_0520` · **Trưởng Lão Component Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
521. `vp_0521` · **Ký Danh Debug Ấn Kiếm** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
522. `vp_0522` · **Ngoại Môn Runtime Vân Y** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
523. `vp_0523` · **Nội Môn Component Trận Bàn** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
524. `vp_0524` · **Trưởng Lão Index Truy Tung Kính** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
525. `vp_0525` · **Ký Danh Cache Rollback Chỉ** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
526. `vp_0526` · **Ngoại Môn Legacy Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
527. `vp_0527` · **Nội Môn Rollback Core Mảnh** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
528. `vp_0528` · **Trưởng Lão Schema Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
529. `vp_0529` · **Ký Danh Prompt Phi Luân** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
530. `vp_0530` · **Ngoại Môn Agent Hộ Tâm Y** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
531. `vp_0531` · **Nội Môn Deploy Hồn Châu** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
532. `vp_0532` · **Trưởng Lão Token Toolchain** · `tool` · `git` · tier `truong_lao` · set `git_menh`
533. `vp_0533` · **Ký Danh Firewall Ấn Phù** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
534. `vp_0534` · **Ngoại Môn Deploy Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
535. `vp_0535` · **Nội Môn Token Nguyên Thiết** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
536. `vp_0536` · **Trưởng Lão Firewall Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
537. `vp_0537` · **Ký Danh Refactor Châm** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
538. `vp_0538` · **Ngoại Môn Merge Giáp** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
539. `vp_0539` · **Nội Môn Query Linh Kính** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
540. `vp_0540` · **Trưởng Lão Debug Thiên Nhãn** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
541. `vp_0541` · **Ký Danh Runtime Phù** · `talisman` · `bug` · tier `tap_dich` · set `debug_tram_bug`
542. `vp_0542` · **Ngoại Môn Component Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
543. `vp_0543` · **Nội Môn Index Đạo Tài** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
544. `vp_0544` · **Trưởng Lão Cache Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
545. `vp_0545` · **Ký Danh Legacy Đao** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
546. `vp_0546` · **Ngoại Môn Rollback Vân Y** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
547. `vp_0547` · **Nội Môn Cache Ngọc Giản** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
548. `vp_0548` · **Trưởng Lão Legacy Compiler Lò** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
549. `vp_0549` · **Ký Danh Rollback Rollback Chỉ** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
550. `vp_0550` · **Ngoại Môn Schema Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
551. `vp_0551` · **Nội Môn Prompt Linh Thạch** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
552. `vp_0552` · **Trưởng Lão Agent Bộ Linh Kiện** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
553. `vp_0553` · **Ký Danh Deploy Lệnh Kích** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
554. `vp_0554` · **Ngoại Môn Token Hộ Tâm Y** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
555. `vp_0555` · **Nội Môn Firewall Hồ Lô** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
556. `vp_0556` · **Trưởng Lão Refactor Chổi Pháp** · `tool` · `git` · tier `truong_lao` · set `git_menh`
557. `vp_0557` · **Ký Danh Merge Ấn Phù** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
558. `vp_0558` · **Ngoại Môn Query Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
559. `vp_0559` · **Nội Môn Debug Bảo Linh Tinh** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
560. `vp_0560` · **Trưởng Lão Merge Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
561. `vp_0561` · **Ký Danh Query Kiếm** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
562. `vp_0562` · **Ngoại Môn Debug Giáp** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
563. `vp_0563` · **Nội Môn Runtime Pháp Ấn** · `artifact` · `git` · tier `noi_mon` · set `git_menh`
564. `vp_0564` · **Trưởng Lão Component Linh Bút** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
565. `vp_0565` · **Ký Danh Index Phù** · `talisman` · `bug` · tier `tap_dich` · set `debug_tram_bug`
566. `vp_0566` · **Ngoại Môn Cache Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
567. `vp_0567` · **Nội Môn Legacy Core Mảnh** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
568. `vp_0568` · **Trưởng Lão Rollback Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
569. `vp_0569` · **Ký Danh Schema Phù Nhận** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
570. `vp_0570` · **Ngoại Môn Prompt Vân Y** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
571. `vp_0571` · **Nội Môn Agent Đạo Chuông** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
572. `vp_0572` · **Trưởng Lão Deploy Dò Mạch Nghi** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
573. `vp_0573` · **Ký Danh Prompt Rollback Chỉ** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
574. `vp_0574` · **Ngoại Môn Agent Tâm Dược** · `pill` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
575. `vp_0575` · **Nội Môn Deploy Nguyên Thiết** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
576. `vp_0576` · **Trưởng Lão Token Bộ Linh Kiện** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
577. `vp_0577` · **Ký Danh Firewall Ấn Kiếm** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
578. `vp_0578` · **Ngoại Môn Refactor Hộ Tâm Y** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
579. `vp_0579` · **Nội Môn Merge Trận Bàn** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
580. `vp_0580` · **Trưởng Lão Query Truy Tung Kính** · `tool` · `git` · tier `truong_lao` · set `git_menh`
581. `vp_0581` · **Ký Danh Debug Ấn Phù** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
582. `vp_0582` · **Ngoại Môn Runtime Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
583. `vp_0583` · **Nội Môn Component Đạo Tài** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
584. `vp_0584` · **Trưởng Lão Index Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
585. `vp_0585` · **Ký Danh Cache Phi Luân** · `weapon` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
586. `vp_0586` · **Ngoại Môn Component Giáp** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
587. `vp_0587` · **Nội Môn Index Hồn Châu** · `artifact` · `git` · tier `noi_mon` · set `git_menh`
588. `vp_0588` · **Trưởng Lão Cache Toolchain** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
589. `vp_0589` · **Ký Danh Legacy Phù** · `talisman` · `bug` · tier `tap_dich` · set `debug_tram_bug`
590. `vp_0590` · **Ngoại Môn Rollback Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
591. `vp_0591` · **Nội Môn Schema Linh Thạch** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
592. `vp_0592` · **Trưởng Lão Prompt Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
593. `vp_0593` · **Ký Danh Agent Châm** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
594. `vp_0594` · **Ngoại Môn Deploy Vân Y** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
595. `vp_0595` · **Nội Môn Token Linh Kính** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
596. `vp_0596` · **Trưởng Lão Firewall Thiên Nhãn** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
597. `vp_0597` · **Ký Danh Refactor Rollback Chỉ** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
598. `vp_0598` · **Ngoại Môn Merge Tâm Dược** · `pill` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
599. `vp_0599` · **Nội Môn Firewall Bảo Linh Tinh** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
600. `vp_0600` · **Trưởng Lão Refactor Bộ Linh Kiện** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
601. `vp_0601` · **Ký Danh Merge Đao** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
602. `vp_0602` · **Ngoại Môn Query Hộ Tâm Y** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
603. `vp_0603` · **Nội Môn Debug Ngọc Giản** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
604. `vp_0604` · **Trưởng Lão Runtime Compiler Lò** · `tool` · `git` · tier `truong_lao` · set `git_menh`
605. `vp_0605` · **Ký Danh Component Ấn Phù** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
606. `vp_0606` · **Ngoại Môn Index Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
607. `vp_0607` · **Nội Môn Cache Core Mảnh** · `upgrade_stone` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
608. `vp_0608` · **Trưởng Lão Legacy Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
609. `vp_0609` · **Ký Danh Rollback Lệnh Kích** · `weapon` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
610. `vp_0610` · **Ngoại Môn Schema Giáp** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
611. `vp_0611` · **Nội Môn Prompt Hồ Lô** · `artifact` · `git` · tier `noi_mon` · set `git_menh`
612. `vp_0612` · **Trưởng Lão Rollback Chổi Pháp** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
613. `vp_0613` · **Ký Danh Schema Phù** · `talisman` · `bug` · tier `tap_dich` · set `debug_tram_bug`
614. `vp_0614` · **Ngoại Môn Prompt Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
615. `vp_0615` · **Nội Môn Agent Nguyên Thiết** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
616. `vp_0616` · **Trưởng Lão Deploy Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
617. `vp_0617` · **Ký Danh Token Kiếm** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
618. `vp_0618` · **Ngoại Môn Firewall Vân Y** · `armor` · `git` · tier `ngoai_mon` · set `git_menh`
619. `vp_0619` · **Nội Môn Refactor Pháp Ấn** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
620. `vp_0620` · **Trưởng Lão Merge Linh Bút** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
621. `vp_0621` · **Ký Danh Query Rollback Chỉ** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
622. `vp_0622` · **Ngoại Môn Debug Tâm Dược** · `pill` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
623. `vp_0623` · **Nội Môn Runtime Đạo Tài** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
624. `vp_0624` · **Trưởng Lão Component Bộ Linh Kiện** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
625. `vp_0625` · **Ký Danh Debug Phù Nhận** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
626. `vp_0626` · **Ngoại Môn Runtime Hộ Tâm Y** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
627. `vp_0627` · **Nội Môn Component Đạo Chuông** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
628. `vp_0628` · **Trưởng Lão Index Dò Mạch Nghi** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
629. `vp_0629` · **Ký Danh Cache Ấn Phù** · `talisman` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
630. `vp_0630` · **Ngoại Môn Legacy Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
631. `vp_0631` · **Nội Môn Rollback Linh Thạch** · `upgrade_stone` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
632. `vp_0632` · **Trưởng Lão Schema Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
633. `vp_0633` · **Ký Danh Prompt Ấn Kiếm** · `weapon` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
634. `vp_0634` · **Ngoại Môn Agent Giáp** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
635. `vp_0635` · **Nội Môn Deploy Trận Bàn** · `artifact` · `git` · tier `noi_mon` · set `git_menh`
636. `vp_0636` · **Trưởng Lão Token Truy Tung Kính** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
637. `vp_0637` · **Ký Danh Firewall Phù** · `talisman` · `bug` · tier `tap_dich` · set `debug_tram_bug`
638. `vp_0638` · **Ngoại Môn Deploy Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
639. `vp_0639` · **Nội Môn Token Bảo Linh Tinh** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
640. `vp_0640` · **Trưởng Lão Firewall Bộ Linh Kiện** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
641. `vp_0641` · **Ký Danh Refactor Phi Luân** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
642. `vp_0642` · **Ngoại Môn Merge Vân Y** · `armor` · `git` · tier `ngoai_mon` · set `git_menh`
643. `vp_0643` · **Nội Môn Query Hồn Châu** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
644. `vp_0644` · **Trưởng Lão Debug Toolchain** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
645. `vp_0645` · **Ký Danh Runtime Rollback Chỉ** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
646. `vp_0646` · **Ngoại Môn Component Tâm Dược** · `pill` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
647. `vp_0647` · **Nội Môn Index Core Mảnh** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
648. `vp_0648` · **Trưởng Lão Cache Bộ Linh Kiện** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
649. `vp_0649` · **Ký Danh Legacy Châm** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
650. `vp_0650` · **Ngoại Môn Rollback Hộ Tâm Y** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
651. `vp_0651` · **Nội Môn Cache Linh Kính** · `artifact` · `bug` · tier `noi_mon` · set `debug_tram_bug`
652. `vp_0652` · **Trưởng Lão Legacy Thiên Nhãn** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
653. `vp_0653` · **Ký Danh Rollback Ấn Phù** · `talisman` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
654. `vp_0654` · **Ngoại Môn Schema Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
655. `vp_0655` · **Nội Môn Prompt Nguyên Thiết** · `upgrade_stone` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
656. `vp_0656` · **Trưởng Lão Agent Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
657. `vp_0657` · **Ký Danh Deploy Đao** · `weapon` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
658. `vp_0658` · **Ngoại Môn Token Giáp** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
659. `vp_0659` · **Nội Môn Firewall Ngọc Giản** · `artifact` · `git` · tier `noi_mon` · set `git_menh`
660. `vp_0660` · **Trưởng Lão Refactor Compiler Lò** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
661. `vp_0661` · **Ký Danh Merge Phù** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
662. `vp_0662` · **Ngoại Môn Query Tâm Dược** · `pill` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
663. `vp_0663` · **Nội Môn Debug Đạo Tài** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
664. `vp_0664` · **Trưởng Lão Merge Bộ Linh Kiện** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
665. `vp_0665` · **Ký Danh Query Lệnh Kích** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
666. `vp_0666` · **Ngoại Môn Debug Vân Y** · `armor` · `git` · tier `ngoai_mon` · set `git_menh`
667. `vp_0667` · **Nội Môn Runtime Hồ Lô** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
668. `vp_0668` · **Trưởng Lão Component Chổi Pháp** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
669. `vp_0669` · **Ký Danh Index Rollback Chỉ** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
670. `vp_0670` · **Ngoại Môn Cache Tâm Dược** · `pill` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
671. `vp_0671` · **Nội Môn Legacy Linh Thạch** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
672. `vp_0672` · **Trưởng Lão Rollback Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
673. `vp_0673` · **Ký Danh Schema Kiếm** · `weapon` · `git` · tier `tap_dich` · set `git_menh`
674. `vp_0674` · **Ngoại Môn Prompt Hộ Tâm Y** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
675. `vp_0675` · **Nội Môn Agent Pháp Ấn** · `artifact` · `bug` · tier `noi_mon` · set `debug_tram_bug`
676. `vp_0676` · **Trưởng Lão Deploy Linh Bút** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
677. `vp_0677` · **Ký Danh Prompt Ấn Phù** · `talisman` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
678. `vp_0678` · **Ngoại Môn Agent Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
679. `vp_0679` · **Nội Môn Deploy Bảo Linh Tinh** · `upgrade_stone` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
680. `vp_0680` · **Trưởng Lão Token Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
681. `vp_0681` · **Ký Danh Firewall Phù Nhận** · `weapon` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
682. `vp_0682` · **Ngoại Môn Refactor Giáp** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
683. `vp_0683` · **Nội Môn Merge Đạo Chuông** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
684. `vp_0684` · **Trưởng Lão Query Dò Mạch Nghi** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
685. `vp_0685` · **Ký Danh Debug Phù** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
686. `vp_0686` · **Ngoại Môn Runtime Tâm Dược** · `pill` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
687. `vp_0687` · **Nội Môn Component Core Mảnh** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
688. `vp_0688` · **Trưởng Lão Index Bộ Linh Kiện** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
689. `vp_0689` · **Ký Danh Cache Ấn Kiếm** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
690. `vp_0690` · **Ngoại Môn Component Vân Y** · `armor` · `git` · tier `ngoai_mon` · set `git_menh`
691. `vp_0691` · **Nội Môn Index Trận Bàn** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
692. `vp_0692` · **Trưởng Lão Cache Truy Tung Kính** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
693. `vp_0693` · **Ký Danh Legacy Rollback Chỉ** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
694. `vp_0694` · **Ngoại Môn Rollback Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
695. `vp_0695` · **Nội Môn Schema Nguyên Thiết** · `upgrade_stone` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
696. `vp_0696` · **Trưởng Lão Prompt Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
697. `vp_0697` · **Ký Danh Agent Phi Luân** · `weapon` · `git` · tier `tap_dich` · set `git_menh`
698. `vp_0698` · **Ngoại Môn Deploy Hộ Tâm Y** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
699. `vp_0699` · **Nội Môn Token Hồn Châu** · `artifact` · `bug` · tier `noi_mon` · set `debug_tram_bug`
700. `vp_0700` · **Trưởng Lão Firewall Toolchain** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
701. `vp_0701` · **Ký Danh Refactor Ấn Phù** · `talisman` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
702. `vp_0702` · **Ngoại Môn Merge Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
703. `vp_0703` · **Nội Môn Firewall Đạo Tài** · `upgrade_stone` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
704. `vp_0704` · **Trưởng Lão Refactor Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
705. `vp_0705` · **Ký Danh Merge Châm** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
706. `vp_0706` · **Ngoại Môn Query Giáp** · `armor` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
707. `vp_0707` · **Nội Môn Debug Linh Kính** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
708. `vp_0708` · **Trưởng Lão Runtime Thiên Nhãn** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
709. `vp_0709` · **Ký Danh Component Phù** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
710. `vp_0710` · **Ngoại Môn Index Tâm Dược** · `pill` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
711. `vp_0711` · **Nội Môn Cache Linh Thạch** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
712. `vp_0712` · **Trưởng Lão Legacy Bộ Linh Kiện** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
713. `vp_0713` · **Ký Danh Rollback Đao** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
714. `vp_0714` · **Ngoại Môn Schema Vân Y** · `armor` · `git` · tier `ngoai_mon` · set `git_menh`
715. `vp_0715` · **Nội Môn Prompt Ngọc Giản** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
716. `vp_0716` · **Trưởng Lão Rollback Compiler Lò** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
717. `vp_0717` · **Ký Danh Schema Rollback Chỉ** · `talisman` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
718. `vp_0718` · **Ngoại Môn Prompt Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
719. `vp_0719` · **Nội Môn Agent Bảo Linh Tinh** · `upgrade_stone` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
720. `vp_0720` · **Trưởng Lão Deploy Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
721. `vp_0721` · **Ký Danh Token Lệnh Kích** · `weapon` · `git` · tier `tap_dich` · set `git_menh`
722. `vp_0722` · **Ngoại Môn Firewall Hộ Tâm Y** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
723. `vp_0723` · **Nội Môn Refactor Hồ Lô** · `artifact` · `bug` · tier `noi_mon` · set `debug_tram_bug`
724. `vp_0724` · **Trưởng Lão Merge Chổi Pháp** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
725. `vp_0725` · **Ký Danh Query Ấn Phù** · `talisman` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
726. `vp_0726` · **Ngoại Môn Debug Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
727. `vp_0727` · **Nội Môn Runtime Core Mảnh** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
728. `vp_0728` · **Trưởng Lão Component Bộ Linh Kiện** · `tool` · `git` · tier `truong_lao` · set `git_menh`
729. `vp_0729` · **Ký Danh Debug Kiếm** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
730. `vp_0730` · **Ngoại Môn Runtime Giáp** · `armor` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
731. `vp_0731` · **Nội Môn Component Pháp Ấn** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
732. `vp_0732` · **Trưởng Lão Index Linh Bút** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
733. `vp_0733` · **Ký Danh Cache Phù** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
734. `vp_0734` · **Ngoại Môn Legacy Tâm Dược** · `pill` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
735. `vp_0735` · **Nội Môn Rollback Nguyên Thiết** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
736. `vp_0736` · **Trưởng Lão Schema Bộ Linh Kiện** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
737. `vp_0737` · **Ký Danh Prompt Phù Nhận** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
738. `vp_0738` · **Ngoại Môn Agent Vân Y** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
739. `vp_0739` · **Nội Môn Deploy Đạo Chuông** · `artifact` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
740. `vp_0740` · **Trưởng Lão Token Dò Mạch Nghi** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
741. `vp_0741` · **Ký Danh Firewall Rollback Chỉ** · `talisman` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
742. `vp_0742` · **Ngoại Môn Deploy Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
743. `vp_0743` · **Nội Môn Token Đạo Tài** · `upgrade_stone` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
744. `vp_0744` · **Trưởng Lão Firewall Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
745. `vp_0745` · **Ký Danh Refactor Ấn Kiếm** · `weapon` · `git` · tier `tap_dich` · set `git_menh`
746. `vp_0746` · **Ngoại Môn Merge Hộ Tâm Y** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
747. `vp_0747` · **Nội Môn Query Trận Bàn** · `artifact` · `bug` · tier `noi_mon` · set `debug_tram_bug`
748. `vp_0748` · **Trưởng Lão Debug Truy Tung Kính** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
749. `vp_0749` · **Ký Danh Runtime Ấn Phù** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
750. `vp_0750` · **Ngoại Môn Component Tâm Dược** · `pill` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
751. `vp_0751` · **Nội Môn Index Linh Thạch** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
752. `vp_0752` · **Trưởng Lão Cache Bộ Linh Kiện** · `tool` · `git` · tier `truong_lao` · set `git_menh`
753. `vp_0753` · **Ký Danh Legacy Phi Luân** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
754. `vp_0754` · **Ngoại Môn Rollback Giáp** · `armor` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
755. `vp_0755` · **Nội Môn Cache Hồn Châu** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
756. `vp_0756` · **Trưởng Lão Legacy Toolchain** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
757. `vp_0757` · **Ký Danh Rollback Phù** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
758. `vp_0758` · **Ngoại Môn Schema Tâm Dược** · `pill` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
759. `vp_0759` · **Nội Môn Prompt Bảo Linh Tinh** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
760. `vp_0760` · **Trưởng Lão Agent Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
761. `vp_0761` · **Ký Danh Deploy Châm** · `weapon` · `bug` · tier `tap_dich` · set `debug_tram_bug`
762. `vp_0762` · **Ngoại Môn Token Vân Y** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
763. `vp_0763` · **Nội Môn Firewall Linh Kính** · `artifact` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
764. `vp_0764` · **Trưởng Lão Refactor Thiên Nhãn** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
765. `vp_0765` · **Ký Danh Merge Rollback Chỉ** · `talisman` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
766. `vp_0766` · **Ngoại Môn Query Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
767. `vp_0767` · **Nội Môn Debug Core Mảnh** · `upgrade_stone` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
768. `vp_0768` · **Trưởng Lão Merge Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
769. `vp_0769` · **Ký Danh Query Đao** · `weapon` · `git` · tier `tap_dich` · set `git_menh`
770. `vp_0770` · **Ngoại Môn Debug Hộ Tâm Y** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
771. `vp_0771` · **Nội Môn Runtime Ngọc Giản** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
772. `vp_0772` · **Trưởng Lão Component Compiler Lò** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
773. `vp_0773` · **Ký Danh Index Ấn Phù** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
774. `vp_0774` · **Ngoại Môn Cache Tâm Dược** · `pill` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
775. `vp_0775` · **Nội Môn Legacy Nguyên Thiết** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
776. `vp_0776` · **Trưởng Lão Rollback Bộ Linh Kiện** · `tool` · `git` · tier `truong_lao` · set `git_menh`
777. `vp_0777` · **Ký Danh Schema Lệnh Kích** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
778. `vp_0778` · **Ngoại Môn Prompt Giáp** · `armor` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
779. `vp_0779` · **Nội Môn Agent Hồ Lô** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
780. `vp_0780` · **Trưởng Lão Deploy Chổi Pháp** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
781. `vp_0781` · **Ký Danh Prompt Phù** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
782. `vp_0782` · **Ngoại Môn Agent Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
783. `vp_0783` · **Nội Môn Deploy Đạo Tài** · `upgrade_stone` · `git` · tier `noi_mon` · set `git_menh`
784. `vp_0784` · **Trưởng Lão Token Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
785. `vp_0785` · **Ký Danh Firewall Kiếm** · `weapon` · `bug` · tier `tap_dich` · set `debug_tram_bug`
786. `vp_0786` · **Ngoại Môn Refactor Vân Y** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
787. `vp_0787` · **Nội Môn Merge Pháp Ấn** · `artifact` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
788. `vp_0788` · **Trưởng Lão Query Linh Bút** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
789. `vp_0789` · **Ký Danh Debug Rollback Chỉ** · `talisman` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
790. `vp_0790` · **Ngoại Môn Runtime Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
791. `vp_0791` · **Nội Môn Component Linh Thạch** · `upgrade_stone` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
792. `vp_0792` · **Trưởng Lão Index Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
793. `vp_0793` · **Ký Danh Cache Phù Nhận** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
794. `vp_0794` · **Ngoại Môn Component Hộ Tâm Y** · `armor` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
795. `vp_0795` · **Nội Môn Index Đạo Chuông** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
796. `vp_0796` · **Trưởng Lão Cache Dò Mạch Nghi** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
797. `vp_0797` · **Ký Danh Legacy Ấn Phù** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
798. `vp_0798` · **Ngoại Môn Rollback Tâm Dược** · `pill` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
799. `vp_0799` · **Nội Môn Schema Bảo Linh Tinh** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
800. `vp_0800` · **Trưởng Lão Prompt Bộ Linh Kiện** · `tool` · `git` · tier `truong_lao` · set `git_menh`
801. `vp_0801` · **Ký Danh Agent Ấn Kiếm** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
802. `vp_0802` · **Ngoại Môn Deploy Giáp** · `armor` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
803. `vp_0803` · **Nội Môn Token Trận Bàn** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
804. `vp_0804` · **Trưởng Lão Firewall Truy Tung Kính** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
805. `vp_0805` · **Ký Danh Refactor Phù** · `talisman` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
806. `vp_0806` · **Ngoại Môn Merge Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
807. `vp_0807` · **Nội Môn Firewall Core Mảnh** · `upgrade_stone` · `git` · tier `noi_mon` · set `git_menh`
808. `vp_0808` · **Trưởng Lão Refactor Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
809. `vp_0809` · **Ký Danh Merge Phi Luân** · `weapon` · `bug` · tier `tap_dich` · set `debug_tram_bug`
810. `vp_0810` · **Ngoại Môn Query Vân Y** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
811. `vp_0811` · **Nội Môn Debug Hồn Châu** · `artifact` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
812. `vp_0812` · **Trưởng Lão Runtime Toolchain** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
813. `vp_0813` · **Ký Danh Component Rollback Chỉ** · `talisman` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
814. `vp_0814` · **Ngoại Môn Index Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
815. `vp_0815` · **Nội Môn Cache Nguyên Thiết** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
816. `vp_0816` · **Trưởng Lão Legacy Bộ Linh Kiện** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
817. `vp_0817` · **Ký Danh Rollback Châm** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
818. `vp_0818` · **Ngoại Môn Schema Hộ Tâm Y** · `armor` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
819. `vp_0819` · **Nội Môn Prompt Linh Kính** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
820. `vp_0820` · **Trưởng Lão Rollback Thiên Nhãn** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
821. `vp_0821` · **Ký Danh Schema Ấn Phù** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
822. `vp_0822` · **Ngoại Môn Prompt Tâm Dược** · `pill` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
823. `vp_0823` · **Nội Môn Agent Đạo Tài** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
824. `vp_0824` · **Trưởng Lão Deploy Bộ Linh Kiện** · `tool` · `git` · tier `truong_lao` · set `git_menh`
825. `vp_0825` · **Ký Danh Token Đao** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
826. `vp_0826` · **Ngoại Môn Firewall Giáp** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
827. `vp_0827` · **Nội Môn Refactor Ngọc Giản** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
828. `vp_0828` · **Trưởng Lão Merge Compiler Lò** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
829. `vp_0829` · **Ký Danh Query Phù** · `talisman` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
830. `vp_0830` · **Ngoại Môn Debug Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
831. `vp_0831` · **Nội Môn Runtime Linh Thạch** · `upgrade_stone` · `git` · tier `noi_mon` · set `git_menh`
832. `vp_0832` · **Trưởng Lão Component Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
833. `vp_0833` · **Ký Danh Debug Lệnh Kích** · `weapon` · `bug` · tier `tap_dich` · set `debug_tram_bug`
834. `vp_0834` · **Ngoại Môn Runtime Vân Y** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
835. `vp_0835` · **Nội Môn Component Hồ Lô** · `artifact` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
836. `vp_0836` · **Trưởng Lão Index Chổi Pháp** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
837. `vp_0837` · **Ký Danh Cache Rollback Chỉ** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
838. `vp_0838` · **Ngoại Môn Legacy Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
839. `vp_0839` · **Nội Môn Rollback Bảo Linh Tinh** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
840. `vp_0840` · **Trưởng Lão Schema Bộ Linh Kiện** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
841. `vp_0841` · **Ký Danh Prompt Kiếm** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
842. `vp_0842` · **Ngoại Môn Agent Hộ Tâm Y** · `armor` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
843. `vp_0843` · **Nội Môn Deploy Pháp Ấn** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
844. `vp_0844` · **Trưởng Lão Token Linh Bút** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
845. `vp_0845` · **Ký Danh Firewall Ấn Phù** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
846. `vp_0846` · **Ngoại Môn Deploy Tâm Dược** · `pill` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
847. `vp_0847` · **Nội Môn Token Core Mảnh** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
848. `vp_0848` · **Trưởng Lão Firewall Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
849. `vp_0849` · **Ký Danh Refactor Phù Nhận** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
850. `vp_0850` · **Ngoại Môn Merge Giáp** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
851. `vp_0851` · **Nội Môn Query Đạo Chuông** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
852. `vp_0852` · **Trưởng Lão Debug Dò Mạch Nghi** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
853. `vp_0853` · **Ký Danh Runtime Phù** · `talisman` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
854. `vp_0854` · **Ngoại Môn Component Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
855. `vp_0855` · **Nội Môn Index Nguyên Thiết** · `upgrade_stone` · `git` · tier `noi_mon` · set `git_menh`
856. `vp_0856` · **Trưởng Lão Cache Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
857. `vp_0857` · **Ký Danh Legacy Ấn Kiếm** · `weapon` · `bug` · tier `tap_dich` · set `debug_tram_bug`
858. `vp_0858` · **Ngoại Môn Rollback Vân Y** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
859. `vp_0859` · **Nội Môn Cache Trận Bàn** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
860. `vp_0860` · **Trưởng Lão Legacy Truy Tung Kính** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
861. `vp_0861` · **Ký Danh Rollback Rollback Chỉ** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
862. `vp_0862` · **Ngoại Môn Schema Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
863. `vp_0863` · **Nội Môn Prompt Đạo Tài** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
864. `vp_0864` · **Trưởng Lão Agent Bộ Linh Kiện** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
865. `vp_0865` · **Ký Danh Deploy Phi Luân** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
866. `vp_0866` · **Ngoại Môn Token Hộ Tâm Y** · `armor` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
867. `vp_0867` · **Nội Môn Firewall Hồn Châu** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
868. `vp_0868` · **Trưởng Lão Refactor Toolchain** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
869. `vp_0869` · **Ký Danh Merge Ấn Phù** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
870. `vp_0870` · **Ngoại Môn Query Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
871. `vp_0871` · **Nội Môn Debug Linh Thạch** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
872. `vp_0872` · **Trưởng Lão Merge Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
873. `vp_0873` · **Ký Danh Query Châm** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
874. `vp_0874` · **Ngoại Môn Debug Giáp** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
875. `vp_0875` · **Nội Môn Runtime Linh Kính** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
876. `vp_0876` · **Trưởng Lão Component Thiên Nhãn** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
877. `vp_0877` · **Ký Danh Index Phù** · `talisman` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
878. `vp_0878` · **Ngoại Môn Cache Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
879. `vp_0879` · **Nội Môn Legacy Bảo Linh Tinh** · `upgrade_stone` · `git` · tier `noi_mon` · set `git_menh`
880. `vp_0880` · **Trưởng Lão Rollback Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
881. `vp_0881` · **Ký Danh Schema Đao** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
882. `vp_0882` · **Ngoại Môn Prompt Vân Y** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
883. `vp_0883` · **Nội Môn Agent Ngọc Giản** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
884. `vp_0884` · **Trưởng Lão Deploy Compiler Lò** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
885. `vp_0885` · **Ký Danh Prompt Rollback Chỉ** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
886. `vp_0886` · **Ngoại Môn Agent Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
887. `vp_0887` · **Nội Môn Deploy Core Mảnh** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
888. `vp_0888` · **Trưởng Lão Token Bộ Linh Kiện** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
889. `vp_0889` · **Ký Danh Firewall Lệnh Kích** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
890. `vp_0890` · **Ngoại Môn Refactor Hộ Tâm Y** · `armor` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
891. `vp_0891` · **Nội Môn Merge Hồ Lô** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
892. `vp_0892` · **Trưởng Lão Query Chổi Pháp** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
893. `vp_0893` · **Ký Danh Debug Ấn Phù** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
894. `vp_0894` · **Ngoại Môn Runtime Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
895. `vp_0895` · **Nội Môn Component Nguyên Thiết** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
896. `vp_0896` · **Trưởng Lão Index Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
897. `vp_0897` · **Ký Danh Cache Kiếm** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
898. `vp_0898` · **Ngoại Môn Component Giáp** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
899. `vp_0899` · **Nội Môn Index Pháp Ấn** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
900. `vp_0900` · **Trưởng Lão Cache Linh Bút** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
901. `vp_0901` · **Ký Danh Legacy Phù** · `talisman` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
902. `vp_0902` · **Ngoại Môn Rollback Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
903. `vp_0903` · **Nội Môn Schema Đạo Tài** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
904. `vp_0904` · **Trưởng Lão Prompt Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
905. `vp_0905` · **Ký Danh Agent Phù Nhận** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
906. `vp_0906` · **Ngoại Môn Deploy Vân Y** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
907. `vp_0907` · **Nội Môn Token Đạo Chuông** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
908. `vp_0908` · **Trưởng Lão Firewall Dò Mạch Nghi** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
909. `vp_0909` · **Ký Danh Refactor Rollback Chỉ** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
910. `vp_0910` · **Ngoại Môn Merge Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
911. `vp_0911` · **Nội Môn Firewall Linh Thạch** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
912. `vp_0912` · **Trưởng Lão Refactor Bộ Linh Kiện** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
913. `vp_0913` · **Ký Danh Merge Ấn Kiếm** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
914. `vp_0914` · **Ngoại Môn Query Hộ Tâm Y** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
915. `vp_0915` · **Nội Môn Debug Trận Bàn** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
916. `vp_0916` · **Trưởng Lão Runtime Truy Tung Kính** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
917. `vp_0917` · **Ký Danh Component Ấn Phù** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
918. `vp_0918` · **Ngoại Môn Index Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
919. `vp_0919` · **Nội Môn Cache Bảo Linh Tinh** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
920. `vp_0920` · **Trưởng Lão Legacy Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
921. `vp_0921` · **Ký Danh Rollback Phi Luân** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
922. `vp_0922` · **Ngoại Môn Schema Giáp** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
923. `vp_0923` · **Nội Môn Prompt Hồn Châu** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
924. `vp_0924` · **Trưởng Lão Rollback Toolchain** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
925. `vp_0925` · **Ký Danh Schema Phù** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
926. `vp_0926` · **Ngoại Môn Prompt Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
927. `vp_0927` · **Nội Môn Agent Core Mảnh** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
928. `vp_0928` · **Trưởng Lão Deploy Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
929. `vp_0929` · **Ký Danh Token Châm** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
930. `vp_0930` · **Ngoại Môn Firewall Vân Y** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
931. `vp_0931` · **Nội Môn Refactor Linh Kính** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
932. `vp_0932` · **Trưởng Lão Merge Thiên Nhãn** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
933. `vp_0933` · **Ký Danh Query Rollback Chỉ** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
934. `vp_0934` · **Ngoại Môn Debug Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
935. `vp_0935` · **Nội Môn Runtime Nguyên Thiết** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
936. `vp_0936` · **Trưởng Lão Component Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
937. `vp_0937` · **Ký Danh Debug Đao** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
938. `vp_0938` · **Ngoại Môn Runtime Hộ Tâm Y** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
939. `vp_0939` · **Nội Môn Component Ngọc Giản** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
940. `vp_0940` · **Trưởng Lão Index Compiler Lò** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
941. `vp_0941` · **Ký Danh Cache Ấn Phù** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
942. `vp_0942` · **Ngoại Môn Legacy Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
943. `vp_0943` · **Nội Môn Rollback Đạo Tài** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
944. `vp_0944` · **Trưởng Lão Schema Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
945. `vp_0945` · **Ký Danh Prompt Lệnh Kích** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
946. `vp_0946` · **Ngoại Môn Agent Giáp** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
947. `vp_0947` · **Nội Môn Deploy Hồ Lô** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
948. `vp_0948` · **Trưởng Lão Token Chổi Pháp** · `tool` · `git` · tier `truong_lao` · set `git_menh`
949. `vp_0949` · **Ký Danh Firewall Phù** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
950. `vp_0950` · **Ngoại Môn Deploy Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
951. `vp_0951` · **Nội Môn Token Linh Thạch** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
952. `vp_0952` · **Trưởng Lão Firewall Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
953. `vp_0953` · **Ký Danh Refactor Kiếm** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
954. `vp_0954` · **Ngoại Môn Merge Vân Y** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
955. `vp_0955` · **Nội Môn Query Pháp Ấn** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
956. `vp_0956` · **Trưởng Lão Debug Linh Bút** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
957. `vp_0957` · **Ký Danh Runtime Rollback Chỉ** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
958. `vp_0958` · **Ngoại Môn Component Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
959. `vp_0959` · **Nội Môn Index Bảo Linh Tinh** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
960. `vp_0960` · **Trưởng Lão Cache Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
961. `vp_0961` · **Ký Danh Legacy Phù Nhận** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
962. `vp_0962` · **Ngoại Môn Rollback Hộ Tâm Y** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
963. `vp_0963` · **Nội Môn Cache Đạo Chuông** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
964. `vp_0964` · **Trưởng Lão Legacy Dò Mạch Nghi** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
965. `vp_0965` · **Ký Danh Rollback Ấn Phù** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
966. `vp_0966` · **Ngoại Môn Schema Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
967. `vp_0967` · **Nội Môn Prompt Core Mảnh** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
968. `vp_0968` · **Trưởng Lão Agent Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
969. `vp_0969` · **Ký Danh Deploy Ấn Kiếm** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
970. `vp_0970` · **Ngoại Môn Token Giáp** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
971. `vp_0971` · **Nội Môn Firewall Trận Bàn** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
972. `vp_0972` · **Trưởng Lão Refactor Truy Tung Kính** · `tool` · `git` · tier `truong_lao` · set `git_menh`
973. `vp_0973` · **Ký Danh Merge Phù** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
974. `vp_0974` · **Ngoại Môn Query Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
975. `vp_0975` · **Nội Môn Debug Nguyên Thiết** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
976. `vp_0976` · **Trưởng Lão Merge Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
977. `vp_0977` · **Ký Danh Query Phi Luân** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
978. `vp_0978` · **Ngoại Môn Debug Vân Y** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
979. `vp_0979` · **Nội Môn Runtime Hồn Châu** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
980. `vp_0980` · **Trưởng Lão Component Toolchain** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
981. `vp_0981` · **Ký Danh Index Rollback Chỉ** · `talisman` · `bug` · tier `tap_dich` · set `debug_tram_bug`
982. `vp_0982` · **Ngoại Môn Cache Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
983. `vp_0983` · **Nội Môn Legacy Đạo Tài** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
984. `vp_0984` · **Trưởng Lão Rollback Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
985. `vp_0985` · **Ký Danh Schema Châm** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
986. `vp_0986` · **Ngoại Môn Prompt Hộ Tâm Y** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
987. `vp_0987` · **Nội Môn Agent Linh Kính** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
988. `vp_0988` · **Trưởng Lão Deploy Thiên Nhãn** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
989. `vp_0989` · **Ký Danh Prompt Ấn Phù** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
990. `vp_0990` · **Ngoại Môn Agent Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
991. `vp_0991` · **Nội Môn Deploy Linh Thạch** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
992. `vp_0992` · **Trưởng Lão Token Bộ Linh Kiện** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
993. `vp_0993` · **Ký Danh Firewall Đao** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
994. `vp_0994` · **Ngoại Môn Refactor Giáp** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
995. `vp_0995` · **Nội Môn Merge Ngọc Giản** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
996. `vp_0996` · **Trưởng Lão Query Compiler Lò** · `tool` · `git` · tier `truong_lao` · set `git_menh`
997. `vp_0997` · **Ký Danh Debug Phù** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
998. `vp_0998` · **Ngoại Môn Runtime Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
999. `vp_0999` · **Nội Môn Component Bảo Linh Tinh** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
1000. `vp_1000` · **Trưởng Lão Index Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
1001. `vp_1001` · **Ký Danh Cache Lệnh Kích** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
1002. `vp_1002` · **Ngoại Môn Component Vân Y** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
1003. `vp_1003` · **Nội Môn Index Hồ Lô** · `artifact` · `git` · tier `noi_mon` · set `git_menh`
1004. `vp_1004` · **Trưởng Lão Cache Chổi Pháp** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
1005. `vp_1005` · **Ký Danh Legacy Rollback Chỉ** · `talisman` · `bug` · tier `tap_dich` · set `debug_tram_bug`
1006. `vp_1006` · **Ngoại Môn Rollback Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
1007. `vp_1007` · **Nội Môn Schema Core Mảnh** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
1008. `vp_1008` · **Trưởng Lão Prompt Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
1009. `vp_1009` · **Ký Danh Agent Kiếm** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
1010. `vp_1010` · **Ngoại Môn Deploy Hộ Tâm Y** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
1011. `vp_1011` · **Nội Môn Token Pháp Ấn** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
1012. `vp_1012` · **Trưởng Lão Firewall Linh Bút** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
1013. `vp_1013` · **Ký Danh Refactor Ấn Phù** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
1014. `vp_1014` · **Ngoại Môn Merge Tâm Dược** · `pill` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
1015. `vp_1015` · **Nội Môn Firewall Nguyên Thiết** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
1016. `vp_1016` · **Trưởng Lão Refactor Bộ Linh Kiện** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
1017. `vp_1017` · **Ký Danh Merge Phù Nhận** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
1018. `vp_1018` · **Ngoại Môn Query Giáp** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1019. `vp_1019` · **Nội Môn Debug Đạo Chuông** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
1020. `vp_1020` · **Trưởng Lão Runtime Dò Mạch Nghi** · `tool` · `git` · tier `truong_lao` · set `git_menh`
1021. `vp_1021` · **Ký Danh Component Phù** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
1022. `vp_1022` · **Ngoại Môn Index Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
1023. `vp_1023` · **Nội Môn Cache Đạo Tài** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
1024. `vp_1024` · **Trưởng Lão Legacy Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
1025. `vp_1025` · **Ký Danh Rollback Ấn Kiếm** · `weapon` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
1026. `vp_1026` · **Ngoại Môn Schema Vân Y** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
1027. `vp_1027` · **Nội Môn Prompt Trận Bàn** · `artifact` · `git` · tier `noi_mon` · set `git_menh`
1028. `vp_1028` · **Trưởng Lão Rollback Truy Tung Kính** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
1029. `vp_1029` · **Ký Danh Schema Rollback Chỉ** · `talisman` · `bug` · tier `tap_dich` · set `debug_tram_bug`
1030. `vp_1030` · **Ngoại Môn Prompt Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
1031. `vp_1031` · **Nội Môn Agent Linh Thạch** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
1032. `vp_1032` · **Trưởng Lão Deploy Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
1033. `vp_1033` · **Ký Danh Token Phi Luân** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
1034. `vp_1034` · **Ngoại Môn Firewall Hộ Tâm Y** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
1035. `vp_1035` · **Nội Môn Refactor Hồn Châu** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
1036. `vp_1036` · **Trưởng Lão Merge Toolchain** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
1037. `vp_1037` · **Ký Danh Query Ấn Phù** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
1038. `vp_1038` · **Ngoại Môn Debug Tâm Dược** · `pill` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
1039. `vp_1039` · **Nội Môn Runtime Bảo Linh Tinh** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
1040. `vp_1040` · **Trưởng Lão Component Bộ Linh Kiện** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
1041. `vp_1041` · **Ký Danh Debug Châm** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
1042. `vp_1042` · **Ngoại Môn Runtime Giáp** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1043. `vp_1043` · **Nội Môn Component Linh Kính** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
1044. `vp_1044` · **Trưởng Lão Index Thiên Nhãn** · `tool` · `git` · tier `truong_lao` · set `git_menh`
1045. `vp_1045` · **Ký Danh Cache Phù** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
1046. `vp_1046` · **Ngoại Môn Legacy Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1047. `vp_1047` · **Nội Môn Rollback Core Mảnh** · `upgrade_stone` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
1048. `vp_1048` · **Trưởng Lão Schema Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
1049. `vp_1049` · **Ký Danh Prompt Đao** · `weapon` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
1050. `vp_1050` · **Ngoại Môn Agent Vân Y** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
1051. `vp_1051` · **Nội Môn Deploy Ngọc Giản** · `artifact` · `git` · tier `noi_mon` · set `git_menh`
1052. `vp_1052` · **Trưởng Lão Token Compiler Lò** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
1053. `vp_1053` · **Ký Danh Firewall Rollback Chỉ** · `talisman` · `bug` · tier `tap_dich` · set `debug_tram_bug`
1054. `vp_1054` · **Ngoại Môn Deploy Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
1055. `vp_1055` · **Nội Môn Token Nguyên Thiết** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
1056. `vp_1056` · **Trưởng Lão Firewall Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
1057. `vp_1057` · **Ký Danh Refactor Lệnh Kích** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
1058. `vp_1058` · **Ngoại Môn Merge Hộ Tâm Y** · `armor` · `git` · tier `ngoai_mon` · set `git_menh`
1059. `vp_1059` · **Nội Môn Query Hồ Lô** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
1060. `vp_1060` · **Trưởng Lão Debug Chổi Pháp** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
1061. `vp_1061` · **Ký Danh Runtime Ấn Phù** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
1062. `vp_1062` · **Ngoại Môn Component Tâm Dược** · `pill` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
1063. `vp_1063` · **Nội Môn Index Đạo Tài** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
1064. `vp_1064` · **Trưởng Lão Cache Bộ Linh Kiện** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
1065. `vp_1065` · **Ký Danh Legacy Kiếm** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
1066. `vp_1066` · **Ngoại Môn Rollback Giáp** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1067. `vp_1067` · **Nội Môn Cache Pháp Ấn** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
1068. `vp_1068` · **Trưởng Lão Legacy Linh Bút** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
1069. `vp_1069` · **Ký Danh Rollback Phù** · `talisman` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
1070. `vp_1070` · **Ngoại Môn Schema Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1071. `vp_1071` · **Nội Môn Prompt Linh Thạch** · `upgrade_stone` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
1072. `vp_1072` · **Trưởng Lão Agent Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
1073. `vp_1073` · **Ký Danh Deploy Phù Nhận** · `weapon` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
1074. `vp_1074` · **Ngoại Môn Token Vân Y** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
1075. `vp_1075` · **Nội Môn Firewall Đạo Chuông** · `artifact` · `git` · tier `noi_mon` · set `git_menh`
1076. `vp_1076` · **Trưởng Lão Refactor Dò Mạch Nghi** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
1077. `vp_1077` · **Ký Danh Merge Rollback Chỉ** · `talisman` · `bug` · tier `tap_dich` · set `debug_tram_bug`
1078. `vp_1078` · **Ngoại Môn Query Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
1079. `vp_1079` · **Nội Môn Debug Bảo Linh Tinh** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
1080. `vp_1080` · **Trưởng Lão Merge Bộ Linh Kiện** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
1081. `vp_1081` · **Ký Danh Query Ấn Kiếm** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
1082. `vp_1082` · **Ngoại Môn Debug Hộ Tâm Y** · `armor` · `git` · tier `ngoai_mon` · set `git_menh`
1083. `vp_1083` · **Nội Môn Runtime Trận Bàn** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
1084. `vp_1084` · **Trưởng Lão Component Truy Tung Kính** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
1085. `vp_1085` · **Ký Danh Index Ấn Phù** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
1086. `vp_1086` · **Ngoại Môn Cache Tâm Dược** · `pill` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
1087. `vp_1087` · **Nội Môn Legacy Core Mảnh** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
1088. `vp_1088` · **Trưởng Lão Rollback Bộ Linh Kiện** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
1089. `vp_1089` · **Ký Danh Schema Phi Luân** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
1090. `vp_1090` · **Ngoại Môn Prompt Giáp** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
1091. `vp_1091` · **Nội Môn Agent Hồn Châu** · `artifact` · `bug` · tier `noi_mon` · set `debug_tram_bug`
1092. `vp_1092` · **Trưởng Lão Deploy Toolchain** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
1093. `vp_1093` · **Ký Danh Prompt Phù** · `talisman` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
1094. `vp_1094` · **Ngoại Môn Agent Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1095. `vp_1095` · **Nội Môn Deploy Nguyên Thiết** · `upgrade_stone` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
1096. `vp_1096` · **Trưởng Lão Token Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
1097. `vp_1097` · **Ký Danh Firewall Châm** · `weapon` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
1098. `vp_1098` · **Ngoại Môn Refactor Vân Y** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
1099. `vp_1099` · **Nội Môn Merge Linh Kính** · `artifact` · `git` · tier `noi_mon` · set `git_menh`
1100. `vp_1100` · **Trưởng Lão Query Thiên Nhãn** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
1101. `vp_1101` · **Ký Danh Debug Rollback Chỉ** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
1102. `vp_1102` · **Ngoại Môn Runtime Tâm Dược** · `pill` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
1103. `vp_1103` · **Nội Môn Component Đạo Tài** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
1104. `vp_1104` · **Trưởng Lão Index Bộ Linh Kiện** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
1105. `vp_1105` · **Ký Danh Cache Đao** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
1106. `vp_1106` · **Ngoại Môn Component Hộ Tâm Y** · `armor` · `git` · tier `ngoai_mon` · set `git_menh`
1107. `vp_1107` · **Nội Môn Index Ngọc Giản** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
1108. `vp_1108` · **Trưởng Lão Cache Compiler Lò** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
1109. `vp_1109` · **Ký Danh Legacy Ấn Phù** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
1110. `vp_1110` · **Ngoại Môn Rollback Tâm Dược** · `pill` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
1111. `vp_1111` · **Nội Môn Schema Linh Thạch** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
1112. `vp_1112` · **Trưởng Lão Prompt Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
1113. `vp_1113` · **Ký Danh Agent Lệnh Kích** · `weapon` · `git` · tier `tap_dich` · set `git_menh`
1114. `vp_1114` · **Ngoại Môn Deploy Giáp** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
1115. `vp_1115` · **Nội Môn Token Hồ Lô** · `artifact` · `bug` · tier `noi_mon` · set `debug_tram_bug`
1116. `vp_1116` · **Trưởng Lão Firewall Chổi Pháp** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
1117. `vp_1117` · **Ký Danh Refactor Phù** · `talisman` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
1118. `vp_1118` · **Ngoại Môn Merge Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1119. `vp_1119` · **Nội Môn Firewall Bảo Linh Tinh** · `upgrade_stone` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
1120. `vp_1120` · **Trưởng Lão Refactor Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
1121. `vp_1121` · **Ký Danh Merge Kiếm** · `weapon` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
1122. `vp_1122` · **Ngoại Môn Query Vân Y** · `armor` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
1123. `vp_1123` · **Nội Môn Debug Pháp Ấn** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
1124. `vp_1124` · **Trưởng Lão Runtime Linh Bút** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
1125. `vp_1125` · **Ký Danh Component Rollback Chỉ** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
1126. `vp_1126` · **Ngoại Môn Index Tâm Dược** · `pill` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
1127. `vp_1127` · **Nội Môn Cache Core Mảnh** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
1128. `vp_1128` · **Trưởng Lão Legacy Bộ Linh Kiện** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
1129. `vp_1129` · **Ký Danh Rollback Phù Nhận** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
1130. `vp_1130` · **Ngoại Môn Schema Hộ Tâm Y** · `armor` · `git` · tier `ngoai_mon` · set `git_menh`
1131. `vp_1131` · **Nội Môn Prompt Đạo Chuông** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
1132. `vp_1132` · **Trưởng Lão Rollback Dò Mạch Nghi** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
1133. `vp_1133` · **Ký Danh Schema Ấn Phù** · `talisman` · `ai` · tier `tap_dich` · set `ai_dien_toan`
1134. `vp_1134` · **Ngoại Môn Prompt Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
1135. `vp_1135` · **Nội Môn Agent Nguyên Thiết** · `upgrade_stone` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
1136. `vp_1136` · **Trưởng Lão Deploy Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
1137. `vp_1137` · **Ký Danh Token Ấn Kiếm** · `weapon` · `git` · tier `tap_dich` · set `git_menh`
1138. `vp_1138` · **Ngoại Môn Firewall Giáp** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
1139. `vp_1139` · **Nội Môn Refactor Trận Bàn** · `artifact` · `bug` · tier `noi_mon` · set `debug_tram_bug`
1140. `vp_1140` · **Trưởng Lão Merge Truy Tung Kính** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
1141. `vp_1141` · **Ký Danh Query Phù** · `talisman` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
1142. `vp_1142` · **Ngoại Môn Debug Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1143. `vp_1143` · **Nội Môn Runtime Đạo Tài** · `upgrade_stone` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
1144. `vp_1144` · **Trưởng Lão Component Bộ Linh Kiện** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
1145. `vp_1145` · **Ký Danh Debug Phi Luân** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
1146. `vp_1146` · **Ngoại Môn Runtime Vân Y** · `armor` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
1147. `vp_1147` · **Nội Môn Component Hồn Châu** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
1148. `vp_1148` · **Trưởng Lão Index Toolchain** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
1149. `vp_1149` · **Ký Danh Cache Rollback Chỉ** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
1150. `vp_1150` · **Ngoại Môn Legacy Tâm Dược** · `pill` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
1151. `vp_1151` · **Nội Môn Rollback Linh Thạch** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
1152. `vp_1152` · **Trưởng Lão Schema Bộ Linh Kiện** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
1153. `vp_1153` · **Ký Danh Prompt Châm** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
1154. `vp_1154` · **Ngoại Môn Agent Hộ Tâm Y** · `armor` · `git` · tier `ngoai_mon` · set `git_menh`
1155. `vp_1155` · **Nội Môn Deploy Linh Kính** · `artifact` · `database` · tier `noi_mon` · set `database_long_mach`
1156. `vp_1156` · **Trưởng Lão Token Thiên Nhãn** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
1157. `vp_1157` · **Ký Danh Firewall Ấn Phù** · `talisman` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
1158. `vp_1158` · **Ngoại Môn Deploy Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
1159. `vp_1159` · **Nội Môn Token Bảo Linh Tinh** · `upgrade_stone` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
1160. `vp_1160` · **Trưởng Lão Firewall Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
1161. `vp_1161` · **Ký Danh Refactor Đao** · `weapon` · `git` · tier `tap_dich` · set `git_menh`
1162. `vp_1162` · **Ngoại Môn Merge Giáp** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
1163. `vp_1163` · **Nội Môn Query Ngọc Giản** · `artifact` · `bug` · tier `noi_mon` · set `debug_tram_bug`
1164. `vp_1164` · **Trưởng Lão Debug Compiler Lò** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
1165. `vp_1165` · **Ký Danh Runtime Phù** · `talisman` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
1166. `vp_1166` · **Ngoại Môn Component Tâm Dược** · `pill` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1167. `vp_1167` · **Nội Môn Index Core Mảnh** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
1168. `vp_1168` · **Trưởng Lão Cache Bộ Linh Kiện** · `tool` · `git` · tier `truong_lao` · set `git_menh`
1169. `vp_1169` · **Ký Danh Legacy Lệnh Kích** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
1170. `vp_1170` · **Ngoại Môn Rollback Vân Y** · `armor` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
1171. `vp_1171` · **Nội Môn Cache Hồ Lô** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
1172. `vp_1172` · **Trưởng Lão Legacy Chổi Pháp** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
1173. `vp_1173` · **Ký Danh Rollback Rollback Chỉ** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
1174. `vp_1174` · **Ngoại Môn Schema Tâm Dược** · `pill` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
1175. `vp_1175` · **Nội Môn Prompt Nguyên Thiết** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
1176. `vp_1176` · **Trưởng Lão Agent Bộ Linh Kiện** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
1177. `vp_1177` · **Ký Danh Deploy Kiếm** · `weapon` · `clean` · tier `tap_dich` · set `debug_tram_bug`
1178. `vp_1178` · **Ngoại Môn Token Hộ Tâm Y** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
1179. `vp_1179` · **Nội Môn Firewall Pháp Ấn** · `artifact` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
1180. `vp_1180` · **Trưởng Lão Refactor Linh Bút** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
1181. `vp_1181` · **Ký Danh Merge Ấn Phù** · `talisman` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
1182. `vp_1182` · **Ngoại Môn Query Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
1183. `vp_1183` · **Nội Môn Debug Đạo Tài** · `upgrade_stone` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
1184. `vp_1184` · **Trưởng Lão Merge Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
1185. `vp_1185` · **Ký Danh Query Phù Nhận** · `weapon` · `git` · tier `tap_dich` · set `git_menh`
1186. `vp_1186` · **Ngoại Môn Debug Giáp** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
1187. `vp_1187` · **Nội Môn Runtime Đạo Chuông** · `artifact` · `bug` · tier `noi_mon` · set `debug_tram_bug`
1188. `vp_1188` · **Trưởng Lão Component Dò Mạch Nghi** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
1189. `vp_1189` · **Ký Danh Index Phù** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
1190. `vp_1190` · **Ngoại Môn Cache Tâm Dược** · `pill` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1191. `vp_1191` · **Nội Môn Legacy Linh Thạch** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
1192. `vp_1192` · **Trưởng Lão Rollback Bộ Linh Kiện** · `tool` · `git` · tier `truong_lao` · set `git_menh`
1193. `vp_1193` · **Ký Danh Schema Ấn Kiếm** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
1194. `vp_1194` · **Ngoại Môn Prompt Vân Y** · `armor` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
1195. `vp_1195` · **Nội Môn Agent Trận Bàn** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
1196. `vp_1196` · **Trưởng Lão Deploy Truy Tung Kính** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
1197. `vp_1197` · **Ký Danh Prompt Rollback Chỉ** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
1198. `vp_1198` · **Ngoại Môn Agent Tâm Dược** · `pill` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
1199. `vp_1199` · **Nội Môn Deploy Bảo Linh Tinh** · `upgrade_stone` · `security` · tier `noi_mon` · set `security_ho_tong`
1200. `vp_1200` · **Trưởng Lão Token Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
1201. `vp_1201` · **Ký Danh Firewall Phi Luân** · `weapon` · `bug` · tier `tap_dich` · set `debug_tram_bug`
1202. `vp_1202` · **Ngoại Môn Refactor Hộ Tâm Y** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
1203. `vp_1203` · **Nội Môn Merge Hồn Châu** · `artifact` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
1204. `vp_1204` · **Trưởng Lão Query Toolchain** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
1205. `vp_1205` · **Ký Danh Debug Ấn Phù** · `talisman` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
1206. `vp_1206` · **Ngoại Môn Runtime Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
1207. `vp_1207` · **Nội Môn Component Core Mảnh** · `upgrade_stone` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
1208. `vp_1208` · **Trưởng Lão Index Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
1209. `vp_1209` · **Ký Danh Cache Châm** · `weapon` · `git` · tier `tap_dich` · set `git_menh`
1210. `vp_1210` · **Ngoại Môn Component Giáp** · `armor` · `database` · tier `ngoai_mon` · set `database_long_mach`
1211. `vp_1211` · **Nội Môn Index Linh Kính** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
1212. `vp_1212` · **Trưởng Lão Cache Thiên Nhãn** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
1213. `vp_1213` · **Ký Danh Legacy Phù** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
1214. `vp_1214` · **Ngoại Môn Rollback Tâm Dược** · `pill` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1215. `vp_1215` · **Nội Môn Schema Nguyên Thiết** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
1216. `vp_1216` · **Trưởng Lão Prompt Bộ Linh Kiện** · `tool` · `git` · tier `truong_lao` · set `git_menh`
1217. `vp_1217` · **Ký Danh Agent Đao** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
1218. `vp_1218` · **Ngoại Môn Deploy Vân Y** · `armor` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
1219. `vp_1219` · **Nội Môn Token Ngọc Giản** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
1220. `vp_1220` · **Trưởng Lão Firewall Compiler Lò** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
1221. `vp_1221` · **Ký Danh Refactor Rollback Chỉ** · `talisman` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
1222. `vp_1222` · **Ngoại Môn Merge Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
1223. `vp_1223` · **Nội Môn Firewall Đạo Tài** · `upgrade_stone` · `git` · tier `noi_mon` · set `git_menh`
1224. `vp_1224` · **Trưởng Lão Refactor Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
1225. `vp_1225` · **Ký Danh Merge Lệnh Kích** · `weapon` · `bug` · tier `tap_dich` · set `debug_tram_bug`
1226. `vp_1226` · **Ngoại Môn Query Hộ Tâm Y** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
1227. `vp_1227` · **Nội Môn Debug Hồ Lô** · `artifact` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
1228. `vp_1228` · **Trưởng Lão Runtime Chổi Pháp** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
1229. `vp_1229` · **Ký Danh Component Ấn Phù** · `talisman` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
1230. `vp_1230` · **Ngoại Môn Index Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
1231. `vp_1231` · **Nội Môn Cache Linh Thạch** · `upgrade_stone` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
1232. `vp_1232` · **Trưởng Lão Legacy Bộ Linh Kiện** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
1233. `vp_1233` · **Ký Danh Rollback Kiếm** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
1234. `vp_1234` · **Ngoại Môn Schema Giáp** · `armor` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
1235. `vp_1235` · **Nội Môn Prompt Pháp Ấn** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
1236. `vp_1236` · **Trưởng Lão Rollback Linh Bút** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
1237. `vp_1237` · **Ký Danh Schema Phù** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
1238. `vp_1238` · **Ngoại Môn Prompt Tâm Dược** · `pill` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1239. `vp_1239` · **Nội Môn Agent Bảo Linh Tinh** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
1240. `vp_1240` · **Trưởng Lão Deploy Bộ Linh Kiện** · `tool` · `git` · tier `truong_lao` · set `git_menh`
1241. `vp_1241` · **Ký Danh Token Phù Nhận** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
1242. `vp_1242` · **Ngoại Môn Firewall Vân Y** · `armor` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
1243. `vp_1243` · **Nội Môn Refactor Đạo Chuông** · `artifact` · `ai` · tier `noi_mon` · set `ai_dien_toan`
1244. `vp_1244` · **Trưởng Lão Merge Dò Mạch Nghi** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
1245. `vp_1245` · **Ký Danh Query Rollback Chỉ** · `talisman` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
1246. `vp_1246` · **Ngoại Môn Debug Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
1247. `vp_1247` · **Nội Môn Runtime Core Mảnh** · `upgrade_stone` · `git` · tier `noi_mon` · set `git_menh`
1248. `vp_1248` · **Trưởng Lão Component Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
1249. `vp_1249` · **Ký Danh Debug Ấn Kiếm** · `weapon` · `bug` · tier `tap_dich` · set `debug_tram_bug`
1250. `vp_1250` · **Ngoại Môn Runtime Hộ Tâm Y** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
1251. `vp_1251` · **Nội Môn Component Trận Bàn** · `artifact` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
1252. `vp_1252` · **Trưởng Lão Index Truy Tung Kính** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
1253. `vp_1253` · **Ký Danh Cache Ấn Phù** · `talisman` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
1254. `vp_1254` · **Ngoại Môn Legacy Tâm Dược** · `pill` · `security` · tier `ngoai_mon` · set `security_ho_tong`
1255. `vp_1255` · **Nội Môn Rollback Nguyên Thiết** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
1256. `vp_1256` · **Trưởng Lão Schema Bộ Linh Kiện** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
1257. `vp_1257` · **Ký Danh Prompt Phi Luân** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
1258. `vp_1258` · **Ngoại Môn Agent Giáp** · `armor` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
1259. `vp_1259` · **Nội Môn Deploy Hồn Châu** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
1260. `vp_1260` · **Trưởng Lão Token Toolchain** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
1261. `vp_1261` · **Ký Danh Firewall Phù** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
1262. `vp_1262` · **Ngoại Môn Deploy Tâm Dược** · `pill` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1263. `vp_1263` · **Nội Môn Token Đạo Tài** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
1264. `vp_1264` · **Trưởng Lão Firewall Bộ Linh Kiện** · `tool` · `git` · tier `truong_lao` · set `git_menh`
1265. `vp_1265` · **Ký Danh Refactor Châm** · `weapon` · `database` · tier `tap_dich` · set `database_long_mach`
1266. `vp_1266` · **Ngoại Môn Merge Vân Y** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1267. `vp_1267` · **Nội Môn Query Linh Kính** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
1268. `vp_1268` · **Trưởng Lão Debug Thiên Nhãn** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
1269. `vp_1269` · **Ký Danh Runtime Rollback Chỉ** · `talisman` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
1270. `vp_1270` · **Ngoại Môn Component Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
1271. `vp_1271` · **Nội Môn Index Linh Thạch** · `upgrade_stone` · `git` · tier `noi_mon` · set `git_menh`
1272. `vp_1272` · **Trưởng Lão Cache Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
1273. `vp_1273` · **Ký Danh Legacy Đao** · `weapon` · `bug` · tier `tap_dich` · set `debug_tram_bug`
1274. `vp_1274` · **Ngoại Môn Rollback Hộ Tâm Y** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
1275. `vp_1275` · **Nội Môn Cache Ngọc Giản** · `artifact` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
1276. `vp_1276` · **Trưởng Lão Legacy Compiler Lò** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
1277. `vp_1277` · **Ký Danh Rollback Ấn Phù** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
1278. `vp_1278` · **Ngoại Môn Schema Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
1279. `vp_1279` · **Nội Môn Prompt Bảo Linh Tinh** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
1280. `vp_1280` · **Trưởng Lão Agent Bộ Linh Kiện** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
1281. `vp_1281` · **Ký Danh Deploy Lệnh Kích** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
1282. `vp_1282` · **Ngoại Môn Token Giáp** · `armor` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
1283. `vp_1283` · **Nội Môn Firewall Hồ Lô** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
1284. `vp_1284` · **Trưởng Lão Refactor Chổi Pháp** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
1285. `vp_1285` · **Ký Danh Merge Phù** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
1286. `vp_1286` · **Ngoại Môn Query Tâm Dược** · `pill` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1287. `vp_1287` · **Nội Môn Debug Core Mảnh** · `upgrade_stone` · `clean` · tier `noi_mon` · set `debug_tram_bug`
1288. `vp_1288` · **Trưởng Lão Merge Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
1289. `vp_1289` · **Ký Danh Query Kiếm** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
1290. `vp_1290` · **Ngoại Môn Debug Vân Y** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1291. `vp_1291` · **Nội Môn Runtime Pháp Ấn** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
1292. `vp_1292` · **Trưởng Lão Component Linh Bút** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
1293. `vp_1293` · **Ký Danh Index Rollback Chỉ** · `talisman` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
1294. `vp_1294` · **Ngoại Môn Cache Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
1295. `vp_1295` · **Nội Môn Legacy Nguyên Thiết** · `upgrade_stone` · `git` · tier `noi_mon` · set `git_menh`
1296. `vp_1296` · **Trưởng Lão Rollback Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
1297. `vp_1297` · **Ký Danh Schema Phù Nhận** · `weapon` · `bug` · tier `tap_dich` · set `debug_tram_bug`
1298. `vp_1298` · **Ngoại Môn Prompt Hộ Tâm Y** · `armor` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
1299. `vp_1299` · **Nội Môn Agent Đạo Chuông** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
1300. `vp_1300` · **Trưởng Lão Deploy Dò Mạch Nghi** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
1301. `vp_1301` · **Ký Danh Prompt Ấn Phù** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
1302. `vp_1302` · **Ngoại Môn Agent Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
1303. `vp_1303` · **Nội Môn Deploy Đạo Tài** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
1304. `vp_1304` · **Trưởng Lão Token Bộ Linh Kiện** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
1305. `vp_1305` · **Ký Danh Firewall Ấn Kiếm** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
1306. `vp_1306` · **Ngoại Môn Refactor Giáp** · `armor` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
1307. `vp_1307` · **Nội Môn Merge Trận Bàn** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
1308. `vp_1308` · **Trưởng Lão Query Truy Tung Kính** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
1309. `vp_1309` · **Ký Danh Debug Phù** · `talisman` · `security` · tier `tap_dich` · set `security_ho_tong`
1310. `vp_1310` · **Ngoại Môn Runtime Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
1311. `vp_1311` · **Nội Môn Component Linh Thạch** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
1312. `vp_1312` · **Trưởng Lão Index Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
1313. `vp_1313` · **Ký Danh Cache Phi Luân** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
1314. `vp_1314` · **Ngoại Môn Component Vân Y** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1315. `vp_1315` · **Nội Môn Index Hồn Châu** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
1316. `vp_1316` · **Trưởng Lão Cache Toolchain** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
1317. `vp_1317` · **Ký Danh Legacy Rollback Chỉ** · `talisman` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
1318. `vp_1318` · **Ngoại Môn Rollback Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
1319. `vp_1319` · **Nội Môn Schema Bảo Linh Tinh** · `upgrade_stone` · `git` · tier `noi_mon` · set `git_menh`
1320. `vp_1320` · **Trưởng Lão Prompt Bộ Linh Kiện** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
1321. `vp_1321` · **Ký Danh Agent Châm** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
1322. `vp_1322` · **Ngoại Môn Deploy Hộ Tâm Y** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
1323. `vp_1323` · **Nội Môn Token Linh Kính** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
1324. `vp_1324` · **Trưởng Lão Firewall Thiên Nhãn** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
1325. `vp_1325` · **Ký Danh Refactor Ấn Phù** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
1326. `vp_1326` · **Ngoại Môn Merge Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
1327. `vp_1327` · **Nội Môn Firewall Core Mảnh** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
1328. `vp_1328` · **Trưởng Lão Refactor Bộ Linh Kiện** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
1329. `vp_1329` · **Ký Danh Merge Đao** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
1330. `vp_1330` · **Ngoại Môn Query Giáp** · `armor` · `devops` · tier `ngoai_mon` · set `deploy_ho_dao`
1331. `vp_1331` · **Nội Môn Debug Ngọc Giản** · `artifact` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
1332. `vp_1332` · **Trưởng Lão Runtime Compiler Lò** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
1333. `vp_1333` · **Ký Danh Component Phù** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
1334. `vp_1334` · **Ngoại Môn Index Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
1335. `vp_1335` · **Nội Môn Cache Nguyên Thiết** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
1336. `vp_1336` · **Trưởng Lão Legacy Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
1337. `vp_1337` · **Ký Danh Rollback Lệnh Kích** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
1338. `vp_1338` · **Ngoại Môn Schema Vân Y** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1339. `vp_1339` · **Nội Môn Prompt Hồ Lô** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
1340. `vp_1340` · **Trưởng Lão Rollback Chổi Pháp** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
1341. `vp_1341` · **Ký Danh Schema Rollback Chỉ** · `talisman` · `backend` · tier `tap_dich` · set `fullstack_van_tuong`
1342. `vp_1342` · **Ngoại Môn Prompt Tâm Dược** · `pill` · `clean` · tier `ngoai_mon` · set `debug_tram_bug`
1343. `vp_1343` · **Nội Môn Agent Đạo Tài** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
1344. `vp_1344` · **Trưởng Lão Deploy Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
1345. `vp_1345` · **Ký Danh Token Kiếm** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
1346. `vp_1346` · **Ngoại Môn Firewall Hộ Tâm Y** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
1347. `vp_1347` · **Nội Môn Refactor Pháp Ấn** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
1348. `vp_1348` · **Trưởng Lão Merge Linh Bút** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
1349. `vp_1349` · **Ký Danh Query Ấn Phù** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
1350. `vp_1350` · **Ngoại Môn Debug Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
1351. `vp_1351` · **Nội Môn Runtime Linh Thạch** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
1352. `vp_1352` · **Trưởng Lão Component Bộ Linh Kiện** · `tool` · `bug` · tier `truong_lao` · set `debug_tram_bug`
1353. `vp_1353` · **Ký Danh Debug Phù Nhận** · `weapon` · `ai` · tier `tap_dich` · set `ai_dien_toan`
1354. `vp_1354` · **Ngoại Môn Runtime Giáp** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
1355. `vp_1355` · **Nội Môn Component Đạo Chuông** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
1356. `vp_1356` · **Trưởng Lão Index Dò Mạch Nghi** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
1357. `vp_1357` · **Ký Danh Cache Phù** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
1358. `vp_1358` · **Ngoại Môn Legacy Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
1359. `vp_1359` · **Nội Môn Rollback Bảo Linh Tinh** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
1360. `vp_1360` · **Trưởng Lão Schema Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
1361. `vp_1361` · **Ký Danh Prompt Ấn Kiếm** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
1362. `vp_1362` · **Ngoại Môn Agent Vân Y** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1363. `vp_1363` · **Nội Môn Deploy Trận Bàn** · `artifact` · `system` · tier `noi_mon` · set `fullstack_van_tuong`
1364. `vp_1364` · **Trưởng Lão Token Truy Tung Kính** · `tool` · `security` · tier `truong_lao` · set `security_ho_tong`
1365. `vp_1365` · **Ký Danh Firewall Rollback Chỉ** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
1366. `vp_1366` · **Ngoại Môn Deploy Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
1367. `vp_1367` · **Nội Môn Token Core Mảnh** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
1368. `vp_1368` · **Trưởng Lão Firewall Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
1369. `vp_1369` · **Ký Danh Refactor Phi Luân** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
1370. `vp_1370` · **Ngoại Môn Merge Hộ Tâm Y** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
1371. `vp_1371` · **Nội Môn Query Hồn Châu** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
1372. `vp_1372` · **Trưởng Lão Debug Toolchain** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
1373. `vp_1373` · **Ký Danh Runtime Ấn Phù** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
1374. `vp_1374` · **Ngoại Môn Component Tâm Dược** · `pill` · `git` · tier `ngoai_mon` · set `git_menh`
1375. `vp_1375` · **Nội Môn Index Nguyên Thiết** · `upgrade_stone` · `database` · tier `noi_mon` · set `database_long_mach`
1376. `vp_1376` · **Trưởng Lão Cache Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
1377. `vp_1377` · **Ký Danh Legacy Châm** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
1378. `vp_1378` · **Ngoại Môn Rollback Giáp** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
1379. `vp_1379` · **Nội Môn Cache Linh Kính** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
1380. `vp_1380` · **Trưởng Lão Legacy Thiên Nhãn** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
1381. `vp_1381` · **Ký Danh Rollback Phù** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
1382. `vp_1382` · **Ngoại Môn Schema Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
1383. `vp_1383` · **Nội Môn Prompt Đạo Tài** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
1384. `vp_1384` · **Trưởng Lão Agent Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
1385. `vp_1385` · **Ký Danh Deploy Đao** · `weapon` · `devops` · tier `tap_dich` · set `deploy_ho_dao`
1386. `vp_1386` · **Ngoại Môn Token Vân Y** · `armor` · `frontend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1387. `vp_1387` · **Nội Môn Firewall Ngọc Giản** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
1388. `vp_1388` · **Trưởng Lão Refactor Compiler Lò** · `tool` · `git` · tier `truong_lao` · set `git_menh`
1389. `vp_1389` · **Ký Danh Merge Rollback Chỉ** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
1390. `vp_1390` · **Ngoại Môn Query Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
1391. `vp_1391` · **Nội Môn Debug Linh Thạch** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
1392. `vp_1392` · **Trưởng Lão Merge Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
1393. `vp_1393` · **Ký Danh Query Lệnh Kích** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
1394. `vp_1394` · **Ngoại Môn Debug Hộ Tâm Y** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
1395. `vp_1395` · **Nội Môn Runtime Hồ Lô** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
1396. `vp_1396` · **Trưởng Lão Component Chổi Pháp** · `tool` · `backend` · tier `truong_lao` · set `fullstack_van_tuong`
1397. `vp_1397` · **Ký Danh Index Ấn Phù** · `talisman` · `clean` · tier `tap_dich` · set `debug_tram_bug`
1398. `vp_1398` · **Ngoại Môn Cache Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
1399. `vp_1399` · **Nội Môn Legacy Bảo Linh Tinh** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
1400. `vp_1400` · **Trưởng Lão Rollback Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
1401. `vp_1401` · **Ký Danh Schema Kiếm** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
1402. `vp_1402` · **Ngoại Môn Prompt Giáp** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
1403. `vp_1403` · **Nội Môn Agent Pháp Ấn** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
1404. `vp_1404` · **Trưởng Lão Deploy Linh Bút** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
1405. `vp_1405` · **Ký Danh Prompt Phù** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
1406. `vp_1406` · **Ngoại Môn Agent Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
1407. `vp_1407` · **Nội Môn Deploy Core Mảnh** · `upgrade_stone` · `bug` · tier `noi_mon` · set `debug_tram_bug`
1408. `vp_1408` · **Trưởng Lão Token Bộ Linh Kiện** · `tool` · `ai` · tier `truong_lao` · set `ai_dien_toan`
1409. `vp_1409` · **Ký Danh Firewall Phù Nhận** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
1410. `vp_1410` · **Ngoại Môn Refactor Vân Y** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1411. `vp_1411` · **Nội Môn Merge Đạo Chuông** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
1412. `vp_1412` · **Trưởng Lão Query Dò Mạch Nghi** · `tool` · `git` · tier `truong_lao` · set `git_menh`
1413. `vp_1413` · **Ký Danh Debug Rollback Chỉ** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
1414. `vp_1414` · **Ngoại Môn Runtime Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
1415. `vp_1415` · **Nội Môn Component Nguyên Thiết** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
1416. `vp_1416` · **Trưởng Lão Index Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
1417. `vp_1417` · **Ký Danh Cache Ấn Kiếm** · `weapon` · `frontend` · tier `tap_dich` · set `fullstack_van_tuong`
1418. `vp_1418` · **Ngoại Môn Component Hộ Tâm Y** · `armor` · `system` · tier `ngoai_mon` · set `fullstack_van_tuong`
1419. `vp_1419` · **Nội Môn Index Trận Bàn** · `artifact` · `security` · tier `noi_mon` · set `security_ho_tong`
1420. `vp_1420` · **Trưởng Lão Cache Truy Tung Kính** · `tool` · `database` · tier `truong_lao` · set `database_long_mach`
1421. `vp_1421` · **Ký Danh Legacy Ấn Phù** · `talisman` · `bug` · tier `tap_dich` · set `debug_tram_bug`
1422. `vp_1422` · **Ngoại Môn Rollback Tâm Dược** · `pill` · `ai` · tier `ngoai_mon` · set `ai_dien_toan`
1423. `vp_1423` · **Nội Môn Schema Đạo Tài** · `upgrade_stone` · `devops` · tier `noi_mon` · set `deploy_ho_dao`
1424. `vp_1424` · **Trưởng Lão Prompt Bộ Linh Kiện** · `tool` · `frontend` · tier `truong_lao` · set `fullstack_van_tuong`
1425. `vp_1425` · **Ký Danh Agent Phi Luân** · `weapon` · `system` · tier `tap_dich` · set `fullstack_van_tuong`
1426. `vp_1426` · **Ngoại Môn Deploy Giáp** · `armor` · `security` · tier `ngoai_mon` · set `security_ho_tong`
1427. `vp_1427` · **Nội Môn Token Hồn Châu** · `artifact` · `backend` · tier `noi_mon` · set `fullstack_van_tuong`
1428. `vp_1428` · **Trưởng Lão Firewall Toolchain** · `tool` · `clean` · tier `truong_lao` · set `debug_tram_bug`
1429. `vp_1429` · **Ký Danh Refactor Phù** · `talisman` · `git` · tier `tap_dich` · set `git_menh`
1430. `vp_1430` · **Ngoại Môn Merge Tâm Dược** · `pill` · `database` · tier `ngoai_mon` · set `database_long_mach`
1431. `vp_1431` · **Nội Môn Firewall Linh Thạch** · `upgrade_stone` · `frontend` · tier `noi_mon` · set `fullstack_van_tuong`
1432. `vp_1432` · **Trưởng Lão Refactor Bộ Linh Kiện** · `tool` · `system` · tier `truong_lao` · set `fullstack_van_tuong`
1433. `vp_1433` · **Ký Danh Merge Châm** · `weapon` · `security` · tier `tap_dich` · set `security_ho_tong`
1434. `vp_1434` · **Ngoại Môn Query Vân Y** · `armor` · `backend` · tier `ngoai_mon` · set `fullstack_van_tuong`
1435. `vp_1435` · **Nội Môn Debug Linh Kính** · `artifact` · `clean` · tier `noi_mon` · set `debug_tram_bug`
1436. `vp_1436` · **Trưởng Lão Runtime Thiên Nhãn** · `tool` · `git` · tier `truong_lao` · set `git_menh`
1437. `vp_1437` · **Ký Danh Component Rollback Chỉ** · `talisman` · `database` · tier `tap_dich` · set `database_long_mach`
1438. `vp_1438` · **Ngoại Môn Index Tâm Dược** · `pill` · `bug` · tier `ngoai_mon` · set `debug_tram_bug`
1439. `vp_1439` · **Nội Môn Cache Bảo Linh Tinh** · `upgrade_stone` · `ai` · tier `noi_mon` · set `ai_dien_toan`
1440. `vp_1440` · **Trưởng Lão Legacy Bộ Linh Kiện** · `tool` · `devops` · tier `truong_lao` · set `deploy_ho_dao`
