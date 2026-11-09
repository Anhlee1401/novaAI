import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Workflow,
  BarChart3,
  ShieldCheck,
  Zap,
  Globe,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Play,
  Send,
  ChevronDown,
  Menu,
  X,
  Layers,
  Terminal,
  TrendingUp,
  Clock,
  Users,
  Star,
  Check
} from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    id: 1,
    title: 'Thu thập & Phân loại Yêu cầu',
    desc: 'Tự động đọc email, tin nhắn Zalo/Messenger, trích xuất thông tin đơn hàng và phân loại mức độ ưu tiên bằng NLP.',
    tag: 'Trigger • 0.2s',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 2,
    title: 'Xử lý Logic với AI Agent',
    desc: 'Đối chiếu dữ liệu kho hàng, CRM, tra cứu lịch sử khách hàng và tự động đề xuất phương án tối ưu.',
    tag: 'AI Reasoning • 0.8s',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 3,
    title: 'Thực thi & Báo cáo Realtime',
    desc: 'Tự động phản hồi khách hàng, tạo phiếu xuất kho trên ERP và cập nhật Dashboard doanh thu tức thì.',
    tag: 'Action • 0.4s',
    color: 'from-fuchsia-500 to-pink-500'
  }
];

const INITIAL_CHAT = [
  {
    role: 'ai',
    text: 'Xin chào! Tôi là NovaAI Agent. Tôi có thể giúp bạn phân tích doanh thu, tạo quy trình tự động hoặc giải đáp dữ liệu nội bộ. Bạn muốn thử tác vụ nào?'
  },
  {
    role: 'user',
    text: 'Phân tích doanh thu Q3 và dự báo tăng trưởng tháng tới cho nhóm sản phẩm B2B.'
  },
  {
    role: 'ai',
    text: '📈 Doanh thu Q3 đạt 14.8 tỷ VNĐ (+32% so với Q2). Dựa trên tỷ lệ chuyển đổi lead hiện tại (18.4%), dự báo tháng tới tăng trưởng +24.5%. Tôi đã tự động gửi báo cáo chi tiết qua Slack #ban-giam-doc!'
  }
];

const QUICK_PROMPTS = [
  'Tự động tóm tắt 50 email khách hàng hôm nay',
  'Lập kịch bản chăm sóc khách hàng VIP tự động',
  'Cảnh báo tồn kho thấp & tạo đơn nhập hàng'
];

const FEATURES = [
  {
    icon: Workflow,
    title: 'Tự động hóa Workflow Không Cần Code',
    description: 'Kéo thả để kết nối hơn 300+ ứng dụng (Slack, Zalo OA, HubSpot, SAP, Google Workspace) với các AI Agent tự hành thông minh.',
    badge: 'Tiết kiệm 85% thời gian',
    span: 'md:col-span-2',
    gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent'
  },
  {
    icon: Bot,
    title: 'AI Chatbot Đa Kênh 24/7',
    description: 'Huấn luyện trên chính tài liệu nội bộ (PDF, Notion, Website) chỉ trong 3 phút. Phản hồi tự nhiên như chuyên viên thật với độ chính xác 99.2%.',
    badge: 'RAG Thế hệ mới',
    span: 'md:col-span-1',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent'
  },
  {
    icon: BarChart3,
    title: 'Phân tích & Dự báo Dữ liệu',
    description: 'Đặt câu hỏi bằng tiếng Việt để tạo biểu đồ trực quan, phát hiện bất thường và dự đoán xu hướng doanh thu bằng Machine Learning.',
    badge: 'AI BI Analytics',
    span: 'md:col-span-1',
    gradient: 'from-fuchsia-500/20 via-pink-500/10 to-transparent'
  },
  {
    icon: ShieldCheck,
    title: 'Bảo mật Cấp Độ Doanh Nghiệp',
    description: 'Mã hóa đầu cuối AES-256, tuân thủ tiêu chuẩn ISO 27001 & SOC2 Type II. Cam kết không sử dụng dữ liệu của bạn để huấn luyện model công khai.',
    badge: 'Private Cloud / On-Premise',
    span: 'md:col-span-2',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent'
  }
];

const PRICING_PLANS = [
  {
    name: 'Starter',
    desc: 'Dành cho đội nhóm nhỏ và Startup bắt đầu ứng dụng AI.',
    monthlyPrice: '990.000',
    yearlyPrice: '750.000',
    popular: false,
    features: [
      '10.000 AI Credits / tháng',
      '3 AI Chatbot & 10 Workflows',
      'Huấn luyện từ 500 trang tài liệu',
      'Tích hợp Zalo, Messenger, Website',
      'Hỗ trợ kỹ thuật tiêu chuẩn 24/7'
    ],
    cta: 'Dùng thử miễn phí 14 ngày'
  },
  {
    name: 'Growth Pro',
    desc: 'Giải pháp toàn diện cho doanh nghiệp SME đang tăng trưởng mạnh.',
    monthlyPrice: '2.990.000',
    yearlyPrice: '2.250.000',
    popular: true,
    features: [
      '50.000 AI Credits / tháng',
      'Không giới hạn AI Chatbot & Workflows',
      'Phân tích dữ liệu & Dự báo AI BI',
      'Tích hợp CRM, ERP, Slack, Webhook API',
      'Fine-tune giọng văn thương hiệu riêng',
      'Chuyên gia hỗ trợ triển khai 1-1'
    ],
    cta: 'Bắt đầu với Growth Pro'
  },
  {
    name: 'Enterprise',
    desc: 'Hạ tầng AI riêng biệt, bảo mật tối đa cho tập đoàn lớn.',
    monthlyPrice: 'Liên hệ',
    yearlyPrice: 'Liên hệ',
    popular: false,
    features: [
      'Không giới hạn AI Credits & Tốc độ cao',
      'Triển khai Private Cloud hoặc On-Premise',
      'Huấn luyện LLM riêng theo ngành dọc',
      'Phân quyền SSO, SAML & Audit Logs',
      'Cam kết SLA 99.99% & Kỹ sư trực chiến'
    ],
    cta: 'Nhận tư vấn giải pháp'
  }
];

const FAQS = [
  {
    q: 'Doanh nghiệp không có đội ngũ IT có thể tự triển khai NovaAI không?',
    a: 'Hoàn toàn được! NovaAI được thiết kế với giao diện kéo-thả trực quan (No-code) và thư viện hơn 100+ mẫu quy trình có sẵn cho Sales, Marketing, CSKH và HR. Bạn chỉ mất 10 phút để kích hoạt AI Agent đầu tiên.'
  },
  {
    q: 'Dữ liệu nội bộ của công ty tôi có được bảo mật tuyệt đối không?',
    a: 'Bảo mật là ưu tiên số 1 của NovaAI. Toàn bộ dữ liệu được mã hóa AES-256 và lưu trữ trên phân vùng độc lập. Chúng tôi cam kết bằng hợp đồng pháp lý không bao giờ dùng dữ liệu doanh nghiệp để huấn luyện các mô hình AI công cộng.'
  },
  {
    q: 'NovaAI hỗ trợ tiếng Việt tốt đến mức nào?',
    a: 'Mô hình ngôn ngữ của NovaAI được tinh chỉnh (fine-tuned) chuyên sâu trên ngữ cảnh kinh doanh, viết tắt, từ lóng và văn hóa giao tiếp tại Việt Nam, đạt độ chính xác ngữ nghĩa lên tới 99.2%.'
  },
  {
    q: 'Tôi có thể tích hợp NovaAI với phần mềm CRM/ERP sẵn có của công ty không?',
    a: 'Có. Chúng tôi cung cấp sẵn cổng kết nối 1-Click với KiotViet, Haravan, Sapo, Base.vn, HubSpot, Salesforce, Larksuite, Zalo OA và hỗ trợ RESTful API / Webhook cho mọi hệ thống tự phát triển.'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chatbot'); // 'chatbot' | 'workflow' | 'analytics'
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [workflowRunning, setWorkflowRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([1, 2, 3]);
  const [isYearly, setIsYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);
  const [teamSize, setTeamSize] = useState(25);
  const [showModal, setShowModal] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);

  const handleSendMessage = (textToUse) => {
    const query = (textToUse ?? inputPrompt).trim();
    if (!query || isTyping) return;

    const updated = [...chatMessages, { role: 'user', text: query }];
    setChatMessages(updated);
    setInputPrompt('');
    setIsTyping(true);

    setTimeout(() => {
      let reply =
        '✨ Đã xử lý yêu cầu! NovaAI đã tổng hợp dữ liệu từ hệ thống CRM & ERP, tạo quy trình tự động và gửi thông báo đến các bộ phận liên quan trong 0.6 giây.';
      if (query.toLowerCase().includes('email')) {
        reply =
          '📬 Đã phân tích 50 email: 12 cơ hội bán hàng nóng (đã gán cho đội Sales), 31 yêu cầu hỗ trợ (AI đã tự động phản hồi 29 email), 7 email quảng cáo đã lọc bỏ.';
      } else if (query.toLowerCase().includes('vip') || query.toLowerCase().includes('kịch bản')) {
        reply =
          '🎯 Đã khởi tạo kịch bản CSKH VIP: Tự động gửi ưu đãi cá nhân hóa qua Zalo ZNS & Email khi khách hàng đạt mốc chi tiêu 20 triệu VNĐ, dự kiến tăng 28% tỷ lệ quay lại.';
      } else if (query.toLowerCase().includes('tồn kho')) {
        reply =
          '📦 Phát hiện 4 mã SKU dưới ngưỡng an toàn. NovaAI đã tự động tạo dự thảo đơn đặt hàng nhà cung cấp và gửi phê duyệt cho Trưởng phòng Thu mua.';
      }
      setChatMessages((prev) => [...prev, { role: 'ai', text: reply }]);
      setIsTyping(false);
    }, 850);
  };

  const runWorkflowDemo = () => {
    if (workflowRunning) return;
    setWorkflowRunning(true);
    setCompletedSteps([]);
    setTimeout(() => setCompletedSteps([1]), 400);
    setTimeout(() => setCompletedSteps([1, 2]), 1100);
    setTimeout(() => {
      setCompletedSteps([1, 2, 3]);
      setWorkflowRunning(false);
    }, 1800);
  };

  // Calculate estimated monthly savings based on teamSize
  const hoursSavedPerMonth = teamSize * 42;
  const moneySavedMillions = Math.round(teamSize * 6.8);

  return (
    <div className="min-h-screen bg-[#060714] text-slate-100 relative selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[550px] h-[550px] bg-indigo-600/20 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] bg-cyan-600/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#060714]/75 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
                NovaAI
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                v3.5 Enterprise
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition">Tính năng</a>
            <a href="#playground" className="hover:text-white transition">Trải nghiệm AI</a>
            <a href="#roi" className="hover:text-white transition">Hiệu quả ROI</a>
            <a href="#pricing" className="hover:text-white transition">Bảng giá</a>
            <a href="#faq" className="hover:text-white transition">Hỏi đáp</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white transition cursor-pointer"
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition cursor-pointer"
            >
              <span>Dùng thử miễn phí</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/10 bg-[#0b0d24]/95 px-4 pt-3 pb-6 space-y-3">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 font-medium">Tính năng</a>
            <a href="#playground" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 font-medium">Trải nghiệm AI</a>
            <a href="#roi" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 font-medium">Hiệu quả ROI</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 font-medium">Bảng giá</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 font-medium">Hỏi đáp</a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowModal(true);
              }}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              Dùng thử miễn phí 14 ngày
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-14 pb-24 lg:pt-20 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Ra mắt NovaAI Engine 3.5 — Tốc độ xử lý nhanh gấp 4 lần</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] mb-6">
            Tăng tốc doanh nghiệp với{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Hệ sinh thái AI Tự hành
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed mb-10">
            Hợp nhất <strong className="text-white font-semibold">Tự động hóa quy trình</strong>,{' '}
            <strong className="text-white font-semibold">Chatbot đa kênh 24/7</strong> và{' '}
            <strong className="text-white font-semibold">Phân tích dữ liệu dự đoán</strong> trên một nền tảng duy nhất. Giải phóng 80% khối lượng vận hành thủ công chỉ sau 1 tuần triển khai.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:scale-[1.02] transition shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Khởi tạo AI Workspace Miễn Phí</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#playground"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-base text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 transition flex items-center justify-center gap-2.5"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span>Trải nghiệm Live Demo</span>
            </a>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-white/10">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">1,500+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Doanh nghiệp tin dùng</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400">99.2%</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Độ chính xác Tiếng Việt</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-purple-400">12.4M+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Tác vụ tự động mỗi tháng</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">4.9/5 ★</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Đánh giá từ khách hàng B2B</p>
            </div>
          </div>
        </div>

        {/* Interactive AI Playground Dashboard */}
        <div id="playground" className="mt-16 scroll-mt-24">
          <div className="rounded-3xl p-1.5 bg-gradient-to-b from-indigo-500/40 via-purple-500/20 to-white/5 shadow-2xl shadow-indigo-950/60">
            <div className="bg-[#0b0d20] rounded-[22px] overflow-hidden border border-white/10">
              {/* Window Top Bar */}
              <div className="px-4 sm:px-6 py-3.5 bg-[#10132e] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs text-slate-400 font-mono">
                    nova-ai.cloud/workspace/enterprise-studio
                  </span>
                </div>

                {/* Mode Switcher */}
                <div className="flex items-center gap-1.5 bg-[#070918] p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setActiveTab('chatbot')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                      activeTab === 'chatbot'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>AI Agent Chat</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('workflow')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                      activeTab === 'workflow'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Workflow className="w-3.5 h-3.5" />
                    <span>Tự động hóa Workflow</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                      activeTab === 'analytics'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Phân tích Dự báo</span>
                  </button>
                </div>
              </div>

              {/* Playground Body */}
              <div className="p-6 sm:p-8">
                {activeTab === 'chatbot' && (
                  <div className="grid lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2 bg-[#070918] rounded-2xl border border-white/10 p-4 sm:p-6 flex flex-col h-[400px]">
                      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {chatMessages.map((msg, i) => (
                          <div
                            key={i}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                                msg.role === 'user'
                                  ? 'bg-indigo-600 text-white rounded-br-xs'
                                  : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-xs'
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs text-cyan-300 flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5 animate-spin" />
                              <span>NovaAI đang truy xuất dữ liệu ERP & phân tích...</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSendMessage();
                        }}
                        className="mt-4 pt-3 border-t border-white/10 flex gap-2"
                      >
                        <input
                          type="text"
                          value={inputPrompt}
                          onChange={(e) => setInputPrompt(e.target.value)}
                          placeholder="Nhập yêu cầu cho AI Agent (VD: Tóm tắt email khách hàng hôm nay)..."
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <span>Gửi</span>
                          <Send className="w-4 h-4" />
                        </button>
                      </form>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                        <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-400" />
                          <span>Thử nghiệm câu lệnh nhanh</span>
                        </h3>
                        <p className="text-xs text-slate-400 mb-4">
                          Nhấn vào các tác vụ mẫu bên dưới để xem cách NovaAI xử lý dữ liệu thời gian thực:
                        </p>
                        <div className="space-y-2.5">
                          {QUICK_PROMPTS.map((q, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(q)}
                              className="w-full text-left text-xs px-3.5 py-2.5 rounded-xl bg-[#070918] hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/40 text-slate-200 transition flex items-center justify-between group cursor-pointer"
                            >
                              <span>{q}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition" />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/20 rounded-2xl p-5 border border-indigo-500/30">
                        <div className="flex items-center justify-between text-xs text-indigo-300 mb-1">
                          <span>Nguồn tri thức đã kết nối</span>
                          <span className="text-emerald-400 font-semibold">● Trực tuyến</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-2">
                          Google Drive • Notion Wiki • HubSpot CRM • SAP ERP
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'workflow' && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          Quy trình: Tự động xử lý Đơn hàng & CSKH Đa kênh
                        </h3>
                        <p className="text-sm text-slate-400">
                          Tự động vận hành 100% từ lúc khách nhắn tin đến khi tạo phiếu xuất kho.
                        </p>
                      </div>
                      <button
                        onClick={runWorkflowDemo}
                        disabled={workflowRunning}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold flex items-center gap-2 hover:opacity-95 disabled:opacity-50 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>{workflowRunning ? 'Đang chạy mô phỏng...' : 'Chạy thử Workflow'}</span>
                      </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {WORKFLOW_STEPS.map((step) => {
                        const isDone = completedSteps.includes(step.id);
                        return (
                          <div
                            key={step.id}
                            className={`rounded-2xl p-5 border transition-all duration-300 ${
                              isDone
                                ? 'bg-white/[0.06] border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                                : 'bg-white/[0.02] border-white/10 opacity-50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <span
                                className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${step.color} text-white`}
                              >
                                Bước {step.id}
                              </span>
                              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                                {isDone ? (
                                  <>
                                    <CheckCircle2 className="w-4 h-4" /> {step.tag}
                                  </>
                                ) : (
                                  'Đang chờ...'
                                )}
                              </span>
                            </div>
                            <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                            <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-[#070918] rounded-2xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            Dự báo Doanh thu & Tỷ lệ Chuyển đổi bằng AI
                          </h4>
                          <p className="text-xs text-slate-400">
                            Mô hình Time-Series Forecasting độ chính xác 96.4%
                          </p>
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          +38.4% Tăng trưởng Q4
                        </span>
                      </div>

                      {/* Visual Bar Chart */}
                      <div className="h-48 flex items-end gap-3 sm:gap-5 pt-6 px-2">
                        {[
                          { m: 'T6', val: 45, forecast: false },
                          { m: 'T7', val: 58, forecast: false },
                          { m: 'T8', val: 64, forecast: false },
                          { m: 'T9', val: 76, forecast: false },
                          { m: 'T10 (AI)', val: 88, forecast: true },
                          { m: 'T11 (AI)', val: 96, forecast: true }
                        ].map((bar, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <span className="text-[11px] font-semibold text-slate-300">
                              {bar.val} tỷ
                            </span>
                            <div
                              style={{ height: `${bar.val * 1.4}px` }}
                              className={`w-full rounded-t-xl transition-all ${
                                bar.forecast
                                  ? 'bg-gradient-to-t from-indigo-600 to-cyan-400 border border-cyan-300/40'
                                  : 'bg-white/15 hover:bg-white/25'
                              }`}
                            />
                            <span className="text-xs text-slate-400">{bar.m}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                        <p className="text-xs text-slate-400">Phát hiện bất thường</p>
                        <p className="text-base font-bold text-white mt-1">
                          Tỷ lệ rời bỏ (Churn Rate) giảm 41%
                        </p>
                        <p className="text-xs text-slate-300 mt-2">
                          Nhờ AI Agent tự động phát hiện khách hàng có dấu hiệu giảm tương tác và gửi ưu đãi giữ chân kịp thời.
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                        <p className="text-xs text-slate-400">Đề xuất tối ưu ngân sách Ads</p>
                        <p className="text-base font-bold text-cyan-400 mt-1">
                          Tiết kiệm 145.000.000đ / tháng
                        </p>
                        <p className="text-xs text-slate-300 mt-2">
                          Tự động phân bổ lại ngân sách sang nhóm chiến dịch B2B có ROAS cao gấp 3.2 lần.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section id="features" className="relative z-10 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            Công nghệ Lõi Đột Phá
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
            Mọi công cụ AI doanh nghiệp cần trong một nền tảng
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Không còn phải trả phí cho hàng chục phần mềm rời rạc. NovaAI kết nối dữ liệu, con người và quy trình vào một bộ não AI thống nhất.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className={`${item.span} group relative rounded-3xl p-8 bg-[#0c0f26] border border-white/10 hover:border-indigo-500/50 transition overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60 group-hover:opacity-100 transition pointer-events-none`}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-indigo-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive ROI Calculator */}
      <section id="roi" className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-950/70 via-[#0e1129] to-purple-950/70 border border-indigo-500/30 p-8 sm:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                Công cụ tính hiệu quả đầu tư (ROI)
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
                Doanh nghiệp bạn tiết kiệm được bao nhiêu mỗi tháng?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mb-8">
                Kéo thanh trượt để chọn quy mô nhân sự vận hành (Sales, CSKH, Marketing, Admin) của bạn và xem ước tính hiệu quả khi áp dụng NovaAI:
              </p>

              <div className="bg-[#070918]/80 p-6 rounded-2xl border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-slate-300">Quy mô đội ngũ nhân sự:</span>
                  <span className="text-xl font-extrabold text-indigo-400">{teamSize} nhân sự</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>5 người</span>
                  <span>50 người</span>
                  <span>100 người</span>
                  <span>200+ người</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-[#070918]/90 p-6 rounded-2xl border border-white/10">
                <Clock className="w-7 h-7 text-cyan-400 mb-3" />
                <p className="text-xs text-slate-400">Thời gian tiết kiệm / tháng</p>
                <p className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  {hoursSavedPerMonth.toLocaleString('vi-VN')} giờ
                </p>
                <p className="text-xs text-emerald-400 mt-2">
                  ≈ Giảm 80% tác vụ nhập liệu & báo cáo lặp lại
                </p>
              </div>

              <div className="bg-[#070918]/90 p-6 rounded-2xl border border-white/10">
                <TrendingUp className="w-7 h-7 text-purple-400 mb-3" />
                <p className="text-xs text-slate-400">Chi phí vận hành tối ưu / tháng</p>
                <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 mt-1">
                  ~{moneySavedMillions} Triệu
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Tăng hiệu suất phản hồi khách hàng gấp 5 lần
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            Bảng giá minh bạch & linh hoạt
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
            Đầu tư thông minh cho tăng trưởng dài hạn
          </h2>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 mt-4 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                !isYearly ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Thanh toán theo tháng
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer ${
                isYearly ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Thanh toán theo năm</span>
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-400/20 text-emerald-300">
                Tiết kiệm 25%
              </span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan, i) => (
            <div
              key={i}
              className={`rounded-3xl p-8 flex flex-col justify-between relative transition ${
                plan.popular
                  ? 'bg-gradient-to-b from-indigo-950/90 to-[#0b0e26] border-2 border-indigo-500 shadow-2xl shadow-indigo-600/20 lg:-translate-y-2'
                  : 'bg-[#0b0e24] border border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-xs font-bold text-slate-950">
                  ĐƯỢC LỰA CHỌN NHIỀU NHẤT
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 min-h-[40px]">{plan.desc}</p>

                <div className="my-6 pb-6 border-b border-white/10">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  {plan.monthlyPrice !== 'Liên hệ' && (
                    <span className="text-xs text-slate-400 ml-1.5">VNĐ / tháng</span>
                  )}
                </div>

                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-200">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className={`w-full py-3.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:opacity-95 shadow-lg shadow-indigo-500/25'
                    : 'bg-white/10 hover:bg-white/15 text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Câu hỏi thường gặp</h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Giải đáp nhanh những thắc mắc khi triển khai AI cho doanh nghiệp của bạn.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0b0e24] border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition cursor-pointer"
                >
                  <span className="font-semibold text-white text-sm sm:text-base">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="relative z-10 py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 shadow-2xl shadow-indigo-600/30 relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Sẵn sàng bứt phá doanh thu cùng NovaAI?
          </h2>
          <p className="text-indigo-100 max-w-2xl mx-auto text-base sm:text-lg mb-8">
            Trải nghiệm miễn phí 14 ngày đầy đủ tính năng. Không yêu cầu thẻ tín dụng. Hỗ trợ cài đặt 1-1 bởi chuyên gia AI.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 rounded-2xl bg-slate-950 text-white font-bold text-base hover:bg-slate-900 transition shadow-xl cursor-pointer"
          >
            Đăng ký Dùng Thử Miễn Phí Ngay
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 mt-12 text-sm text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">NovaAI Vietnam</span>
            <span>© 2026. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-white transition">Bảo mật</a>
            <a href="#pricing" className="hover:text-white transition">Điều khoản</a>
            <a href="#playground" className="hover:text-white transition">API Docs</a>
            <a href="#faq" className="hover:text-white transition">Liên hệ</a>
          </div>
        </div>
      </footer>

      {/* Lead Capture / Demo Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#0e1129] border border-white/15 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => {
                setShowModal(false);
                setModalSubmitted(false);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!modalSubmitted ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Khởi tạo NovaAI Workspace
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                  Nhận ngay 14 ngày dùng thử gói Growth Pro và buổi tư vấn triển khai AI 1-1 miễn phí.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setModalSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Họ và tên của bạn
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email công việc
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ban@congty.vn"
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Số điện thoại / Zalo
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0901 234 567"
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 transition cursor-pointer"
                  >
                    Kích hoạt tài khoản miễn phí
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Đăng ký thành công!</h3>
                <p className="text-sm text-slate-300 mb-6">
                  Thông tin truy cập NovaAI Workspace đã được gửi tới email của bạn. Chuyên gia AI của chúng tôi sẽ liên hệ hỗ trợ trong 15 phút tới.
                </p>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setModalSubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-sm font-semibold text-white cursor-pointer"
                >
                  Đóng cửa sổ
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
