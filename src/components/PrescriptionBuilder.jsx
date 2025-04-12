import { useState } from "react";
import { useNavigate } from "react-router-dom";
import medicinesData from "../data/medicines";

const PrescriptionBuilder = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [customInstructions, setCustomInstructions] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  // Static Sample Data (can be replaced with context or fetched data)
  const sampleData = {
    hospitalName: "Bharat Telemed Clinic",
    hospitalContact: "+91 9876543210",
    hospitalLogo: "https://via.placeholder.com/60",
    doctorName: "Dr. Meera Sharma",
    doctorQualification: "MBBS, MD",
    consultationDate: new Date().toLocaleDateString(),
    consultationTime: new Date().toLocaleTimeString(),
    patientName: "Ravi Kumar",
    patientAge: "35",
    patientGender: "Male",
    patientConcern: "Fever, Cough",
  };

  const handleMedicineSelect = (medicine) => {
    setSelectedMedicines((prev) => [
      ...prev,
      {
        ...medicine,
        dosage: "1 Tablet",
        frequency: "3 times a day",
        customDosage: "",
        customFrequency: "",
      },
    ]);
  };

  const updateMedicine = (index, field, value) => {
    setSelectedMedicines((prev) =>
      prev.map((med, i) =>
        i === index ? { ...med, [field]: value } : med
      )
    );
  };

  const handlePublish = () => {
    const formattedMedicines = selectedMedicines.map((med) => ({
      name: med.name,
      strength: med.strength,
      icon: med.icon,
      dosage: med.dosage === "Custom" ? med.customDosage : med.dosage,
      frequency: med.frequency === "Custom" ? med.customFrequency : med.frequency,
    }));

    const payload = {
      ...sampleData,
      selectedMedicines: formattedMedicines,
      customInstructions,
      followUpDate,
    };

    navigate("/prescription-pdf", { state: payload });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Prescription Builder
      </h2>

      <input
        type="text"
        placeholder="Search medicine..."
        className="w-full p-3 border rounded-lg mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mb-6 max-h-40 overflow-y-auto border rounded-lg p-3">
        {medicinesData
          .filter((med) =>
            med.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((med, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md"
              onClick={() => handleMedicineSelect(med)}
            >
              <span>{med.icon} {med.name} ({med.strength})</span>
              <button className="text-green-600 font-semibold">Add</button>
            </div>
          ))}
      </div>

      {selectedMedicines.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-xl text-green-700 mb-2">Selected Medicines</h3>
          <div className="space-y-4 max-h-72 overflow-y-auto">
            {selectedMedicines.map((med, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <strong>{med.icon} {med.name} ({med.strength})</strong>
                  <button
                    onClick={() =>
                      setSelectedMedicines((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    className="text-red-500 text-sm"
                  >
                    ✖ Remove
                  </button>
                </div>

                <label className="block text-sm mb-1">Dosage</label>
                <select
                  className="w-full p-2 border rounded"
                  value={med.dosage}
                  onChange={(e) =>
                    updateMedicine(index, "dosage", e.target.value)
                  }
                >
                  <option>1 Tablet</option>
                  <option>2 Tablets</option>
                  <option>1 Drop</option>
                  <option>2 Drops</option>
                  <option>Custom</option>
                </select>
                {med.dosage === "Custom" && (
                  <input
                    type="text"
                    className="w-full mt-2 p-2 border rounded"
                    placeholder="Enter custom dosage"
                    value={med.customDosage}
                    onChange={(e) =>
                      updateMedicine(index, "customDosage", e.target.value)
                    }
                  />
                )}

                <label className="block text-sm mt-3 mb-1">Frequency</label>
                <select
                  className="w-full p-2 border rounded"
                  value={med.frequency}
                  onChange={(e) =>
                    updateMedicine(index, "frequency", e.target.value)
                  }
                >
                  <option>1 time a day</option>
                  <option>2 times a day</option>
                  <option>3 times a day</option>
                  <option>Custom</option>
                </select>
                {med.frequency === "Custom" && (
                  <input
                    type="text"
                    className="w-full mt-2 p-2 border rounded"
                    placeholder="Enter custom frequency"
                    value={med.customFrequency}
                    onChange={(e) =>
                      updateMedicine(index, "customFrequency", e.target.value)
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <textarea
        placeholder="Enter any custom instructions..."
        className="w-full p-3 border rounded-lg mb-4"
        value={customInstructions}
        onChange={(e) => setCustomInstructions(e.target.value)}
      />

      <input
        type="date"
        className="w-full p-3 border rounded-lg mb-4"
        value={followUpDate}
        onChange={(e) => setFollowUpDate(e.target.value)}
      />

      <button
        onClick={handlePublish}
        className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition"
      >
        Publish Prescription
      </button>
    </div>
  );
};

export default PrescriptionBuilder;
