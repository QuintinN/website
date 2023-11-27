import { Viewer, Worker } from "@react-pdf-viewer/core";
import React, { useState } from "react";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { FaRegFilePdf } from "react-icons/fa6";
import { BiHide } from "react-icons/bi";

// Settings to display the pdf file from sanity.io on the PortfolioDetails page
const PDFViewer = ({ pdf }) => {
  const [show, setShow] = useState(false);

  const newplugin = defaultLayoutPlugin();

  return (
    <div>
      <button
        onClick={() => setShow(!show)}
        className="flex items-center gap-2 hover:underline mb-5 text-[17px] font-medium"
      >
        {!show ? <FaRegFilePdf size={20} /> : <BiHide size={20} />}
        {show ? "Hide" : "View PDF"}
      </button>

      {show && (
        <div className="w-full h-[calc(100vh-96px)] overflow-y-auto flex items-center justify-center">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            {pdf && <Viewer fileUrl={pdf} plugins={[newplugin]} />}
          </Worker>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
