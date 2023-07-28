"use client";

import { useAppSelector } from "@/hooks/useAppSelector";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isLoggedIn } = useAppSelector((state) => state.User.user);
  const router = useRouter();

  useEffect(() => {
    const path = isLoggedIn ? "/shop" : "/account/login";
    router.push(path);
  }, [isLoggedIn, router]);

  return <></>;
}
