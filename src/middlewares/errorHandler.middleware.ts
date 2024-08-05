import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({message: "Internal server error"});
}