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
    </div>
  );
}
