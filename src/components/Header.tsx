import { Icon } from "@iconify/react";
import Link from "@/components/Link.tsx";
const Header = () => {
  return (
    <header className="container">
      <article className="flex justify-between items-center py-4">
        <div className="flex items-center gap-6 ml-[100px]">
          <Icon color="#797979" icon="fe:facebook" width="24" height="24" />
          <Icon color="#797979" icon="mdi:twitter" width="24" height="24" />
          <Icon color="#797979" icon="mdi:linkedin" width="24" height="24" />
        </div>
        <div className="flex items-center gap-4">
          <div>
            <Link to={"/auth/login"} className="px-4 py-2 bg-[#2D5F4D] text-white rounded-md hover:bg-green-600">
                Đăng nhập
            </Link>
          </div>
          <Icon icon="mdi:cart" width="24" height="24" />
          <Icon color="#2D5F4D" icon="mdi:telephone" width="24" height="24" />
          <span className="text-[#2D5F4D] font-bold">9430144469</span>
        </div>
      </article>
    </header>
  );
};

export default Header;
