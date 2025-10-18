import { Router } from 'express';
import { userController } from '../controllers/userController';
import { requestLogger } from '../middleware/requestLogger';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/hobby/:hobbyName', userController.getUsersByHobby);
router.get('/:id', userController.getUserById);

router.post('/', requestLogger, userController.createUser);
router.put('/:id', requestLogger, userController.updateUser);
router.delete('/:id', requestLogger, userController.deleteUser);

export default router;