import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<{ username: string } | null>(null);

  // Khi load header, kiểm tra user đã login chưa
  useEffect(() => {
    const stored = sessionStorage.getItem("userInfo");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserInfo({ username: parsed.username });
      } catch {
        sessionStorage.removeItem("userInfo");
      }
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userInfo");
    window.location.reload();
  };

  return (
    <header className="container">
      <article className="flex justify-between items-center py-4">
        <div className="flex items-center gap-6 ml-[100px]">
          <Icon color="#797979" icon="fe:facebook" width="24" height="24" />
          <Icon color="#797979" icon="mdi:twitter" width="24" height="24" />
          <Icon color="#797979" icon="mdi:linkedin" width="24" height="24" />
        </div>

        <div className="flex items-center gap-4">
          {/* ✅ Nếu đã login */}
          {userInfo ? (
            <>
              <span className="text-[#2D5F4D] font-semibold">
                👋 Xin chào, {userInfo.username}
              </span>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            // ✅ Nếu chưa login
            <button
              className="px-4 py-2 bg-[#2D5F4D] text-white rounded-md hover:bg-green-600"
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
    </header>
  );
};

export default Header;
