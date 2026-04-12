import { useState } from "react";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CFormTextarea,
  CButton
} from "@coreui/react";

function ResumeAnalyzer() {
  const [resume, setResume] = useState("");
  const [result, setResult] = useState("");

  const analyzeResume = async () => {
    const res = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resumeText: resume }),
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <CContainer style={{backgroundColor:'#e6f9ec'}}>
      <CRow style={{backgroundColor:'#e6f9ec', color: 'green'}}>
        <CCol >
          <h1>Resume Analyzer</h1>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Paste Resume</CCardHeader>
            <CCardBody>
              <CFormTextarea
                rows={10}
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste your resume here..."
              />
              <CButton style={{backgroundColor:"green", color:"#e6f9ec"}} type="submit" className="mt-3" onClick={analyzeResume}>
                Analyze Resume
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {result && (<CRow>
        <CCol>
          <CCard>
            <CCardHeader>Analysis Result</CCardHeader>
            <CCardBody>
              <pre>{result}</pre>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>)}
    </CContainer>
  );
}

export default ResumeAnalyzer;