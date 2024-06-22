'use client'

import { ReactNode, createContext, useEffect, useState } from 'react'
import { Product } from '../interfaces/product'

type ProductsContextType = {
  products: Product[]
  addProduct: (product: Product) => void
  removeProduct: (productId: string) => void
}

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const storedProducts = localStorage.getItem('products')
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    }
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products))
    } else {
      localStorage.removeItem('products')
    }
  }, [products])

  function addProduct(newProduct: Product) {
    setProducts((prevProducts) => [...prevProducts, newProduct])
  }

  const removeProduct = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId),
    )
  }

  return (
    <ProductsContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}
