import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import ProductsPage from './pages/ProductsPage'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'

function App() {
    const { isLoggedIn } = useAuth()

    return (
        <div className="app">
            {isLoggedIn && <Header />}
            <main className="main-content">
                <Routes>
                    <Route
                        path="/login"
                        element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
                    />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <ProductsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
