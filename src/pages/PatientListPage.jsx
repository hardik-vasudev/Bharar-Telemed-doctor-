// src/pages/PatientListPage.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  FaUsers,
  FaCalendarAlt,
  FaHistory,
  FaUserCheck,
  FaSearch,
  FaPlus,
  FaFileCsv,
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
  Legend,
} from "recharts";

// ─── Summary Card ─────────────────────────────────────────────────────────────
const SummaryCard = ({ icon: Icon, label, count, bgClass, textClass }) => (
  <div className="group relative bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow cursor-pointer">
    <div className={`p-4 rounded-full inline-block mb-4 ${bgClass} ${textClass}`}>
      <Icon size={28} />
    </div>
    <p className="text-2xl font-bold text-gray-800">{count}</p>
    <p className="text-sm text-gray-500">{label}</p>
    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-4 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
      {label}
    </span>
  </div>
);

const tabs = [
  { key: "upcoming", label: "Upcoming" },
  { key: "followUp", label: "Follow‑Up" },
  { key: "past", label: "Past" },
  { key: "all", label: "All" },
];

const PatientListPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);

  // Simulate fetching patient data
  useEffect(() => {
    setTimeout(() => {
      setPatients([
        {
          id: "P001",
          name: "Ravi Kumar",
          avatar: "",
          age: 35,
          gender: "Male",
          lastVisit: "2025-03-20",
          nextAppt: "2025-04-15",
          status: "upcoming",
        },
        {
          id: "P002",
          name: "Sneha Patel",
          avatar: "",
          age: 28,
          gender: "Female",
          lastVisit: "2025-03-25",
          nextAppt: "2025-04-20",
          status: "upcoming",
        },
        {
          id: "P003",
          name: "Amit Singh",
          avatar: "",
          age: 42,
          gender: "Male",
          lastVisit: "2025-02-10",
          nextAppt: "",
          status: "past",
        },
        {
          id: "P004",
          name: "Priya Verma",
          avatar: "",
          age: 31,
          gender: "Female",
          lastVisit: "2025-03-30",
          nextAppt: "2025-04-05",
          status: "followUp",
        },
        {
          id: "P005",
          name: "Sunita Rao",
          avatar: "",
          age: 50,
          gender: "Female",
          lastVisit: "2025-03-15",
          nextAppt: "",
          status: "past",
        },
        {
          id: "P006",
          name: "Rahul Jain",
          avatar: "",
          age: 60,
          gender: "Male",
          lastVisit: "2025-03-28",
          nextAppt: "2025-04-18",
          status: "upcoming",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // Filter based on tab and search
  const filtered = patients.filter((p) => {
    const matchesTab =
      activeTab === "all" || p.status === activeTab;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Summary metrics
  const metrics = [
    {
      icon: FaUsers,
      label: "All Patients",
      count: patients.length,
      bgClass: "bg-blue-100",
      textClass: "text-blue-600",
    },
    {
      icon: FaCalendarAlt,
      label: "Upcoming",
      count: patients.filter((p) => p.status === "upcoming").length,
      bgClass: "bg-yellow-100",
      textClass: "text-yellow-600",
    },
    {
      icon: FaUserCheck,
      label: "Follow‑Up",
      count: patients.filter((p) => p.status === "followUp").length,
      bgClass: "bg-green-100",
      textClass: "text-green-600",
    },
    {
      icon: FaHistory,
      label: "Past",
      count: patients.filter((p) => p.status === "past").length,
      bgClass: "bg-indigo-100",
      textClass: "text-indigo-600",
    },
  ];

  // Dummy chart data
  const lineData = [
    { date: "Apr 1", requests: 5 },
    { date: "Apr 2", requests: 8 },
    { date: "Apr 3", requests: 6 },
    { date: "Apr 4", requests: 10 },
    { date: "Apr 5", requests: 7 },
    { date: "Apr 6", requests: 12 },
    { date: "Apr 7", requests: 9 },
  ];
  const barData = [
    { status: "Upcoming", count: metrics[1].count },
    { status: "Follow‑Up", count: metrics[2].count },
    { status: "Past", count: metrics[3].count },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-20 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Patient List</h1>
          <div className="space-x-2">
            <NavLink
              to="/add-patient"
              className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <FaPlus className="mr-2" /> Add Patient
            </NavLink>
            <button className="inline-flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">
              <FaFileCsv className="mr-2" /> Export CSV
            </button>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((m, i) => (
            <SummaryCard key={i} {...m} />
          ))}
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Requests (Last 7 Days)
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="requests"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Status Breakdown
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Tabs & Search */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg transition ${
                    activeTab === tab.key
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search patient..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading patients…</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No patients found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age/Gender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Appt
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filtered.map((p) => (
                    <tr key={p.id}>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                        <img
                          src={p.avatar || "https://via.placeholder.com/32"}
                          alt={p.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {p.name}
                          </div>
                          <div className="text-xs text-gray-500">{p.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {p.age} / {p.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {p.lastVisit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {p.nextAppt || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            p.status === "upcoming"
                              ? "bg-blue-100 text-blue-800"
                              : p.status === "followUp"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {tabs.find((t) => t.key === p.status)?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          View
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          Join
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientListPage;
