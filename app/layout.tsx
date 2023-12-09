export const metadata = {
  title: 'Typeometer',
  description: 'A program that measures your typing speed and accuracy.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
