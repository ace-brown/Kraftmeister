import "./globals.css";

export const metadata = {
  title: "Handwerk AI",
  description: "SaaS for craftsmen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen w-full bg-gray-50">
        <div className="flex h-screen">
          {/* Sidebar placeholder (desktop) */}
          <aside className="hidden md:flex w-64 bg-white border-r p-4">
            <div className="font-bold text-lg">Kraftmeister</div>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
