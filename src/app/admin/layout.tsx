// src/app/admin/layout.tsx
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 antialiased">
      {children}
    </div>
  );
}
