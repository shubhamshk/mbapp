// layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer"; // Import the Footer component

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Waste-ease",
    description: "Waste-ease for Simplified your Waste Management",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-white text-black max-w-[400px] min-h-screen m-auto`}>
                {/* Placeholder for Navbar */}
                <div className="bg-[#48348B] p-4 text-white">
                    <h1 className="text-xl font-semibold">Navbar</h1>
                </div>
                {children}
                <Footer /> {/* Add Footer component */}
            </body>
        </html>
    );
}
