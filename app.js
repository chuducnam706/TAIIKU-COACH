
// ==========================================
// 0. TOAST NOTIFICATION UTILITY (No blocking alerts!)
// ==========================================
window.showToast = function(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-message toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'warning') icon = '⚠️';
  if (type === 'error') icon = '❌';

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-text">${message}</span>
    <button type="button" class="toast-close" title="Đóng">✕</button>
  `;

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.onclick = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 250);
  };

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      setTimeout(() => toast.remove(), 250);
    }
  }, duration);
};

/**
 * TAIIKU COACH: Core Web Application Logic
 * Physical Education Teacher Training, Assessment & Development System
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initRoleSwitcher();
  initRadarChart();
  initTrendChart();
  initVideoPlayerAndQuiz();
  initPracticeSubmission();
  initAiCoach();
  initAlertCenter();
  initMultiClusterFilters();
  initAssessmentSheetModal();
  initAssignCourseModal();
  initCertificateTiers();
  initLoginPortal();

  // Modal Certificate Listeners
  const certModal = document.getElementById('certificate-modal');
  const openCertBtn1 = document.getElementById('btn-open-certificate');
  const openCertBtn2 = document.getElementById('hero-view-cert-btn');
  const closeCertBtn1 = document.getElementById('btn-close-cert');
  const closeCertBtn2 = document.getElementById('btn-close-cert-2');

  function openCertificate() {
    if (certModal) certModal.classList.remove('hidden');
  }

  function closeCertificate() {
    if (certModal) certModal.classList.add('hidden');
  }

  if (openCertBtn1) openCertBtn1.addEventListener('click', openCertificate);
  if (openCertBtn2) openCertBtn2.addEventListener('click', openCertificate);
  if (closeCertBtn1) closeCertBtn1.addEventListener('click', closeCertificate);
  if (closeCertBtn2) closeCertBtn2.addEventListener('click', closeCertificate);

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCertificate();
    });
  }

});

// ==========================================
// 1. NAVIGATION & TAB SWITCHING
// ==========================================
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const pageTitle = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');

  const titles = {
    'teacher-dashboard': {
      title: 'Hồ Sơ Năng Lực Giáo Viên & Radar 360°',
      sub: 'Theo dõi cấp độ kỹ năng, phong độ giảng dạy và phản hồi sư phạm chuẩn Nhật Bản.'
    },
    'training-hub': {
      title: 'Level 2: Trung Tâm Đào Tạo & Bài Giảng Mẫu',
      sub: 'Thư viện video bài giảng chuẩn, tiêu chí an toàn và bài kiểm tra kiến thức sư phạm.'
    },
    'practice-upload': {
      title: 'Nộp Video Thực Hành & Phân Tích Chuyển Động AI',
      sub: 'Tự động nén video chuẩn H.264 và quét tư thế tiếp đất qua mô hình AI Computer Vision.'
    },
    'manager-hub': {
      title: 'Level 5: Trung Tâm Điều Hành & Cảnh Báo Cụm Cơ Sở',
      sub: 'Dành cho Quản lý / Giám đốc: Giám sát lịch thanh tra, chứng chỉ và phong độ giáo viên.'
    },
    'ai-coach': {
      title: 'Level 6: Cố Vấn Sư Phạm Thể Chất AI (Sensei AI)',
      sub: 'Giải đáp tức thì các tình huống xử lý trẻ nhút nhát, quản lý trật tự lớp và phương pháp Tsubasa.'
    }
  };

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  const quickAiBtn = document.getElementById('ai-quick-btn');
  if (quickAiBtn) {
    quickAiBtn.addEventListener('click', () => {
      switchTab('ai-coach');
    });
  }

  window.switchTab = function(tabId) {
    navItems.forEach(nav => {
      if (nav.getAttribute('data-tab') === tabId) {
        nav.classList.add('active');
      } else {
        nav.classList.remove('active');
      }
    });

    tabPanes.forEach(pane => {
      if (pane.id === `tab-${tabId}`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    if (titles[tabId]) {
      pageTitle.textContent = titles[tabId].title;
      pageSubtitle.textContent = titles[tabId].sub;
    }

    if (tabId === 'teacher-dashboard') {
      setTimeout(() => {
        initRadarChart(window.currentLoggedInTeacher);
        initTrendChart();
      }, 50);
    }
  };
}

// ==========================================
// 2. ROLE SWITCHER (Teacher / Manager / Admin)
// ==========================================
function initRoleSwitcher() {
  const roleButtons = document.querySelectorAll('.role-btn');
  const userAvatar = document.getElementById('current-user-avatar');
  const userName = document.getElementById('current-user-name');
  const userRole = document.getElementById('current-user-role');

  const roleProfiles = {
    teacher: {
      avatar: 'KT',
      name: 'Kenji Tanaka (Sensei Cường)',
      role: '🌳 M3: Thành Thạo (Cơ Sở SK-1)',
      defaultTab: 'teacher-dashboard'
    },
    manager: {
      avatar: 'NL',
      name: 'Nguyễn Thị Lan (Quản Lý)',
      role: 'Trưởng Bộ Phận Cơ Sở SK-1',
      defaultTab: 'manager-hub'
    },
    trainer: {
      avatar: 'DS',
      name: 'Daiki Sato (Master Trainer)',
      role: 'Giám Đốc Đào Tạo Toàn Hệ Thống',
      defaultTab: 'manager-hub'
    },
    admin: {
      avatar: 'AD',
      name: 'Ban Quản Trị Hệ Thống (Admin)',
      role: 'Super Administrator Sakura Kids',
      defaultTab: 'manager-hub'
    }
  };

  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const roleKey = btn.getAttribute('data-role');
      const profile = roleProfiles[roleKey];
      if (profile) {
        userAvatar.textContent = profile.avatar;
        userName.textContent = profile.name;
        userRole.textContent = profile.role;
        window.switchTab(profile.defaultTab);
      }
    });
  });
}

// ==========================================
// 3. LEVEL 3: 360° COMPETENCY RADAR CHART (Canvas)
// ==========================================
function initRadarChart(teacherName) {
  const canvas = document.getElementById('radarChartCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 42;

  const targetName = teacherName || window.currentLoggedInTeacher || 'Kenji Tanaka';
  const teacher = (typeof teacherDatabase !== 'undefined') ? teacherDatabase[targetName] : null;

  let categories = [
    { label: '01. Kiến Thức', score: 0.88, color: '#00b894' },
    { label: '02. Vận Động', score: 0.88, color: '#0984e3' },
    { label: '03. Hướng Dẫn', score: 0.78, color: '#e17055' },
    { label: '04. Tổ Chức Lớp', score: 0.85, color: '#00cec9' },
    { label: '05. An Toàn', score: 0.94, color: '#10b981' },
    { label: '06. Sư Phạm Taiiku', score: 0.95, color: '#6c5ce7' }
  ];

  if (teacher && teacher.competencies && teacher.competencies.length === 6) {
    categories = teacher.competencies.map(c => ({
      label: c.label,
      score: (c.val || 80) / 100,
      color: c.color || '#00b894'
    }));
  }

  const totalAxes = categories.length;
  const angleStep = (Math.PI * 2) / totalAxes;
  const startAngle = -Math.PI / 2;

  ctx.clearRect(0, 0, width, height);

  // 1. Draw Concentric Polygon Grid Rings (20%, 40%, 60%, 80%, 100%)
  const rings = 5;
  for (let r = 1; r <= rings; r++) {
    const ringRadius = radius * (r / rings);
    ctx.beginPath();
    for (let i = 0; i < totalAxes; i++) {
      const angle = startAngle + i * angleStep;
      const x = centerX + ringRadius * Math.cos(angle);
      const y = centerY + ringRadius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = r === rings ? 'rgba(148, 163, 184, 0.45)' : 'rgba(226, 232, 240, 0.7)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Scale label (e.g., 20%, 40%...)
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText(`${r * 20}%`, centerX + 4, centerY - ringRadius + 10);
  }

  // 2. Draw Radial Axes and Text Labels
  for (let i = 0; i < totalAxes; i++) {
    const angle = startAngle + i * angleStep;
    const endX = centerX + radius * Math.cos(angle);
    const endY = centerY + radius * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.9)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Text Label Positioning
    const labelDistance = radius + 22;
    const labelX = centerX + labelDistance * Math.cos(angle);
    const labelY = centerY + labelDistance * Math.sin(angle);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 11.5px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(categories[i].label, labelX, labelY);
  }

  // 3. Draw Benchmark Polygon (Cluster Average = 78%)
  ctx.beginPath();
  for (let i = 0; i < totalAxes; i++) {
    const angle = startAngle + i * angleStep;
    const benchmarkRadius = radius * 0.78;
    const x = centerX + benchmarkRadius * Math.cos(angle);
    const y = centerY + benchmarkRadius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.6)';
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.setLineDash([]);

  // 4. Draw Teacher's Competency Score Polygon
  ctx.beginPath();
  const points = [];
  for (let i = 0; i < totalAxes; i++) {
    const angle = startAngle + i * angleStep;
    const scoreRadius = radius * categories[i].score;
    const x = centerX + scoreRadius * Math.cos(angle);
    const y = centerY + scoreRadius * Math.sin(angle);
    points.push({ x, y, score: categories[i].score });
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();

  // Polygon Fill with Gradient
  const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
  gradient.addColorStop(0, 'rgba(0, 229, 155, 0.45)');
  gradient.addColorStop(1, 'rgba(0, 184, 148, 0.2)');
  ctx.fillStyle = gradient;
  ctx.fill();

  // Polygon Border
  ctx.strokeStyle = '#00b894';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // 5. Draw Glowing Vertices and Score Badges
  points.forEach(pt => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#00e59b';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

// ==========================================
// 4. LEVEL 4: PERFORMANCE TREND LINE CHART (Canvas)
// ==========================================
function initTrendChart() {
  const canvas = document.getElementById('trendChartCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const width = canvas.width;
  const height = canvas.height;
  const scores = [74.0, 78.5, 81.0, 83.5, 86.0, 88.5];
  const months = ['T3', 'T4', 'T5', 'T6', 'T7', 'Hiện tại'];

  ctx.clearRect(0, 0, width, height);

  const paddingLeft = 32;
  const paddingRight = 32;
  const paddingTop = 16;
  const paddingBottom = 24;

  const minScore = 70;
  const maxScore = 95;

  const getX = i => paddingLeft + (i / (scores.length - 1)) * (width - paddingLeft - paddingRight);
  const getY = val => height - paddingBottom - ((val - minScore) / (maxScore - minScore)) * (height - paddingTop - paddingBottom);

  // Draw Grid Horizontal Line
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(paddingLeft, getY(80));
  ctx.lineTo(width - paddingRight, getY(80));
  ctx.stroke();

  // Draw Area Gradient Under Curve
  ctx.beginPath();
  ctx.moveTo(getX(0), height - paddingBottom);
  scores.forEach((s, i) => {
    ctx.lineTo(getX(i), getY(s));
  });
  ctx.lineTo(getX(scores.length - 1), height - paddingBottom);
  ctx.closePath();

  const areaGradient = ctx.createLinearGradient(0, paddingTop, 0, height - paddingBottom);
  areaGradient.addColorStop(0, 'rgba(0, 229, 155, 0.25)');
  areaGradient.addColorStop(1, 'rgba(0, 229, 155, 0.0)');
  ctx.fillStyle = areaGradient;
  ctx.fill();

  // Draw Smooth Line
  ctx.beginPath();
  scores.forEach((s, i) => {
    if (i === 0) ctx.moveTo(getX(i), getY(s));
    else ctx.lineTo(getX(i), getY(s));
  });
  ctx.strokeStyle = '#00b894';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Draw Points & Labels
  scores.forEach((s, i) => {
    const x = getX(i);
    const y = getY(s);

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#0d1b2a';
    ctx.fill();
    ctx.strokeStyle = '#00e59b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Month Label
    ctx.fillStyle = '#64748b';
    ctx.font = '10px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(months[i], x, height - 6);
  });
}

// ==========================================
// 5. TRAINING HUB & QUIZ SYSTEM
// ==========================================
// ==========================================
// 5. TRAINING HUB, 7-STEP CYCLE & INTERACTIVE COURSES
// ==========================================
function initVideoPlayerAndQuiz() {
  const courseCards = document.querySelectorAll('.course-card');
  const filterChips = document.querySelectorAll('.section-filter-bar .filter-chip');
  const cycleStepItems = document.querySelectorAll('.cycle-step-item');
  const videoCaption = document.getElementById('video-caption');
  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizFeedback = document.getElementById('quiz-feedback');
  const playPauseBtn = document.getElementById('play-pause-btn');

  const courseData = {
    c1: {
      title: 'Video Chuẩn: Dạy Trẻ Treo Xà Đơn & Đỡ Spotting Tiếp Đất 45°',
      question: 'Khi học sinh 4 tuổi thực hiện động tác nhảy buông tay từ xà đơn xuống thảm xốp, sai lầm nào dưới đây gây nguy cơ chấn thương gối cao nhất?',
      options: [
        'A. Duỗi thẳng đơ 2 chân khóa cứng khớp gối khi chạm đất',
        'B. Hạ thấp trọng tâm và gập đầu gối một góc 45 độ',
        'C. Đưa hai tay ra trước để điều chỉnh thăng bằng cơ thể'
      ],
      correctIdx: '0',
      explanation: 'Chính xác! Khóa cứng khớp gối dồn toàn bộ phản lực mặt đất vào sụn chêm và dây chằng chéo trước (ACL). Tư thế chuẩn bắt buộc phải gập gối 45° để cơ tứ đầu đùi hấp thụ lực.'
    },
    c2: {
      title: 'Video Chuẩn: Triết Lý Taiiku Tâm – Thân – Trí Trong Giờ Vận Động',
      question: 'Nguyên lý cốt lõi của phương pháp bảo đảm an toàn Ukemi trong thể chất Taiiku Nhật Bản là gì?',
      options: [
        'A. Dạy trẻ chủ động ngã nghiêng và cuộn tròn người để triệt tiêu lực va đập',
        'B. Luôn dùng tay chống vuông góc xuống mặt sàn khi ngã',
        'C. Đứng bất động không phản ứng khi trượt chân'
      ],
      correctIdx: '0',
      explanation: 'Chính xác! Nguyên lý Ukemi dạy trẻ cuộn tròn người như quả bóng và gập cằm sát ngực để bảo vệ cột sống và vùng đầu.'
    },
    c3: {
      title: 'Video Chuẩn: 6 Vận Động Nền Tảng Cho Trẻ Mầm Non (Chạy, Nhảy, Bò, Leo)',
      question: 'Khi hướng dẫn trẻ 3-4 tuổi bò qua chướng ngại vật thấp, giáo viên cần làm mẫu thị phạm như thế nào?',
      options: [
        'A. Thị phạm chéo góc 45 độ, di chuyển chậm rãi kết hợp tay chân nhịp nhàng',
        'B. Đứng thẳng và chỉ tay về phía trước',
        'C. Thổi còi liên tục không làm mẫu'
      ],
      correctIdx: '0',
      explanation: 'Chính xác! Góc nhìn 45 độ giúp trẻ quan sát đồng thời cả hai trục tay và chân của giáo viên làm mẫu.'
    },
    c4: {
      title: 'Video Chuẩn: Phối Hợp Vòng, Rào Bật Nhảy & Thang Dây Agility',
      question: 'Khoảng cách an toàn tối thiểu giữa các rào bật nhảy mầm non là bao nhiêu?',
      options: [
        'A. 60cm – 80cm (khoảng 2 bước chân của trẻ)',
        'B. 20cm sát nhau',
        'C. 200cm xa nhau'
      ],
      correctIdx: '0',
      explanation: 'Chính xác! Khoảng cách 60-80cm đảm bảo trẻ tiếp đất an toàn và kịp lấy đà cho lần bật tiếp theo.'
    },
    c5: {
      title: 'Video Chuẩn: Kỹ Thuật Luân Chuyển Trạm Không Có Thời Gian Chết',
      question: 'Thời gian chờ đợi tối đa cho phép của mỗi học sinh trong mạch vận động phân trạm là bao nhiêu?',
      options: [
        'A. Dưới 15 giây/lần luân chuyển',
        'B. Trên 60 giây',
        'C. Không giới hạn'
      ],
      correctIdx: '0',
      explanation: 'Chính xác! Tiêu chuẩn Taiiku Nhật Bản quy định thời gian chờ dưới 15 giây để duy trì thân nhiệt và sự tập trung hào hứng của trẻ.'
    },
    c6: {
      title: 'Video Chuẩn: Khẩu Lệnh Còi Tsubasa & Nghệ Thuật Khích Lệ Trẻ Nhút Nhát',
      question: 'Khi một trẻ 3 tuổi khóc sợ không dám leo lên bục, hành động nào là đúng chuẩn sư phạm Taiiku?',
      options: [
        'A. Ngồi xuống ngang tầm mắt, nắm tay trẻ và khen ngợi từng bước chân nhỏ',
        'B. Bế xốc trẻ đặt lên bục cao',
        'C. Bỏ qua trẻ và chuyển sang bạn khác'
      ],
      correctIdx: '0',
      explanation: 'Chính xác! Tôn trọng cảm xúc và đồng hành ngang tầm mắt giúp trẻ kích hoạt niềm tin và vượt qua sợ hãi.'
    }
  };

  // 1. Filter Courses by Category
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.getAttribute('data-cat');

      courseCards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 2. Select Course Card
  courseCards.forEach(card => {
    card.addEventListener('click', () => {
      courseCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const cId = card.getAttribute('data-course-id');
      const cInfo = courseData[cId] || courseData.c1;

      if (videoCaption) videoCaption.textContent = cInfo.title;
      if (quizQuestionText) quizQuestionText.textContent = cInfo.question;

      const optContainer = document.getElementById('quiz-options-container');
      if (optContainer && cInfo.options) {
        optContainer.innerHTML = cInfo.options.map((optText, idx) => `
          <label class="quiz-option" data-idx="${idx}">
            <input type="radio" name="quiz_opt" value="${idx}">
            <span>${optText}</span>
          </label>
        `).join('');

        // Re-bind quiz options
        bindQuizOptions(cInfo);
      }

      if (quizFeedback) quizFeedback.classList.add('hidden');
      showToast(`Đã chọn bài giảng: ${card.querySelector('.course-title').textContent}`, 'info', 3000);
    });
  });

  function bindQuizOptions(cInfo) {
    const quizOptions = document.querySelectorAll('.quiz-option');
    let selectedOption = null;

    quizOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        quizOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedOption = opt.getAttribute('data-idx');
      });
    });

    const submitBtn = document.getElementById('submit-quiz-btn');
    if (submitBtn) {
      submitBtn.onclick = () => {
        if (!selectedOption) {
          showToast('Vui lòng chọn một đáp án trước khi xác nhận!', 'warning');
          return;
        }

        if (quizFeedback) {
          quizFeedback.classList.remove('hidden', 'correct', 'incorrect');
          if (selectedOption === cInfo.correctIdx) {
            quizFeedback.classList.add('correct');
            quizFeedback.innerHTML = `<strong>Chính xác! ✓</strong> ${cInfo.explanation}`;
            showToast('Chúc mừng! Bạn đã trả lời chính xác câu hỏi kiểm tra năng lực.', 'success');
          } else {
            quizFeedback.classList.add('incorrect');
            quizFeedback.innerHTML = `<strong>Chưa chính xác.</strong> Hãy xem lại video mẫu và lưu ý góc tiếp đất an toàn 45 độ để bảo vệ khớp gối học sinh.`;
            showToast('Chưa chính xác! Vui lòng đọc lại giải thích chuyên môn.', 'warning');
          }
        }
      };
    }
  }

  // Initial binding
  bindQuizOptions(courseData.c1);

  // 3. Clickable 7-Step Course Cycle Banner
  cycleStepItems.forEach((step, idx) => {
    step.addEventListener('click', () => {
      cycleStepItems.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
      const stepNum = idx + 1;

      if (stepNum === 1) {
        showToast('Bước 1: KIẾN THỨC NỀN TẢNG — Tìm hiểu đặc điểm giải phẫu vận động trẻ 2-6 tuổi.', 'info', 3500);
      } else if (stepNum === 2) {
        showToast('Bước 2: XEM VIDEO MẪU — Quan sát tư thế thị phạm chuẩn của Master Coach.', 'info', 3500);
        if (playPauseBtn) playPauseBtn.click();
      } else if (stepNum === 3) {
        showToast('Bước 3: QUAN SÁT & CHECKLIST — Ghi nhớ 4 tiêu chuẩn kỹ thuật bắt buộc.', 'info', 3500);
      } else if (stepNum === 4) {
        showToast('Bước 4: BÀI KIỂM TRA QUIZ — Hoàn thành 10 câu trắc nghiệm chuyên môn.', 'info', 3500);
        const quizBox = document.querySelector('.quiz-box');
        if (quizBox) quizBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (stepNum === 5) {
        showToast('Bước 5: THỰC HÀNH & TỰ QUAY — Chuyển sang khu vực nén video & AI Pose Check.', 'info', 3500);
        window.switchTab('practice-upload');
      } else if (stepNum === 6) {
        showToast('Bước 6: CHẤM RUBRIC DỰ GIỜ — Mở công cụ đánh giá 7 giai đoạn tiết học.', 'info', 3500);
        if (window.openAssessmentModal) window.openAssessmentModal('Kenji Tanaka');
      } else if (stepNum === 7) {
        showToast('Bước 7: XÁC NHẬN NĂNG LỰC — Tra cứu văn bằng chứng nhận QR Code.', 'success', 3500);
        const certModal = document.getElementById('certificate-modal');
        if (certModal) certModal.classList.remove('hidden');
      }
    });
  });

  // Play / Pause Mock Video
  let isPlaying = false;
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        showToast('Đang phát video bài giảng chuyên môn (Chất lượng HD 1080p)...', 'info', 2500);
        playPauseBtn.innerHTML = '<span style="font-size: 20px; font-weight: bold;">❚❚</span>';
      } else {
        playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="32" height="32" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
      }
    });
  }
}


function initPracticeSubmission() {
  const fileInput = document.getElementById('video-file-input');
  const btnSelectFile = document.getElementById('btn-select-file');
  const dropzone = document.getElementById('practice-dropzone');
  const defaultContent = document.getElementById('dropzone-default-content');
  const fileChosenBox = document.getElementById('file-chosen-box');
  const fileActionBar = document.getElementById('file-action-bar');
  const chosenFileName = document.getElementById('chosen-file-name');
  const chosenFileSize = document.getElementById('chosen-file-size');
  const btnRemoveFile = document.getElementById('btn-remove-chosen-file');
  const btnStartProcess = document.getElementById('btn-start-process-chosen-file');
  const simulateRecordBtn = document.getElementById('btn-simulate-record');
  const compressionBox = document.getElementById('compression-box');
  const percentLabel = document.getElementById('comp-percent-label');
  const progressFill = document.getElementById('comp-progress-fill');
  const drillSelect = document.getElementById('practice-drill-select');

  // AI Vision Viewport & HUD Elements
  const aiViewport = document.getElementById('ai-vision-viewport');
  const aiVideo = document.getElementById('ai-video-element');
  const aiFallback = document.getElementById('ai-skeleton-fallback');
  const aiCanvas = document.getElementById('ai-pose-canvas');
  const laserScanner = document.getElementById('laser-scanner');
  const scanFrameNum = document.getElementById('scan-frame-num');
  const btnToggleVideo = document.getElementById('btn-toggle-ai-video');
  const btnRescanAi = document.getElementById('btn-rescan-ai');
  const hudKneeVal = document.getElementById('hud-knee-val');
  const hudArmVal = document.getElementById('hud-arm-val');
  const activeBadge = document.getElementById('ai-active-badge');
  const statusSubtitle = document.getElementById('ai-status-subtitle');

  let currentSelectedFile = null;
  let isVideoPlaying = false;
  let realPoseDetector = null;
  let isMediaPipeReady = false;
  let isProcessingFrame = false;
  let animFrameId = null;

  // 1. Calculate Exact Video Render Boundaries inside letterboxed container
  function getVideoRenderRect(video, container) {
    const cw = container.clientWidth || 560;
    const ch = container.clientHeight || 380;
    const vw = video.videoWidth || cw;
    const vh = video.videoHeight || ch;
    const videoAspect = vw / vh;
    const containerAspect = cw / ch;

    let renderW, renderH, offsetX, offsetY;
    if (containerAspect > videoAspect) {
      renderH = ch;
      renderW = ch * videoAspect;
      offsetX = (cw - renderW) / 2;
      offsetY = 0;
    } else {
      renderW = cw;
      renderH = cw / videoAspect;
      offsetX = 0;
      offsetY = (ch - renderH) / 2;
    }
    return { width: renderW, height: renderH, x: offsetX, y: offsetY };
  }

  // 2. Initialize Real Google MediaPipe Pose Detector (On-Device WebAssembly)
  initMediaPipePose();

  function initMediaPipePose() {
    if (typeof Pose === 'undefined') {
      console.warn('Google MediaPipe Pose SDK loading from CDN...');
      setTimeout(initMediaPipePose, 600);
      return;
    }

    try {
      realPoseDetector = new Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
      });

      realPoseDetector.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      realPoseDetector.onResults(onPoseResults);
      isMediaPipeReady = true;
      if (activeBadge) {
        activeBadge.textContent = 'MediaPipe Sẵn Sàng';
        activeBadge.className = 'badge badge-teal';
      }
      console.log('✓ Google MediaPipe Pose AI initialized successfully!');
    } catch (e) {
      console.error('MediaPipe initialization error:', e);
    }
  }

  // 3. Geometric Angle Calculation between vectors BA and BC
  function calculateAngle(a, b, c) {
    if (!a || !b || !c) return 0;
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) {
      angle = 360.0 - angle;
    }
    return Math.round(angle);
  }

  // 4. On Results from MediaPipe Pose Detection
  function onPoseResults(results) {
    if (!aiCanvas || !aiViewport) return;
    const ctx = aiCanvas.getContext('2d');
    const width = aiCanvas.width = aiViewport.clientWidth || 560;
    const height = aiCanvas.height = aiViewport.clientHeight || 380;

    ctx.clearRect(0, 0, width, height);

    if (results.poseLandmarks && results.poseLandmarks.length > 0) {
      const lm = results.poseLandmarks;

      // Exact pixel coordinates mapping with letterbox awareness
      const rect = aiVideo && aiVideo.videoWidth > 0 
        ? getVideoRenderRect(aiVideo, aiViewport)
        : { width: width, height: height, x: 0, y: 0 };

      const toScreen = (pt) => ({
        x: rect.x + pt.x * rect.width,
        y: rect.y + pt.y * rect.height
      });

      // Measure Knee Angle (Hip - Knee - Ankle) & Arm Angle (Shoulder - Elbow - Wrist)
      const leftKneeAngle = calculateAngle(lm[23], lm[25], lm[27]);
      const rightKneeAngle = calculateAngle(lm[24], lm[26], lm[28]);
      const leftArmAngle = calculateAngle(lm[11], lm[13], lm[15]);
      const rightArmAngle = calculateAngle(lm[12], lm[14], lm[16]);

      const useLeftLeg = (lm[25].visibility || 1) >= (lm[26].visibility || 1);
      const measuredKnee = useLeftLeg ? leftKneeAngle : rightKneeAngle;
      const kneePt = toScreen(useLeftLeg ? lm[25] : lm[26]);

      const useLeftArm = (lm[13].visibility || 1) >= (lm[14].visibility || 1);
      const measuredArm = useLeftArm ? leftArmAngle : rightArmAngle;
      const elbowPt = toScreen(useLeftArm ? lm[13] : lm[14]);

      // Draw Delicate, Non-Obstructive Skeleton Overlays Directly on Human Body
      drawNonObstructiveSkeleton(ctx, lm, toScreen);

      // Draw subtle joint angle arc at the knee
      if (kneePt && kneePt.x > 0) {
        ctx.beginPath();
        ctx.arc(kneePt.x, kneePt.y, 14, 0, Math.PI * 1.4);
        ctx.strokeStyle = '#00e59b';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#00e59b';
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.fillText(`${measuredKnee}°`, kneePt.x + 8, kneePt.y - 6);
      }

      // Update Clean HUD Telemetry Bar (Placed OUTSIDE the video body, no covering!)
      if (hudKneeVal) hudKneeVal.textContent = `${measuredKnee}°`;
      if (hudArmVal) hudArmVal.textContent = `${measuredArm}°`;

      // Update Dynamic Scores based on real angle measurement
      updateDynamicScoresFromRealAngles(measuredKnee, measuredArm);

      if (activeBadge) {
        activeBadge.textContent = '✓ AI Tracking Khớp Thật';
        activeBadge.className = 'badge badge-neon';
      }
      if (statusSubtitle) {
        statusSubtitle.textContent = `Google MediaPipe Pose: Đo trực tiếp gối ${measuredKnee}°, tay ${measuredArm}° (Không che hình ảnh)`;
      }
    } else {
      if (activeBadge) {
        activeBadge.textContent = 'Đang Quét Người...';
        activeBadge.className = 'badge badge-amber';
      }
    }
  }

  // Draw clean, elegant, thin skeleton lines that don't block the video
  function drawNonObstructiveSkeleton(ctx, lm, toScreen) {
    const pairs = [
      [11, 12], [11, 13], [13, 15], [12, 14], [14, 16],
      [11, 23], [12, 24], [23, 24],
      [23, 25], [25, 27], [24, 26], [26, 28]
    ];

    ctx.strokeStyle = 'rgba(0, 229, 155, 0.75)';
    ctx.lineWidth = 2.2;
    ctx.shadowColor = '#00e59b';
    ctx.shadowBlur = 6;

    pairs.forEach(([i, j]) => {
      if (lm[i] && lm[j]) {
        const p1 = toScreen(lm[i]);
        const p2 = toScreen(lm[j]);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });

    // Small glowing landmark dots
    const keyIndices = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];
    keyIndices.forEach(idx => {
      if (lm[idx]) {
        const p = toScreen(lm[idx]);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00e59b';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
    });
  }

  // 5. Dynamic Score Calculator based on real measured angles
  function updateDynamicScoresFromRealAngles(knee, arm) {
    const kneeDiff = Math.abs(knee - 45);
    const kneeScore = Math.max(100 - kneeDiff * 1.8, 60);

    const armDiff = Math.abs(arm - 90);
    const armScore = Math.max(100 - armDiff * 1.5, 65);

    const m1Val = document.getElementById('metric-val-1');
    const m2Val = document.getElementById('metric-val-2');
    const m3Val = document.getElementById('metric-val-3');
    const adviceEl = document.getElementById('ai-advice-container');

    if (m1Val) {
      m1Val.textContent = `${Math.round(kneeScore)} / 100`;
      m1Val.className = `metric-val ${kneeScore >= 85 ? 'text-success' : 'text-warning'}`;
    }
    if (m2Val) {
      m2Val.textContent = `${Math.round(armScore)} / 100`;
      m2Val.className = `metric-val ${armScore >= 85 ? 'text-success' : 'text-warning'}`;
    }
    if (m3Val) {
      const overall = Math.round((kneeScore + armScore) / 2);
      m3Val.textContent = `${overall} / 100 (Khoảng cách an toàn đạt chuẩn)`;
      m3Val.className = `metric-val ${overall >= 80 ? 'text-success' : 'text-warning'}`;
    }

    if (adviceEl) {
      if (kneeDiff <= 10) {
        adviceEl.innerHTML = `<strong>Lời khuyên từ AI Coach (Đo THẬT ${knee}°):</strong> "Góc gập gối ${knee}° rất đẹp, nằm trong vùng an toàn (40°-50°) giúp triệt tiêu phản lực khi chạm đất. Giữ vững tư thế này cho học sinh."`;
      } else if (knee > 55) {
        adviceEl.innerHTML = `<strong>Cảnh báo từ AI Coach (Đo THẬT ${knee}°):</strong> "Gối gập chưa đủ sâu (hiện tại ${knee}° > 50°). Chân còn hơi cứng, cần hạ thấp trọng tâm hơn nữa khi chạm thảm để bảo vệ khớp gối."`;
      } else {
        adviceEl.innerHTML = `<strong>Lời khuyên từ AI Coach (Đo THẬT ${knee}°):</strong> "Gối gập hơi sâu (${knee}° < 40°), có thể làm mất đà đứng dậy. Cần giữ độ nhún vừa phải ở mức 45°."`;
      }
    }
  }

  // 6. Frame Streamer into MediaPipe Model
  async function streamVideoFrames() {
    if (!aiVideo || aiVideo.paused || aiVideo.ended) {
      return;
    }

    if (realPoseDetector && isMediaPipeReady && aiVideo.readyState >= 2 && !isProcessingFrame) {
      isProcessingFrame = true;
      try {
        await realPoseDetector.send({ image: aiVideo });
      } catch (err) {
        // Frame dropped, proceed to next
      }
      isProcessingFrame = false;
    }

    animFrameId = requestAnimationFrame(streamVideoFrames);
  }

  // 7. Video Selection Handler (File input / Drag-Drop)
  function handleFileSelection(file) {
    currentSelectedFile = file;
    const formattedSize = file.size > 1024 * 1024 
      ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
      : (file.size / 1024).toFixed(0) + ' KB';

    if (chosenFileName) chosenFileName.textContent = file.name;
    if (chosenFileSize) chosenFileSize.textContent = formattedSize;

    if (defaultContent) defaultContent.classList.add('hidden');
    if (fileChosenBox) fileChosenBox.classList.remove('hidden');
    if (fileActionBar) fileActionBar.classList.remove('hidden');
    if (compressionBox) compressionBox.classList.add('hidden');

    if (aiVideo) {
      try {
        const videoUrl = URL.createObjectURL(file);
        aiVideo.src = videoUrl;
        aiVideo.classList.remove('hidden');
        if (aiFallback) aiFallback.classList.add('hidden');

        aiVideo.onloadeddata = () => {
          aiVideo.play().then(() => {
            isVideoPlaying = true;
            if (btnToggleVideo) btnToggleVideo.textContent = '⏸ Tạm Dừng';
            streamVideoFrames();
          }).catch(err => {
            console.log('Video autoplay prevented:', err);
          });
        };
      } catch (err) {
        console.error('Video blob mount error:', err);
      }
    }

    triggerLaserScanAnimation();
  }

  // 8. Event Listeners for File Selection
  if (btnSelectFile && fileInput) {
    btnSelectFile.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.click();
    });
  }

  if (dropzone) {
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('drag-over');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('drag-over');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileSelection(e.dataTransfer.files[0]);
      }
    });

    dropzone.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      if (fileInput && !fileChosenBox.classList.contains('hidden')) return;
      if (fileInput) fileInput.click();
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        handleFileSelection(fileInput.files[0]);
      }
    });
  }

  // 9. Remove File
  if (btnRemoveFile) {
    btnRemoveFile.addEventListener('click', (e) => {
      e.stopPropagation();
      currentSelectedFile = null;
      if (fileInput) fileInput.value = '';
      if (defaultContent) defaultContent.classList.remove('hidden');
      if (fileChosenBox) fileChosenBox.classList.add('hidden');
      if (fileActionBar) fileActionBar.classList.add('hidden');
      if (compressionBox) compressionBox.classList.add('hidden');

      if (aiVideo) {
        aiVideo.pause();
        aiVideo.removeAttribute('src');
        aiVideo.load();
        aiVideo.classList.add('hidden');
      }
      if (aiFallback) aiFallback.classList.remove('hidden');

      if (animFrameId) cancelAnimationFrame(animFrameId);
      const ctx = aiCanvas.getContext('2d');
      ctx.clearRect(0, 0, aiCanvas.width, aiCanvas.height);
      if (hudKneeVal) hudKneeVal.textContent = '--°';
      if (hudArmVal) hudArmVal.textContent = '--°';
    });
  }

  // 10. Start Compression
  if (btnStartProcess) {
    btnStartProcess.addEventListener('click', () => {
      startCompressionProcess(currentSelectedFile ? currentSelectedFile.name : 'video_bai_tap.mp4');
    });
  }

  if (simulateRecordBtn) {
    simulateRecordBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      simulateRecordBtn.disabled = true;
      simulateRecordBtn.textContent = 'Đang quay video bài tập... 00:05';

      let count = 5;
      const countdown = setInterval(() => {
        count--;
        if (count > 0) {
          simulateRecordBtn.textContent = `Đang quay video bài tập... 00:0${count}`;
        } else {
          clearInterval(countdown);
          simulateRecordBtn.textContent = 'Đã quay xong! Bắt đầu nén...';
          startCompressionProcess('video_quay_truc_tiep_5s.mp4');
        }
      }, 1000);
    });
  }

  function startCompressionProcess(fileName) {
    if (compressionBox) compressionBox.classList.remove('hidden');
    if (fileActionBar) fileActionBar.classList.add('hidden');

    let progress = 0;
    const compInterval = setInterval(() => {
      progress += 10;
      if (percentLabel) percentLabel.textContent = `${progress}%`;
      if (progressFill) progressFill.style.width = `${progress}%`;

      if (progress >= 100) {
        clearInterval(compInterval);
        if (simulateRecordBtn) {
          simulateRecordBtn.disabled = false;
          simulateRecordBtn.textContent = '🎥 Quay Video (5s Demo)';
        }
        triggerLaserScanAnimation();
        showToast(`Tệp "${fileName}" đã nén H.264 (giảm 74%) và tải lên thành công! Google MediaPipe AI đang phân tích chuyển động...`, 'success', 5000);
      }
    }, 200);
  }

  function triggerLaserScanAnimation() {
    if (laserScanner) laserScanner.classList.remove('hidden');

    let frame = 0;
    const scanInterval = setInterval(() => {
      frame += 12;
      if (scanFrameNum) scanFrameNum.textContent = Math.min(frame, 120);

      if (frame >= 120) {
        clearInterval(scanInterval);
        if (laserScanner) laserScanner.classList.add('hidden');
      }
    }, 150);
  }

  // 11. Play/Pause & Rescan Controls
  if (btnToggleVideo && aiVideo) {
    btnToggleVideo.addEventListener('click', () => {
      if (isVideoPlaying) {
        aiVideo.pause();
        isVideoPlaying = false;
        btnToggleVideo.textContent = '▶ Tiếp Tục';
      } else {
        aiVideo.play();
        isVideoPlaying = true;
        btnToggleVideo.textContent = '⏸ Tạm Dừng';
        streamVideoFrames();
      }
    });
  }

  if (btnRescanAi) {
    btnRescanAi.addEventListener('click', () => {
      triggerLaserScanAnimation();
      if (aiVideo && isVideoPlaying) {
        streamVideoFrames();
      }
    });
  }
}
// ==========================================
// 7. LEVEL 6: AI SENSEI CHATBOT
// ==========================================
function initAiCoach() {
  const chatInput = document.getElementById('chat-input-field');
  const sendBtn = document.getElementById('chat-send-btn');
  const messagesContainer = document.getElementById('chat-messages-container');
  const typingIndicator = document.getElementById('chat-typing-indicator');
  const chips = document.querySelectorAll('.chip-btn');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      chatInput.value = prompt;
      sendMessage(prompt);
    });
  });

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const text = chatInput.value.trim();
      if (text) {
        sendMessage(text);
        chatInput.value = '';
      }
    });
  }

  if (chatInput) {
    chatInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        const text = chatInput.value.trim();
        if (text) {
          sendMessage(text);
          chatInput.value = '';
        }
      }
    });
  }

  function sendMessage(text) {
    // 1. Append User Message
    const userMsgEl = document.createElement('div');
    userMsgEl.className = 'chat-msg user-msg';
    userMsgEl.innerHTML = `
      <div class="msg-avatar">KT</div>
      <div class="msg-bubble">
        <p>${escapeHtml(text)}</p>
      </div>
    `;
    messagesContainer.appendChild(userMsgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 2. Show Typing Indicator
    typingIndicator.classList.remove('hidden');

    // 3. Simulate AI Cognitive Generation
    setTimeout(() => {
      typingIndicator.classList.add('hidden');
      const responseHtml = generateAiResponse(text);

      const aiMsgEl = document.createElement('div');
      aiMsgEl.className = 'chat-msg ai-msg';
      aiMsgEl.innerHTML = `
        <div class="msg-avatar">🥋</div>
        <div class="msg-bubble">
          ${responseHtml}
        </div>
      `;
      messagesContainer.appendChild(aiMsgEl);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1200);
  }

  function generateAiResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('treo xà') || q.includes('xà đơn') || q.includes('4-5 tuổi')) {
      return `
        <p><strong>🤸‍♂️ Giáo án chuẩn Taiiku: Kỹ thuật dạy trẻ 4–5 tuổi treo xà đơn an toàn</strong></p>
        <p><strong>1. Mục tiêu bài học:</strong> Phát triển sức mạnh cổ tay, ngón tay và kéo giãn cột sống tự nhiên; rèn luyện thói quen tiếp đất gập gối 45° triệt tiêu phản lực.</p>
        <p><strong>2. Chuẩn bị:</strong> Thanh xà ngang tầm với của trẻ khi đứng kiễng gót. Trải thảm xốp dày 10cm ngay dưới chân xà.</p>
        <p><strong>3. Khẩu lệnh chuẩn:</strong> <em>"Nhìn thẳng lên xà! Hai tay nắm chặt (ngón cái vòng qua)! Nhấc chân 1.. 2.. 3... Tiếp đất êm như mèo con!"</em></p>
        <p><strong>4. Thị phạm & Sửa sai:</strong> Tuyệt đối không cho trẻ nắm xà ngón cái xòe ra (thumbless grip) vì dễ trơn trượt. Giáo viên thị phạm tư thế mắt nhìn thẳng, không ngoái đầu ra sau.</p>
        <p><strong>5. Điểm đón Spotting:</strong> Thầy/cô đứng áp sát bên hông, hai bàn tay mở rộng đặt nhẹ ngang hông trẻ để khống chế đà đu đưa.</p>
      `;
    } else if (q.includes('kế hoạch') || q.includes('idp') || q.includes('tổ chức lớp') || q.includes('4 tuần')) {
      return `
        <p><strong>📋 KẾ HOẠCH ĐÀO TẠO CÁ NHÂN HÓA (IDP 4 TUẦN) TỪ SENSEI AI</strong></p>
        <p><strong>Chuyên đề can thiệp:</strong> Nâng cao Năng lực Tổ Chức Lớp & Khẩu Lệnh Còi cho Giáo Viên</p>
        <p><strong>• Tuần 1 - Kiến thức & Quan sát:</strong> Học mô-đun <em>"Kỹ thuật phân nhịp còi & Bố trí trạm vận động"</em>. Quan sát 2 tiết dạy mẫu của Master Trainer tại cơ sở SK-1.</p>
        <p><strong>• Tuần 2 - Thị phạm có Co-teaching:</strong> Đồng giảng cùng GV Senior Coach; thực hành quản lý luân chuyển 2 hàng dọc không để thời gian chết quá 15 giây.</p>
        <p><strong>• Tuần 3 - Tự quay video & AI Pose Check:</strong> Nộp 2 video phân làn tập bục nhảy; AI Coach phân tích nhịp dứt khoát của khẩu lệnh.</p>
        <p><strong>• Tuần 4 - Đánh giá thẩm định lại:</strong> Trưởng bộ phận dự giờ chấm theo Rubric 7 giai đoạn; mục tiêu đạt từ 85 điểm trở lên để nâng hạng M3.</p>
      `;
    }

    if (q.includes('3 tuổi') || q.includes('sợ') || q.includes('nhảy')) {
      return `
        <p><strong>🤸‍♂️ Chiến thuật Sư phạm: Xử lý trẻ 3 tuổi sợ nhảy từ bục</strong></p>
        <p>Trẻ 3 tuổi sợ nhảy chủ yếu do <strong>ảo giác độ sâu (depth perception)</strong> và cảm giác mất điểm tựa bàn chân. Tuyệt đối không bế ép trẻ nhảy, hãy áp dụng quy trình 3 nấc của phương pháp Tsubasa:</p>
        <p><strong>Nấc 1 - Vượt sông cạn (Mặt phẳng):</strong> Dải vòng tròn hoặc thảm mỏng sát đất, đóng vai làm chú ếch xanh nhảy vào lá sen cùng thầy cô nắm chặt 2 tay.</p>
        <p><strong>Nấc 2 - Bậc thang thỏ con (Cao 5cm):</strong> Cho trẻ bước chân xuống bục thấp 5cm trước khi thực hiện bước nhảy hai chân cùng lúc.</p>
        <p><strong>Nấc 3 - Ngữ điệu & Khẩu lệnh:</strong> Dùng giọng cao vui tươi (Motherese voice) đếm <em>"1, 2, 3... Cùng bật nào!"</em> và đập tay High-Five ngay khi trẻ dám đặt chân xuống.</p>
      `;
    } else if (q.includes('hỗn loạn') || q.includes('mất trật tự') || q.includes('ồn ào')) {
      return `
        <p><strong>📢 Kỹ thuật tái lập kỷ luật lớp học thể chất</strong></p>
        <p>Khi học sinh quá khích, việc cố gắng hét to hơn tiếng ồn của trẻ sẽ làm lớp càng hỗn loạn. Hãy dùng 3 mẹo âm thanh & thị giác sau:</p>
        <p><strong>1. Tín hiệu "Bức Tượng Băng":</strong> Thổi 1 tiếng còi dứt khoát rồi lập tức hô: <em>"Đóng băng!"</em> và huấn luyện viên đứng im như tượng đá. Trẻ mầm non có xu hướng bắt chước tư thế người lớn.</p>
        <p><strong>2. Hạ tầm mắt:</strong> Ngồi thụp xuống sàn ngang tầm mắt học sinh thay vì đứng nhìn xuống.</p>
        <p><strong>3. Nhịp điệu tương phản:</strong> Sau 8 phút trò chơi vận động cường độ cao, luôn xen kẽ 2 phút bài tập thở sâu (thổi bong bóng xà phòng vô hình) để hạ nhịp tim.</p>
      `;
    } else if (q.includes('bục 5 tầng') || q.includes('cổ') || q.includes('chấn thương')) {
      return `
        <p><strong>⚠️ Checklist an toàn tuyệt đối khi đỡ học sinh nhảy bục 5 tầng:</strong></p>
        <p>1. <strong>Vị trí đứng của HLV:</strong> Đứng chéo 45 độ so với trục tiếp đất, chân thuận bước trước, trọng tâm thấp.</p>
        <p>2. <strong>Điểm chạm tay 1:</strong> Bàn tay gần bục nhất đặt ngang nách/cánh tay trên của học sinh để nâng trục thân nếu bị chúi đầu.</p>
        <p>3. <strong>Điểm chạm tay 2:</strong> Bàn tay sau đỡ hông/lưng dưới để giữ thăng bằng trọng tâm tiếp đất.</p>
        <p>4. <strong>Khẩu lệnh trước khi nhảy:</strong> Luôn nhắc trẻ <em>"Mắt nhìn thẳng phía trước, không nhìn chúc đầu xuống chân"</em>.</p>
      `;
    } else {
      return `
        <p><strong>🎯 Phân tích chuyên môn từ Sensei AI:</strong></p>
        <p>Vấn đề thầy/cô đặt ra: <em>"${escapeHtml(query)}"</em></p>
        <p><strong>Giải pháp cốt lõi:</strong> Hãy chia nhỏ động tác thành các phân đoạn 15 giây (Micro-drills), bố trí nón chóp màu sắc làm mốc thị giác rõ ràng cho trẻ, và chỉ định một bạn làm mẫu chuẩn để các học sinh khác học tập trực quan.</p>
      `;
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// ==========================================
// 8. MANAGER ALERT CENTER (LEVEL 5)
// ==========================================
function initAlertCenter() {
  const resolveBtns = document.querySelectorAll('.resolve-btn');
  const alertCountEl = document.getElementById('mgr-alert-count');
  const sidebarAlertBadge = document.getElementById('sidebar-alert-badge');

  resolveBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      const alertBox = e.target.closest('.alert-box');
      if (alertBox) {
        alertBox.style.opacity = '0';
        alertBox.style.transform = 'translateX(20px)';
        setTimeout(() => {
          alertBox.remove();
          updateAlertCounts();
          showToast('Đã xử lý và lưu vào lịch sử sự cố thành công.', 'info');
        }, 300);
      }
    });
  });

  function updateAlertCounts() {
    const remaining = document.querySelectorAll('.alert-box').length;
    if (alertCountEl) alertCountEl.textContent = `${remaining} Cảnh Báo`;
    if (sidebarAlertBadge) sidebarAlertBadge.textContent = `${remaining}`;
  }

  // Action Button: Haruto Sato - Lên Lịch Thẩm Định
  const harutoSchedBtn = document.getElementById('btn-alert-sched-haruto');
  if (harutoSchedBtn) {
    harutoSchedBtn.addEventListener('click', () => {
      openTeacherDetails('Haruto Sato');
      const scheduleBtn = document.getElementById('modal-btn-schedule-audit');
      if (scheduleBtn) {
        setTimeout(() => scheduleBtn.click(), 150);
      }
      showToast('Đang mở form xếp lịch thẩm định dự giờ cho GV Haruto Sato...', 'info');
    });
  }

  // Action Button: Aoi Tanaka - Giao Khóa Tái Đào Tạo
  const aoiAssignBtn = document.getElementById('btn-alert-assign-aoi');
  if (aoiAssignBtn) {
    aoiAssignBtn.addEventListener('click', () => {
      openAssignCourseModal('Aoi Tanaka');
    });
  }

  // Action Button: Ren Kobayashi - Gửi Tài Liệu Hướng Dẫn
  const renGuideBtn = document.getElementById('btn-alert-guide-ren');
  if (renGuideBtn) {
    renGuideBtn.addEventListener('click', () => {
      showToast('Đã gửi tài liệu "Sổ tay kỹ thuật còi Tsubasa & Bao quát sân cỏ" cho GV Ren Kobayashi qua email và hệ thống LMS!', 'info', 4500);
      const alertBox = renGuideBtn.closest('.alert-box');
      if (alertBox) {
        alertBox.style.opacity = '0';
        alertBox.style.transform = 'translateX(20px)';
        setTimeout(() => {
          alertBox.remove();
          updateAlertCounts();
        }, 300);
      }
    });
  }
}

// ==========================================
// 9. TEACHER REPOSITORY & MULTI-CLUSTER DATABASE
// ==========================================
const teacherDatabase = {
  'Kenji Tanaka': {
    avatar: 'KT',
    avatarBg: '#00b894',
    name: 'Kenji Tanaka (Sensei Cường)',
    facility: 'SK-1',
    branch: 'Cơ Sở SK-1',
    levelCategory: 'M3',
    level: '🌳 M3: Thành Thạo',
    levelClass: 'badge-m3',
    trend: '▲ Tiến Bộ (+10.0đ)',
    trendClass: 'success',
    dojo: 'Sakura Kids • Cơ Sở SK-1',
    score: '88.5',
    code: 'SKT-2026-88204',
    nextIDP: 'Khẩu lệnh còi dứt khoát + Sửa sai trực tiếp + Đỡ xà đơn',
    classAssigned: 'Lớp Mầm Vành Khuyên 3-4T & Lớp Chồi 4-5T',
    hours: '340 Giờ Dạy Thực Tế',
    cpr: 'Còn Hạn (140 ngày nữa)',
    cprClass: 'text-success',
    competencies: [
      { label: '01. Kiến Thức', val: 88, color: '#00b894' },
      { label: '02. Kỹ Năng Vận Động', val: 88, color: '#0984e3' },
      { label: '03. Kỹ Năng Hướng Dẫn', val: 78, color: '#e17055' },
      { label: '04. Tổ Chức Lớp', val: 85, color: '#00cec9' },
      { label: '05. Bảo Đảm An Toàn', val: 94, color: '#10b981' },
      { label: '06. Sư Phạm Taiiku', val: 95, color: '#6c5ce7' }
    ],
    observation: 'Tư thế đỡ học sinh tiếp đất 45° vững chắc, phản xạ che chắn vùng cổ kịp thời. Đã cải thiện âm lượng khẩu lệnh nhưng cần tăng nhịp còi dứt khoát khi tổ chức bài tập ngoài sân cỏ.'
  },
  'Haruto Sato': {
    avatar: 'HS',
    avatarBg: '#e17055',
    name: 'Haruto Sato',
    facility: 'SK-2',
    branch: 'Cơ Sở SK-2',
    levelCategory: 'M1',
    level: '🌱 M1: Làm Quen',
    levelClass: 'badge-m1',
    trend: '▼ Cần Nhắc Nhở (-4.5đ)',
    trendClass: 'danger',
    dojo: 'Sakura Kids • Cơ Sở SK-2',
    score: '74.2',
    code: 'SKT-2026-77102',
    nextIDP: 'Nhảy bục 4 tầng + Spotting an toàn + Khẩu lệnh',
    classAssigned: 'Lớp Nhà Trẻ Sơn Ca (2-3 tuổi)',
    hours: '160 Giờ Dạy Thực Tế',
    cpr: 'Sắp Hết Hạn (45 ngày nữa)',
    cprClass: 'text-warning',
    competencies: [
      { label: '01. Kiến Thức', val: 76, color: '#00b894' },
      { label: '02. Kỹ Năng Vận Động', val: 74, color: '#0984e3' },
      { label: '03. Kỹ Năng Hướng Dẫn', val: 70, color: '#e17055' },
      { label: '04. Tổ Chức Lớp', val: 71, color: '#00cec9' },
      { label: '05. Bảo Đảm An Toàn', val: 82, color: '#10b981' },
      { label: '06. Sư Phạm Taiiku', val: 78, color: '#6c5ce7' }
    ],
    observation: 'Hiện đang QUÁ HẠN thẩm định đợt dự giờ module Nhảy Bục 4 Tầng. Cần hoàn thiện video thực hành và lên lịch dự giờ trực tiếp trong tuần này.'
  },
  'Aoi Tanaka': {
    avatar: 'AT',
    avatarBg: '#6c5ce7',
    name: 'Aoi Tanaka',
    facility: 'SK-1',
    branch: 'Cơ Sở SK-1',
    levelCategory: 'M2',
    level: '🌿 M2: Đạt Chuẩn',
    levelClass: 'badge-m2',
    trend: '● Ổn Định (+0.5đ)',
    trendClass: 'warning',
    dojo: 'Sakura Kids • Cơ Sở SK-1',
    score: '83.0',
    code: 'SKT-2026-88315',
    nextIDP: 'Tái cấp chứng chỉ CPR + Kỹ thuật còi Tsubasa',
    classAssigned: 'Lớp Lá Họa Mi (5-6 tuổi)',
    hours: '290 Giờ Dạy Thực Tế',
    cpr: 'Cảnh Báo: Hết Hạn Sau 12 Ngày',
    cprClass: 'text-danger',
    competencies: [
      { label: '01. Kiến Thức', val: 84, color: '#00b894' },
      { label: '02. Kỹ Năng Vận Động', val: 84, color: '#0984e3' },
      { label: '03. Kỹ Năng Hướng Dẫn', val: 77, color: '#e17055' },
      { label: '04. Tổ Chức Lớp', val: 80, color: '#00cec9' },
      { label: '05. Bảo Đảm An Toàn', val: 89, color: '#10b981' },
      { label: '06. Sư Phạm Taiiku', val: 85, color: '#6c5ce7' }
    ],
    observation: 'Phong độ giảng dạy ổn định, kiểm soát học sinh nhóm lớn rất nề nếp. Chú ý: Chứng chỉ CPR cấp cứu sắp hết hạn sau 12 ngày, đã giao khóa học tái cấp chứng chỉ.'
  },
  'Ren Kobayashi': {
    avatar: 'RK',
    avatarBg: '#00cec9',
    name: 'Ren Kobayashi',
    facility: 'SK-3',
    branch: 'Cơ Sở SK-3',
    levelCategory: 'M3',
    level: '🌳 M3: Thành Thạo',
    levelClass: 'badge-m3',
    trend: '▲ Xuất Sắc (+3.8đ)',
    trendClass: 'success',
    dojo: 'Sakura Kids • Cơ Sở SK-3',
    score: '92.4',
    code: 'SKT-2026-99050',
    nextIDP: 'Quản lý lớp đông sân cỏ + Bồi dưỡng lên M4 Master Coach',
    classAssigned: 'Lớp Chồi 4-5T & Đội Tuyển Nhí Sakura Kids',
    hours: '480 Giờ Dạy Thực Tế',
    cpr: 'Còn Hạn (220 ngày nữa)',
    cprClass: 'text-success',
    competencies: [
      { label: '01. Kiến Thức', val: 94, color: '#00b894' },
      { label: '02. Kỹ Năng Vận Động', val: 94, color: '#0984e3' },
      { label: '03. Kỹ Năng Hướng Dẫn', val: 88, color: '#e17055' },
      { label: '04. Tổ Chức Lớp', val: 89, color: '#00cec9' },
      { label: '05. Bảo Đảm An Toàn', val: 96, color: '#10b981' },
      { label: '06. Sư Phạm Taiiku', val: 95, color: '#6c5ce7' }
    ],
    observation: 'Giáo viên có năng lực sư phạm và kỹ thuật mẫu xuất sắc. Đã đào tạo mẫu cho 4 giáo viên mới. Đủ điều kiện bồi dưỡng lên Level M4: Master Coach.'
  },
  'Yuto Takahashi': {
    avatar: 'YT',
    avatarBg: '#3b82f6',
    name: 'Yuto Takahashi',
    facility: 'SK-2',
    branch: 'Cơ Sở SK-2',
    levelCategory: 'M1',
    level: '🌱 M1: Làm Quen',
    levelClass: 'badge-m1',
    trend: '● Đang Cải Thiện (+2.1đ)',
    trendClass: 'warning',
    dojo: 'Sakura Kids • Cơ Sở SK-2',
    score: '78.5',
    code: 'SKT-2026-77218',
    nextIDP: 'Thăng bằng xà đơn + Khẩu lệnh còi dứt khoát',
    classAssigned: 'Lớp Mầm 3-4T Cơ Sở SK-2',
    hours: '190 Giờ Dạy Thực Tế',
    cpr: 'Còn Hạn (95 ngày nữa)',
    cprClass: 'text-success',
    competencies: [
      { label: '01. Kiến Thức', val: 80, color: '#00b894' },
      { label: '02. Kỹ Năng Vận Động', val: 78, color: '#0984e3' },
      { label: '03. Kỹ Năng Hướng Dẫn', val: 75, color: '#e17055' },
      { label: '04. Tổ Chức Lớp', val: 76, color: '#00cec9' },
      { label: '05. Bảo Đảm An Toàn', val: 84, color: '#10b981' },
      { label: '06. Sư Phạm Taiiku', val: 80, color: '#6c5ce7' }
    ],
    observation: 'Thái độ tích cực, chịu khó lắng nghe phản hồi. Cần rèn luyện thêm phản xạ đỡ ngã cho trẻ khi thực hiện bài tập xà đơn thăng bằng.'
  },
  'Mei Watanabe': {
    avatar: 'MW',
    avatarBg: '#ec4899',
    name: 'Mei Watanabe',
    facility: 'SK-4',
    branch: 'Cơ Sở SK-4',
    levelCategory: 'M2',
    level: '🌿 M2: Đạt Chuẩn',
    levelClass: 'badge-m2',
    trend: '▲ Tiến Bộ (+6.2đ)',
    trendClass: 'success',
    dojo: 'Sakura Kids • Cơ Sở SK-4',
    score: '87.0',
    code: 'SKT-2026-88402',
    nextIDP: 'Kỹ thuật đỡ tiếp đất 45° + Khẩu lệnh dứt khoát',
    classAssigned: 'Lớp Vận Động Nhịp Điệu Mầm Non',
    hours: '320 Giờ Dạy Thực Tế',
    cpr: 'Còn Hạn (180 ngày nữa)',
    cprClass: 'text-success',
    competencies: [
      { label: '01. Kiến Thức', val: 89, color: '#00b894' },
      { label: '02. Kỹ Năng Vận Động', val: 89, color: '#0984e3' },
      { label: '03. Kỹ Năng Hướng Dẫn', val: 86, color: '#e17055' },
      { label: '04. Tổ Chức Lớp', val: 83, color: '#00cec9' },
      { label: '05. Bảo Đảm An Toàn', val: 91, color: '#10b981' },
      { label: '06. Sư Phạm Taiiku', val: 96, color: '#6c5ce7' }
    ],
    observation: 'Năng khiếu hoạt náo và truyền lửa vượt trội. Các tiết học luôn tràn ngập tiếng cười và sự tập trung hào hứng của trẻ.'
  },
  'Ryota Ito': {
    avatar: 'RI',
    avatarBg: '#8b5cf6',
    name: 'Ryota Ito (Master Coach)',
    facility: 'SK-3',
    branch: 'Cơ Sở SK-3',
    levelCategory: 'M4',
    level: '⭐ M4: Huấn Luyện Viên Mẫu',
    levelClass: 'badge-m4',
    trend: '▲ Đẳng Cấp (+1.2đ)',
    trendClass: 'success',
    dojo: 'Sakura Kids • Cơ Sở SK-3',
    score: '96.8',
    code: 'SKT-2026-99901',
    nextIDP: 'Đào tạo giáo viên toàn hệ thống + Giám sát khảo thí',
    classAssigned: 'Master Coach • Đào Tạo Huấn Luyện Viên Toàn Hệ Thống',
    hours: '1,250 Giờ Dạy Thực Tế',
    cpr: 'Còn Hạn (310 ngày nữa)',
    cprClass: 'text-success',
    competencies: [
      { label: '01. Kiến Thức', val: 98, color: '#00b894' },
      { label: '02. Kỹ Năng Vận Động', val: 97, color: '#0984e3' },
      { label: '03. Kỹ Năng Hướng Dẫn', val: 95, color: '#e17055' },
      { label: '04. Tổ Chức Lớp', val: 95, color: '#00cec9' },
      { label: '05. Bảo Đảm An Toàn', val: 99, color: '#10b981' },
      { label: '06. Sư Phạm Taiiku', val: 98, color: '#6c5ce7' }
    ],
    observation: 'Chuyên gia thể chất hàng đầu hệ thống Sakura Kids. Đang chủ trì xây dựng giáo trình spotting nâng cao và hướng dẫn đội ngũ giáo viên mới.'
  },
  'Nguyen Minh Tuan': {
    avatar: 'MT',
    avatarBg: '#f59e0b',
    name: 'Nguyễn Minh Tuấn',
    facility: 'SK-4',
    branch: 'Cơ Sở SK-4',
    levelCategory: 'M2',
    level: '🌿 M2: Đạt Chuẩn',
    levelClass: 'badge-m2',
    trend: '▲ Tiến Bộ (+7.0đ)',
    trendClass: 'success',
    dojo: 'Sakura Kids • Cơ Sở SK-4',
    score: '85.4',
    code: 'SKT-2026-88501',
    nextIDP: 'Kỹ thuật sửa sai trực tiếp + Mạch vận động liên tục',
    classAssigned: 'Lớp Vận Động Thể Chất Khối 4-5T',
    hours: '280 Giờ Dạy Thực Tế',
    cpr: 'Còn Hạn (190 ngày nữa)',
    cprClass: 'text-success',
    competencies: [
      { label: '01. Kiến Thức', val: 86, color: '#00b894' },
      { label: '02. Kỹ Năng Vận Động', val: 86, color: '#0984e3' },
      { label: '03. Kỹ Năng Hướng Dẫn', val: 81, color: '#e17055' },
      { label: '04. Tổ Chức Lớp', val: 82, color: '#00cec9' },
      { label: '05. Bảo Đảm An Toàn', val: 90, color: '#10b981' },
      { label: '06. Sư Phạm Taiiku', val: 88, color: '#6c5ce7' }
    ],
    observation: 'Thích ứng nhanh với giáo án SK Taiiku chuẩn Nhật Bản. Tác phong sư phạm chuẩn mực, phụ huynh đánh giá rất cao sự tận tình.'
  },
  'Tran Thu Trang': {
    avatar: 'TT',
    avatarBg: '#06b6d4',
    name: 'Trần Thu Trang',
    facility: 'SK-4',
    branch: 'Cơ Sở SK-4',
    levelCategory: 'M1',
    level: '🌱 M1: Làm Quen',
    levelClass: 'badge-m1',
    trend: '● Ổn Định (+1.0đ)',
    trendClass: 'warning',
    dojo: 'Sakura Kids • Cơ Sở SK-4',
    score: '79.0',
    code: 'SKT-2026-77312',
    nextIDP: 'Thị phạm mẫu dứt khoát + An toàn xà bục',
    classAssigned: 'Lớp Vận Động Cảm Giác Nhà Trẻ 2-3T',
    hours: '140 Giờ Dạy Thực Tế',
    cpr: 'Còn Hạn (80 ngày nữa)',
    cprClass: 'text-success',
    competencies: [
      { label: '01. Kiến Thức', val: 82, color: '#00b894' },
      { label: '02. Kỹ Năng Vận Động', val: 76, color: '#0984e3' },
      { label: '03. Kỹ Năng Hướng Dẫn', val: 75, color: '#e17055' },
      { label: '04. Tổ Chức Lớp', val: 75, color: '#00cec9' },
      { label: '05. Bảo Đảm An Toàn', val: 85, color: '#10b981' },
      { label: '06. Sư Phạm Taiiku', val: 84, color: '#6c5ce7' }
    ],
    observation: 'Rất ân cần với trẻ nhỏ 2-3 tuổi, phản xạ dỗ dành tốt. Cần trau dồi thêm kỹ năng làm mẫu động tác dứt khoát hơn.'
  }
};

// ==========================================
// 10. MULTI-FACILITY SAKURA KIDS FILTER SYSTEM
// ==========================================
function initMultiClusterFilters() {
  const facilitySelect = document.getElementById('filter-cluster-select');
  const levelSelect = document.getElementById('filter-level-select');
  const searchInput = document.getElementById('teacher-search-box');
  const clearBtn = document.getElementById('btn-clear-search');
  const facilityCards = document.querySelectorAll('.sk-facility-card');

  // Facility Card Click Handlers (SK-1, SK-2, SK-3, SK-4)
  facilityCards.forEach(card => {
    card.addEventListener('click', () => {
      const facId = card.getAttribute('data-facility');
      facilityCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      if (facilitySelect) {
        facilitySelect.value = facId;
        renderTeacherTable();
      }
      // Toast removed as requested by user
    });
  });
  window.renderTeacherTable = function() {
    const tableBody = document.getElementById('teacher-table-body');
    const emptyRow = document.getElementById('teacher-empty-row');
    const emptyKeyword = document.getElementById('empty-keyword');
    if (!tableBody) return;

    const facVal = facilitySelect ? facilitySelect.value : 'all';
    const levelVal = levelSelect ? levelSelect.value : 'all';
    const searchVal = searchInput ? searchInput.value.trim().toLowerCase() : '';

    const oldRows = tableBody.querySelectorAll('tr:not(#teacher-empty-row)');
    oldRows.forEach(r => r.remove());

    const allTeachers = Object.values(teacherDatabase);
    const filtered = allTeachers.filter(t => {
      const matchFacility = (facVal === 'all') || (t.facility === facVal);
      const matchLevel = (levelVal === 'all') || (t.levelCategory === levelVal);
      const matchSearch = (searchVal === '') || 
        t.name.toLowerCase().includes(searchVal) || 
        t.branch.toLowerCase().includes(searchVal) ||
        t.level.toLowerCase().includes(searchVal) ||
        t.nextIDP.toLowerCase().includes(searchVal);

      return matchFacility && matchLevel && matchSearch;
    });

    if (filtered.length === 0) {
      if (emptyRow) {
        emptyRow.classList.remove('hidden');
        if (emptyKeyword) emptyKeyword.textContent = searchInput ? searchInput.value.trim() : 'Bộ lọc hiện tại';
      }
    } else {
      if (emptyRow) emptyRow.classList.add('hidden');

      filtered.forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <div class="teacher-cell">
              <div class="avatar-sm" style="background: ${t.avatarBg}">${t.avatar}</div>
              <div>
                <strong>${t.name}</strong>
                <span class="small-sub">${t.branch}</span>
              </div>
            </div>
          </td>
          <td><span class="${t.levelClass}">${t.level}</span></td>
          <td><strong>${t.score}</strong></td>
          <td>
            <div style="font-size: 12px; color: #b45309; background: #fffbeb; padding: 4px 8px; border-radius: 6px; border: 1px dashed #fde68a;">
              🎯 ${t.nextIDP}
            </div>
          </td>
          <td>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-xs btn-outline" onclick="openTeacherDetails('${t.name}')">Hồ Sơ</button>
              <button class="btn btn-xs btn-primary" onclick="openAssessmentModal('${t.name}')">Chấm Rubric</button>
            </div>
          </td>
        `;
        tableBody.appendChild(tr);
      });
    }

    const totalTeachersEl = document.getElementById('mgr-total-teachers');
    if (totalTeachersEl) {
      totalTeachersEl.textContent = `${filtered.length} Huấn Luyện Viên`;
    }
  };

  if (facilitySelect) facilitySelect.addEventListener('change', renderTeacherTable);
  if (levelSelect) levelSelect.addEventListener('change', renderTeacherTable);
  if (searchInput) searchInput.addEventListener('input', renderTeacherTable);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (facilitySelect) facilitySelect.value = 'all';
      if (levelSelect) levelSelect.value = 'all';
      renderTeacherTable();
      if (searchInput) searchInput.focus();
    });
  }

  renderTeacherTable();
}

// ==========================================
// 11. PHIẾU ĐÁNH GIÁ 6 NĂNG LỰC & RUBRIC 7 GIAI ĐOẠN
// ==========================================
function initAssessmentSheetModal() {
  window.triggerVoiceRecording = function() {
    showToast('🎙️ Đang kích hoạt Micro ghi âm nhận xét tiết dạy...', 'info', 2000);
    setTimeout(() => {
      const strengthArea = document.getElementById('assess-strength-note');
      if (strengthArea) {
        strengthArea.value = (strengthArea.value ? strengthArea.value + '\n' : '') +
          '🎙️ [Ghi âm nhận xét]: "Giáo viên giữ nhịp còi rất đều và dứt khoát, vị trí đón đỡ spotting xà đơn luôn áp sát hông học sinh, giảm chấn gập gối 45° tuyệt đối chuẩn xác."';
      }
      showToast('Đã chuyển đổi giọng nói thành văn bản nhận xét thành công!', 'success', 3500);
    }, 1200);
  };

  window.triggerPhotoCapture = function() {
    showToast('📷 Đang chụp ảnh minh chứng hiện trường tại sân tập...', 'info', 2000);
    setTimeout(() => {
      const weaknessArea = document.getElementById('assess-weakness-note');
      if (weaknessArea) {
        weaknessArea.value = (weaknessArea.value ? weaknessArea.value + '\n' : '') +
          '📷 [Đính kèm minh chứng]: Hinh_anh_spotting_xa_don_sk1_goc45.jpg (Khoảng cách an toàn đạt chuẩn)';
      }
      showToast('Đã đính kèm ảnh minh chứng vào hồ sơ dự giờ!', 'success', 3500);
    }, 1000);
  };

  const modal = document.getElementById('assessment-sheet-modal');
  const openBtn = document.getElementById('btn-create-assessment');
  const closeBtn = document.getElementById('btn-close-assessment-modal');
  const cancelBtn = document.getElementById('btn-cancel-assessment');
  const saveBtn = document.getElementById('btn-save-assessment');

  const targetSelect = document.getElementById('assess-target-teacher');
  const totalScoreEl = document.getElementById('assess-total-score');
  const gradeBadgeEl = document.getElementById('assess-grade-badge');

  const sliders = {
    know: { range: document.getElementById('range-know'), val: document.getElementById('val-know') },
    tech: { range: document.getElementById('range-tech'), val: document.getElementById('val-tech') },
    voice: { range: document.getElementById('range-voice'), val: document.getElementById('val-voice') },
    mgmt: { range: document.getElementById('range-mgmt'), val: document.getElementById('val-mgmt') },
    safe: { range: document.getElementById('range-safe'), val: document.getElementById('val-safe') },
    energy: { range: document.getElementById('range-energy'), val: document.getElementById('val-energy') }
  };

  function calculateTotal() {
    const k = parseFloat(sliders.know.range ? sliders.know.range.value : 9);
    const t = parseFloat(sliders.tech.range ? sliders.tech.range.value : 9);
    const v = parseFloat(sliders.voice.range ? sliders.voice.range.value : 8);
    const m = parseFloat(sliders.mgmt.range ? sliders.mgmt.range.value : 8.5);
    const s = parseFloat(sliders.safe.range ? sliders.safe.range.value : 9.5);
    const e = parseFloat(sliders.energy.range ? sliders.energy.range.value : 9.5);

    // Sum of 6 axes (max 60), scaled to 100 pt: (sum / 60) * 100
    const total = (((k + t + v + m + s + e) / 60) * 100).toFixed(1);
    if (totalScoreEl) totalScoreEl.textContent = `${total} / 100`;

    if (gradeBadgeEl) {
      if (total >= 92) {
        gradeBadgeEl.textContent = 'M4 – HLV Mẫu ⭐';
        gradeBadgeEl.className = 'badge badge-m4';
      } else if (total >= 85) {
        gradeBadgeEl.textContent = 'M3 – Thành Thạo 🌳';
        gradeBadgeEl.className = 'badge badge-m3';
      } else if (total >= 75) {
        gradeBadgeEl.textContent = 'M2 – Đạt Chuẩn 🌿';
        gradeBadgeEl.className = 'badge badge-m2';
      } else {
        gradeBadgeEl.textContent = 'M1 – Làm Quen 🌱';
        gradeBadgeEl.className = 'badge badge-m1';
      }
    }

    return total;
  }

  Object.keys(sliders).forEach(key => {
    const item = sliders[key];
    if (item.range && item.val) {
      item.range.addEventListener('input', () => {
        item.val.textContent = parseFloat(item.range.value).toFixed(1);
        calculateTotal();
      });
    }
  });

  window.openAssessmentModal = function(teacherName) {
    if (!modal) return;
    if (targetSelect && teacherName) {
      let exists = false;
      for (let i = 0; i < targetSelect.options.length; i++) {
        if (targetSelect.options[i].value === teacherName) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        const opt = document.createElement('option');
        opt.value = teacherName;
        opt.textContent = `${teacherName} (${teacherDatabase[teacherName] ? teacherDatabase[teacherName].branch : 'Cơ Sở'})`;
        targetSelect.appendChild(opt);
      }
      targetSelect.value = teacherName;
    }

    const teacher = teacherDatabase[teacherName];
    if (teacher && teacher.competencies) {
      const knowComp = teacher.competencies.find(c => c.label.includes('Kiến Thức'));
      const techComp = teacher.competencies.find(c => c.label.includes('Vận Động'));
      const voiceComp = teacher.competencies.find(c => c.label.includes('Hướng Dẫn'));
      const mgmtComp = teacher.competencies.find(c => c.label.includes('Tổ Chức'));
      const safeComp = teacher.competencies.find(c => c.label.includes('An Toàn'));
      const energyComp = teacher.competencies.find(c => c.label.includes('Sư Phạm'));

      if (knowComp && sliders.know.range) sliders.know.range.value = (knowComp.val / 10).toFixed(1);
      if (techComp && sliders.tech.range) sliders.tech.range.value = (techComp.val / 10).toFixed(1);
      if (voiceComp && sliders.voice.range) sliders.voice.range.value = (voiceComp.val / 10).toFixed(1);
      if (mgmtComp && sliders.mgmt.range) sliders.mgmt.range.value = (mgmtComp.val / 10).toFixed(1);
      if (safeComp && sliders.safe.range) sliders.safe.range.value = (safeComp.val / 10).toFixed(1);
      if (energyComp && sliders.energy.range) sliders.energy.range.value = (energyComp.val / 10).toFixed(1);

      Object.keys(sliders).forEach(k => {
        if (sliders[k].range && sliders[k].val) {
          sliders[k].val.textContent = parseFloat(sliders[k].range.value).toFixed(1);
        }
      });
    }

    calculateTotal();
    modal.classList.remove('hidden');
  };

  function closeModal() {
    if (modal) modal.classList.add('hidden');
  }

  if (openBtn) openBtn.addEventListener('click', () => openAssessmentModal());
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const targetName = targetSelect ? targetSelect.value : 'Kenji Tanaka';
      const teacher = teacherDatabase[targetName];
      const newScore = calculateTotal();
      const strengths = document.getElementById('assess-strength-note') ? document.getElementById('assess-strength-note').value : '';
      const idpPlan = document.getElementById('assess-weakness-note') ? document.getElementById('assess-weakness-note').value : '';

      if (teacher) {
        const oldScore = parseFloat(teacher.score);
        teacher.score = newScore;
        const diff = (parseFloat(newScore) - oldScore).toFixed(1);

        if (parseFloat(diff) >= 0) {
          teacher.trend = `▲ Tiến Bộ (+${diff}đ)`;
          teacher.trendClass = 'success';
        } else {
          teacher.trend = `▼ Giảm (${diff}đ)`;
          teacher.trendClass = 'danger';
        }

        if (parseFloat(newScore) >= 92) {
          teacher.levelCategory = 'M4';
          teacher.level = '⭐ M4: Huấn Luyện Viên Mẫu';
          teacher.levelClass = 'badge-m4';
        } else if (parseFloat(newScore) >= 85) {
          teacher.levelCategory = 'M3';
          teacher.level = '🌳 M3: Thành Thạo';
          teacher.levelClass = 'badge-m3';
        } else if (parseFloat(newScore) >= 75) {
          teacher.levelCategory = 'M2';
          teacher.level = '🌿 M2: Đạt Chuẩn';
          teacher.levelClass = 'badge-m2';
        } else {
          teacher.levelCategory = 'M1';
          teacher.level = '🌱 M1: Làm Quen';
          teacher.levelClass = 'badge-m1';
        }

        teacher.competencies = [
          { label: '01. Kiến Thức', val: Math.round(parseFloat(sliders.know.range.value) * 10), color: '#00b894' },
          { label: '02. Kỹ Năng Vận Động', val: Math.round(parseFloat(sliders.tech.range.value) * 10), color: '#0984e3' },
          { label: '03. Kỹ Năng Hướng Dẫn', val: Math.round(parseFloat(sliders.voice.range.value) * 10), color: '#e17055' },
          { label: '04. Tổ Chức Lớp', val: Math.round(parseFloat(sliders.mgmt.range.value) * 10), color: '#00cec9' },
          { label: '05. Bảo Đảm An Toàn', val: Math.round(parseFloat(sliders.safe.range.value) * 10), color: '#10b981' },
          { label: '06. Sư Phạm Taiiku', val: Math.round(parseFloat(sliders.energy.range.value) * 10), color: '#6c5ce7' }
        ];

        if (idpPlan) teacher.nextIDP = idpPlan;
        if (strengths) teacher.observation = strengths;
      }

      closeModal();
      if (window.renderTeacherTable) window.renderTeacherTable();
      showToast(`Đã lưu phiếu đánh giá tiết dạy cho GV ${targetName}! Điểm quy đổi: ${newScore}/100. Hồ sơ năng lực đã cập nhật.`, 'success', 5000);
    });
  }
}

// ==========================================
// 12. GIAO KHÓA ĐÀO TẠO MODAL SYSTEM
// ==========================================
function initAssignCourseModal() {
  const modal = document.getElementById('assign-course-modal');
  const closeBtn = document.getElementById('btn-close-assign-modal');
  const cancelBtn = document.getElementById('btn-cancel-assign-course');
  const confirmBtn = document.getElementById('btn-confirm-assign-course');
  const teacherDisplay = document.getElementById('assign-teacher-display');
  const courseSelect = document.getElementById('assign-course-select');
  const deadlineInput = document.getElementById('assign-deadline-input');

  window.openAssignCourseModal = function(teacherName) {
    if (!modal) return;
    if (teacherDisplay) teacherDisplay.value = teacherName || 'Kenji Tanaka';
    modal.classList.remove('hidden');
  };

  function closeModal() {
    if (modal) modal.classList.add('hidden');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const teacher = teacherDisplay ? teacherDisplay.value : 'Giáo viên';
      const courseText = courseSelect ? courseSelect.options[courseSelect.selectedIndex].text : 'Khóa đào tạo chuyên môn';
      const deadline = deadlineInput ? deadlineInput.value : '2026-10-15';

      closeModal();
      showToast(`Đã chỉ định khóa "${courseText}" cho GV ${teacher}. Hạn hoàn thành: ${deadline}. Thông báo đã được gửi qua email & tài khoản giáo viên!`, 'success', 5000);
    });
  }
}

// ==========================================
// 13. TEACHER DETAIL MODAL SYSTEM
// ==========================================
window.openTeacherDetails = function(name) {
  const teacher = teacherDatabase[name] || teacherDatabase['Kenji Tanaka'];
  const modal = document.getElementById('teacher-detail-modal');
  if (!modal) return;

  const avatarEl = document.getElementById('modal-t-avatar');
  if (avatarEl) {
    avatarEl.textContent = teacher.avatar;
    avatarEl.style.background = teacher.avatarBg;
  }

  document.getElementById('modal-t-name').textContent = teacher.name;
  
  const levelBadge = document.getElementById('modal-t-level-badge');
  levelBadge.textContent = teacher.level;
  levelBadge.className = teacher.levelClass;

  const trendTag = document.getElementById('modal-t-trend-tag');
  trendTag.textContent = teacher.trend;
  trendTag.className = `trend-tag ${teacher.trendClass}`;

  document.getElementById('modal-t-dojo').textContent = teacher.dojo;
  document.getElementById('modal-t-score').textContent = teacher.score;
  document.getElementById('modal-t-code').textContent = teacher.code;
  document.getElementById('modal-t-class').textContent = teacher.classAssigned;
  document.getElementById('modal-t-hours').textContent = teacher.hours;

  const cprEl = document.getElementById('modal-t-cpr');
  cprEl.textContent = teacher.cpr;
  cprEl.className = `d-val ${teacher.cprClass}`;

  document.getElementById('modal-t-observation').textContent = `"${teacher.observation}"`;

  const barsContainer = document.getElementById('modal-t-competency-bars');
  if (barsContainer) {
    barsContainer.innerHTML = teacher.competencies.map(c => `
      <div class="d-bar-row">
        <span class="d-bar-lbl">${c.label}</span>
        <div class="d-bar-track">
          <div class="d-bar-fill" style="width: ${c.val}%; background: ${c.color}"></div>
        </div>
        <span class="d-bar-val">${c.val}%</span>
      </div>
    `).join('');
  }

  modal.classList.remove('hidden');

  const closeBtn1 = document.getElementById('btn-close-detail-modal');
  const closeBtn2 = document.getElementById('btn-close-detail-modal-2');
  const scheduleBtn = document.getElementById('modal-btn-schedule-audit');
  const assignBtn = document.getElementById('modal-btn-assign-course');

  function closeModal() {
    modal.classList.add('hidden');
  }

  if (closeBtn1) closeBtn1.onclick = closeModal;
  if (closeBtn2) closeBtn2.onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  const schedPanel = document.getElementById('modal-sched-panel');
  const successBox = document.getElementById('sched-success-box');
  const successMsg = document.getElementById('sched-success-msg');
  const confirmBtn = document.getElementById('btn-confirm-booking');
  const cancelBtn = document.getElementById('btn-cancel-booking');
  const timeChips = document.querySelectorAll('.time-chip');
  let selectedTime = '08:30 - 09:15';

  if (schedPanel) schedPanel.classList.add('hidden');
  if (successBox) successBox.classList.add('hidden');

  timeChips.forEach(chip => {
    chip.onclick = () => {
      timeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedTime = chip.getAttribute('data-time');
    };
  });

  if (scheduleBtn) {
    scheduleBtn.onclick = () => {
      if (schedPanel) {
        schedPanel.classList.remove('hidden');
        if (successBox) successBox.classList.add('hidden');
        schedPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      if (schedPanel) schedPanel.classList.add('hidden');
    };
  }

  if (confirmBtn) {
    confirmBtn.onclick = () => {
      const dateVal = document.getElementById('sched-date-input').value;
      const auditorVal = document.getElementById('sched-auditor-select').value;
      const moduleVal = document.getElementById('sched-module-select').value;
      const modeVal = document.querySelector('input[name="sched_mode"]:checked').value === 'direct' ? 'Trực tiếp tại sân tập' : 'Trực tuyến qua camera';

      const dateParts = dateVal.split('-');
      const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : dateVal;

      if (schedPanel) schedPanel.classList.add('hidden');
      if (successBox && successMsg) {
        successMsg.innerHTML = `Đã ấn định buổi dự giờ chuyên đề <strong>"${moduleVal}"</strong> với GV <strong>${teacher.name}</strong> vào ngày <strong>${formattedDate}</strong> lúc <strong>${selectedTime}</strong>.<br>• Thẩm định viên: <strong>${auditorVal}</strong> (${modeVal}).<br>• Trạng thái: Đã gửi email thư mời & đồng bộ Google Calendar.`;
        successBox.classList.remove('hidden');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        showToast(`Đã ấn định lịch dự giờ cho GV ${teacher.name} vào ${formattedDate}!`, 'success');
      }
    };
  }

  if (assignBtn) {
    assignBtn.onclick = () => {
      openAssignCourseModal(teacher.name);
    };
  }
};

// ==========================================
// 14. DIGITAL CERTIFICATE 4-TIER SWITCHER SYSTEM
// ==========================================
function initCertificateTiers() {
  const tierBtns = document.querySelectorAll('.cert-tier-btn');
  const levelTitle = document.querySelector('.cert-level-name');
  const certCode = document.querySelector('.cert-meta-item .font-mono');
  const certDesc = document.querySelector('.cert-body-desc');

  const tierData = {
    M1: {
      name: '🌱 CẤP ĐỘ M1: GIÁO VIÊN TẬP SỰ (TAIIKU BASIC COACH)',
      code: 'SKT-2026-88204-M1',
      desc: 'Đã hoàn thành khóa bồi dưỡng nhập môn, nắm vững phương pháp sơ cấp cứu an toàn Ukemi mầm non, đạt 74.0 / 100 điểm thẩm định bước đầu.'
    },
    M2: {
      name: '🌿 CẤP ĐỘ M2: GIÁO VIÊN ĐẠT CHUẨN (TAIIKU QUALIFIED COACH)',
      code: 'SKT-2026-88204-M2',
      desc: 'Đủ điều kiện đứng lớp độc lập, hoàn thành 2 đợt dự giờ thẩm định chính thức, đạt 83.0 / 100 điểm năng lực thể chất Sakura Kids.'
    },
    M3: {
      name: '🌳 CẤP ĐỘ M3: GIÁO VIÊN THÀNH THẠO (TAIIKU SENIOR COACH)',
      code: 'SKT-2026-88204-M3',
      desc: 'Đã hoàn thành xuất sắc chu kỳ đào tạo nâng cao, kỹ năng đón đỡ spotting xà đơn tuyệt đối an toàn, đạt 88.5 / 100 điểm năng lực toàn diện.'
    },
    M4: {
      name: '⭐ CẤP ĐỘ M4: HUẤN LUYỆN VIÊN MẪU (TAIIKU MASTER COACH)',
      code: 'SKT-2026-88204-M4',
      desc: 'Đạt cấp độ Chuyên Gia Thể Chất Hàng Đầu, phụ trách đào tạo giáo viên toàn hệ thống và tham gia Hội đồng khảo thí Sakura Kids (96.8 / 100 điểm).'
    }
  };

  tierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tierBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tier = btn.getAttribute('data-cert-tier');
      const info = tierData[tier];

      if (info) {
        if (levelTitle) levelTitle.textContent = info.name;
        if (certCode) certCode.textContent = info.code;
        if (certDesc) certDesc.innerHTML = info.desc;
        // Toast removed for silent tier switching
      }
    });
  });
}

// ==========================================
// 15. REAL CERTIFICATE PDF / A4 DOWNLOAD SYSTEM
// ==========================================
window.downloadCertificatePDF = function() {
  const certElement = document.getElementById('printable-certificate-area') || document.querySelector('.cert-border-wrap');
  if (!certElement) {
    showToast('Lỗi: Không tìm thấy nội dung văn bằng để xuất file!', 'error');
    return;
  }

  const teacherName = document.querySelector('.cert-teacher-name') ? 
    document.querySelector('.cert-teacher-name').textContent.trim().replace(/\s+/g, '_') : 'Kenji_Tanaka';
  const tierEl = document.querySelector('.cert-meta-item .font-mono');
  const tierCode = tierEl ? tierEl.textContent.trim().replace(/\s+/g, '_') : 'M3';
  const fileName = `Chung_Chi_Taiiku_${teacherName}_${tierCode}.pdf`;

  showToast(`Đang kết xuất và tải tệp "${fileName}" về máy...`, 'info', 3000);

  if (typeof html2pdf !== 'undefined') {
    const opt = {
      margin:       [8, 8, 8, 8],
      filename:     fileName,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2.2, useCORS: true, letterRendering: true, backgroundColor: '#ffffff' },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    html2pdf().set(opt).from(certElement).save().then(() => {
      showToast(`Đã tải file "${fileName}" về máy thành công! Vui lòng kiểm tra thư mục Downloads.`, 'success', 5000);
    }).catch(err => {
      console.warn('html2pdf save error, using fallback:', err);
      fallbackDownloadCertificate(fileName);
    });
  } else {
    fallbackDownloadCertificate(fileName);
  }
};

function fallbackDownloadCertificate(fileName) {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 1100;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1600, 1100);

  // Borders
  ctx.strokeStyle = '#00b894';
  ctx.lineWidth = 6;
  ctx.strokeRect(40, 40, 1520, 1020);

  ctx.strokeStyle = '#0d1b2a';
  ctx.lineWidth = 14;
  ctx.strokeRect(60, 60, 1480, 980);

  // Headers
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('HỆ THỐNG SAKURA KIDS PRE-SCHOOL', 800, 140);

  ctx.fillStyle = '#0f172a';
  ctx.font = '800 48px sans-serif';
  ctx.fillText('CHỨNG NHẬN NĂNG LỰC GIÁO VIÊN', 800, 210);

  const tierText = document.querySelector('.cert-level-name') ? document.querySelector('.cert-level-name').textContent.trim() : '🌳 CẤP ĐỘ M3: GIÁO VIÊN THÀNH THẠO';
  ctx.fillStyle = '#059669';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText(tierText, 800, 270);

  ctx.fillStyle = '#475569';
  ctx.font = '22px sans-serif';
  ctx.fillText('Chứng nhận Huấn luyện viên thể chất mầm non:', 800, 360);

  const nameText = document.querySelector('.cert-teacher-name') ? document.querySelector('.cert-teacher-name').textContent.trim() : 'KENJI TANAKA';
  ctx.fillStyle = '#1e1b4b';
  ctx.font = '800 56px sans-serif';
  ctx.fillText(nameText, 800, 450);

  ctx.fillStyle = '#334155';
  ctx.font = '22px sans-serif';
  ctx.fillText('Đã hoàn thành xuất sắc chu kỳ đào tạo chuyên sâu phương pháp Taiiku Nhật Bản,', 800, 530);
  ctx.fillText('đáp ứng đầy đủ các tiêu chuẩn an toàn Ukemi, kỹ thuật bục nhảy và phản xạ đỡ spotting.', 800, 570);

  const certCode = document.querySelector('.cert-meta-item .font-mono') ? document.querySelector('.cert-meta-item .font-mono').textContent.trim() : 'SKT-2026-88204-M3';
  ctx.textAlign = 'left';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.fillText('Mã Chứng Nhận: ' + certCode, 120, 880);
  ctx.fillText('Đơn vị thẩm định: Hội Đồng Khảo Thí Sakura Kids', 120, 920);
  ctx.fillText('Ngày cấp: 15/09/2026', 120, 960);

  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.replace('.pdf', '.png');
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(url);
    }, 500);
    showToast(`Đã tải bản chứng nhận sắc nét về máy! Kiểm tra thư mục Downloads.`, 'success', 5000);
  }, 'image/png');
}


// ==========================================
// 16. TEACHER AUTHENTICATION & LOGIN PORTAL SYSTEM
// ==========================================
window.currentLoggedInTeacher = 'Kenji Tanaka';

function initLoginPortal() {
  const loginModal = document.getElementById('login-modal');
  const openLoginBtn = document.getElementById('btn-open-login-modal');
  const closeLoginBtn = document.getElementById('btn-close-login-modal');
  const sidebarUserCard = document.getElementById('sidebar-user-card');

  // Open / Close events
  if (openLoginBtn && loginModal) {
    openLoginBtn.addEventListener('click', () => {
      loginModal.classList.remove('hidden');
      renderTeacherQuickLoginGrid('all');
    });
  }

  if (sidebarUserCard && loginModal) {
    sidebarUserCard.addEventListener('click', () => {
      loginModal.classList.remove('hidden');
      renderTeacherQuickLoginGrid('all');
    });
  }

  if (closeLoginBtn && loginModal) {
    closeLoginBtn.addEventListener('click', () => {
      loginModal.classList.add('hidden');
    });
  }

  // Backdrop click close
  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.add('hidden');
      }
    });
  }

  // Tab Switching inside Login Modal
  const loginTabBtns = document.querySelectorAll('.login-tab-btn');
  loginTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      loginTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-login-tab');
      document.querySelectorAll('.login-tab-content').forEach(pane => {
        pane.classList.add('hidden');
      });

      const activePane = document.getElementById('login-tab-' + targetTab);
      if (activePane) {
        activePane.classList.remove('hidden');
      }

      if (targetTab === 'quick-teacher') {
        renderTeacherQuickLoginGrid('all');
      }
    });
  });

  // Render initial quick grid
  renderTeacherQuickLoginGrid('all');

  // Restore session from localStorage or default to Kenji Tanaka
  const savedUser = localStorage.getItem('taiiku_current_user');
  if (savedUser && teacherDatabase[savedUser]) {
    window.loginAsTeacher(savedUser, false);
  } else {
    window.loginAsTeacher('Kenji Tanaka', false);
  }
}

function renderTeacherQuickLoginGrid(filterFacility) {
  const container = document.getElementById('teacher-quick-login-grid');
  if (!container || typeof teacherDatabase === 'undefined') return;

  container.innerHTML = '';
  const teachers = Object.values(teacherDatabase);
  const filtered = teachers.filter(t => !filterFacility || filterFacility === 'all' || t.facility === filterFacility);

  filtered.forEach(t => {
    const isCurrent = (t.name === window.currentLoggedInTeacher);
    const card = document.createElement('div');
    card.className = 'teacher-login-card' + (isCurrent ? ' current-active' : '');
    if (isCurrent) {
      card.style.borderColor = '#10b981';
      card.style.background = '#f0fdf4';
    }

    card.innerHTML = `
      <div class="teacher-login-card-header">
        <div class="teacher-login-avatar" style="background: ${t.avatarBg || '#00b894'};">${t.avatar}</div>
        <div style="flex: 1; min-width: 0;">
          <h4 class="teacher-login-name">${t.name}</h4>
          <p class="teacher-login-branch">${t.branch} • <strong>${t.levelCategory}</strong></p>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: #64748b;">
        <span>Mã: <code style="color: #0f172a; font-weight: 700;">${t.code}</code></span>
        <span style="font-weight: 700; color: #059669;">⭐ ${t.score} / 100</span>
      </div>
      <div class="teacher-login-footer">
        <span class="badge ${t.levelClass || 'badge-m3'}" style="font-size: 10.5px;">${t.level}</span>
        <button type="button" class="teacher-login-btn" style="${isCurrent ? 'background: #059669;' : ''}">
          ${isCurrent ? '✓ Đang Dùng' : 'Đăng Nhập ➔'}
        </button>
      </div>
    `;

    card.onclick = () => {
      window.loginAsTeacher(t.name);
    };

    container.appendChild(card);
  });
}

window.filterLoginModalTeachers = function(facility, btnEl) {
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btnEl.classList.add('active');
  }
  renderTeacherQuickLoginGrid(facility);
};

window.loginAsTeacher = function(teacherName, showToastNotify = true) {
  const teacher = (typeof teacherDatabase !== 'undefined') ? (teacherDatabase[teacherName] || teacherDatabase['Kenji Tanaka']) : null;
  if (!teacher) return;

  window.currentLoggedInTeacher = teacherName;
  localStorage.setItem('taiiku_current_user', teacherName);

  // 1. Update Sidebar Active User Card
  const sidebarAvatar = document.getElementById('current-user-avatar');
  const sidebarName = document.getElementById('current-user-name');
  const sidebarRole = document.getElementById('current-user-role');

  if (sidebarAvatar) {
    sidebarAvatar.textContent = teacher.avatar;
    sidebarAvatar.style.background = teacher.avatarBg || '#00b894';
  }
  if (sidebarName) sidebarName.textContent = teacher.name;
  if (sidebarRole) sidebarRole.textContent = `${teacher.level} (${teacher.facility})`;

  // 2. Update Hero Profile Card
  const heroAvatar = document.getElementById('hero-teacher-avatar');
  if (heroAvatar) {
    heroAvatar.innerHTML = `<span>${teacher.avatar}</span><div class="status-indicator online"></div>`;
    heroAvatar.style.background = teacher.avatarBg || '#00b894';
  }

  const heroName = document.getElementById('hero-teacher-name');
  if (heroName) heroName.textContent = teacher.name;

  const heroLevel = document.getElementById('hero-teacher-level');
  if (heroLevel) {
    heroLevel.textContent = teacher.level;
    heroLevel.className = `badge-level-pill active-level ${teacher.levelClass || 'badge-m3'}`;
  }

  const heroBranch = document.getElementById('hero-teacher-branch');
  if (heroBranch) {
    heroBranch.textContent = teacher.dojo || `Sakura Kids • ${teacher.branch}`;
  }

  const heroBio = document.getElementById('hero-teacher-bio');
  if (heroBio) {
    heroBio.innerHTML = `Phụ trách: <strong>${teacher.classAssigned}</strong> • Hệ thống Sakura Kids`;
  }

  const heroCode = document.getElementById('hero-teacher-code');
  if (heroCode) heroCode.textContent = teacher.code;

  const heroCpr = document.getElementById('hero-teacher-cpr');
  if (heroCpr) {
    heroCpr.textContent = teacher.cpr;
    heroCpr.className = `meta-val ${teacher.cprClass || 'text-success'}`;
  }

  const heroIdp = document.getElementById('hero-idp-desc');
  if (heroIdp) {
    heroIdp.innerHTML = `<strong>${teacher.nextIDP}</strong>`;
  }

  const heroScore = document.getElementById('hero-teacher-score');
  if (heroScore) heroScore.textContent = teacher.score;

  const heroTrend = document.getElementById('hero-teacher-trend');
  if (heroTrend) {
    heroTrend.textContent = teacher.trend;
    const trendCls = teacher.trendClass === 'danger' ? 'text-danger' : (teacher.trendClass === 'warning' ? 'text-warning' : 'text-neon');
    heroTrend.className = `score-status ${trendCls}`;
  }

  // 3. Update Level Stepper Progress Indicator (M1 -> M4)
  const cat = teacher.levelCategory || 'M3';
  const stepM1 = document.getElementById('step-m1');
  const stepM2 = document.getElementById('step-m2');
  const stepM3 = document.getElementById('step-m3');
  const stepM4 = document.getElementById('step-m4');
  const div1 = document.getElementById('div-m1-m2');
  const div2 = document.getElementById('div-m2-m3');
  const div3 = document.getElementById('div-m3-m4');

  [stepM1, stepM2, stepM3, stepM4].forEach(s => {
    if (s) {
      s.className = 'level-step';
      const existingTag = s.querySelector('.current-tag');
      if (existingTag) existingTag.remove();
    }
  });
  [div1, div2, div3].forEach(d => { if (d) d.className = 'step-divider'; });

  if (cat === 'M1') {
    if (stepM1) {
      stepM1.classList.add('current');
      stepM1.insertAdjacentHTML('beforeend', '<span class="current-tag">Hiện tại ★</span>');
    }
    if (stepM2) stepM2.classList.add('lock');
    if (stepM3) stepM3.classList.add('lock');
    if (stepM4) stepM4.classList.add('lock');
  } else if (cat === 'M2') {
    if (stepM1) stepM1.classList.add('done');
    if (div1) div1.classList.add('active');
    if (stepM2) {
      stepM2.classList.add('current');
      stepM2.insertAdjacentHTML('beforeend', '<span class="current-tag">Hiện tại ★</span>');
    }
    if (stepM3) stepM3.classList.add('lock');
    if (stepM4) stepM4.classList.add('lock');
  } else if (cat === 'M3') {
    if (stepM1) stepM1.classList.add('done');
    if (div1) div1.classList.add('active');
    if (stepM2) stepM2.classList.add('done');
    if (div2) div2.classList.add('active');
    if (stepM3) {
      stepM3.classList.add('current');
      stepM3.insertAdjacentHTML('beforeend', '<span class="current-tag">Hiện tại ★</span>');
    }
    if (stepM4) stepM4.classList.add('lock');
  } else if (cat === 'M4') {
    if (stepM1) stepM1.classList.add('done');
    if (div1) div1.classList.add('active');
    if (stepM2) stepM2.classList.add('done');
    if (div2) div2.classList.add('active');
    if (stepM3) stepM3.classList.add('done');
    if (div3) div3.classList.add('active');
    if (stepM4) {
      stepM4.classList.add('current');
      stepM4.insertAdjacentHTML('beforeend', '<span class="current-tag">Hiện tại ★</span>');
    }
  }

  // 4. Update Radar Chart with Teacher Competency scores
  initRadarChart(teacherName);

  // 5. Update Digital Certificate modal info
  const certName = document.getElementById('cert-display-name');
  if (certName) certName.textContent = teacher.name.toUpperCase();

  const certCodeEl = document.querySelector('.cert-meta-item .font-mono');
  if (certCodeEl) certCodeEl.textContent = `${teacher.code}-${teacher.levelCategory}`;

  const certTierBtn = document.querySelector(`.cert-tier-btn[data-cert-tier="${teacher.levelCategory}"]`);
  if (certTierBtn) certTierBtn.click();

  // 6. Sync target in Assessment modal
  const assessSelect = document.getElementById('assess-target-teacher');
  if (assessSelect) {
    assessSelect.value = teacher.name;
  }

  // 7. Ensure role view is teacher
  const teacherRoleBtn = document.querySelector('.role-btn[data-role="teacher"]');
  if (teacherRoleBtn && !teacherRoleBtn.classList.contains('active')) {
    teacherRoleBtn.click();
  }

  // Close Login Modal
  const loginModal = document.getElementById('login-modal');
  if (loginModal) loginModal.classList.add('hidden');

  if (showToastNotify) {
    showToast(`Đăng nhập thành công: Thầy/Cô ${teacher.name} (${teacher.branch} • ${teacher.level})!`, 'success', 3500);
  }
};

window.loginAsStaff = function(roleKey) {
  const loginModal = document.getElementById('login-modal');
  if (loginModal) loginModal.classList.add('hidden');

  const roleBtn = document.querySelector(`.role-btn[data-role="${roleKey}"]`);
  if (roleBtn) {
    roleBtn.click();
  }

  const roleLabels = {
    manager: 'Quản Lý Cơ Sở SK-1',
    trainer: 'Master Trainer Ryota Ito',
    admin: 'Super Admin Hệ Thống Sakura Kids'
  };

  showToast(`Đã chuyển sang chế độ: ${roleLabels[roleKey] || roleKey}`, 'info');
};

window.handleCredentialLogin = function(event) {
  if (event) event.preventDefault();
  const inputEl = document.getElementById('login-input-id');
  const inputVal = inputEl ? inputEl.value.trim() : '';

  if (!inputVal) {
    showToast('Vui lòng nhập Mã giáo viên hoặc Họ tên!', 'warning');
    return;
  }

  const allTeachers = Object.values(teacherDatabase);
  const found = allTeachers.find(t => 
    t.code.toLowerCase() === inputVal.toLowerCase() ||
    t.name.toLowerCase().includes(inputVal.toLowerCase()) ||
    t.avatar.toLowerCase() === inputVal.toLowerCase()
  );

  if (found) {
    window.loginAsTeacher(found.name);
  } else {
    showToast(`Không tìm thấy tài khoản với mã/tên "${inputVal}". Gợi ý: Hãy thử SKT-2026-88204 hoặc Haruto Sato.`, 'error', 4500);
  }
};
