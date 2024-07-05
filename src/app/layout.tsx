import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Plivo - Vibhor Sharma",
    default: "Home",
  },
  description: "Frontend assignment for Plivo by Vibhor Sharma",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full">
      <body className={`w-full h-full ${inter.className}`}>
        <div className="flex w-full h-full min-h-full overflow-hidden items-stretch">
          <Sidebar />
          <div className="flex flex-col flex-1 min-w-0">
            <main className="flex flex-col flex-auto relative overflow-auto place-items-stretch border rounded-md mr-2 my-2">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
