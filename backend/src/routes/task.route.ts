import express from 'express';
import { registerTask, getTasks, updateTask, deleteTask } from '../controllers/tasks';
import passport from 'passport';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
    .post(registerTask)
    .get(getTasks)

router.route('/:taskId')
    .put(updateTask)
    .delete(deleteTask)

export default router;