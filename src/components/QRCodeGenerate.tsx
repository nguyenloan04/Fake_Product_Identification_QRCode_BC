import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const QRCodeGenerate = () => {
  const [text, setText] = useState("Xin chào thế giới!");
  const [showQR, setShowQR] = useState(false);

  const handleGenerate = () => {
    setShowQR(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-6 p-6">
      <h1 className="text-3xl font-bold">Tạo mã QR</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded w-80 shadow"
        placeholder="Nhập nội dung cần tạo QR"
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Tạo mã QR
      </button>

      {showQR && (
        <div className="mt-6 border p-4 rounded shadow bg-white">
          <QRCodeSVG value={text} size={300} />
          <p className="mt-2 text-center text-sm text-gray-600">Nội dung của QR:<br/> {text}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerate;
