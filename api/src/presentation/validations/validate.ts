import { MESSAGE } from '@/shared/constants/message'
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
    } catch {
      res.status(400).json(MESSAGE.error.validation)
    }
  }
