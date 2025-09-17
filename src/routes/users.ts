import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const router = Router();
const repo = () => AppDataSource.getRepository(User);

router.get('/', async (_req, res, next) => {
  try {
    const users = await repo().find();
    res.json(users);
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await repo().findOneBy({ id: parseInt(req.params.id) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: 'email and name are required' });
    }
    const exists = await repo().findOneBy({ email });
    if (exists) {
      return res.status(409).json({ error: 'email already exists' });
    }
    const user = repo().create({ email, name });
    const saved = await repo().save(user);
    res.status(201).json(saved);
  } catch (e) { next(e); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await repo().findOneBy({ id: parseInt(req.params.id) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (email) user.email = email;
    if (name) user.name = name;
    const updated = await repo().save(user);
    res.json(updated);
  } catch (e) { next(e); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await repo().delete(req.params.id);
    if (result.affected === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (e) { next(e); }
});

export default router;