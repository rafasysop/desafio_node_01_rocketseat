import http from "node:http";
import { routes } from "./routes.js";
import { log } from "node:console";

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const body = Buffer.concat(buffers).toString();

  if (body) {
    try {
      req.body = JSON.parse(body);
    } catch (error) {
      console.log("erro no body");
    }
  }

  const route = routes?.find(
    (route) => route?.path.test(req?.url) && route?.method === req?.method
  );

  if (route) {
    const routeParams = req.url.match(route?.path);
    req.params = { ...routeParams?.groups };

    return route?.handler(req, res);
  }
  return res.end(JSON.stringify({ msg: "hello" }));
});

server.listen(3333);
