import "./globals.css";

export const metadata = {
  title: "Simple to do app",
  description: "Simple to do app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
