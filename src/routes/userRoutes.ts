import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/UserController';
import { validateRequest } from '../middleware/validateRequest';
import { requestLogger } from '../middleware/requestLogger';
import { createUserSchema, updateUserSchema } from '../validators/userSchema';

const router = Router();

router.use(requestLogger);

router.get('/', (req, res, next) => {
  const userController = container.resolve(UserController);
  userController.getAllUsers(req, res, next);
});

router.get('/hobby/:hobbyName', (req, res, next) => {
  const userController = container.resolve(UserController);
  userController.getUsersByHobby(req, res, next);
});

router.get('/:id', (req, res, next) => {
  const userController = container.resolve(UserController);
  userController.getUserById(req, res, next);
});

router.post('/', validateRequest(createUserSchema), (req, res, next) => {
  const userController = container.resolve(UserController);
  userController.createUser(req, res, next);
});

router.put('/:id', validateRequest(updateUserSchema), (req, res, next) => {
  const userController = container.resolve(UserController);
  userController.updateUser(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  const userController = container.resolve(UserController);
  userController.deleteUser(req, res, next);
});

export default router;
