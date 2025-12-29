import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const VALID_CREDENTIALS = {
    username: 'user',
    password: 'password'
}

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const stored = sessionStorage.getItem('isLoggedIn')
        return stored === 'true'
    })
    const [user, setUser] = useState(() => {
        const stored = sessionStorage.getItem('user')
        return stored ? JSON.parse(stored) : null
    })

    useEffect(() => {
        sessionStorage.setItem('isLoggedIn', isLoggedIn)
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user))
        } else {
            sessionStorage.removeItem('user')
        }
    }, [isLoggedIn, user])

    const login = (username, password) => {
        if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
            setIsLoggedIn(true)
            setUser({ username })
            return { success: true }
        }
        return { success: false, error: 'Invalid username or password' }
    }

    const logout = () => {
        setIsLoggedIn(false)
        setUser(null)
        sessionStorage.removeItem('isLoggedIn')
        sessionStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
