'use client'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn-ui/form'
import { Input } from '@/components/shadcn-ui/input'
import { useProducts } from '@/hooks/use-products'
import { Product } from '@/interfaces/product'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useState } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { Button } from '../shadcn-ui/button'
import { Checkbox } from '../shadcn-ui/checkbox'
import { Textarea } from '../shadcn-ui/textarea'

const addProductFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter ao máximo 50 caracteres'),
  description: z
    .string()
    .min(2, 'Descrição deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter ao máximo 100 caracteres'),
  value: z.coerce.number().gt(0, 'Valor deve ser acima de zero'),
  available: z.boolean(),
})

export type addProductFormData = z.infer<typeof addProductFormSchema>

function CommonForm({
  form,
  submitForm,
  setOpen,
  asModal,
}: {
  form: UseFormReturn<addProductFormData>
  submitForm: (data: addProductFormData) => void
  setOpen: Dispatch<SetStateAction<boolean>>
  asModal?: boolean
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitForm)}
        className={cn(
          'w-full max-w-md space-y-4 p-6',
          asModal ? '' : 'rounded-lg border bg-background',
        )}
      >
        <h2>Adicionar produto</h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome do produto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Digite a descrição do produto"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o valor do produto"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Disponível para venda</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
          onClick={() => setOpen(false)}
        >
          Adicionar
        </Button>
      </form>
    </Form>
  )
}

export function AddProductForm({ asModal = false }: { asModal?: boolean }) {
  const { addProduct } = useProducts()
  const [open, setOpen] = useState(false)

  const form = useForm<addProductFormData>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: '',
      description: '',
      value: 0,
      available: false,
    },
  })

  function submitForm(data: addProductFormData) {
    const newProduct: Product = {
      ...data,
      id: uuidv4(),
    }
    addProduct(newProduct)
    form.reset()
  }

  if (asModal) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Adicionar produto</Button>
        </DialogTrigger>
        <DialogContent>
          <CommonForm
            form={form}
            submitForm={submitForm}
            setOpen={setOpen}
            asModal
          />
        </DialogContent>
      </Dialog>
    )
  }

  return <CommonForm form={form} submitForm={submitForm} setOpen={setOpen} />
}
