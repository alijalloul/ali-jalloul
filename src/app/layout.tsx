import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import Nav from "@/components/Nav";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />

          <div className="flex-1 flex justify-center items-center ">
            <div className="w-[90%] h-full flex justify-between items-center border">
              <Nav className="w-1/3" />

              {children}
            </div>
          </div>
        </div>

        <Footer />
      </body>
    </html>
  );
}
