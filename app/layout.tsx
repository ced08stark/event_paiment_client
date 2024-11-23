import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

// Importation des polices locales
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Paiement Mobile",
  description:
    "Simplifiez vos paiements avec une interface intuitive et élégante.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-100 via-blue-50 to-blue-100`}
      >
        <div className="relative min-h-screen flex flex-col">
          {/* Animation en arrière-plan */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="animate-[float_10s_infinite] w-[600px] h-[600px] bg-blue-300/40 blur-3xl rounded-full absolute top-1/3 left-1/4 transform translate-x-[-50%] translate-y-[-50%]"></div>
            <div className="animate-[float_12s_infinite] w-[400px] h-[400px] bg-purple-300/40 blur-3xl rounded-full absolute bottom-1/4 right-1/3 transform translate-x-[50%] translate-y-[50%]"></div>
          </div>

          {/* En-tête de la page */}
          <header className="bg-white/90 backdrop-blur-md shadow-sm py-4 px-6">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-blue-700">
                Paiement Mobile
              </h1>
              <p className="text-sm text-gray-600">Sécurisé et rapide</p>
            </div>
          </header>

          {/* Contenu principal */}
          <main className="flex-grow container mx-auto py-8 px-4">
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 space-y-4">
                <h2 className="text-lg font-bold text-gray-800 text-center">
                  Processus de Paiement
                </h2>
                <p className="text-sm text-gray-500 text-center">
                  Veuillez entrer vos informations pour compléter votre paiement
                  en toute sécurité.
                </p>
              </div>
              <div className="px-6 py-4 bg-blue-50">{children}</div>
              <Toaster />
            </div>
          </main>

          {/* Pied de page */}
          <footer className="bg-blue-800 text-white py-4">
            <div className="container mx-auto text-center text-sm">
              © 2024 Paiement Mobile | Tous droits réservés.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
