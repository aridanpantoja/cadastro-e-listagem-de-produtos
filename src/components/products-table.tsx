'use client'

import { Checkbox } from '@/components/shadcn-ui/checkbox'
import { Product } from '@/interfaces/product'
import { RemoveProductButton } from './remove-product-button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './shadcn-ui/table'

export function ProductsTable({ products }: { products: Product[] }) {
  return (
    <div className="w-full overflow-hidden rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead className="w-full">Descrição</TableHead>
            <TableHead>Disponível</TableHead>
            <TableHead className="text-right">Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="relative">
          {products?.map((product) => (
            <TableRow key={product.id} className="relative">
              <TableCell>{product.name}</TableCell>
              <TableCell>R${product.value.toFixed(2)}</TableCell>
              <TableCell className="w-full">{product.description}</TableCell>
              <TableCell>
                <Checkbox
                  checked={product.available}
                  className="h-5 w-5 translate-x-6"
                  disabled
                />
              </TableCell>
              <TableCell>
                <RemoveProductButton id={product.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
