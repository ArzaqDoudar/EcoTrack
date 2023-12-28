import { Server } from 'socket.io';
import http from 'http';

// Create an HTTP server and attach the WebSocket server to it
const server = http.createServer(app);
const io = new Server(server);

// Function to send a message to users with similar interests
export const sendMessageToSimilarUsers = async (similarUsers, message) => {
    try {
        similarUsers.forEach(user => {
            // Emit a message event to the user's socket
            io.to(user.socketId).emit('newDataNotification', message);
        });
    } catch (error) {
        console.error('Error sending message to similar users:', error);
        throw error;
    }
};
