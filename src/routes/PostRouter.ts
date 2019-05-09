import { Router } from 'express';
import { PostComponent } from '../components';

const router: Router = Router();

router.get('/:id', PostComponent.findOne);
router.get('/:id', PostComponent.getAll);
router.post('/', PostComponent.create);

export default router;
