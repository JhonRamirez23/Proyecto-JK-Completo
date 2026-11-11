import { Router } from 'express';
import { methods as authentication } from '../controllers/auth.controller.js';

const router = Router();

// Rutas de autenticación (migradas desde app/index.js)
// Se mantiene exactamente el mismo comportamiento
router.post('/api/login', authentication.login);
router.post('/api/logout', authentication.logout);
router.post('/api/register', authentication.register);
router.get('/api/session', authentication.session);

export default router;
