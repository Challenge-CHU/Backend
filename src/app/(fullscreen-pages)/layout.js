import { Inter } from "next/font/google";
import "../globals.css";
import { Theme } from "react-daisyui";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Connexion",
    description: "Page de connexion",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="mytheme">
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />

            <body
                className={
                    inter.className +
                    " bg-primary h-screen flex flex-col items-center justify-center px-2 md:p-24"
                }
            >
                {children}
            </body>
        </html>
    );
}
