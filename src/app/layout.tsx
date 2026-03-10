import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "DecoRent — аренда декора для мероприятий",
  description:
    "Аренда свадебного и праздничного декора: выбирайте позиции в каталоге, оставляйте заявку и мы подтвердим наличие на вашу дату."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}

