import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DoctorJitsiMeet from "../components/JitsiMeetComponent"; // Main video call component
import Notepad from "../components/Notepad";
import PrescriptionBuilder from "../components/PrescriptionBuilder";
import JivanAISymptomForm from "../components/JivanAI";
import {
  FaStickyNote,
  FaPrescriptionBottle,
  FaRobot,
  FaChartLine,
  FaTools,
  FaVideo,
} from "react-icons/fa";

// New component for Kiosk Meta Data functionality
const KioskMetaData = () => {
  const [screenshots, setScreenshots] = useState([]);
  const [viewScreenshots, setViewScreenshots] = useState(false);

  const takeScreenshot = () => {
    const newScreenshot = {
      id: Date.now(),
      image: `Screenshot captured at ${new Date().toLocaleTimeString()}`
    };
    setScreenshots((prev) => [...prev, newScreenshot]);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Kiosk Meta Data</h2>
      <p className="mb-4 text-gray-600">
        Sensor Data: [Placeholder for live sensor readings]
      </p>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={takeScreenshot}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-shadow shadow-md"
        >
          Take Screenshot
        </button>
        <button
          onClick={() => setViewScreenshots(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-shadow shadow-md"
        >
          View Screenshots
        </button>
      </div>
      {viewScreenshots && (
        <div className="border-t pt-4">
          <h3 className="text-xl font-medium mb-2">Screenshots</h3>
          {screenshots.length === 0 ? (
            <p className="text-gray-600">No screenshots yet.</p>
          ) : (
            <ul className="space-y-2">
              {screenshots.map((s) => (
                <li key={s.id} className="p-2 bg-gray-100 rounded">
                  {s.image}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => setViewScreenshots(false)}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-shadow shadow-md"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

const DoctorTeleConsultationPage = () => {
  const { state } = useLocation();
  const { jwt, doctor } = state || {
    jwt: "",
    doctor: { doctor_name: "Doctor", profession: "", experience: "" }
  };
  const navigate = useNavigate();

  const [toolkitOpen, setToolkitOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

  const closeToolkit = () => {
    setToolkitOpen(false);
    setSelectedTool(null);
  };

  // Render minimal icon-only toolbar if no tool is selected.
  const renderToolbarIcons = () => (
    <div className="flex justify-around items-center py-4">
      <button
        title="Notepad"
        onClick={() => setSelectedTool("notepad")}
        className="p-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition transform hover:scale-105 shadow-lg"
      >
        <FaStickyNote size={24} />
      </button>
      <button
        title="Prescription"
        onClick={() => setSelectedTool("prescription")}
        className="p-3 text-white bg-green-600 rounded-full hover:bg-green-700 transition transform hover:scale-105 shadow-lg"
      >
        <FaPrescriptionBottle size={24} />
      </button>
      <button
        title="JivanAI"
        onClick={() => setSelectedTool("jivanai")}
        className="p-3 text-white bg-purple-600 rounded-full hover:bg-purple-700 transition transform hover:scale-105 shadow-lg"
      >
        <FaRobot size={24} />
      </button>
      <button
        title="Kiosk Meta Data"
        onClick={() => setSelectedTool("kiosk")}
        className="p-3 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg"
      >
        <FaChartLine size={24} />
      </button>
    </div>
  );

  // Render content for the left pane when toolkit is open.
  const renderToolkitContent = () => {
    if (selectedTool === "notepad") {
      return <Notepad onClose={() => setSelectedTool(null)} />;
    }
    if (selectedTool === "prescription") {
      return <PrescriptionBuilder onClose={() => setSelectedTool(null)} />;
    }
    if (selectedTool === "jivanai") {
      return <JivanAISymptomForm onClose={() => setSelectedTool(null)} />;
    }
    if (selectedTool === "kiosk") {
      return <KioskMetaData />;
    }
    // If no specific tool selected, show the minimal icon toolbar.
    return renderToolbarIcons();
  };

  return (
    <div className="relative h-screen w-full bg-gray-50">
      {/* Normal View */}
      {!toolkitOpen && (
        <>
          {/* Video Call Area: occupies ~90% of the page */}
          <div className="h-[90%] w-full">
            <DoctorJitsiMeet jwt={jwt} doctorName={doctor.doctor_name} />
          </div>
          {/* Bottom Row: Open Toolkit Button (only icon) */}
          <div className="h-[10%] w-full flex items-center justify-center bg-gray-200">
            <button
              onClick={() => setToolkitOpen(true)}
              title="Open Toolkit"
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition transform hover:scale-105 shadow-lg"
            >
              <FaStickyNote size={24} />
            </button>
          </div>
          {/* Top Right: Toolkit Icon */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setToolkitOpen(true)}
              title="Toolkit"
              className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition transform hover:scale-105 shadow-lg"
            >
              <FaTools size={24} />
            </button>
          </div>
        </>
      )}

      {/* Toolkit Overlay */}
      {toolkitOpen && (
        <div className="absolute inset-0 bg-white z-50 flex shadow-2xl">
          {/* Left Pane: Toolkit Options or Selected Tool (80% width) */}
          <div className="w-[80%] overflow-auto border-r border-gray-200">
            {renderToolkitContent()}
          </div>
          {/* Right Pane: Video Call Container (20% width) */}
          <div
            className="w-[20%] bg-gray-100 cursor-pointer"
            onClick={closeToolkit}
          >
            <div className="p-3 flex flex-col items-center">
              <FaVideo size={28} className="mb-1" />
              <span className="text-sm font-medium">Video Call</span>
            </div>
            <div className="h-full">
              <DoctorJitsiMeet
                jwt={jwt}
                doctorName={doctor.doctor_name}
                smallView={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Menu Button (always available) */}
      <button
        onClick={() => navigate("/menu")}
        className="absolute bottom-4 right-4 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-full transition transform hover:scale-105 shadow-lg"
      >
        Main Menu
      </button>
    </div>
  );
};

export default DoctorTeleConsultationPage;