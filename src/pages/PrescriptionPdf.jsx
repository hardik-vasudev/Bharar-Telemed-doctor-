import { useLocation, useNavigate } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import PrescriptionPDF from "../components/PrescriptionPDF";
import { useEffect } from "react";

const PrescriptionPdf = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  useEffect(() => {
    if (!data) {
      const timeout = setTimeout(() => {
        navigate("/prescription");
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [data, navigate]);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center text-red-600">
        <p>No prescription data found.</p>
        <p>Redirecting to prescription form...</p>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <PDFViewer width="100%" height="100%">
        <PrescriptionPDF data={data} />
      </PDFViewer>
    </div>
  );
};

export default PrescriptionPdf;
