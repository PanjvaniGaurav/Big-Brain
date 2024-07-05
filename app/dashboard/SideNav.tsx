"use client";

import { cn } from "@/lib/utils";
import { ClipboardPen, Cog, FilesIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="space-y-6">
        <li>
          <Link
            className={cn(
              "font-light flex gap-2 items-center text-xl hover:text-blue-100",
              {
                "text-blue-300": pathname.includes("/documents"),
              }
            )}
            href="/dashboard/documents"
          >
            <FilesIcon />
            Documents
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "font-light flex gap-2 items-center text-xl hover:text-blue-100",
              {
                "text-blue-300": pathname.includes("/notes"),
              }
            )}
            href="/dashboard/notes"
          >
            <ClipboardPen />
            Notes
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "font-light flex gap-2 items-center text-xl hover:text-blue-100",
              {
                "text-blue-300": pathname.includes("/settings"),
              }
            )}
            href="/dashboard/settings"
          >
            <Cog />
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
