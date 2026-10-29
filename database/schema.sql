-- ==========================================================
-- TAIIKU TEACHER: PostgreSQL / Supabase Relational Schema
-- Physical Education Teacher Training, Assessment & Development System
-- Sakura Kids Pre-school System (SK-1, SK-2, SK-3, SK-4)
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE user_role AS ENUM ('teacher', 'manager', 'trainer', 'super_admin');
CREATE TYPE competency_level AS ENUM ('M1', 'M2', 'M3', 'M4');
CREATE TYPE submission_status AS ENUM ('pending', 'reviewed', 'rejected');
CREATE TYPE alert_type AS ENUM ('overdue_assessment', 'expired_certificate', 'performance_drop');
CREATE TYPE performance_trend AS ENUM ('improved', 'stable', 'declined');

-- 0. Sakura Kids Facilities Table
CREATE TABLE public.facilities (
    id TEXT PRIMARY KEY, -- 'SK-1', 'SK-2', 'SK-3', 'SK-4'
    name TEXT NOT NULL,
    address TEXT,
    manager_name TEXT,
    total_teachers INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1. Users & Teacher Profiles (Integrated with Supabase Auth auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'teacher',
    facility_id TEXT REFERENCES public.facilities(id) ON DELETE SET NULL,
    avatar_url TEXT,
    current_level competency_level NOT NULL DEFAULT 'M1',
    overall_score NUMERIC(5,2) DEFAULT 0.00,
    next_idp_focus TEXT, -- Specific skill needing continuous development
    performance_status performance_trend DEFAULT 'stable',
    cpr_certificate_expiry DATE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Training Courses Table (7-Step Learning Cycle)
CREATE TABLE public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL, -- 'A. Nền tảng', 'B. Vận động cơ bản', 'C. Dụng cụ lớn', 'D. Dụng cụ nhỏ', 'E. Tổ chức lớp', 'F. Kỹ năng sư phạm'
    target_level competency_level NOT NULL DEFAULT 'M1',
    thumbnail_url TEXT,
    total_steps INTEGER DEFAULT 7,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Course Lessons & Video Modules
CREATE TABLE public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    step_number INTEGER NOT NULL, -- 1 to 7
    video_url TEXT,
    document_url TEXT,
    quiz_data JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Practice Submissions (Uploaded Teacher Drill/Practice Videos)
CREATE TABLE public.practice_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    uploaded_video_url TEXT NOT NULL,
    compressed_video_url TEXT,
    status submission_status DEFAULT 'pending',
    ai_pose_evaluation JSONB DEFAULT '{}'::jsonb, -- MediaPipe angles (knee, hip, spine)
    ai_score NUMERIC(5,2),
    trainer_feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Field Observation Assessments (Đánh giá tiết dạy thực tế)
CREATE TABLE public.observation_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    evaluator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    lesson_topic TEXT NOT NULL,
    class_age_group TEXT DEFAULT '4-5 tuổi',
    observation_date DATE DEFAULT CURRENT_DATE NOT NULL,
    
    -- 7 Stages Evaluation (1: Chưa đạt, 2: Đạt một phần, 3: Đạt, 4: Thành thạo)
    stage1_prep_score INTEGER CHECK (stage1_prep_score BETWEEN 1 AND 4),
    stage2_warmup_score INTEGER CHECK (stage2_warmup_score BETWEEN 1 AND 4),
    stage3_demo_score INTEGER CHECK (stage3_demo_score BETWEEN 1 AND 4),
    stage4_organization_score INTEGER CHECK (stage4_organization_score BETWEEN 1 AND 4),
    stage5_safety_score INTEGER CHECK (stage5_safety_score BETWEEN 1 AND 4),
    stage6_interaction_score INTEGER CHECK (stage6_interaction_score BETWEEN 1 AND 4),
    stage7_cooldown_score INTEGER CHECK (stage7_cooldown_score BETWEEN 1 AND 4),
    
    -- Evidence & Qualitative notes
    strengths_note TEXT,
    weaknesses_idp_note TEXT,
    audio_note_url TEXT,
    photo_evidence_url TEXT,
    
    overall_score NUMERIC(5,2) NOT NULL,
    awarded_level competency_level NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. 6-Axis Core Competency Radar Scores
CREATE TABLE public.competency_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID REFERENCES public.observation_assessments(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    knowledge_score NUMERIC(4,2) NOT NULL,        -- 01. Kiến Thức
    motor_skill_score NUMERIC(4,2) NOT NULL,      -- 02. Kỹ Năng Vận Động
    instruction_score NUMERIC(4,2) NOT NULL,      -- 03. Kỹ Năng Hướng Dẫn
    class_mgmt_score NUMERIC(4,2) NOT NULL,       -- 04. Tổ Chức Lớp
    safety_score NUMERIC(4,2) NOT NULL,           -- 05. Bảo Đảm An Toàn
    pedagogy_taiiku_score NUMERIC(4,2) NOT NULL,  -- 06. Sư Phạm Taiiku (Tâm - Thân - Trí)
    recorded_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Individual Development Plans (IDP - Kế hoạch đào tạo cá nhân hóa)
CREATE TABLE public.individual_development_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    weakness_area TEXT NOT NULL,
    duration_weeks INTEGER DEFAULT 4,
    ai_recommended_plan JSONB DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'in_progress', -- 'in_progress', 'completed', 'overdue'
    deadline DATE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Digital Certificates
CREATE TABLE public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    certificate_code TEXT UNIQUE NOT NULL, -- e.g. 'SKT-2026-88204-M3'
    level competency_level NOT NULL,
    title TEXT NOT NULL, -- 'Taiiku Basic Coach', 'Taiiku Coach', 'Taiiku Senior Coach', 'Taiiku Master Coach'
    issue_date DATE DEFAULT CURRENT_DATE NOT NULL,
    verified_by TEXT DEFAULT 'Hội Đồng Khảo Thí Sakura Kids',
    qr_code_payload TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.observation_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competency_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.individual_development_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Read policies: Open read for authenticated users
CREATE POLICY "Public read facilities" ON public.facilities FOR SELECT USING (true);
CREATE POLICY "Public read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public read lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Public read certificates" ON public.certificates FOR SELECT USING (true);
