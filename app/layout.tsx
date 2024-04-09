import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import "react-toastify/dist/ReactToastify.css";
import { TaskProvider } from "@/context/TaskContext";
import { Knock } from "@knocklabs/node";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iwina",
  description: "Pay your kids for work!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  // const knockClient = new Knock("sk_test_-qFDqPZTV0Hi1FeA5U0ZICkqgkOljy2hNNs4e_1nrcQ")
  // const knockUser = await knockClient.users.identify()
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
