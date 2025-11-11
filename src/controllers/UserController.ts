import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { UserService } from '../services/UserService';
import { SERVICES } from '../common/constants/services';
import { Logger } from '@map-colonies/js-logger';
import { OK, CREATED, NO_CONTENT } from '../common/constants/httpStatus';

@injectable()
export class UserController {
  constructor(
    @inject(SERVICES.USER_SERVICE) private userService: UserService,
    @inject(SERVICES.LOGGER) private logger: Logger
  ) {}

  getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(OK).json(users);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.getUserById(id);
      res.status(OK).json(user);
    } catch (error) {
      next(error);
    }
  };

  getUsersByHobby = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const hobby = req.params.hobbyName;
      const users = await this.userService.getUsersByHobby(hobby);
      res.status(OK).json(users);
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(CREATED).json(user);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.updateUser(id, req.body);
      res.status(OK).json(user);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      await this.userService.deleteUser(id);
      res.status(NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  };
}
