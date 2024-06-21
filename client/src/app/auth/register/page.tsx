import React from "react";
import RegisterForm from "../_components/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className=" backdrop-blur-xl relative p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
        Register your account
      </h1>
      <RegisterForm />
      <p className="text-sm font-light text-neutral-400">
        have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary-600 hover:underline text-primary-500"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
