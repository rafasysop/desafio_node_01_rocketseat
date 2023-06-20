import http from "node:http";
import { routes } from "./routes.js";
import { generate } from "csv-generate";
import { parse } from "csv-parse";

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
      try {
        req.body = [];
        const parser = parse(body, {
          trim: true,
          skip_empty_lines: true,
        });

        for await (const record of parser) {
          const title = record[0];
          const description = record[1];
          req.body.push({ title, description });
        }
        // while ((record = this.read()) !== null) {
        //   const title = record[0];
        //   const description = record[1];
        //   importedCSV.push({ title, description });
        // }
        // })
        // .on("end", function () {
        //   console.log("a");
        //   req.body = { importedCSV };
        // });
      } catch (error) {
        console.log("erro parse");
      }
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
