function ProductCard({ product, onClick }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price)
    }

    return (
        <article className="product-card" onClick={onClick}>
            <div className="product-image-container">
                <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                    loading="lazy"
                />
                <span className="product-category">{product.category}</span>
            </div>

            <div className="product-info">
                <h3 className="product-title">{product.title}</h3>

                <div className="product-rating">
                    <div className="stars">
                        {[...Array(5)].map((_, index) => (
                            <svg
                                key={index}
                                className={`star ${index < Math.round(product.rating.rate) ? 'filled' : ''}`}
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
                    <span className="rating-count">({product.rating.count})</span>
                </div>

                <div className="product-price">{formatPrice(product.price)}</div>
            </div>
        </article>
    )
}

export default ProductCard
