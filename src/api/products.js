const BASE_URL = 'https://fakestoreapi.com'

export async function fetchProducts() {
    const response = await fetch(`${BASE_URL}/products`)
    if (!response.ok) {
        throw new Error('Failed to fetch products')
    }
    return response.json()
}

export async function fetchProductById(id) {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch product')
    }
    return response.json()
}

export async function fetchCategories() {
    const response = await fetch(`${BASE_URL}/products/categories`)
    if (!response.ok) {
        throw new Error('Failed to fetch categories')
    }
    return response.json()
}

export async function updateProduct(id, data) {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        throw new Error('Failed to update product')
    }
    return response.json()
}

export async function deleteProduct(id) {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        throw new Error('Failed to delete product')
    }
    return response.json()
}
