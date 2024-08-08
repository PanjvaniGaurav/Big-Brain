"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderActions from "./HeadeArctions";
import DrawerMenu from "./Drawer";
import { Authenticated, Unauthenticated } from "convex/react";
import { ModeToggle } from "./ui/mode-toggle";
import { OrganizationSwitcher, SignInButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="z-10 relative dark:bg-slate-900 py-2">
      <div className="mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="flex gap-2 items-center text-3xl font-semibold">
              <Image src="/logo.png" width={65} height={65} alt="logo" />
              <span className="hidden sm:inline">Big Brain</span>
            </div>
          </Link>
          <Link className="font-light text-md mt-2 max-sm:hidden" href="/dashboard">Dashboard</Link>
        </div>

        <div className="hidden md:flex gap-3 items-center">
          <Authenticated>
            <ModeToggle />
            <OrganizationSwitcher />
            <HeaderActions />
          </Authenticated>
          <Unauthenticated>
            <SignInButton forceRedirectUrl={`/dashboard`} />
          </Unauthenticated>
        </div>

        <DrawerMenu />
      </div>
    </div>
  );
};

export default Header;
