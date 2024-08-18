import type { Metadata } from "next";
import { Inter, Josefin_Slab, M_PLUS_1 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });
const josefin = Josefin_Slab({ subsets: ["latin"] });
const mplus1 = M_PLUS_1({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vincent van Noord",
  description: "Portfolio website van Vincent van Noord",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " min-h-dvh bg-background w-full flex justify-center"}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
