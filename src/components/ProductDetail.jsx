import { useState } from 'react'
import { useDeleteProduct } from '../hooks/useProducts'
import ProductEditForm from './ProductEditForm'
import ConfirmModal from './ConfirmModal'
import LoadingSpinner from './LoadingSpinner'

function ProductDetail({ product, onClose }) {
    const [isEditing, setIsEditing] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [localProduct, setLocalProduct] = useState(product)

    const deleteProduct = useDeleteProduct()

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price)
    }

    const handleDelete = async () => {
        try {
            await deleteProduct.mutateAsync(localProduct.id)
            onClose()
        } catch (error) {
            console.error('Failed to delete product:', error)
        }
    }

    const handleUpdateSuccess = (updatedProduct) => {
        setLocalProduct(prev => ({ ...prev, ...updatedProduct }))
        setIsEditing(false)
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div className="modal-overlay" onClick={handleBackdropClick}>
            <div className="modal-content product-detail-modal">
                <button className="modal-close" onClick={onClose}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {isEditing ? (
                    <ProductEditForm
                        product={localProduct}
                        onCancel={() => setIsEditing(false)}
                        onSuccess={handleUpdateSuccess}
                    />
                ) : (
                    <>
                        <div className="product-detail-container">
                            <div className="product-detail-image">
                                <img src={localProduct.image} alt={localProduct.title} />
                            </div>

                            <div className="product-detail-info">
                                <span className="product-detail-category">
                                    {localProduct.category}
                                </span>

                                <h2 className="product-detail-title">{localProduct.title}</h2>

                                <div className="product-detail-rating">
                                    <div className="stars">
                                        {[...Array(5)].map((_, index) => (
                                            <svg
                                                key={index}
                                                className={`star ${index < Math.round(localProduct.rating.rate) ? 'filled' : ''}`}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                                                    fill="currentColor"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="rating-text">
                                        {localProduct.rating.rate} out of 5 ({localProduct.rating.count} reviews)
                                    </span>
                                </div>

                                <div className="product-detail-price">
                                    {formatPrice(localProduct.price)}
                                </div>

                                <div className="product-detail-description">
                                    <h3>Description</h3>
                                    <p>{localProduct.description}</p>
                                </div>

                                <div className="product-detail-actions">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Edit Product
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => setShowDeleteConfirm(true)}
                                        disabled={deleteProduct.isPending}
                                    >
                                        {deleteProduct.isPending ? (
                                            <LoadingSpinner size="small" />
                                        ) : (
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                        Delete Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {showDeleteConfirm && (
                    <ConfirmModal
                        title="Delete Product"
                        message={`Are you sure you want to delete "${localProduct.title}"? This action cannot be undone.`}
                        confirmText="Delete"
                        cancelText="Cancel"
                        onConfirm={handleDelete}
                        onCancel={() => setShowDeleteConfirm(false)}
                        isLoading={deleteProduct.isPending}
                        variant="danger"
                    />
                )}
            </div>
        </div>
    )
}

export default ProductDetail
