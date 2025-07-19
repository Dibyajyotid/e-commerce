import express from "express";

const server = express();

const PORT = 2222;

server.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
