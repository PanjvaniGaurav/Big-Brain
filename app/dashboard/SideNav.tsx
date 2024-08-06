"use client"
import { cn } from "@/lib/utils";
import { FilesIcon, Search, ClipboardPen, LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

export default function SideNav() {
  const pathname = usePathname();

  const NavItem = ({
    href,
    icon: Icon,
    children,
  }: {
    href: string;
    children: ReactNode;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }) => (
    <Link
      href={href}
      className={cn(
        "flex items-center p-2 rounded-lg",
        pathname.includes(href)
          ? "bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
          : "hover:bg-gray-200 dark:hover:bg-gray-700"
      )}
    >
      <Icon className="mr-2 h-5 w-5" />
      <span className="hidden md:inline">{children}</span>
    </Link>
  );

  return (
    <nav className="p-4">
      <ul className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2">
        <NavItem href="/dashboard/search" icon={Search}>
          Search
        </NavItem>
        <NavItem href="/dashboard/documents" icon={FilesIcon}>
          Documents
        </NavItem>
        <NavItem href="/dashboard/notes" icon={ClipboardPen}>
          Notes
        </NavItem>
      </ul>
    </nav>
  );
}
