import Link from "next/link";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <div className=" backdrop-blur-xl relative p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
        Login to your account
      </h1>
      <LoginForm />
      <p className="text-sm font-light text-neutral-400">
        Don’t have an account?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-primary-600 hover:underline text-primary-500"
        >
          Registar
        </Link>
      </p>
    </div>
  );
}
