// src/app/layout.tsx

import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Saurav Singh | Cloud Engineer & DevOps Specialist',
  description: 'Cloud Engineer with expertise in AWS, GCP, Azure, and OCI. Specialist in DevOps, Terraform, and infrastructure automation.',
  keywords: 'Saurav Singh, Cloud Engineer, DevOps, AWS, GCP, Azure, Terraform, Kubernetes, Infrastructure as Code',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}