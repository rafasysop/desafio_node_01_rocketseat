import { buildRoutePath } from "./utils/buildRoutePath.js";

const tasks = [
  {
    id: 1,
    title: "Começar o Desafio Node",
    description: "Desafio em node da rocketseat.",
    completed_at: "2023-06-14",
    created_at: "2023-06-13",
    updated_at: "2023-06-14",
  },
];

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      if (!req?.body) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ error: "A task in body is required!" })
        );
      }

      if (req.body?.length > 1) {
        req.body.forEach((item) => {
          const newTask = {
            id: tasks.length + 1,
            title: item.title,
            description: item.description,
            completed_at: null,
            created_at: new Date(),
            updated_at: null,
          };

          tasks.push(newTask);
        });
        res.writeHead(201, { "Content-Type": "application/json" });

        return res.end(JSON.stringify({ msg: "created", tasks }));
      }

      if (!req?.body?.title) {
        res.writeHead(400, { "Content-Type": "application/json" });

        return res.end(JSON.stringify({ error: "title is required" }));
      }

      if (!req?.body?.description) {
        res.writeHead(400, { "Content-Type": "application/json" });

        return res.end(JSON.stringify({ error: "description is required" }));
      }

      const newTask = {
        id: tasks.length + 1,
        ...req.body,
        completed_at: null,
        created_at: new Date(),
        updated_at: null,
      };

      tasks.push(newTask);

      res.writeHead(201, { "Content-Type": "application/json" });

      return res.end(JSON.stringify({ msg: "created", id: newTask?.id }));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/task/:id"),
    handler: (req, res) => {
      const findIndexTask = tasks.findIndex(
        (task) => task?.id === +req?.params?.id
      );

      if (findIndexTask === -1) {
        res.writeHead(400, { "Content-Type": "application/json" });

        return res.end(JSON.stringify({ msg: "Not exists this task" }));
      }

      if (!req?.body?.title) {
        res.writeHead(400, { "Content-Type": "application/json" });

        return res.end(JSON.stringify({ error: "title is required" }));
      }

      if (!req?.body?.description) {
        res.writeHead(400, { "Content-Type": "application/json" });

        return res.end(JSON.stringify({ error: "description is required" }));
      }

      const editedTask = {
        ...tasks[findIndexTask],
        ...req?.body,
        updated_at: new Date(),
      };

      tasks.splice(findIndexTask, 1, editedTask);
      return res.end(JSON.stringify({ msg: "updated" }));
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/task/:id/complete"),
    handler: (req, res) => {
      const findIndexTask = tasks.findIndex(
        (task) => task?.id === +req?.params?.id
      );

      if (findIndexTask === -1) {
        res.writeHead(400, { "Content-Type": "application/json" });

        return res.end(JSON.stringify({ msg: "Not exists this task" }));
      }

      const editedTask = {
        ...tasks[findIndexTask],
        updated_at: new Date(),
        completed_at: new Date(),
      };

      tasks.splice(findIndexTask, 1, editedTask);
      return res.end(JSON.stringify({ msg: "updated" }));
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/task/:id"),
    handler(req, res) {
      const findIndexTask = tasks.findIndex(
        (task) => task?.id === +req?.params?.id
      );

      if (findIndexTask !== -1) {
        tasks.splice(findIndexTask, 1);
        return res.end(JSON.stringify({ msg: "deleted" }));
      }
      res.writeHead(400, { "Content-Type": "application/json" });

      return res.end(JSON.stringify({ msg: "Not exists this task" }));
    },
  },
];
