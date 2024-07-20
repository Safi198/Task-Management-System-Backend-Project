const app = require("./app");
const socketMiddleware = require("./middlewares/socketMiddleware");
const logger = require("./config/winston");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

socketMiddleware(server);
