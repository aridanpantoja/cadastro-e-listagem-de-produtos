'use client'

import { AddProductForm } from '@/components/form/add-product-form'
import { ProductsTable } from '@/components/products-table'
import { buttonVariants } from '@/components/shadcn-ui/button'
import { useProducts } from '@/hooks/use-products'
import Link from 'next/link'

export default function Cadastro() {
  const { products } = useProducts()

  return (
    <>
      <header className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <h1>Cadastro</h1>
        <Link href="/listagem" className={buttonVariants({ variant: 'ghost' })}>
          Ver lista de produtos &rarr;
        </Link>
      </header>
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
        <AddProductForm />
        <ProductsTable products={products} />
      </div>
    </>
  )
}
