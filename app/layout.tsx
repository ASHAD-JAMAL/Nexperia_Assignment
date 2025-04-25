import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-locator-target="vscode">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <header className="bg-white shadow-sm py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-900">WKND</span>
              </div>
              <nav className="flex space-x-8">
                <a
                  href="/"
                  className="text-gray-900 hover:text-blue-600 font-medium"
                >
                  Home
                </a>
                <a href="/blog" className="text-blue-600 font-medium">
                  Blog
                </a>
                <a
                  href="/about"
                  className="text-gray-900 hover:text-blue-600 font-medium"
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="text-gray-900 hover:text-blue-600 font-medium"
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-white border-t mt-12 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} WKND. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

export const metadata = {
  generator: "v0.dev",
};
