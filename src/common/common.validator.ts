import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

const validateDto =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(error.issues);
      } else {
        res.status(500).json(error);
      }
    }
  };

export { validateDto };
