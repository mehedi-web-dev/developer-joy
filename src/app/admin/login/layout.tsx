export default function LoginLayout({ children }: { children: React.ReactNode }) {
  // No auth check – public login page
  return <>{children}</>;
}
