import { NextApiRequest, NextApiResponse } from "next";
import ErrorHandler from "../utils/errorHandler";

interface CustomError extends Error {
  statusCode?: number;
  errors?: Record<string, any>;
}

export default (err: unknown, req: NextApiRequest, res: NextApiResponse) => {
  let error = err as Error; // Fallback to a general Error if necessary

  // Type guard to handle CustomError
  if (error instanceof Error) {
    const customError = error as CustomError;
    const statusCode = customError.statusCode ?? 500;
    const message = customError.message ?? "Internal Server Error";
    if (customError.name === "ValidationError" && customError.errors) {
      const message = Object.values(customError.errors)
        .map((value: any) => value.message)
        .join(", ");
      error = new ErrorHandler(message, 400);
    }
    return res.status(statusCode).json({
      success: false,
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    });
  }
  // Fallback for unknown errors
  res.status(500).json({
    success: false,
    error: {
      message: "An unknown error occurred",
      stack:
        process.env.NODE_ENV === "production" ? null : (error as Error).stack,
    },
  });
};
