import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    fetchProducts,
    fetchProductById,
    fetchCategories,
    updateProduct,
    deleteProduct
} from '../api/products'

export const queryKeys = {
    products: ['products'],
    product: (id) => ['product', id],
    categories: ['categories'],
}

export function useProducts() {
    return useQuery({
        queryKey: queryKeys.products,
        queryFn: fetchProducts,
    })
}
    
export function useProduct(id) {
    return useQuery({
        queryKey: queryKeys.product(id),
        queryFn: () => fetchProductById(id),
        enabled: !!id,
    })
}

export function useCategories() {
    return useQuery({
        queryKey: queryKeys.categories,
        queryFn: fetchCategories,
    })
}

export function useUpdateProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }) => updateProduct(id, data),
        onSuccess: (updatedProduct, { id }) => {
            queryClient.setQueryData(queryKeys.products, (oldProducts) => {
                if (!oldProducts) return oldProducts
                return oldProducts.map((product) =>
                    product.id === id ? { ...product, ...updatedProduct } : product
                )
            })
            queryClient.setQueryData(queryKeys.product(id), (oldProduct) => ({
                ...oldProduct,
                ...updatedProduct,
            }))
        },
    })
}

export function useDeleteProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id) => deleteProduct(id),
        onSuccess: (_, id) => {
            queryClient.setQueryData(queryKeys.products, (oldProducts) => {
                if (!oldProducts) return oldProducts
                return oldProducts.filter((product) => product.id !== id)
            })
            queryClient.removeQueries({ queryKey: queryKeys.product(id) })
        },
    })
}
