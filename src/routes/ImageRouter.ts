import { Router } from 'express';
import {ImageComponent} from '../components';

const router: Router = Router();
router.get('/:id', ImageComponent.findOne);

export default router;
