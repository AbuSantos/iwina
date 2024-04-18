import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import "react-toastify/dist/ReactToastify.css";
import { TaskProvider } from "@/context/TaskContext";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "iwina",
  description: "Pay your kids for work!",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {


  return (
    <html lang="en">
      <TaskProvider>
        <body className={inter.className}>
          {/* //@ts-ignore */}
          <Provider >
            {children}
          </Provider>
        </body>
      </TaskProvider>
    </html>
  );
}
