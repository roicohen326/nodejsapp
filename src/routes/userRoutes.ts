import { Router } from 'express';
import { userController } from '../controllers/userController';
import { requestLogger } from '../middleware/requestLogger';
import { validateRequest } from '../middleware/validateRequest';
import { createUserSchema, updateUserSchema } from '../validators/userSchema';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/hobby/:hobbyName', userController.getUsersByHobby);
router.get('/:id', userController.getUserById);

router.post('/', requestLogger, validateRequest(createUserSchema), userController.createUser);
router.put('/:id', requestLogger, validateRequest(updateUserSchema), userController.updateUser);
router.delete('/:id', requestLogger, userController.deleteUser);

export default router;