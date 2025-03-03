import ClientIcon from "@/components/ClientIcon";
import Link from "@/components/Link";
import { Button } from "@/components/ui/button";
import RegisterForm from "@/pages/auth/register/register-form";

const RegisterPage = () => {
  return (
    <article className="flex flex-col gap-4">
      <div className="flex justify-between gap-2 rounded-md border border-gray-300 p-2">
        <Link
          className="block flex-1"
          to={"/auth/login"}
        >
          <Button
            className="w-full"
            variant={"outline"}
          >
            Đăng Nhập
          </Button>
        </Link>
        <Link
          to={"/auth/register"}
          className="block flex-1"
        >
          <Button
            className="w-full"
            variant={"outline"}
          >
            Đăng Ký
          </Button>
        </Link>
      </div>
      <div className="rounded-md border border-gray-300 p-2">
        <RegisterForm />
      </div>
      <div className="rounded-md border border-gray-300 p-2">
        <span className="block py-2 text-center">
          Hoặc đăng nhập với
        </span>
        <div className="flex justify-evenly">
          <ClientIcon
            icon="flat-color-icons:google"
            size={40}
          />
          <ClientIcon
            icon="logos:facebook"
            size={40}
          />
        </div>
      </div>
    </article>
  );
};

export default RegisterPage;
