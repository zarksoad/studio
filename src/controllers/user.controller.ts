import { NextFunction, Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { UserService } from "../services/user.service";

@injectable()
export class UserController {
  static async getAllUsers(_: Request, res: Response): Promise<void> {
    try {
      const userService = container.resolve(UserService);
      const users = await userService.getAllUsers();
      if (!users) {
        res.status(404).json({ message: "No users found" });
      }
      res.status(200).json({
        status: 200,
        data: users,
        message: "Users retrieved successfully.",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while retrieving users." });
    }
  }

  static async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const userService = container.resolve(UserService);
      const user = await userService.getUserById(parseInt(id));
      if (!user) {
        res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        status: 200,
        data: user,
        message: "User retrieved successfully.",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while retrieving user." });
    }
  }

  static async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const userService = container.resolve(UserService);
      const user = await userService.createUser({ email, password });
      res.status(201).json({
        status: 201,
        data: user,
        message: "User created successfully.",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async deleteUser(req: Request, res: Response,next:NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userService = container.resolve(UserService);
      await userService.deleteUser(parseInt(id));
      res.status(204).json({
        status: 204,
        message: "User deleted successfully.",
      });
    } catch (error) {
      console.error(error);
        next(error)
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { email, password } = req.body;
      const userService = container.resolve(UserService);
      await userService.updateUser(parseInt(id), { email, password });
      res.status(200).json({
        status: 200,
        message: "User updated successfully.",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while updating user." });
    }
  }

  static async getProductByUSer(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      console.log("ID:", id);
      const userService = container.resolve(UserService);
      const products = await userService.getProductsByUser(parseInt(id));
      res.status(200).json({
        status: 200,
        data: products,
        message: "Products retrieved successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        res.status(500).json({ message: ".Error in get products by user." });
      }
    }
  }

  // static async findByEmail(req: Request, res: Response): Promise<void> {
  //   const email = req.body.email;
  //   const emailService = container.resolve(UserService);
  //   const user = await emailService.findByEmail(email);
  //   res.status(200).json({
  //     status: 200,
  //     data: user,
  //     message: "User found successfully.",
  //   });
  // };
}
