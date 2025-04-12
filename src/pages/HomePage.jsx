// src/pages/HomePage.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHospital,
  FaFileMedical,
  FaChartBar,
  FaCog,
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaVideo,
  FaCalendarAlt,
  FaCoffee,
  FaUserMd,
  FaQuestionCircle,
  FaLifeRing,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
  Legend as ReLegend,
} from "recharts";
import logo from "../assets/logo.png";

// ─── Sidebar ────────────────────────────────────────────────────────────────────
const Sidebar = () => (
  <aside className="fixed inset-y-0 left-0 w-20 hover:w-56 bg-white shadow-lg overflow-hidden transition-width duration-300">
    <nav className="mt-10 flex flex-col space-y-4">
      <NavLink to="/" className="flex items-center h-12 px-3 text-gray-600 hover:text-blue-600 group">
        <FaHospital size={24} />
        <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">Dashboard</span>
      </NavLink>
      <NavLink to="/prescription" className="flex items-center h-12 px-3 text-gray-600 hover:text-green-600 group">
        <FaFileMedical size={24} />
        <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">Prescriptions</span>
      </NavLink>
      <NavLink to="/analytics" className="flex items-center h-12 px-3 text-gray-600 hover:text-indigo-600 group">
        <FaChartBar size={24} />
        <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">Analytics</span>
      </NavLink>
      <NavLink to="/patients" className="flex items-center h-12 px-3 text-gray-600 hover:text-green-600 group">
        <FaUserMd size={24} />
        <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">Patients</span>
      </NavLink>
      <NavLink to="/messages" className="flex items-center h-12 px-3 text-gray-600 hover:text-purple-600 group">
        <FaEnvelope size={24} />
        <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">Messages</span>
      </NavLink>
      <NavLink to="/settings" className="flex items-center h-12 px-3 text-gray-600 hover:text-gray-800 group">
        <FaCog size={24} />
        <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">Settings</span>
      </NavLink>
    </nav>
  </aside>
);

// ─── Teleconsult Card ───────────────────────────────────────────────────────────
const TeleconsultCard = ({ patients, onJoin }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg">
    <div className="flex items-center mb-4">
      <FaVideo className="text-blue-600 mr-2" size={28} />
      <div>
        <p className="text-2xl font-bold">{patients.length} Today</p>
        <p className="text-sm text-gray-500">Teleconsults</p>
      </div>
    </div>
    <ul className="space-y-3">
      {patients.map((p) => (
        <li key={p.id} className="flex justify-between items-center">
          <div>
            <p className="font-semibold">{p.name}</p>
            <p className="text-xs text-gray-500">
              {p.time} | {p.gender} | {p.concern}
            </p>
          </div>
          <button
            onClick={() => onJoin(p.id)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Join
          </button>
        </li>
      ))}
    </ul>
  </div>
);

// ─── Breaks Card ────────────────────────────────────────────────────────────────
const BreaksCard = ({ breaks }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg">
    <div className="flex items-center mb-4">
      <FaCoffee className="text-purple-600 mr-2" size={28} />
      <div>
        <p className="text-2xl font-bold">{breaks.length}</p>
        <p className="text-sm text-gray-500">Scheduled Breaks</p>
      </div>
    </div>
    <ul className="list-disc list-inside text-gray-700">
      {breaks.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  </div>
);

// ─── Generic Card ───────────────────────────────────────────────────────────────
const GenericCard = ({ icon: Icon, label, count, color }) => (
  <div className="group relative bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow cursor-pointer">
    <div className={`p-4 rounded-full bg-${color}-100 inline-block text-${color}-600 mb-4`}>
      <Icon size={28} />
    </div>
    <p className="text-2xl font-bold text-gray-800">{count}</p>
    <p className="text-sm text-gray-500">{label}</p>
    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-4 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
      {label}
    </span>
  </div>
);

// ─── Quick Links ────────────────────────────────────────────────────────────────
const QuickLinks = () => (
  <section className="bg-white p-6 rounded-2xl shadow-lg mb-8">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <NavLink to="/bookings" className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg">
        <FaCalendarAlt className="text-blue-600 mr-2" /> Bookings
      </NavLink>
      <NavLink to="/queries" className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg">
        <FaQuestionCircle className="text-purple-600 mr-2" /> Queries
      </NavLink>
      <NavLink to="/support-services" className="flex items-center p-4 bg-red-50 hover:bg-red-100 rounded-lg">
        <FaLifeRing className="text-red-600 mr-2" /> Support
      </NavLink>
      <NavLink to="/reports" className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg">
        <FaChartBar className="text-green-600 mr-2" /> Reports
      </NavLink>
    </div>
  </section>
);

// ─── HomePage ──────────────────────────────────────────────────────────────────
const HomePage = () => {
  const [showAlerts, setShowAlerts] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showTelePopup, setShowTelePopup] = useState(false);

  // Dummy data
  const doctor = { name: "Dr. Aryan Sharma" };
  const alerts = [
    "Emergency consult at 11:00 AM (BT-REQ-003)",
    "Follow‑up overdue for P004",
    "Policy update released",
  ];
  const messages = [
    { from: "Dr. Meera", text: "Lab results ready for P002", time: "10:15 AM" },
    { from: "Nurse Joy", text: "P003 checked in", time: "09:50 AM" },
  ];
  const nextPatients = [
    { id: "BT-REQ-008", name: "Ravi Kumar", time: "10:30 AM", gender: "Male", concern: "Fever" },
    { id: "BT-REQ-009", name: "Sneha Patel", time: "11:00 AM", gender: "Female", concern: "Cough" },
    { id: "BT-REQ-010", name: "Amit Singh", time: "11:30 AM", gender: "Male", concern: "Headache" },
  ];
  const breakTimes = ["2:30 PM - 3:00 PM", "5:00 PM - 5:15 PM"];

  // Chart data
  const lineData = [
    { date: "Apr 1", count: 4 },
    { date: "Apr 2", count: 6 },
    { date: "Apr 3", count: 5 },
    { date: "Apr 4", count: 7 },
    { date: "Apr 5", count: 6 },
    { date: "Apr 6", count: 8 },
    { date: "Apr 7", count: 5 },
  ];
  const barData = [
    { date: "Apr 1", followUps: 2 },
    { date: "Apr 2", followUps: 3 },
    { date: "Apr 3", followUps: 1 },
    { date: "Apr 4", followUps: 4 },
    { date: "Apr 5", followUps: 2 },
    { date: "Apr 6", followUps: 3 },
    { date: "Apr 7", followUps: 2 },
  ];
  const satisfactionData = [{ name: "Satisfaction", value: 85 }];
  const pieDataGender = [
    { name: "Male", value: 90 },
    { name: "Female", value: 60 },
  ];
  const GENDER_COLORS = ["#3B82F6", "#EC4899"];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-20 p-6">
        {/* Topbar */}
        <header className="flex justify-between items-center mb-8">
          <img src={logo} alt="Bharat Telemed" className="w-10 h-10" />

          <div className="flex items-center space-x-4">
            {/* Alerts */}
            <div className="relative">
              <FaBell
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                size={20}
                onClick={() => setShowAlerts(!showAlerts)}
              />
              {showAlerts && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-10">
                  <p className="font-semibold mb-2">Alerts</p>
                  <ul className="text-gray-700 space-y-1">
                    {alerts.map((a, i) => (
                      <li key={i}>• {a}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="relative">
              <FaEnvelope
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                size={20}
                onClick={() => setShowMessages(!showMessages)}
              />
              {showMessages && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-10">
                  <p className="font-semibold mb-2">Messages</p>
                  <ul className="text-gray-700 space-y-1">
                    {messages.map((m, i) => (
                      <li key={i}>
                        <strong>{m.from}:</strong> {m.text}{" "}
                        <span className="text-xs text-gray-500">({m.time})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <FaUserCircle
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                size={24}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              />
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-10">
                  <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    View Profile
                  </NavLink>
                  <button
                    onClick={() => setShowAlerts(true)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Emergency Alerts
                  </button>
                  <button
                    onClick={() => setShowMessages(true)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Chat
                  </button>
                  <NavLink to="/settings" className="block px-4 py-2 hover:bg-gray-100">
                    Settings
                  </NavLink>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-gradient-to-tr from-blue-50 to-white p-8 rounded-2xl shadow-lg mb-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
              Welcome, {doctor.name}
            </h2>
            <p className="text-gray-600 max-w-xl mb-4">
              Manage your consultations, track patient progress, and save lives—all from one place.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowTelePopup(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Start Teleconsult
              </button>
              <NavLink
                to="/patients"
                className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
              >
                View Patient Records
              </NavLink>
            </div>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Doctor Illustration"
            className="w-40 h-40 object-contain mt-6 md:mt-0"
          />
        </section>

        {/* Teleconsult Modal */}
        {showTelePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-20">
            <div className="bg-white rounded-2xl p-6 w-96 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Next in Line</h3>
              <ul className="space-y-3 mb-4">
                {nextPatients.map((p) => (
                  <li key={p.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-gray-500">
                        {p.time} | {p.gender} | {p.concern}
                      </p>
                    </div>
                    <button
                      onClick={() => alert(`Joining ${p.id}`)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Join
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowTelePopup(false)}
                className="mt-2 text-gray-500 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <TeleconsultCard patients={nextPatients} onJoin={(id) => alert(`Joining ${id}`)} />
          <BreaksCard breaks={breakTimes} />
          <GenericCard icon={FaCalendarAlt} label="Follow‑Ups Today" count={8} color="yellow" />
          <GenericCard icon={FaUserMd} label="Total Patients" count={150} color="green" />
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Teleconsults (7d)</h3>
            <div className="w-full h-64">
              <ResponsiveContainer>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow‑Ups (7d)</h3>
            <div className="w-full h-64">
              <ResponsiveContainer>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="followUps" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Satisfaction</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                barSize={12}
                data={satisfactionData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar minAngle={15} clockWise dataKey="value" cornerRadius={8} fill="#10B981" />
                <ReLegend iconSize={8} layout="vertical" verticalAlign="middle" align="right" />
              </RadialBarChart>
            </ResponsiveContainer>
            <p className="text-center mt-4 text-xl font-bold text-gray-800">85%</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Gender Ratio</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieDataGender}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  innerRadius={30}
                  label
                >
                  {pieDataGender.map((_, idx) => (
                    <Cell key={idx} fill={GENDER_COLORS[idx]} />
                  ))}
                </Pie>
                <Tooltip />
                <ReLegend iconSize={8} layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Quick Links */}
        <QuickLinks />
      </div>
    </div>
  );
};

export default HomePage;
