import { useState, useMemo } from 'react'
import { useProducts, useCategories } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import ProductDetail from '../components/ProductDetail'
import LoadingSpinner from '../components/LoadingSpinner'

function ProductsPage() {
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 10

    const { data: products, isLoading, error, refetch } = useProducts()
    const { data: categories } = useCategories()

    // Filter products based on search and category
    const filteredProducts = useMemo(() => {
        if (!products) return []

        return products.filter((product) => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            const matchesCategory = !selectedCategory || product.category === selectedCategory
            return matchesSearch && matchesCategory
        })
    }, [products, searchQuery, selectedCategory])

    // Paginate products
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * productsPerPage
        return filteredProducts.slice(startIndex, startIndex + productsPerPage)
    }, [filteredProducts, currentPage])

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    // Reset to first page when filters change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
        setCurrentPage(1)
    }

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
        setCurrentPage(1)
    }

    const handleProductClick = (product) => {
        setSelectedProduct(product)
    }

    const handleCloseDetail = () => {
        setSelectedProduct(null)
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-content">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h2>Oops! Something went wrong</h2>
                    <p>We couldn't load the products. Please try again.</p>
                    <button onClick={() => refetch()} className="retry-button">
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="products-page">
            <div className="products-header">
                <h1>All Products</h1>
                <p className="products-count">
                    {isLoading ? 'Loading...' : `${filteredProducts.length} products found`}
                </p>
            </div>

            <div className="filters-container">
                <div className="search-container">
                    <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>

                <div className="category-filter">
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="category-select"
                    >
                        <option value="">All Categories</option>
                        {categories?.map((category) => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {isLoading ? (
                <div className="loading-container">
                    <LoadingSpinner />
                    <p>Loading products...</p>
                </div>
            ) : (
                <>
                    <div className="products-grid">
                        {paginatedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => handleProductClick(product)}
                            />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="empty-state">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 9L15 15M15 9L9 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h3>No products found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="pagination-button"
                            >
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Previous
                            </button>

                            <div className="pagination-info">
                                <span>Page {currentPage} of {totalPages}</span>
                            </div>

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="pagination-button"
                            >
                                Next
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    )}
                </>
            )}

            {selectedProduct && (
                <ProductDetail
                    product={selectedProduct}
                    onClose={handleCloseDetail}
                />
            )}
        </div>
    )
}

export default ProductsPage
