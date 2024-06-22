import { ProductsContext } from '@/context/products-context'
import { useContext } from 'react'

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts deve ser usado dentro de um ProductsProvider')
  }
  return context
}
