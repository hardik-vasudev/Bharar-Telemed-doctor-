import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorWaitingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Immediately navigate to teleconsultation
    navigate('/teleconsultation');
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <p className="text-xl text-gray-700">Redirecting to Teleconsultation...</p>
    </div>
  );
};

export default DoctorWaitingScreen;
