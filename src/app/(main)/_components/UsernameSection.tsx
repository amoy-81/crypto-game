"use client";

import { useSession } from "next-auth/react";
import React from "react";

export default function UsernameSection() {
  const { data: session } = useSession();
  return <span>{session?.user?.username?.slice(0, 3)}</span>;
}
