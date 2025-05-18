import { Request, Response, NextFunction, RequestHandler } from 'express'
import { AnyZodObject } from 'zod'

export const validate =
  (schema: AnyZodObject): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })

      return next()
    } catch (error) {
      // res.status(400).json(MESSAGE.error.validation)
      res.status(400).json(error)
    }
  }
