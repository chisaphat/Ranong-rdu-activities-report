import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Hospital,
  ShieldCheck,
  Stethoscope,
  Store,
  Building2,
  ShoppingCart,
  ChevronLeft,
  MapPin,
  Users,
  FileText,
  ClipboardList,
  History,
  PieChart,
  Settings,
  HardHat,
} from "lucide-react";

// --- Data Preparation ---
const hospitalData = [
  {
    name: "รพ.ระนอง",
    level: "S",
    ri: 18.73,
    ad: 12.43,
    ftw: 35.5,
    apl: 19.79,
    i5: 0,
    i6: 1.92,
    i7: 95.97,
    i8: 0.04,
    i9: 80.06,
    i10: 0.14,
    i11: 19.06,
    i12: 0,
    score: 11,
    status: "ผ่าน",
  },
  {
    name: "รพ.กระบุรี",
    level: "F2",
    ri: 12.48,
    ad: 11.59,
    ftw: 43.62,
    apl: 6.33,
    i5: 0,
    i6: 1.77,
    i7: 97.12,
    i8: 0.06,
    i9: 94.71,
    i10: 0.31,
    i11: 2.02,
    i12: 0,
    score: 12,
    status: "ผ่าน",
  },
  {
    name: "รพ.กะเปอร์",
    level: "F2",
    ri: 11.81,
    ad: 8.51,
    ftw: 46.78,
    apl: 0.0,
    i5: 0,
    i6: 2.58,
    i7: 96.65,
    i8: 0.0,
    i9: 87.59,
    i10: 0.13,
    i11: 3.33,
    i12: 0,
    score: 12,
    status: "ผ่าน",
  },
  {
    name: "รพ.ละอุ่น",
    level: "F3",
    ri: 7.87,
    ad: 10.38,
    ftw: 34.43,
    apl: 0.0,
    i5: 0,
    i6: 0.0,
    i7: 96.79,
    i8: 0.0,
    i9: 74.42,
    i10: 0.37,
    i11: 0.0,
    i12: 0,
    score: 11,
    status: "ผ่าน",
  },
  {
    name: "รพ.สุขสำราญ",
    level: "F3",
    ri: 22.56,
    ad: 20.07,
    ftw: 31.76,
    apl: 5.26,
    i5: 0,
    i6: 1.04,
    i7: 98.43,
    i8: 0.0,
    i9: 92.08,
    i10: 0.17,
    i11: 6.17,
    i12: 0,
    score: 10,
    status: "ผ่าน",
  },
];

const indicatorPassCount = [
  { name: "1. RI", passed: 4, failed: 1, failedNames: ["รพ.สุขสำราญ"] },
  { name: "2. AD", passed: 4, failed: 1, failedNames: ["รพ.สุขสำราญ"] },
  { name: "3. FTW", passed: 5, failed: 0, failedNames: [] },
  { name: "4. APL", passed: 4, failed: 1, failedNames: ["รพ.ระนอง"] },
  { name: "5. RAS Blockade", passed: 5, failed: 0, failedNames: [] },
  { name: "6. NSAIDs ไต", passed: 5, failed: 0, failedNames: [] },
  { name: "7. DM Metformin", passed: 5, failed: 0, failedNames: [] },
  { name: "8. NSAIDs ซ้ำ", passed: 5, failed: 0, failedNames: [] },
  { name: "9. Asthma-ICS", passed: 4, failed: 1, failedNames: ["รพ.ละอุ่น"] },
  { name: "10. Benzo", passed: 5, failed: 0, failedNames: [] },
  { name: "11. Antihis", passed: 5, failed: 0, failedNames: [] },
  { name: "12. Preg Risk", passed: 5, failed: 0, failedNames: [] },
];

const pcuData = [
  { name: "เมืองระนอง", riPass: 94.12, adPass: 82.35, bothPass: 82.35 },
  { name: "กระบุรี", riPass: 100.0, adPass: 100.0, bothPass: 100.0 },
  { name: "กะเปอร์", riPass: 100.0, adPass: 85.71, bothPass: 85.71 },
  { name: "ละอุ่น", riPass: 100.0, adPass: 87.5, bothPass: 87.5 },
  { name: "สุขสำราญ", riPass: 100.0, adPass: 100.0, bothPass: 100.0 },
];

const alertPCUs = [
  {
    district: "เมืองระนอง",
    name: "เกาะพยาม",
    indicator: "RI",
    value: 22.35,
    target: "≤ 20%",
  },
  {
    district: "เมืองระนอง",
    name: "บ้านเกาะสินไห",
    indicator: "AD",
    value: 42.86,
    target: "≤ 20%",
  },
  {
    district: "เมืองระนอง",
    name: "บ้านทุ่งคา",
    indicator: "AD",
    value: 25.0,
    target: "≤ 20%",
  },
  {
    district: "เมืองระนอง",
    name: "บ้านมิตรภาพ",
    indicator: "AD",
    value: 33.33,
    target: "≤ 20%",
  },
  {
    district: "กะเปอร์",
    name: "บ้านเคียนงาม",
    indicator: "AD",
    value: 33.33,
    target: "≤ 20%",
  },
  {
    district: "ละอุ่น",
    name: "บ้านระวิ",
    indicator: "AD",
    value: 26.67,
    target: "≤ 20%",
  },
];

// --- Custom Tooltip ---
const CustomIndicatorTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-slate-100 shadow-xl rounded-xl z-50">
        <p className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1">
          {label}
        </p>
        <p className="text-emerald-600 font-semibold text-sm">
          ผ่านเกณฑ์: {data.passed} แห่ง
        </p>
        <p className="text-red-500 font-semibold text-sm">
          ไม่ผ่านเกณฑ์: {data.failed} แห่ง
        </p>

        {data.failedNames && data.failedNames.length > 0 && (
          <div className="mt-2 pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-medium block mb-1">
              รายชื่อ รพ. ที่ไม่ผ่าน:
            </span>
            <ul className="list-disc pl-4">
              {data.failedNames.map((name, i) => (
                <li key={i} className="text-xs font-bold text-red-500">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  return null;
};

// --- UI Components ---
const DashMenuCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  colorClass,
  onClick,
  tabId,
}) => (
  <button
    onClick={() => onClick(tabId)}
    className="w-full text-left rounded-3xl p-8 shadow-sm border bg-white border-slate-100 flex flex-col justify-between transition-all duration-300 hover:border-indigo-300 hover:shadow-xl hover:-translate-y-2 group min-h-[260px] relative overflow-hidden"
  >
    <div
      className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-[2] ${colorClass}`}
    ></div>
    <div className="flex items-start justify-between mb-6 relative z-10">
      <div className={`p-4 rounded-2xl shadow-inner ${colorClass}`}>
        <Icon size={36} className="text-white" />
      </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-xl font-bold text-slate-700 mb-3">{title}</h3>
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
        <p className="text-4xl font-black text-slate-800">{value}</p>
        {subtitle && (
          <p className="text-sm font-medium text-slate-500 mt-2">{subtitle}</p>
        )}
      </div>
      <div className="mt-5 flex items-center text-indigo-600 text-base font-bold opacity-0 group-hover:opacity-100 transition-opacity">
        ดูรายละเอียด <ChevronLeft size={20} className="ml-1 rotate-180" />
      </div>
    </div>
  </button>
);

const MainMenuButton = ({
  title,
  icon: Icon,
  colorClass,
  onClick,
  tabId,
  isNew,
}) => (
  <button
    onClick={() => onClick(tabId)}
    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-300 group relative overflow-hidden h-48"
  >
    {isNew && (
      <div className="absolute -right-8 top-4 bg-red-500 text-white text-xs font-black py-1 px-10 transform rotate-45 shadow-md">
        NEW
      </div>
    )}
    <div
      className={`p-4 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110 ${colorClass}`}
    >
      <Icon size={40} className="text-white" />
    </div>
    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
      {title}
    </h3>
    <div className="absolute top-2 right-2 text-slate-300 opacity-50 group-hover:opacity-100 group-hover:text-blue-400">
      <div className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center">
        <span className="text-xs font-bold">+</span>
      </div>
    </div>
  </button>
);

export default function App() {
  // สถานะการนำทาง (Navigation State)
  // 'root' = หน้าหลักที่มีเมนู 6 ปุ่ม (ตามภาพอ้างอิง)
  // 'dashboard-menu' = หน้า 5 ปุ่ม ของปี 2569
  // 'hospital', 'pcu', ฯลฯ = หน้ารายละเอียด
  const [currentView, setCurrentView] = useState("root");

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dateString = currentTime.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const timeString = currentTime.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-4 md:p-6 lg:p-8">
      {/* --- Global Header --- */}
      <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-sm">
            <ShieldCheck size={28} className="text-white shrink-0" />
          </div>
          <div>
            <h2 className="text-sm md:text-base font-bold text-slate-800 tracking-tight">
              กลุ่มงานคุ้มครองผู้บริโภคและเภสัชสาธารณสุข
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-medium">
              สำนักงานสาธารณสุขจังหวัดระนอง
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col items-end">
          <span className="text-slate-600 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-200 text-sm font-medium flex items-center">
            <span className="relative flex h-2.5 w-2.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            {dateString} {timeString} น.
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto relative">
        {/* =========================================
            LEVEL 0: ROOT HOME (ตรงตามภาพตัวอย่าง)
            ========================================= */}
        {currentView === "root" && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Left Side: Graphic Banner (แทนรูปแผนที่) */}
            <div className="xl:col-span-5 bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl flex flex-col justify-center min-h-[500px]">
              {/* Abstract Map Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-400 opacity-20">
                <ShieldCheck size={400} />
              </div>

              <div className="relative z-10 h-full flex flex-col">
                <h1 className="text-4xl md:text-5xl font-black mb-2 leading-tight drop-shadow-md">
                  การพัฒนา
                  <br />
                  จังหวัดระนอง
                </h1>
                <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-12 drop-shadow-md">
                  สู่ 'RDU Province'
                </h2>

                {/* Network Illustration */}
                <div className="relative flex-grow flex items-center justify-center mt-8">
                  {/* Center Node */}
                  <div className="absolute w-24 h-24 bg-white/10 rounded-full animate-ping"></div>
                  <div className="bg-white rounded-full p-4 shadow-xl z-20 relative">
                    <MapPin size={48} className="text-red-500" fill="#fee2e2" />
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-lg font-bold bg-blue-800/80 px-3 py-1 rounded-full">
                      RDU Province
                    </div>
                  </div>

                  {/* Connecting Lines (CSS trick) */}
                  <svg
                    className="absolute w-full h-full inset-0 z-0"
                    style={{ pointerEvents: "none" }}
                  >
                    <path
                      d="M 50% 50% L 80% 20%"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="opacity-50"
                    />
                    <path
                      d="M 50% 50% L 80% 50%"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="opacity-50"
                    />
                    <path
                      d="M 50% 50% L 70% 80%"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="opacity-50"
                    />
                  </svg>

                  {/* Satellite Nodes */}
                  <div className="absolute top-0 right-4 md:right-12 flex flex-col items-center group cursor-default">
                    <div className="bg-white p-3 rounded-2xl shadow-lg mb-2 transform transition-transform group-hover:scale-110">
                      <Hospital size={32} className="text-indigo-600" />
                    </div>
                    <span className="font-bold text-sm bg-blue-800/80 px-2 py-0.5 rounded-full">
                      RDU-Hospital
                    </span>
                  </div>

                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 md:translate-x-8 flex flex-col items-center group cursor-default">
                    <div className="bg-white p-3 rounded-2xl shadow-lg mb-2 transform transition-transform group-hover:scale-110">
                      <Stethoscope size={32} className="text-blue-500" />
                    </div>
                    <span className="font-bold text-sm bg-blue-800/80 px-2 py-0.5 rounded-full">
                      RDU-PCU
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-12 md:right-24 flex flex-col items-center group cursor-default">
                    <div className="bg-white p-3 rounded-2xl shadow-lg mb-2 transform transition-transform group-hover:scale-110">
                      <Users size={32} className="text-orange-500" />
                    </div>
                    <span className="font-bold text-sm bg-blue-800/80 px-2 py-0.5 rounded-full">
                      RDU-Community
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: 6 Buttons Grid */}
            <div className="xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <MainMenuButton
                title="นโยบายจังหวัดระนอง"
                icon={FileText}
                colorClass="bg-blue-400"
                onClick={setCurrentView}
                tabId="coming-soon"
              />
              <MainMenuButton
                title="แผนการขับเคลื่อน"
                icon={ClipboardList}
                colorClass="bg-amber-400"
                onClick={setCurrentView}
                tabId="coming-soon"
              />
              <MainMenuButton
                title="ผลการดำเนินงานที่ผ่านมา"
                icon={History}
                colorClass="bg-emerald-400"
                onClick={setCurrentView}
                tabId="coming-soon"
              />
              <MainMenuButton
                title="ผลการดำเนินงานปี 2569"
                icon={PieChart}
                colorClass="bg-red-500"
                onClick={setCurrentView}
                tabId="dashboard-menu"
                isNew={true}
              />
              <MainMenuButton
                title="ข้อมูลสำหรับประชาชน"
                icon={Users}
                colorClass="bg-indigo-400"
                onClick={setCurrentView}
                tabId="coming-soon"
              />
              <MainMenuButton
                title="ข้อมูลสำหรับเจ้าหน้าที่"
                icon={Settings}
                colorClass="bg-slate-500"
                onClick={setCurrentView}
                tabId="coming-soon"
              />
            </div>
          </div>
        )}

        {/* =========================================
            LEVEL 1: DASHBOARD MENU (2569) - หน้า 5 ปุ่ม
            ========================================= */}
        {currentView === "dashboard-menu" && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <button
              onClick={() => setCurrentView("root")}
              className="group flex items-center space-x-2 text-slate-600 hover:text-blue-600 font-bold mb-6 transition-all bg-white px-5 py-2.5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md w-max"
            >
              <ChevronLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>ย้อนกลับหน้าหลัก</span>
            </button>

            <div className="mb-8 border-l-4 border-red-500 pl-4">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                ผลการดำเนินงานปี 2569
              </h1>
              <p className="text-slate-500 mt-2 text-lg">
                กรุณาเลือกหมวดหมู่ข้อมูลที่ต้องการเรียกดู
              </p>
            </div>

            <div className="flex flex-col gap-6 lg:gap-8">
              {/* แถวบน 3 ปุ่ม */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                <DashMenuCard
                  title="RDU Hospital"
                  value="5/5"
                  subtitle="โรงพยาบาล (100%)"
                  icon={Hospital}
                  colorClass="bg-indigo-600"
                  onClick={setCurrentView}
                  tabId="hospital"
                />
                <DashMenuCard
                  title="RDU เครือข่าย (PCU)"
                  value="5/5"
                  subtitle="อำเภอ (100%)"
                  icon={Stethoscope}
                  colorClass="bg-blue-500"
                  onClick={setCurrentView}
                  tabId="pcu"
                />
                <DashMenuCard
                  title="RDU ร้านยา"
                  value="-"
                  subtitle="รอข้อมูลผลการดำเนินงาน"
                  icon={Store}
                  colorClass="bg-purple-500"
                  onClick={setCurrentView}
                  tabId="pharmacy"
                />
              </div>
              {/* แถวล่าง 2 ปุ่ม ขยายเต็มพื้นที่ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <DashMenuCard
                  title="RDU โรงพยาบาลเอกชน"
                  value="-"
                  subtitle="รอข้อมูลผลการดำเนินงาน"
                  icon={Building2}
                  colorClass="bg-pink-500"
                  onClick={setCurrentView}
                  tabId="private_hosp"
                />
                <DashMenuCard
                  title="RDU ร้านชำ"
                  value="-"
                  subtitle="รอข้อมูลผลการดำเนินงาน"
                  icon={ShoppingCart}
                  colorClass="bg-orange-500"
                  onClick={setCurrentView}
                  tabId="grocery"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            LEVEL 2: DETAILS (Hospital / PCU / etc.)
            ========================================= */}
        {[
          "hospital",
          "pcu",
          "pharmacy",
          "private_hosp",
          "grocery",
          "coming-soon",
        ].includes(currentView) && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-300">
            {/* Back Button to Dashboard Menu */}
            <button
              onClick={() =>
                currentView === "coming-soon"
                  ? setCurrentView("root")
                  : setCurrentView("dashboard-menu")
              }
              className="group flex items-center space-x-2 text-slate-600 hover:text-indigo-600 font-bold mb-6 transition-all bg-white px-5 py-2.5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md w-max"
            >
              <ChevronLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>ย้อนกลับเมนูก่อนหน้า</span>
            </button>

            {/* === TAB: HOSPITAL === */}
            {currentView === "hospital" && (
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-3 rounded-xl mr-4 shadow-sm border border-indigo-200">
                    <Hospital className="text-indigo-700" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                      ข้อมูลระดับโรงพยาบาล (RDU Hospital)
                    </h2>
                    <p className="text-slate-500 font-medium mt-1">
                      ผลการดำเนินงานประเมิน 12 ตัวชี้วัดระดับโรงพยาบาล
                    </p>
                  </div>
                </div>

                {/* Charts Section: 12 Indicators Focus */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">
                      จำนวนตัวชี้วัดที่ผ่านเกณฑ์ (รายโรงพยาบาล)
                    </h3>
                    <p className="text-sm text-slate-500 mb-6">
                      เกณฑ์ผ่านสีเขียว: ≥ 10 จาก 12 ตัวชี้วัด
                    </p>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={hospitalData}
                          margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            horizontal={false}
                            stroke="#e2e8f0"
                          />
                          <XAxis type="number" domain={[0, 12]} tickCount={7} />
                          <YAxis
                            dataKey="name"
                            type="category"
                            width={80}
                            axisLine={false}
                            tickLine={false}
                            fontWeight="bold"
                          />
                          <Tooltip
                            cursor={{ fill: "#f8fafc" }}
                            contentStyle={{
                              borderRadius: "8px",
                              border: "1px solid #e2e8f0",
                              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                            }}
                          />
                          <Bar
                            dataKey="score"
                            name="จำนวนข้อที่ผ่าน"
                            fill="#10b981"
                            radius={[0, 4, 4, 0]}
                            maxBarSize={40}
                          />
                          <Line
                            dataKey={() => 10}
                            type="monotone"
                            stroke="#ef4444"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">
                      จำนวนโรงพยาบาลที่ผ่านเกณฑ์ (รายตัวชี้วัด)
                    </h3>
                    <p className="text-sm text-slate-500 mb-6">
                      สะท้อนให้เห็นข้อที่ควรเฝ้าระวังหรือพัฒนาต่อ (เต็ม 5 รพ.)
                    </p>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={indicatorPassCount}
                          margin={{ top: 0, right: 0, left: -20, bottom: 25 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#e2e8f0"
                          />
                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                            tick={{
                              fontSize: 11,
                              fill: "#475569",
                              fontWeight: 600,
                            }}
                          />
                          <YAxis
                            domain={[0, 5]}
                            tickCount={6}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip
                            content={<CustomIndicatorTooltip />}
                            cursor={{ fill: "#f8fafc" }}
                          />
                          <Bar
                            dataKey="passed"
                            stackId="a"
                            name="ผ่านเกณฑ์ (แห่ง)"
                            fill="#3b82f6"
                            radius={[0, 0, 0, 0]}
                          />
                          <Bar
                            dataKey="failed"
                            stackId="a"
                            name="ไม่ผ่าน (แห่ง)"
                            fill="#ef4444"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-xl font-bold text-slate-800">
                      ตารางรายละเอียดผลประเมิน 12 ตัวชี้วัด RDU Hospital
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 whitespace-nowrap">
                            โรงพยาบาล
                          </th>
                          <th className="px-4 py-3 whitespace-nowrap text-center">
                            1) RI
                            <br />
                            <span className="text-[10px] text-slate-500 font-normal">
                              ≤20%
                            </span>
                          </th>
                          <th className="px-4 py-3 whitespace-nowrap text-center">
                            2) AD
                            <br />
                            <span className="text-[10px] text-slate-500 font-normal">
                              ≤20%
                            </span>
                          </th>
                          <th className="px-4 py-3 whitespace-nowrap text-center">
                            3) FTW
                            <br />
                            <span className="text-[10px] text-slate-500 font-normal">
                              ≤40%
                            </span>
                          </th>
                          <th className="px-4 py-3 whitespace-nowrap text-center">
                            4) APL
                            <br />
                            <span className="text-[10px] text-slate-500 font-normal">
                              ≤10%
                            </span>
                          </th>
                          <th className="px-4 py-3 whitespace-nowrap text-center">
                            5) RAS blockade
                            <br />
                            <span className="text-[10px] text-slate-500 font-normal">
                              0%
                            </span>
                          </th>
                          <th className="px-4 py-3 whitespace-nowrap text-center">
                            6) NSAIDs ไตระดับ3
                            <br />
                            <span className="text-[10px] text-slate-500 font-normal">
                              ≤10%
                            </span>
                          </th>
                          <th className="px-4 py-3 whitespace-nowrap text-center">
                            7) DM ใช้ Metformin
                            <br />
                            <span className="text-[10px] text-slate-500 font-normal">
                              ≥80%
                            </span>
                          </th>
                          <th className="px-4 py-3 whitespace-nowrap text-center">
                            8) NSAIDs ซ้ำซ้อน
                            <br />
                            <span className="text-[10px] text-slate-500 font-normal">
                              ≤5%
                            </span>
                          </th>
                          <th className="px-4 py-3 whitespace-nowrap text-center">
                            9) Asthma-ICS
                            <br />
                            <span className="text-[10px] text-slate-500 font-normal">
                              ≥80%
                            </span>
                          </th>
                          <th className="px-4 py-3 whitespace-nowrap text-center">
                            10) Elderly-Benzo
                            <br />
                            <span className="text-[10px] text-slate-500 font-normal">
                              ≤5%
                            </span>
                          </th>
                          <th className="px-4 py-3 whitespace-nowrap text-center">
                            11) Child-Antihis
                            <br />
                            <span className="text-[10px] text-slate-500 font-normal">
                              ≤20%
                            </span>
                          </th>
                          <th className="px-4 py-3 whitespace-nowrap text-center">
                            12) Preg-Risk Drug
                            <br />
                            <span className="text-[10px] text-slate-500 font-normal">
                              0%
                            </span>
                          </th>
                          <th className="px-4 py-3 whitespace-nowrap text-center border-l border-slate-200">
                            คะแนน
                          </th>
                          <th className="px-4 py-3 whitespace-nowrap text-center">
                            สถานะ
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {hospitalData.map((row, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-indigo-50/50 transition-colors"
                          >
                            <td className="px-4 py-3 font-bold text-slate-800">
                              {row.name}{" "}
                              <span className="text-xs text-slate-500 bg-slate-200 px-2 py-0.5 rounded ml-1 font-normal">
                                {row.level}
                              </span>
                            </td>
                            <td
                              className={`px-4 py-3 text-center ${
                                row.ri > 20
                                  ? "text-red-600 font-bold bg-red-50/50"
                                  : "text-slate-600"
                              }`}
                            >
                              {row.ri.toFixed(2)}
                            </td>
                            <td
                              className={`px-4 py-3 text-center ${
                                row.ad > 20
                                  ? "text-red-600 font-bold bg-red-50/50"
                                  : "text-slate-600"
                              }`}
                            >
                              {row.ad.toFixed(2)}
                            </td>
                            <td
                              className={`px-4 py-3 text-center ${
                                row.ftw > 40
                                  ? "text-red-600 font-bold bg-red-50/50"
                                  : "text-slate-600"
                              }`}
                            >
                              {row.ftw.toFixed(2)}
                            </td>
                            <td
                              className={`px-4 py-3 text-center ${
                                row.apl > 10
                                  ? "text-red-600 font-bold bg-red-50/50"
                                  : "text-slate-600"
                              }`}
                            >
                              {row.apl.toFixed(2)}
                            </td>
                            <td
                              className={`px-4 py-3 text-center ${
                                row.i5 > 0
                                  ? "text-red-600 font-bold bg-red-50/50"
                                  : "text-slate-600"
                              }`}
                            >
                              {row.i5}
                            </td>
                            <td
                              className={`px-4 py-3 text-center ${
                                row.i6 > 10
                                  ? "text-red-600 font-bold bg-red-50/50"
                                  : "text-slate-600"
                              }`}
                            >
                              {row.i6.toFixed(2)}
                            </td>
                            <td
                              className={`px-4 py-3 text-center ${
                                row.i7 < 80
                                  ? "text-red-600 font-bold bg-red-50/50"
                                  : "text-slate-600"
                              }`}
                            >
                              {row.i7.toFixed(2)}
                            </td>
                            <td
                              className={`px-4 py-3 text-center ${
                                row.i8 > 5
                                  ? "text-red-600 font-bold bg-red-50/50"
                                  : "text-slate-600"
                              }`}
                            >
                              {row.i8.toFixed(2)}
                            </td>
                            <td
                              className={`px-4 py-3 text-center ${
                                row.i9 < 80
                                  ? "text-red-600 font-bold bg-red-50/50"
                                  : "text-slate-600"
                              }`}
                            >
                              {row.i9.toFixed(2)}
                            </td>
                            <td
                              className={`px-4 py-3 text-center ${
                                row.i10 > 5
                                  ? "text-red-600 font-bold bg-red-50/50"
                                  : "text-slate-600"
                              }`}
                            >
                              {row.i10.toFixed(2)}
                            </td>
                            <td
                              className={`px-4 py-3 text-center ${
                                row.i11 > 20
                                  ? "text-red-600 font-bold bg-red-50/50"
                                  : "text-slate-600"
                              }`}
                            >
                              {row.i11.toFixed(2)}
                            </td>
                            <td
                              className={`px-4 py-3 text-center ${
                                row.i12 > 0
                                  ? "text-red-600 font-bold bg-red-50/50"
                                  : "text-slate-600"
                              }`}
                            >
                              {row.i12}
                            </td>
                            <td className="px-4 py-3 text-center font-black text-indigo-600 border-l border-slate-200 text-base">
                              {row.score}/12
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 mt-6">
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center">
                    <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">
                      i
                    </span>
                    หมายเหตุ: ชื่อเต็มตัวชี้วัดการสั่งใช้ยา 12 รายการ
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-xs text-slate-600">
                    <div className="flex">
                      <span className="font-bold w-6">1)</span>
                      <span>
                        <b>RI:</b>{" "}
                        ร้อยละการใช้ยาปฏิชีวนะในโรคติดเชื้อทางเดินหายใจส่วนบนและหลอดลมอักเสบเฉียบพลัน
                        (≤ 20%)
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-bold w-6">2)</span>
                      <span>
                        <b>AD:</b>{" "}
                        ร้อยละการใช้ยาปฏิชีวนะในโรคอุจจาระร่วงเฉียบพลัน (≤ 20%)
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-bold w-6">3)</span>
                      <span>
                        <b>FTW:</b> ร้อยละการใช้ยาปฏิชีวนะในแผลสดจากอุบัติเหตุ
                        (≤ 40%)
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-bold w-6">4)</span>
                      <span>
                        <b>APL:</b>{" "}
                        ร้อยละการใช้ยาปฏิชีวนะในหญิงคลอดปกติครบกำหนดทางช่องคลอด
                        (≤ 10%)
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-bold w-6">5)</span>
                      <span>
                        <b>RAS Blockade:</b> ร้อยละผู้ป่วยที่ใช้ RAS blockade 2
                        ชนิดร่วมกัน (0%)
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-bold w-6">6)</span>
                      <span>
                        <b>NSAIDs ไต:</b> ร้อยละการใช้ NSAIDs
                        ในผู้ป่วยโรคไตเรื้อรังระดับ 3 ขึ้นไป (≤ 10%)
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-bold w-6">7)</span>
                      <span>
                        <b>DM Metformin:</b> ร้อยละผู้ป่วยโรคเบาหวานชนิดที่ 2
                        ที่ใช้ยา Metformin (≥ 80%)
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-bold w-6">8)</span>
                      <span>
                        <b>NSAIDs ซ้ำ:</b> ร้อยละการใช้ยา NSAIDs ซ้ำซ้อน (≤ 5%)
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-bold w-6">9)</span>
                      <span>
                        <b>Asthma-ICS:</b> ร้อยละผู้ป่วยหืดเรื้อรังที่ได้รับ
                        Inhaled corticosteroid (≥ 80%)
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-bold w-6">10)</span>
                      <span>
                        <b>Elderly-Benzo:</b> ร้อยละผู้ป่วยสูงอายุได้รับ
                        Long-acting benzodiazepine (≤ 5%)
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-bold w-6">11)</span>
                      <span>
                        <b>Child-Antihis:</b> ร้อยละเด็กได้รับ non-sedating
                        antihistamine (≤ 20%)
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-bold w-6">12)</span>
                      <span>
                        <b>Preg Risk:</b> สตรีตั้งครรภ์ที่ใช้ยา Warfarin,
                        Statin, Ergots (0%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* === TAB: PCU === */}
            {currentView === "pcu" && (
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4 border border-blue-200">
                    <Stethoscope className="text-blue-600" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                      ข้อมูลระดับเครือข่ายอำเภอ (RDU PCU)
                    </h2>
                    <p className="text-slate-500 font-medium mt-1">
                      ผลการดำเนินงานระดับ รพ.สต. ในแต่ละอำเภอ
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        ร้อยละของ รพ.สต. ที่ผ่านเกณฑ์ระดับอำเภอ
                      </h3>
                      <p className="text-sm text-slate-500 mb-6">
                        เป้าหมาย: ผ่านมากกว่าหรือเท่ากับ 80% (สีเขียว)
                      </p>
                      <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart
                            data={pcuData}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                              stroke="#e2e8f0"
                            />
                            <XAxis
                              dataKey="name"
                              axisLine={false}
                              tickLine={false}
                              fontWeight="bold"
                            />
                            <YAxis
                              axisLine={false}
                              tickLine={false}
                              domain={[0, 100]}
                            />
                            <Tooltip
                              cursor={{ fill: "#f8fafc" }}
                              contentStyle={{
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                              }}
                            />
                            <Legend
                              iconType="circle"
                              wrapperStyle={{ paddingTop: "20px" }}
                            />
                            <Bar
                              dataKey="bothPass"
                              name="% ผ่านเกณฑ์ทั้ง RI และ AD"
                              fill="#3b82f6"
                              radius={[4, 4, 0, 0]}
                              maxBarSize={60}
                            />
                            <Line
                              type="monotone"
                              dataKey={() => 80}
                              name="เป้าหมาย (80%)"
                              stroke="#ef4444"
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              dot={false}
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                          <tr>
                            <th className="px-4 py-3">อำเภอ</th>
                            <th className="px-4 py-3 text-center">
                              ผ่านเกณฑ์ RI
                            </th>
                            <th className="px-4 py-3 text-center">
                              ผ่านเกณฑ์ AD
                            </th>
                            <th className="px-4 py-3 text-center">
                              ผ่านเกณฑ์ทั้งสอง
                            </th>
                            <th className="px-4 py-3 text-center">สถานะ</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {pcuData.map((row, idx) => (
                            <tr
                              key={idx}
                              className="hover:bg-blue-50/50 transition-colors"
                            >
                              <td className="px-4 py-3 font-bold text-slate-800">
                                {row.name}
                              </td>
                              <td className="px-4 py-3 text-center text-slate-600">
                                {row.riPass.toFixed(2)}%
                              </td>
                              <td className="px-4 py-3 text-center text-slate-600">
                                {row.adPass.toFixed(2)}%
                              </td>
                              <td className="px-4 py-3 text-center font-black text-blue-600 text-base">
                                {row.bothPass.toFixed(2)}%
                              </td>
                              <td className="px-4 py-3 text-center">
                                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                                  สีเขียว
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm h-full">
                      <div className="flex items-center space-x-2 text-red-600 mb-6">
                        <AlertTriangle size={24} />
                        <h3 className="text-xl font-black">
                          พื้นที่ที่ต้องติดตาม
                          <br />
                          <span className="text-base font-bold text-red-500">
                            (ไม่ผ่านเกณฑ์)
                          </span>
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {alertPCUs.map((alert, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-4 rounded-xl shadow-sm border border-red-100 border-l-4 border-l-red-500 relative overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-slate-800">
                                {alert.name}
                              </h4>
                              <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded font-bold">
                                {alert.indicator}
                              </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-2">
                              อ.{alert.district}
                            </p>
                            <div className="flex items-end space-x-2">
                              <span className="text-2xl font-black text-red-600">
                                {alert.value.toFixed(2)}%
                              </span>
                              <span className="text-xs text-slate-400 mb-1 font-medium">
                                ({alert.target})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* === EMPTY STATES FOR OTHER TABS === */}
            {["pharmacy", "private_hosp", "grocery", "coming-soon"].includes(
              currentView
            ) && (
              <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center min-h-[50vh]">
                <div className="bg-slate-50 p-8 rounded-full mb-6 border border-slate-100 shadow-inner">
                  {currentView === "pharmacy" && (
                    <Store size={80} className="text-purple-400" />
                  )}
                  {currentView === "private_hosp" && (
                    <Building2 size={80} className="text-pink-400" />
                  )}
                  {currentView === "grocery" && (
                    <ShoppingCart size={80} className="text-orange-400" />
                  )}
                  {currentView === "coming-soon" && (
                    <HardHat size={80} className="text-amber-400" />
                  )}
                </div>
                <h2 className="text-3xl font-black text-slate-800 mb-4">
                  ระบบกำลังอยู่ระหว่างการพัฒนา
                </h2>
                <p className="text-slate-500 max-w-md text-lg">
                  หมวดหมู่นี้กำลังอยู่ในช่วงจัดเตรียมข้อมูลและพัฒนาระบบ
                  กรุณากลับมาใช้งานใหม่อีกครั้งในภายหลัง
                </p>
                <button
                  onClick={() =>
                    currentView === "coming-soon"
                      ? setCurrentView("root")
                      : setCurrentView("dashboard-menu")
                  }
                  className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg"
                >
                  กลับสู่หน้าก่อนหน้า
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
