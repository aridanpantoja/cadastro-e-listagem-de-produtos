'use client'

import { Button } from '@/components/shadcn-ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog'
import { useProducts } from '@/hooks/use-products'
import { Trash } from 'lucide-react'
import { useState } from 'react'

export function RemoveProductButton({ id }: { id: string }) {
  const { removeProduct } = useProducts()
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-5 top-1/2 -translate-y-1/2"
        >
          <Trash className="text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-6">
          <h2>Remover produto</h2>
          <p>
            Esta ação não pode ser desfeita, você tem certeza que deseja
            continuar?
          </p>
          <div className="flex gap-4">
            <Button
              className="w-full"
              variant="destructive"
              onClick={() => removeProduct(id)}
            >
              Remover
            </Button>

            <Button
              className="w-full"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
