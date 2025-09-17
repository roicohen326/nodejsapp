import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/users';

export const userController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAll();
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  },

  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getById(parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name } = req.body;
      if (!email || !name) {
        return res.status(400).json({ error: 'email and name are required' });
      }
      const saved = await userService.create(email, name);
      res.status(201).json(saved);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name } = req.body;
      const updated = await userService.update(parseInt(req.params.id), email, name);
      res.status(200).json(updated);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userService.delete(parseInt(req.params.id));
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
};
