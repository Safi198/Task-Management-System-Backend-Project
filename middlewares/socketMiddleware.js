const socketIo = require("socket.io");
const logger = require("../config/winston");

const socketMiddleware = (server) => {
    const io = socketIo(server);

    io.on("connection", (socket) => {
        logger.info("New WebSocket connection");

        socket.on("taskUpdated", (task) => {
            io.emit("taskUpdated", task);
            logger.info(`Task updated: ${task.title}`);
        });

        socket.on("disconnect", () => {
            logger.info("WebSocket disconnected");
        });
    });

    return io;
};

module.exports = socketMiddleware;
