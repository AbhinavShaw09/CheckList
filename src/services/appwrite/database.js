import { databases, DATABASE_ID, COLLECTION_ID, account } from './config';
import { ID, Query} from 'appwrite';

class DatabaseService {
    async ensureAuthenticated() {
        try {
            const currentUser = await account.get();
            if (!currentUser) {
                throw new Error('User not authenticated');
            }
            return currentUser;
        } catch (error) {
            console.error('Authentication check failed:', error);
            throw new Error('Session expired. Please log in again.');
        }
    }


    generateShortId(longId) {
        return longId.substring(0, 5);
    }

    async createTodo(text) {
        try {
            const currentUser = await this.ensureAuthenticated();
            const shortUserId = this.generateShortId(currentUser.$id);
            
            const result = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    userId: shortUserId,
                    text: text.substring(0, 100), 
                    completed: false,
                    createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ') 
                }
            );
            
            return result;
        } catch (error) {
            console.error('Error creating todo:', error);
            if (error.code === 400) {
                const errorMessage = error.message;
                if (errorMessage.includes('userId')) {
                    throw new Error('Invalid user ID format');
                } else if (errorMessage.includes('createdAt')) {
                    throw new Error('Invalid date format');
                } else if (errorMessage.includes('text')) {
                    throw new Error('Text is too long');
                }
            }
            throw error;
        }
    }

    async listTodos() {
        try {
            const currentUser = await this.ensureAuthenticated();
            const shortUserId = this.generateShortId(currentUser.$id);

            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [
                    Query.equal('userId', shortUserId),
                    Query.orderDesc('createdAt'),
                ]
            );
            
            return response.documents;
        } catch (error) {
            console.error('Error listing todos:', error);
            throw error;
        }
    }

    async updateTodo(todoId, data) {
        try {
            await this.ensureAuthenticated();

            const result = await databases.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                todoId,
                data
            );
            
            return result;
        } catch (error) {
            console.error('Error updating todo:', error);
            throw error;
        }
    }

    async deleteTodo(todoId) {
        try {
            await this.ensureAuthenticated();

            const result = await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                todoId
            );
            
            return result;
        } catch (error) {
            console.error('Error deleting todo:', error);
            throw error;
        }
    }
}

const databaseService = new DatabaseService();
export default databaseService;