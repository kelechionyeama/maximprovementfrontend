import { API_URL } from "@/config";

export const chatApi = {
    async sendMessage(message: string): Promise<string> {
        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Error in chatApi.sendMessage:', error);
            throw error;
        }
    }
}; 