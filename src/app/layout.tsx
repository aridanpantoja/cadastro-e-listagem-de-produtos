import { Footer } from '@/components/footer'
import { ProductsProvider } from '@/context/products-context'
import { openSans } from '@/fonts/openSans'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cadastro e Listagem de Produtos',
  description: 'Cadastro e listagem de produtos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" className="h-full">
      <body className={cn('antialiased', openSans.className)}>
        <ProductsProvider>
          <div className="flex min-h-screen flex-col bg-muted/40">
            <main className="mx-auto w-full max-w-screen-xl flex-1 flex-grow px-2.5 py-20 md:px-20">
              <div className="space-y-8">{children}</div>
            </main>
            <Footer />
          </div>
        </ProductsProvider>
      </body>
    </html>
  )
}
