import { container, injectable } from "tsyringe";
import { AuthServices } from "../services/auth.service";
import { Request, Response } from "express";

@injectable()
export class AuthController {
  // constructor(@inject(AuthServices) private authService: AuthServices) {};

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const authService = container.resolve(AuthServices);
      const token = await authService.login(email, password);
      if (token) {
        res.status(200).json({
          status: 200,
          message: "Login successful",
          token,
        });
      } else {
        res.status(401).json({
          status: 401,
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
}
