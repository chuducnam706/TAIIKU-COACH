# MASTER PROMPT BUILD: TAIIKU TEACHER
> **Dành cho Google AI Studio Build / Full-Stack LLM Code Generator**  
> **Dự án:** TAIIKU TEACHER – Hệ Thống Đào Tạo & Quản Trị Năng Lực Sư Phạm Thể Chất Mầm Non  
> **Khách hàng / Hệ thống:** Chuỗi Trường Mầm Non Tiêu Chuẩn Nhật Bản Sakura Kids (SK-1, SK-2, SK-3, SK-4)  
> **Tagline:** *Học đúng – Dạy chuẩn – Phát triển cùng trẻ • Vững năng lực – Chuẩn phương pháp – Trọn niềm tin*

---

## 1. TỔNG QUAN HỆ THỐNG & TRIẾT LÝ SƯ PHẠM

Xây dựng ứng dụng Web/App hoàn chỉnh mang tên **TAIIKU TEACHER**. Ứng dụng không đơn thuần là một LMS (Learning Management System) hay một bảng điểm số tĩnh, mà là một **Hệ Thống Quản Trị Vòng Đời Năng Lực Giáo Viên Thể Chất Khép Kín (Teacher Continuous Professional Development - CPD)** theo triết lý Taiiku Nhật Bản:

$$\text{HỌC} \longrightarrow \text{XEM} \longrightarrow \text{THỰC HÀNH} \longrightarrow \text{QUAY VIDEO} \longrightarrow \text{ĐÁNH GIÁ} \longrightarrow \text{PHẢN HỒI} \longrightarrow \text{CẢI THIỆN} \longrightarrow \text{XÁC NHẬN ĐẠT CHUẨN}$$

### Triết Lý Cốt Lõi:
1. **Tâm – Thân – Trí:** Không chỉ rèn luyện cơ bắp, giáo viên Taiiku phải biết nuôi dưỡng sự tự tin, lòng dũng cảm và tinh thần vượt khó của trẻ mầm non (2–6 tuổi).
2. **An toàn tuyệt đối (Ukemi & Spotting):** Mọi kỹ năng vận động (đu xà, bục nhảy, nhào lộn) đều phải có kỹ thuật bảo hiểm, đỡ đón an toàn và kiểm tra thảm xốp.
3. **Phát triển năng lực (Competency-based):** Điểm số luôn đi kèm **"Năng lực trọng tâm cần phát triển tiếp theo (Next IDP Target)"** thay vì chỉ dừng lại ở con số điểm khô khan.

---

## 2. HỆ THỐNG 4 VAI TRÒ & PHÂN QUYỀN (RBAC)

Ứng dụng bắt buộc có cơ chế phân quyền 4 cấp bậc tài khoản, mỗi vai trò có màn hình làm việc (Dashboard) và phạm vi thao tác riêng biệt:

| Vai Trò | Mã Quyền | Phạm Vi Trách Nhiệm & Quyền Hạn |
| :--- | :--- | :--- |
| **👑 Super Admin** | `super_admin` | Quản trị toàn hệ thống Sakura Kids: Tạo cơ sở (SK-1..SK-4), cấp quyền tài khoản, ban hành chương trình khung, thiết lập tiêu chí rubric, xem toàn bộ báo cáo phân tích vĩ mô. |
| **🧑‍💼 Quản Lý Cơ Sở** | `manager` | Quản lý giáo viên thuộc cơ sở của mình: Phân công lịch dạy, giao khóa học bồi dưỡng (IDP), lên lịch dự giờ định kỳ/đột xuất, theo dõi cảnh báo an toàn và chứng chỉ CPR. |
| **🎓 Master Trainer** | `trainer` | Chuyên gia đào tạo & Khảo thí: Đứng lớp thị phạm, chấm video bài nộp thực hành, đi dự giờ thực tế và chấm Rubric 7 giai đoạn, phê duyệt cấp chứng nhận M1–M4. |
| **👨‍🏫 Giáo Viên** | `teacher` | Trung tâm rèn luyện: Học khóa học 7 bước, xem video chuẩn, làm quiz, quay video bài tập thực hành, xem hồ sơ năng lực 6 trục (M1-M4), nhận phản hồi và kế hoạch IDP. |

---

## 3. KHUNG 6 NHÓM NĂNG LỰC TAIIKU & LỘ TRÌNH 4 CẤP (M1 → M4)

Toàn bộ hệ thống đánh giá, radar chart và hồ sơ năng lực được chuẩn hóa theo **6 Nhóm Năng Lực Cốt Lõi**:

1. **01. Kiến thức mầm non:** Hiểu sâu giáo trình Taiiku, đặc điểm tâm sinh lý và cơ chế giải phẫu vận động trẻ 2–6 tuổi.
2. **02. Kỹ năng vận động:** Thực hiện động tác mẫu chuẩn xác (chạy, nhảy, bật, bò, leo, thăng bằng, nhào lộn, xà đơn).
3. **03. Kỹ năng hướng dẫn:** Khẩu lệnh còi dứt khoát, ngữ điệu khích lệ, thị phạm góc quan sát 45°, phản xạ sửa sai tại chỗ.
4. **04. Tổ chức lớp:** Bố trí đội hình, phân trạm luân chuyển mạch vận động liên tục, không để học sinh chờ đợi quá 15 giây.
5. **05. Bảo đảm an toàn:** Nhận diện nguy cơ chấn thương, chuẩn bị thảm đệm, kỹ thuật đón đỡ (spotting) chống rơi xà/bục.
6. **06. Sư phạm Taiiku:** Nuôi dưỡng Tâm – Thân – Trí, tôn trọng cảm xúc, khích lệ trẻ nhút nhát vượt qua nỗi sợ hãi.

### 4 Cấp Bậc Tiến Trình Nghề Nghiệp:
- **M1 – Làm Quen (Beginner):** Giáo viên mới tiếp cận phương pháp, đang học việc.
- **M2 – Đạt Chuẩn (Qualified Coach):** Đủ điều kiện đứng lớp độc lập theo giáo án chuẩn.
- **M3 – Thành Thạo (Senior Coach):** Kỹ năng sư phạm vững vàng, an toàn tuyệt đối, có khả năng phụ đạo người mới.
- **M4 – Huấn Luyện Viên Mẫu (Master Coach):** Bậc thầy chuyên môn, đào tạo nhân sự toàn hệ thống, tham gia ban khảo thí.

---

## 4. QUY TRÌNH ĐÀO TẠO KHÉP KÍN 7 BƯỚC (THE 7-STEP CYCLE)

Mỗi khóa học chuyên môn trong hệ thống đều phải tuân thủ chuẩn 7 bước:
```
① KIẾN THỨC (Lý thuyết, giải phẫu, độ tuổi, an toàn)
  ↓
② VIDEO MẪU (Thị phạm chuẩn của Master Coach)
  ↓
③ QUAN SÁT (Phân tích góc quay, tư thế tiếp đất, điểm đón)
  ↓
④ KIỂM TRA (Trắc nghiệm tình huống 10 câu hỏi)
  ↓
⑤ THỰC HÀNH (Giáo viên tự quay video bài dạy 3–5 phút)
  ↓
⑥ CHẤM RUBRIC (Trainer chấm tiêu chí + AI Pose kiểm tra góc)
  ↓
⑦ XÁC NHẬN NĂNG LỰC (Cập nhật hồ sơ năng lực hoặc giao IDP 4 tuần)
```

### Danh Mục Khóa Học Toàn Diện (6 Nhóm A → F):
- **Nhóm A: Nền tảng Taiiku:** Triết lý Taiiku, Tâm - Thân - Trí, Tâm lý trẻ 2-6T, Nguyên tắc an toàn Ukemi.
- **Nhóm B: Vận động cơ bản:** 6 vận động nền tảng (Chạy, Nhảy, Bật, Bò, Leo, Thăng bằng, Nhào lộn).
- **Nhóm C: Dụng cụ lớn:** Xà đơn thiếu nhi, Cầu thăng bằng gỗ, Cầu ngựa/Bục nhảy 3–5 tầng.
- **Nhóm D: Dụng cụ nhỏ:** Bóng mầm non, Rào bật nhảy, Nón chóp, Thang dây Agility, Vòng thể dục, Dây nhảy.
- **Nhóm E: Kỹ năng tổ chức lớp:** Đội hình vòng tròn/hàng dọc, Mạch vận động phân trạm, Luân chuyển nhóm đông.
- **Nhóm F: Kỹ năng sư phạm:** Kỹ thuật còi Tsubasa, Làm mẫu góc 45°, Sửa sai bằng lời khen, Dỗ trẻ sợ độ cao.

---

## 5. BỘ CÔNG CỤ ĐÁNH GIÁ TIẾT DẠY THỰC ĐỊA (OBSERVATION RUBRIC)

Cho phép Trainer / Quản lý mở trên điện thoại hoặc máy tính bảng khi đi dự giờ trực tiếp tại sân trường.

### 7 Giai Đoạn Tiết Học Thực Tế:
1. **① Chuẩn bị & Dụng cụ an toàn:** Kiểm tra chốt xà, vệ sinh thảm xốp giảm chấn, khoảng cách hành lang an toàn.
2. **② Khởi động & Mở đầu:** Bài hát vận động Taiiku Warm-up, khởi động kỹ khớp cổ tay, đầu gối, tạo năng lượng ban đầu.
3. **③ Thị phạm mẫu & Hướng dẫn kỹ thuật:** Góc đứng quan sát 45°, làm mẫu tư thế nắm xà ngón cái ôm vòng (Thumb-around).
4. **④ Tổ chức luân chuyển trạm:** Mạch vận động liên hoàn, không có "thời gian chết", trẻ được di chuyển liên tục.
5. **⑤ Bảo đảm an toàn & Đỡ rơi (Spotting):** Vị trí tay đặt ngang hông/thân trên của trẻ, phản xạ chống chúi đầu.
6. **⑥ Tương tác, Khích lệ trẻ (Tâm – Thân – Trí):** Lời khen cụ thể, hỗ trợ tâm lý trẻ nhút nhát, xây dựng sự tự tin.
7. **⑦ Hồi tĩnh & Kết thúc:** Bài tập thở sâu hạ nhịp tim, thu dọn dụng cụ cùng học sinh, nhận xét tích cực.

### Tiêu Chí Chấm Điểm Mỗi Giai Đoạn:
- **Chưa đạt (1 điểm)**
- **Đạt một phần (2 điểm)**
- **Đạt chuẩn (3 điểm)**
- **Thành thạo (4 điểm)**
- **Ô bắt buộc:** Nhập *Minh chứng quan sát được* và *Nhận xét chuyên môn*.
- **Tính năng mở rộng:** Nút bấm `🎙️ Ghi âm nhận xét` và `📷 Chụp ảnh minh chứng hiện trường`.
- **Đầu ra sau khi lưu:** Tự động quy đổi ra điểm hệ 100, xác định mức M1/M2/M3/M4 và tự sinh đề xuất **"Kế hoạch IDP cải thiện tiếp theo"**.

---

## 6. ĐẶC TẢ GIAO DIỆN TỪNG MÀN HÌNH (UI/UX SPECIFICATION)

### Màn hình 1: Trang Chủ & Hồ Sơ Năng Lực Giáo Viên (Teacher Dashboard)
- **Top Header Bar:** Thanh chuyển đổi vai trò (4 nút: Giáo viên, Quản lý, Master Trainer, Admin), chuông thông báo, nút mở Chứng chỉ điện tử.
- **Hero Profile Card:** 
  - Ảnh đại diện, họ tên: `Kenji Tanaka (Sensei Cường)`.
  - Cơ sở: `Sakura Kids • Cơ Sở SK-1`.
  - Huy hiệu cấp bậc: `🌳 M3: Thành Thạo`.
  - Thanh tiến trình bậc thang 4 nấc: $M1 \rightarrow M2 \rightarrow [M3 \star] \rightarrow M4$.
  - Hộp thông báo màu vàng nổi bật: `🎯 Năng Lực Trọng Tâm Cần Phát Triển Tiếp Theo: Khẩu lệnh còi dứt khoát + Sửa sai trực tiếp + Đỡ xà đơn.`
- **Bản Đồ Năng Lực 6 Trục (Radar Chart Canvas):** Biểu đồ mạng nhện 6 đỉnh cân đối thể hiện trực quan điểm số từ 0 - 100%.
- **Bảng Chi Tiết 6 Nhóm Năng Lực:** Thể hiện điểm số, nhãn huy hiệu (M1-M4) và nhận xét trọng tâm của Ban chuyên môn.
- **Trục Thời Gian Nghề Nghiệp (Career Timeline):** Lịch sử phát triển từ ngày nhận việc (M1) đến hiện tại (M3) kèm đợt dự giờ tiếp theo.

### Màn hình 2: Khóa Đào Tạo & Chu Trình 7 Bước (Training Hub)
- **Thanh Banner Chu Trình 7 Bước:** Đồ họa dạng ngang với 7 hình tròn số bước kèm mũi tên kết nối.
- **Thanh Lọc Danh Mục:** 6 tab phân loại bài học từ A đến F.
- **Thẻ Khóa Học:** Thể hiện ảnh bìa, thời lượng, số bài học, tỷ lệ hoàn thành (Progress Bar).
- **Màn Hình Bài Học Chi Tiết:** Khung video bài giảng chuẩn, tài liệu PDF hướng dẫn, form Quiz trắc nghiệm tương tác với phản hồi đúng/sai tức thì.

### Màn hình 3: Thực Hành & Tự Quay Video (AI Pose Vision)
- **Khu Vực Video Player:** Khung hình chuẩn tỷ lệ 16:9, cơ chế `object-fit: contain` để không bao giờ cắt xén thân người.
- **Công Cụ AI Pose (MediaPipe Pose On-Device):** Chạy WebAssembly 100% miễn phí ngay trên trình duyệt, vẽ khung xương cử động thời gian thực (đỏ/xanh) và đo góc gối 45°, độ thẳng cột sống.
- **HUD Telemetry Bar:** Đặt gọn gàng phía trên video hiển thị: Góc gối hiện tại, Trạng thái an toàn, Số khung hình phân tích.
- **Hệ Thống Tải Video:** Nút chọn file từ máy tính hoặc nút quay video demo 5 giây; quy trình nén mô phỏng H.264 kèm thanh tiến trình và thông báo Toast Notification xanh dịu mắt (không dùng alert gốc gây đứng máy).

### Màn hình 4: Dashboard Quản Trị Hệ Thống Sakura Kids (Manager Hub)
- **KPI Tổng Quan 48 Giáo Viên:**
  - 👨‍🏫 `48 Giáo Viên Toàn Hệ Thống`
  - 🟢 `36 Đạt Chuẩn (M2 – M4)`
  - 🟡 `9 Đang Phát Triển (M1 – M2)`
  - 🔴 `3 Cần Đào Tạo Lại (IDP Cấp Bách)`
- **4 Thẻ Cơ Sở Sakura Kids (SK-1, SK-2, SK-3, SK-4):**
  - Hiển thị số lượng giáo viên, tỷ lệ đạt chuẩn, số ca cần đào tạo lại và điểm trung bình cơ sở.
- **Thanh Tỷ Lệ Năng Lực Toàn Hệ Thống:** Kiến thức 82%, Vận động 88%, Hướng dẫn 74%, Tổ chức 79%, An toàn 91%, Sư phạm 86%.
- **Thanh Công Cụ Lọc Roster:** Lọc theo Cơ Sở (SK-1..SK-4), Cấp Năng Lực (M1..M4), Ô tìm kiếm theo tên giáo viên.
- **Bảng Danh Sách Giáo Viên:** Cột tên + avatar, cơ sở, cấp bậc M1-M4, điểm số, **Trọng tâm IDP cần phát triển tiếp theo**, nút thao tác `Hồ Sơ` và `Chấm Rubric`.
- **Trung Tâm Cảnh Báo (Alert Center):** Các thông báo khẩn (quá hạn thẩm định, chứng chỉ CPR sắp hết hạn) kèm các nút xử lý tức thì (`Lên Lịch Thẩm Định`, `Giao Khóa Tái Đào Tạo`, `Gửi Tài Liệu`).

### Màn hình 5: Trợ Lý Sư Phạm AI Coach (Sensei AI)
- **Giao Diện Hội Thoại:** Trò chuyện 2 chiều với Sensei AI 24/7.
- **Thanh Gợi Ý Câu Hỏi Tức Thì (Quick Prompt Chips):**
  - `🧗 Dạy trẻ 4-5T treo xà an toàn`
  - `📋 Tạo kế hoạch IDP 4 tuần cho giáo viên yếu tổ chức lớp`
  - `🧒 Bé 3 tuổi sợ nhảy từ bục xuống thảm`
  - `📢 Lớp học thể chất hỗn loạn mất trật tự`
- **Khả Năng AI Phân Tích & Phản Hồi:** 
  - Trả về cấu trúc sư phạm chi tiết: Mục tiêu, Chuẩn bị, Khẩu lệnh, Thị phạm ngón tay cái, Sửa sai, Vị trí đón Spotting, Giáo án mẫu.
  - Tự động tạo lộ trình IDP 4 tuần chi tiết từng tuần cho giáo viên.

### Màn hình 6: Chứng Nhận Điện Tử & Xác Thực QR (Digital Certificate)
- Giấy chứng nhận thiết kế sang trọng chuẩn Nhật Bản với viền họa tiết, biểu tượng huy chương vàng.
- Hiển thị: Tên giáo viên, Cấp độ đạt được (`🌳 M3: TAIIKU SENIOR COACH`), Điểm thẩm định, Ngày cấp, Mã chứng nhận (`SKT-2026-88204-M3`).
- **Mã QR Code Xác Thực:** Quét để mở trang tra cứu tính hợp lệ của văn bằng.
- Nút tải file bản in PDF khổ A4.

---

## 7. KIẾN TRÚC DATABASE (POSTGRESQL / SUPABASE SCHEMA)

```sql
-- Kích hoạt UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Các kiểu Enum
CREATE TYPE user_role AS ENUM ('teacher', 'manager', 'trainer', 'super_admin');
CREATE TYPE competency_level AS ENUM ('M1', 'M2', 'M3', 'M4');
CREATE TYPE submission_status AS ENUM ('pending', 'reviewed', 'rejected');
CREATE TYPE alert_type AS ENUM ('overdue_assessment', 'expired_certificate', 'performance_drop');

-- 1. Bảng Cơ Sở Trường Mầm Non
CREATE TABLE public.facilities (
    id TEXT PRIMARY KEY, -- 'SK-1', 'SK-2', 'SK-3', 'SK-4'
    name TEXT NOT NULL,
    address TEXT,
    manager_name TEXT,
    total_teachers INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Bảng Tài Khoản & Hồ Sơ Giáo Viên
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'teacher',
    facility_id TEXT REFERENCES public.facilities(id) ON DELETE SET NULL,
    avatar_url TEXT,
    current_level competency_level NOT NULL DEFAULT 'M1',
    overall_score NUMERIC(5,2) DEFAULT 0.00,
    next_idp_focus TEXT, -- Trọng tâm năng lực cần bồi dưỡng tiếp theo
    cpr_certificate_expiry DATE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Bảng Khóa Học (Chu trình 7 bước)
CREATE TABLE public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL, -- Nhóm A -> F
    target_level competency_level NOT NULL DEFAULT 'M1',
    thumbnail_url TEXT,
    total_steps INTEGER DEFAULT 7,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Bảng Bài Học & Mô-đun Quiz
CREATE TABLE public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    step_number INTEGER NOT NULL, -- 1 đến 7
    video_url TEXT,
    document_url TEXT,
    quiz_data JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Bảng Bài Nộp Video Thực Hành Của Giáo Viên
CREATE TABLE public.practice_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    uploaded_video_url TEXT NOT NULL,
    status submission_status DEFAULT 'pending',
    ai_pose_evaluation JSONB DEFAULT '{}'::jsonb,
    ai_score NUMERIC(5,2),
    trainer_feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Bảng Đánh Giá Dự Giờ Tiết Dạy 7 Giai Đoạn Thực Địa
CREATE TABLE public.observation_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    evaluator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    lesson_topic TEXT NOT NULL,
    class_age_group TEXT DEFAULT '4-5 tuổi',
    observation_date DATE DEFAULT CURRENT_DATE NOT NULL,
    stage1_prep_score INTEGER CHECK (stage1_prep_score BETWEEN 1 AND 4),
    stage2_warmup_score INTEGER CHECK (stage2_warmup_score BETWEEN 1 AND 4),
    stage3_demo_score INTEGER CHECK (stage3_demo_score BETWEEN 1 AND 4),
    stage4_organization_score INTEGER CHECK (stage4_organization_score BETWEEN 1 AND 4),
    stage5_safety_score INTEGER CHECK (stage5_safety_score BETWEEN 1 AND 4),
    stage6_interaction_score INTEGER CHECK (stage6_interaction_score BETWEEN 1 AND 4),
    stage7_cooldown_score INTEGER CHECK (stage7_cooldown_score BETWEEN 1 AND 4),
    strengths_note TEXT,
    weaknesses_idp_note TEXT,
    audio_note_url TEXT,
    photo_evidence_url TEXT,
    overall_score NUMERIC(5,2) NOT NULL,
    awarded_level competency_level NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Bảng Điểm 6 Trục Năng Lực (Competency Radar Scores)
CREATE TABLE public.competency_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID REFERENCES public.observation_assessments(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    knowledge_score NUMERIC(4,2) NOT NULL,        -- 01. Kiến Thức
    motor_skill_score NUMERIC(4,2) NOT NULL,      -- 02. Kỹ Năng Vận Động
    instruction_score NUMERIC(4,2) NOT NULL,      -- 03. Kỹ Năng Hướng Dẫn
    class_mgmt_score NUMERIC(4,2) NOT NULL,       -- 04. Tổ Chức Lớp
    safety_score NUMERIC(4,2) NOT NULL,           -- 05. Bảo Đảm An Toàn
    pedagogy_taiiku_score NUMERIC(4,2) NOT NULL,  -- 06. Sư Phạm Taiiku
    recorded_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Bảng Kế Hoạch Đào Tạo Cá Nhân Hóa (IDP 4 Tuần)
CREATE TABLE public.individual_development_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    weakness_area TEXT NOT NULL,
    duration_weeks INTEGER DEFAULT 4,
    ai_recommended_plan JSONB DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'in_progress',
    deadline DATE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Bảng Chứng Nhận Điện Tử & Mã QR
CREATE TABLE public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    certificate_code TEXT UNIQUE NOT NULL, -- VD: 'SKT-2026-88204-M3'
    level competency_level NOT NULL,
    title TEXT NOT NULL,
    issue_date DATE DEFAULT CURRENT_DATE NOT NULL,
    verified_by TEXT DEFAULT 'Hội Đồng Khảo Thí Sakura Kids',
    qr_code_payload TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

---

## 8. BỘ DỮ LIỆU KHỞI TẠO MẪU (SEED DATA)

```json
{
  "facilities": [
    { "id": "SK-1", "name": "Cơ Sở Sakura Kids 1", "total_teachers": 12, "qualified_count": 10, "avg_score": 86.4 },
    { "id": "SK-2", "name": "Cơ Sở Sakura Kids 2", "total_teachers": 10, "qualified_count": 8, "avg_score": 83.2 },
    { "id": "SK-3", "name": "Cơ Sở Sakura Kids 3", "total_teachers": 13, "qualified_count": 11, "avg_score": 89.1 },
    { "id": "SK-4", "name": "Cơ Sở Sakura Kids 4", "total_teachers": 13, "qualified_count": 7, "avg_score": 77.8 }
  ],
  "sample_teachers": [
    {
      "name": "Kenji Tanaka (Sensei Cường)",
      "facility": "SK-1",
      "level": "M3",
      "score": 88.5,
      "nextIDP": "Khẩu lệnh còi dứt khoát + Sửa sai trực tiếp + Đỡ xà đơn",
      "competencies": { "knowledge": 88, "motor": 88, "instruction": 78, "mgmt": 85, "safety": 94, "pedagogy": 95 }
    },
    {
      "name": "Haruto Sato",
      "facility": "SK-2",
      "level": "M1",
      "score": 74.2,
      "nextIDP": "Nhảy bục 4 tầng + Spotting an toàn + Khẩu lệnh",
      "competencies": { "knowledge": 76, "motor": 74, "instruction": 70, "mgmt": 71, "safety": 82, "pedagogy": 78 }
    },
    {
      "name": "Aoi Tanaka",
      "facility": "SK-1",
      "level": "M2",
      "score": 83.0,
      "nextIDP": "Tái cấp chứng chỉ CPR + Kỹ thuật còi Tsubasa",
      "competencies": { "knowledge": 84, "motor": 84, "instruction": 77, "mgmt": 80, "safety": 89, "pedagogy": 85 }
    },
    {
      "name": "Ryota Ito (Master Coach)",
      "facility": "SK-3",
      "level": "M4",
      "score": 96.8,
      "nextIDP": "Đào tạo giáo viên toàn hệ thống + Giám sát khảo thí",
      "competencies": { "knowledge": 98, "motor": 97, "instruction": 95, "mgmt": 95, "safety": 99, "pedagogy": 98 }
    }
  ]
}
```

---

## 9. HƯỚNG DẪN THỰC THI (EXECUTION DIRECTIVES)

Khi áp dụng Prompt này vào công cụ Build:
1. Tạo cấu trúc thư mục dạng Single Page Application (hoặc Next.js / Vite tùy chọn) với logic phân tách rõ ràng giữa `View`, `Data Models`, và `Business Logic`.
2. Không sử dụng các hàm popup native như `alert()`, `confirm()` gây đơ luồng trình duyệt; thay thế hoàn toàn bằng hệ thống **Toast Notifications** và các **Modal Dialogs**.
3. Tích hợp thư viện đồ họa Canvas để vẽ **Radar Chart 6 trục** mượt mà, hỗ trợ responsive trên màn hình điện thoại (375px) đến máy tính bàn (1920px).
4. Đảm bảo toàn bộ video phân tích chuyển động sử dụng `object-fit: contain` để không bao giờ cắt xén thân người học sinh hoặc giáo viên.
5. Giữ nguyên ngôn ngữ hiển thị là **Tiếng Việt chuyên ngành Giáo dục Thể chất Mầm non**.
