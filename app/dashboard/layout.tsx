import SideNav from "./SideNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-24 container overflow-auto mx-auto pt-12">
      <SideNav />

      {children}
    </div>
  );
}