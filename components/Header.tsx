"use client";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { OrganizationSwitcher, SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import HeaderActions from "./HeadeArctions";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="z-10 relative dark:bg-slate-900 py-2">
      <div className="mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <div className="flex gap-2 items-center text-3xl font-semibold">
            <Image src="/logo.png" width={65} height={65} alt="logo" />
            <span className="hidden sm:inline">Big Brain</span>
          </div>
        </Link>
        
        <div className="hidden md:flex gap-3 items-center">
          <Authenticated>
            <div className="text-md hover:text-slate-400">
              <Link href="/dashboard">Dashboard</Link>
            </div>
            <ModeToggle />
            <OrganizationSwitcher />
            <HeaderActions />
          </Authenticated>
          <Unauthenticated>
            <SignInButton forceRedirectUrl={`/dashboard`} />
          </Unauthenticated>
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu />
              </button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 pt-4">
                <Authenticated>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  <ModeToggle />
                  <OrganizationSwitcher />
                  <HeaderActions />
                </Authenticated>
                <Unauthenticated>
                  <SignInButton forceRedirectUrl={`/dashboard`} />
                </Unauthenticated>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;