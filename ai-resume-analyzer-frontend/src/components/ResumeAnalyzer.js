import { useState } from "react";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CFormTextarea,
  CButton,
  CFormInput
} from "@coreui/react";

function ResumeAnalyzer() {
  const [resume, setResume] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const analyzeResume = async () => {
    try {
      let res;

      // 👉 If file uploaded
      if (file) {
        const formData = new FormData();
        formData.append("resume", file);

        res = await fetch("https://ai-resume-analyzer-diqm.onrender.com/api/analyze", {
          method: "POST",
          body: formData,
        });
      } 
      // 👉 If text entered
      else if (resume) {
        res = await fetch("https://ai-resume-analyzer-diqm.onrender.com/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resumeText: resume }),
        });
      } 
      // 👉 Nothing provided
      else {
        alert("Please upload a file or paste resume text");
        return;
      }

      const data = await res.json();
      setResult(data.result);

    } catch (err) {
      console.error(err);
      setResult("Something went wrong!");
    }
  };

  return (
    <CContainer style={{ backgroundColor: "#e6f9ec", minHeight: "100vh", padding: "20px" }}>
      
      {/* Header */}
      <CRow className="mb-3">
        <CCol>
          <h1 style={{ color: "green", textAlign: "center" }}>
            Resume Analyzer
          </h1>
        </CCol>
      </CRow>

      {/* Input Section */}
      <CRow>
        <CCol>
          <CCard className="shadow">
            <CCardHeader style={{ backgroundColor: "#14532d", color: "#bbf7d0" }}>
              Upload or Paste Resume
            </CCardHeader>
            <CCardBody>

              {/* File Upload */}
              <label><b>Upload Resume (PDF)</b></label>
              <CFormInput
                type="file"
                accept=".pdf"
                className="mb-3"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <div style={{ textAlign: "center", margin: "10px 0" }}>
                OR
              </div>

              {/* Text Input */}
              <CFormTextarea
                rows={8}
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste your resume here..."
              />

              {/* Button */}
              <CButton
                style={{
                  backgroundColor: "#14532d",
                  color: "#bbf7d0",
                  border: "1px solid #bbf7d0",
                  marginTop: "15px",
                  width: "100%"
                }}
                onClick={analyzeResume}
              >
                Analyze Resume
              </CButton>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Result Section */}
      {result && (
        <CRow className="mt-4">
          <CCol>
            <CCard className="shadow">
              <CCardHeader style={{ backgroundColor: "#14532d", color: "#bbf7d0" }}>
                Analysis Result
              </CCardHeader>
              <CCardBody>
                <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </CContainer>
  );
}

export default ResumeAnalyzer;