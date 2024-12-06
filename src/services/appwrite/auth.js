import { account } from './config';
import { ID } from 'appwrite';

class AuthService {
    generateValidUserId() {
        return ID.unique();
    }

    async createAccount(email, password, name) {
        try {
            const userId = this.generateValidUserId();
            console.log('Creating account with userId:', userId);
            
            const response = await account.create(
                userId,
                email,
                password,
                name
            );
            
            return response;
        } catch (error) {
            console.error('Account creation error:', error);
            if (error.code === 400) {
                throw new Error('Invalid email or password format');
            }
            throw error;
        }
    }

    async login(email, password) {
        try {
            console.log('Attempting login with email/password...');
        
            const session = await account.createEmailPasswordSession(
                email,
                password
            );
            console.log('Session created:', session);
            
            const user = await this.getCurrentUser();
            console.log('User details:', user);
            
            return user;
        } catch (error) {
            console.error('Login error:', error);
            if (error.code === 401) {
                throw new Error('Invalid email or password');
            } else if (error.code === 429) {
                throw new Error('Too many attempts. Please try again later');
            }
            throw new Error('Login failed. Please try again');
        }
    }

    async getCurrentUser() {
        try {
            const user = await account.get();
            return user;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    async logout() {
        try {
            await account.deleteSession('current');
            return true;
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    async isLoggedIn() {
        try {
            const user = await this.getCurrentUser();
            return !!user;
        } catch {
            return false;
        }
    }
}

const authService = new AuthService();
export default authService;