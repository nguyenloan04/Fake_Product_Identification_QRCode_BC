import ClientIcon from "@/components/ClientIcon";

import Link from "@/components/Link";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="relative h-screen w-screen bg-gray-100">
      <div className="absolute inset-0 z-10 bg-white/20 backdrop-blur-sm" />
      <div className="absolute inset-0 -z-0">
        <img className="w-full" src="/images/bg_auth.jpeg" alt="" />
      </div>
      <Link
        to="/"
        className="absolute top-4 left-4 z-20"
      >
        <ClientIcon
          icon="akar-icons:home"
          size={40}
        />
      </Link>

      <div className="absolute top-1/2 left-1/2 z-20 w-[500px] -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-pink-100 p-4">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
