import express, { Express, Request, Response, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import Cards from "./Schema/Cards";

const app: Express = express();
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose
  .connect(
    process.env.DATABASE_URL,
  )
  .then(() => {
    console.log("🟢 DB Connected");
    app.listen({ port: process.env.PORT }, () => {
      console.log(`🏃‍♂️ Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("🔴 There was an error on the DB connection method.");
    console.log(err);
  });

// Routes

  app.get("/", (_req, res) => res.status(200).send("Hello World!"));

  app.post("/dating/cards", (req: Request, res: Response) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err: ErrorRequestHandler, data: String) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  });
  
  app.get("/dating/cards", (_req: Request, res: Response) => {
    Cards.find((err: ErrorRequestHandler, data: String) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  });
