import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://my-skin-edit-jp.hidepi.chatgpt.site"),
  title: "MY SKIN EDIT｜大人のコスメ比較",
  description: "日焼け止めとスキンケアを、公式情報で見比べる美容比較メディア。",
  openGraph: {
    title: "MY SKIN EDIT｜大人のコスメ比較",
    description: "公式情報を基準に、敏感肌向け化粧水や日焼け止めを見比べる美容比較メディア。",
    type: "website",
    images: ["/assets/og-sensitive-lotion.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MY SKIN EDIT｜大人のコスメ比較",
    description: "敏感肌向け化粧水5商品を、公式情報から比較。",
    images: ["/assets/og-sensitive-lotion.png"],
  },
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
