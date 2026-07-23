import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MY SKIN EDIT｜大人のコスメ比較",
  description: "日焼け止めとスキンケアを、公式情報で見比べる美容比較メディア。",
  icons: {
    icon: "/assets/mse-avatar.png",
    shortcut: "/assets/mse-avatar.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta
          name="p:domain_verify"
          content="cf534d6b564051d72e59186b71d7b6d0"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
