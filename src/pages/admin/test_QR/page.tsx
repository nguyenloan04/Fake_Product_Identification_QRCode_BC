import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeGenerate from "@/components/QRCodeGenerate";

const QRCodePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "{}");
    if (userInfo.role !== 1) {
      navigate("/"); // hoặc về trang chính
    }
  }, []);
  return <QRCodeGenerate />;
};

export default QRCodePage;
