import { AuthComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();

router.post('/signup', AuthComponent.signup);
router.post('/login', AuthComponent.login);

export default router;
