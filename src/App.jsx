import html2pdf from "html2pdf.js";
import { useRef } from "react";
import Editor from "./components/mydocument/Editor";

function App() {
  const documentRef = useRef();

  const handleDownloadPDF = () => {
    const opt = {
      margin: [0, 0, 0, 0],
      filename: "CV.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(documentRef.current).save();
  };

  return (
    <>
      <Editor documentRef={documentRef} />
      <button onClick={handleDownloadPDF}>DownloadPDF</button>
    </>
  );
}

export default App;
