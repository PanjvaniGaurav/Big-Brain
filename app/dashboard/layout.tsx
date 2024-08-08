import SideNav from "./SideNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-85px)]">
      <div className="md:w-64 md:flex-shrink-0 bg-gray-100 dark:bg-gray-800">
        <SideNav />
      </div>
      <main className="flex-grow overflow-auto">
        {children}
      </main>
    </div>
  );
}
