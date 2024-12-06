import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/appwrite/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Computed property for isAuthenticated
    const isAuthenticated = !!user;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log('Fetching current user...');
                const currentUser = await authService.getCurrentUser();
                console.log('Current user state:', currentUser);
                setUser(currentUser);
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
            console.log('Attempting login...');
            const user = await authService.login(email, password);
            console.log('Login successful:', user);
            setUser(user);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const signup = async (email, password, name) => {
        try {
            await authService.createAccount(email, password, name);
            navigate('/login'); // Redirect to login page after successful signup
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, signup, loading, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};