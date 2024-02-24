import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css";
export const revalidate = 10
export const metadata: Metadata = {
  title: "Photo Gallary",
  description: "Gallary of wide collection of photo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" sizes="any" />
      </head>
      <body>
        <Navbar />
        <main className="max-w-6xl  mx-auto">

          <>
            {children}
          </>

        </main>


      </body>
    </html>
  );
}
