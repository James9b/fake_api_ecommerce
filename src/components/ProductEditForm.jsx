import { useState } from 'react'
import { useUpdateProduct, useCategories } from '../hooks/useProducts'
import LoadingSpinner from './LoadingSpinner'

function ProductEditForm({ product, onCancel, onSuccess }) {
    const [formData, setFormData] = useState({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
    })
    const [error, setError] = useState('')

    const updateProduct = useUpdateProduct()
    const { data: categories } = useCategories()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const result = await updateProduct.mutateAsync({
                id: product.id,
                data: formData
            })
            onSuccess({ ...formData, ...result })
        } catch (err) {
            setError('Failed to update product. Please try again.')
            console.error('Update error:', err)
        }
    }

    return (
        <div className="edit-form-container">
            <h2>Edit Product</h2>

            <form onSubmit={handleSubmit} className="edit-form">
                {error && (
                    <div className="error-message">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {error}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price ($)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        {categories?.map((category) => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                        disabled={updateProduct.isPending}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={updateProduct.isPending}
                    >
                        {updateProduct.isPending ? (
                            <>
                                <LoadingSpinner size="small" />
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProductEditForm
