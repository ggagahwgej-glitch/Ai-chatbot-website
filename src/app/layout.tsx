import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Companion Universe',
  description: 'Your Stories. Your Characters. Your World.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text antialiased min-h-screen font-sans">
        {children}
      </body>
    </html>
  )
}
