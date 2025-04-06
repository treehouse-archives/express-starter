import { Request, Response } from "express";

const express = require("express");
const path = require("node:path");
const router = express.Router();

router.get(
  ["/", "/index", "/index.html"],
  (request: Request, response: Response) => {
    if (request.accepts("html")) {
      response.render("index");
      return;
    } else if (request.accepts("json")) {
      response.json({ message: "Express Starter Template" });
      return;
    } else {
      response.type("text").send("Welcome to the express-stater API.");
    }
  }
);

export default router;
