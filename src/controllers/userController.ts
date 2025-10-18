// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { HTTP_STATUS } from '../constants/httpStatus';

export const userController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAll();
      res.status(HTTP_STATUS.OK).json(users);
    } catch (e) {
      next(e);
    }
  },

  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getById(parseInt(req.params.id));
      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User not found' });
      }
      res.status(HTTP_STATUS.OK).json(user);
    } catch (e) {
      next(e);
    }
  },

  getUsersByHobby: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { hobbyName } = req.params;
      const users = await userService.getByHobby(hobbyName);
      res.status(HTTP_STATUS.OK).json(users);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, hobbies } = req.body;
      if (!email || !name) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'email and name are required' });
      }
      const saved = await userService.create(email, name, hobbies || []);
      res.status(HTTP_STATUS.CREATED).json(saved);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, hobbies } = req.body;
      const updated = await userService.update(parseInt(req.params.id), email, name, hobbies);
      res.status(HTTP_STATUS.OK).json(updated);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userService.delete(parseInt(req.params.id));
      res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  }
};