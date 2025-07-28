import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
export const metadata: Metadata = {
  title: {
    default: "ShopCart online Store",
    template: "%s | ShopCart Ecommerce",
  },
  description: "The best ecommerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <div className="flex flex-col min-h-screen px-0 md:px-1 ">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </ClerkProvider>
  );
}
