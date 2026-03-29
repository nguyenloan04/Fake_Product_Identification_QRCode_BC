import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import extractDataFromQR from "@/services/qr.service";
import { BrowserQRCodeReader } from "@zxing/browser";

const Header = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<{ username: string; role: number } | null>(null);

  const handleLogout = () => {
    sessionStorage.removeItem("userInfo");
    window.location.href = "/";
  };


  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const listNotifyState = {
    default: 0,
    loadFailed: 1,
    loadSuccess: 2,
    verifyFailed: 3,
    verifySuccess: 4
  };

  const [notifyState, changeNotifyState] = useState(listNotifyState.default);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    //Không có file hoặc ref
    if (!file || !canvasRef.current) return;

    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = async () => {
      try {
        const codeReader = new BrowserQRCodeReader();
        const result = await codeReader.decodeFromImageElement(image);
        const qrData = result.getText();
        if (qrData) {
          // changeNotifyState(2)
          await extractDataFromQR(qrData).then(result => {
            if (result) changeNotifyState(4);
            else changeNotifyState(3);
          })
            .catch(() => {
              changeNotifyState(1);
            });

        } else {
          changeNotifyState(1);
        }
      } catch (err: unknown) {
        changeNotifyState(1);
        if (err instanceof Error) {
          console.error("Lỗi:", err.message);
          console.error("Stack trace:", err.stack);
        } else {
          console.error("Lỗi không xác định:", err);
        }
      }
      turnOffNotification();
    };

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }


    // const image = new Image()
    // image.src = URL.createObjectURL(file)

    // image.onload = async () => {
    //   const canvas = canvasRef.current!
    //   const ctx = canvas.getContext('2d')
    //   if (!ctx) return

    //   canvas.width = image.width
    //   canvas.height = image.height
    //   ctx.drawImage(image, 0, 0)
    //   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    //   const result = jsQR(imageData.data, canvas.width, canvas.height)

    //   if (timeoutRef.current) {
    //     clearTimeout(timeoutRef.current)
    //   }

    //   console.log(result)
    //   if (result?.data) {
    //     // changeNotifyState(2)
    //     const data = result.data
    //     const extractResult = await extractDataFromQR(data)

    //     if (extractResult) changeNotifyState(4)
    //     else changeNotifyState(3)

    //   } else {
    //     changeNotifyState(1)
    //   }
    //   turnOffNotification()
    // }
  };

  const turnOffNotification = () => {
    timeoutRef.current = window.setTimeout(() => {
      changeNotifyState(0);
    }, 2000);
  };

  const handleImageChooser = () => {
    inputRef.current?.click();
  };

  // Khi load header, kiểm tra user đã login chưa
  useEffect(() => {
    const stored = sessionStorage.getItem("userInfo");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserInfo({ username: parsed.username, role: parsed.role });
      } catch {
        sessionStorage.removeItem("userInfo");
      }
    }
  }, []);


  return (
    <header className="container">
      <article className="flex justify-between items-center py-4">
        <div className="flex items-center gap-6 ml-[100px]">
          <Icon color="#797979" icon="fe:facebook" width="24" height="24" />
          <Icon color="#797979" icon="mdi:twitter" width="24" height="24" />
          <Icon color="#797979" icon="mdi:linkedin" width="24" height="24" />
        </div>

        <div className="flex items-center gap-4">
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
          <button
            className="px-4 py-2 bg-[#07a40a] text-white rounded-md hover:bg-green-600 pointer cursor-pointer"
            onClick={handleImageChooser}
          >
            Xác thực QR sản phẩm
          </button>

          {userInfo?.role === 1 && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
              onClick={() => navigate("generate-qr")}
            >
              Tạo mã QR
            </button>
          )}

          {userInfo ? (
            <>
              <span className="text-[#2D5F4D] font-semibold">
                👋 Xin chào, {userInfo.username}
              </span>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            // ✅ Nếu chưa login
            <button
              className="px-4 py-2 bg-[#2D5F4D] text-white rounded-md hover:bg-green-600 cursor-pointer"
              onClick={() => navigate("/auth/login")}
            >
              Đăng nhập
            </button>
          )}

          <Icon icon="mdi:cart" width="24" height="24" />
          <Icon color="#2D5F4D" icon="mdi:telephone" width="24" height="24" />
          <span className="text-[#2D5F4D] font-bold">9430144469</span>
        </div>
      </article>

      {notifyState === 0 ? <></> :
        <div
          className={notifyState % 2 === 0 ? "bg-[#07a40a] text-white rounded p-2 px-3" : "bg-[#e7000b] text-white rounded p-2 px-3"}
          style={{ position: "fixed", bottom: "2rem", zIndex: "100" }}
        >
          {notifyState / 2 <= 1 ? "Quét QR " : "Xác thực "}
          {notifyState % 2 === 0 ? "thành công" : "thất bại"}
          {notifyState === 3 && ", QR của sản phẩm được xác nhận là giả"}
          {notifyState === 4 && ", QR của sản phẩm được xác nhận là thật"}
        </div>
      }


    </header>
  );
};

export default Header;