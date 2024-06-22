'use client'

import { AddProductForm } from '@/components/form/add-product-form'
import { ProductsTable } from '@/components/products-table'
import { buttonVariants } from '@/components/shadcn-ui/button'
import { Input } from '@/components/shadcn-ui/input'
import { useProducts } from '@/hooks/use-products'
import { Product } from '@/interfaces/product'
import Link from 'next/link'
import { useState } from 'react'

export default function Listagem() {
  const { products } = useProducts()
  const [searchTerm, setSearchTerm] = useState('')

  function filterByName(products: Product[], searchTerm: string) {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  const filteredProducts = filterByName(products, searchTerm)

  const sortedProducts = filteredProducts
    ?.slice()
    .sort((a, b) => a.value - b.value)

  return (
    <>
      <header className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <h1>Produtos</h1>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/" className={buttonVariants({ variant: 'ghost' })}>
            Ver página de cadastro &rarr;
          </Link>
          <AddProductForm asModal />
        </div>
      </header>
      <Input
        type="text"
        placeholder="Buscar produto por nome"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mx-auto w-full max-w-md"
      />
      <ProductsTable products={sortedProducts} />
    </>
  )
}
