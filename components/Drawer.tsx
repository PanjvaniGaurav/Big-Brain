"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { OrganizationSwitcher, SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { ModeToggle } from "./ui/mode-toggle";
import HeaderActions from "./HeadeArctions";
import Link from "next/link";
const DrawerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50 md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2">
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white dark:bg-slate-900 shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-4 gap-4">
          <Authenticated>
            <div className="flex flex-col gap-4">
              <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
              <ModeToggle />
              <OrganizationSwitcher />
              <HeaderActions />
            </div>
          </Authenticated>
          <Unauthenticated>
            <SignInButton forceRedirectUrl="/dashboard" />
          </Unauthenticated>
        </div>
      </div>
    </div>
  );
};

export default DrawerMenu;
