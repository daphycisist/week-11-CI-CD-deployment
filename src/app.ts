import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction, request } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import schema from "./controllers/grahqlControllers";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// interface authreq extends Request{
//   email: email
// }
app.use(
  "/graphql1",
  graphqlHTTP({
    // context: UserAuth(req),
    schema: schema,
    graphiql: true,
  })
);

mongoose
  .connect(
    "mongodb+srv://Precymoi1:Precymoi1@cluster0.sma5q.mongodb.net/OrganizationTask?retryWrites=true&w=majority",
    {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("could not connect", err));

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});
export default app;
