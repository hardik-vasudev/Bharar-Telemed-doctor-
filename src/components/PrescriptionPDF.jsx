import {
    Document,
    Page,
    Text,
    View,
    Image,
    StyleSheet,
  } from "@react-pdf/renderer";
  
  // ✅ Logo from public folder
  const logo = "/assets/logo.png";
  
  const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    logo: { width: 60, height: 60 },
    hospitalInfo: { textAlign: "right" },
  
    title: {
      fontSize: 20,
      textAlign: "center",
      marginBottom: 10,
      textDecoration: "underline",
    },
  
    section: { marginBottom: 12 },
    label: { fontWeight: "bold" },
    medRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      borderBottomStyle: "solid",
      paddingBottom: 2,
    },
  
    instructionsBox: {
      padding: 8,
      backgroundColor: "#eeeeee",
      borderRadius: 4,
      marginTop: 10,
    },
  
    footer: {
      marginTop: 30,
      borderTopWidth: 1,
      borderTopColor: "#cccccc",
      borderTopStyle: "solid",
      paddingTop: 10,
      textAlign: "right",
    },
    doctorInfo: { fontSize: 12 },
  });
  
  const PrescriptionPDF = ({ data }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} src={logo} />
          <View style={styles.hospitalInfo}>
            <Text>{data.hospitalName || "Bharat Telemed - PHC"}</Text>
            <Text>{data.hospitalContact || "Contact: 1800-XXX-XXXX"}</Text>
          </View>
        </View>
  
        {/* Title */}
        <Text style={styles.title}>Medical Prescription</Text>
  
        {/* Patient Info */}
        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Patient: </Text>
            {data.patientName}, {data.patientAge} yrs, {data.patientGender}
          </Text>
          <Text>
            <Text style={styles.label}>Concern: </Text>
            {data.patientConcern}
          </Text>
          <Text>
            <Text style={styles.label}>Date: </Text>
            {data.consultationDate} | Time: {data.consultationTime}
          </Text>
        </View>
  
        {/* Medicines */}
        <View style={styles.section}>
          <Text style={styles.label}>Prescribed Medicines:</Text>
          {data.selectedMedicines.map((med, i) => (
            <View key={i} style={styles.medRow}>
              <Text>
                {i + 1}. {med.name} ({med.strength})
              </Text>
              <Text>
                {med.dosage}, {med.frequency}
              </Text>
            </View>
          ))}
        </View>
  
        {/* Instructions */}
        <View style={styles.instructionsBox}>
          <Text style={styles.label}>Instructions:</Text>
          <Text>{data.customInstructions || "No special instructions."}</Text>
        </View>
  
        {/* Follow-up */}
        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Follow-Up Date: </Text>
            {data.followUpDate || "Not Scheduled"}
          </Text>
        </View>
  
        {/* Doctor Footer */}
        <View style={styles.footer}>
          <Text style={styles.doctorInfo}>
            Dr. {data.doctorName}, {data.doctorQualification}
          </Text>
          <Text style={styles.doctorInfo}>Digital Signature: ____________________</Text>
        </View>
      </Page>
    </Document>
  );
  
  export default PrescriptionPDF;
  