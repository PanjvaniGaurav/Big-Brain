"use client";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import React from "react";
import HeaderActions from "./HeadeArctions";
import Link from "next/link";
import { OrganizationSwitcher, SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";

const Header = () => {
  return (
    <div className="z-10 relative dark:bg-slate-900  py-2">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link href="/">
            <div className="flex gap-2 items-center text-3xl font-semibold">
              <Image src="/logo.png" width={65} height={65} alt="logo" />
              Big Brain
              <OrganizationSwitcher />
            </div>
          </Link>
          <Authenticated>
            <div className="text-md hover:text-slate-400">
              <Link href="/dashboard">Dashboard</Link>
            </div>
          </Authenticated>
        </div>
        <div className="flex gap-3 mr-3 items-center justify-center ">
          <Authenticated>
            <ModeToggle />
            <HeaderActions />
          </Authenticated>
          <Unauthenticated>
            <SignInButton forceRedirectUrl={`/dashboard`} />
          </Unauthenticated>
        </div>
      </div>
    </div>
  );
};

export default Header;
