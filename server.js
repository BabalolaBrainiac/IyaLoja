const http = require("http");
const app = require("./app");
const config = require('./config')
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);




server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
