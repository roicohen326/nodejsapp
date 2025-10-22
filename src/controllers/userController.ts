import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { OK, CREATED, NO_CONTENT } from '../constants/httpStatus';

export const userController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAll();
      res.status(OK).json(users);
    } catch (e) {
      next(e);
    }
  },

  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getById(parseInt(req.params.id));
      res.status(OK).json(user);
    } catch (e) {
      next(e);
    }
  },

  getUsersByHobby: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { hobbyName } = req.params;
      const users = await userService.getByHobby(hobbyName);
      res.status(OK).json(users);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, hobbies } = req.body;
      const saved = await userService.create(email, name, hobbies || []);
      res.status(CREATED).json(saved);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, hobbies } = req.body;
      const updated = await userService.update(parseInt(req.params.id), email, name, hobbies);
      res.status(OK).json(updated);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userService.delete(parseInt(req.params.id));
      res.status(NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  }
};