import Router from 'express';
import type { Response, Request } from 'express';

export const router = Router();

router.get('/health', (req: Request, res: Response) => {
    res.status(200).send('ok')
});


router.get('/tasks/:id', (req: Request, res: Response) => {
    res.status(200).send(`tasks: ${req.params.id}`);
});

