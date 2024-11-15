import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import { Container, Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import QueryProvider from "./_components/QueryProvider";

const inter = Inter({
  weight: ['400'],
	subsets: ["latin"],
	variable: "--font-inter",
});

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
      <body className={inter.variable}>
        <QueryProvider>
          <Theme
            appearance="dark"
            accentColor="green"
            grayColor="sand"
            radius="small"
            scaling="105%"
          >
            <NavBar />
            <main className="p-5">
              <Container>{children}</Container>
            </main>
          </Theme>
        </QueryProvider>
      </body>
    </html>
  );
}
