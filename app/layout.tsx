import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { NotificationProvider } from "@/context/NotificationContext";
import { Session } from "inspector";
import { TaskProvider } from "@/context/TaskContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iwina",
  description: "Pay your kids for work!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TaskProvider>
        <body className={inter.className}>
          <Provider >
            {children}
          </Provider>
        </body>
      </TaskProvider>
    </html>
  );
}
