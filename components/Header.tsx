import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import React from "react";
import HeaderActions from "./HeadeArctions";
import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-slate-800 py-2">
      <div className="mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex gap-2 items-center text-3xl font-semibold">
            <Image src="/logo.png" width={65} height={65} alt="logo" />
            Big Brain
          </div>
        </Link>
        <div className="flex gap-3 mr-1 items-center">
          <ModeToggle />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
};

export default Header;
