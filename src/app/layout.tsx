import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Companion Universe - International Fictional Platform',
  description: 'Immersive fictional roleplay with international characters (USA, Japanese, Korean, Russian). 25 free messages daily. Crypto-friendly subscription options coming soon.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#101014] text-[#F8FAFC] antialiased min-h-screen font-sans">
        {children}
      </body>
    </html>
  )
}
