import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

// Lazy load pages and components
const HomePage = lazy(() => import("./pages/HomePage"));
const TeleConsultationPage = lazy(() => import("./pages/TeleConsultationPage"));
const SensorData = lazy(() => import("./components/SensorDataDisplay"));
const SensorDataPage = lazy(() => import("./pages/SensorDataPage"));
const QueriesPage = lazy(() => import("./pages/QueriesPage"));
const Bookings = lazy(() => import("./pages/Bookings"));
const PatientListPage = lazy(() => import("./pages/PatientListPage"));
const SupportServices = lazy(() => import("./pages/SupportServices"));
const WaitingScreen = lazy(() => import("./pages/WaitingScreen"));
const PrescriptionBuilder = lazy(() => import("./components/PrescriptionBuilder"));
const PrescriptionPdf = lazy(() => import("./pages/PrescriptionPdf"));
const JivanAISymptomForm = lazy(() => import("./components/JivanAI"));



const App = () => {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar always present */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          <Topbar />
          <main className="p-4">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/teleconsultation" element={<TeleConsultationPage />} />
                <Route path="/sensor-data" element={<SensorData />} />
                <Route path="/sensor-data-page" element={<SensorDataPage />} />
                <Route path="/waiting-screen" element={<WaitingScreen />} />
                <Route path="/queries" element={<QueriesPage />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/support-services" element={<SupportServices />} />
                <Route path="/prescription" element={<PrescriptionBuilder />} />
                <Route path="/patients" element={<PatientListPage />} />
                <Route path="/prescription-pdf" element={<PrescriptionPdf />} />
                <Route path="/jivanai" element={<JivanAISymptomForm />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
