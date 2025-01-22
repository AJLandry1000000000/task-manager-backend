import { TaskModel } from '../models/TaskModel';
import Router from 'express';
import type { Response, Request } from 'express';
import { describe } from 'node:test';

export const router = Router();

router.get('/health', (req: Request, res: Response) => {
    res.status(200).send('ok')
});

router.get('/tasks-all/:page', async (req: Request, res: Response) => {
    try {
        let page: number = Number(req.params.page)
        let expect = {
            page: 1,
            order: 'asc',
            due_date: 'created_at',
            created_at: 'due_date'

        }

        if (!page || !(Number(page) >= 0)) {
            // res.status(400).json({
            //     message: "Bad Request"
            // });
            // return;
            page = 1;
        }
        let data = await TaskModel.all(page);
        res.json(data)
    } catch (error) {
        res.status(500).json({
            message: "Server Error!"
        })
    }
});

router.get('/tasks-by-column/:column/:order/:page', async (req: Request, res: Response) => {
    try {
        let order: string = req.params.order;
        let column: string = req.params.column;
        let page: number = Number(req.params.page);

        if (
            (order != 'asc' && order != 'desc') || 
            (column != 'created_at' && column != 'due_date') ||
            !(page >= 0)
        ) {
            res.status(400).json({
                message: 'Bad Request',
            });

            return;
        }

        res.json({
            data: await TaskModel.findByColumnOrdered(column, order, page)
        })

    } catch (error) {
        res.status(500).json({
            message: "Server Error!"
        })
    }
});

router.put('/tasks-update/', async (req: Request, res: Response) => {
    if (!req.body || !req.body.id || !req.body.name || !req.body.description || !req.body.due_date) {
        res.status(400).json({
            message: 'Bad Request! Request body is missing required fields!',
        });

        return;
    }

    type UpdateBody = {
        id: number,
        name: string,
        description: string
        due_date: string
    }
    
    let body: UpdateBody = req.body;
    let id: number = body.id

    let updateObject = {
        name: body.name,
        description: body.description,
        due_date: new Date(body.due_date).toISOString()
    }

    try {
        res.json({
            data: await TaskModel.update(id, updateObject)
        })

        console.log('Task updated with this data: ', req.body)

    } catch (error) {
        res.status(500).json({
            message: "Server Error!"
        })
    }
});


router.put('/tasks-create/', async (req: Request, res: Response) => {
    if (!req.body || !req.body.name || !req.body.description || !req.body.due_date) {
        res.status(400).json({
            message: 'Bad Request! Request body is missing required fields!',
        });

        return;
    }

    type CreateBody = {
        id?: number,
        name: string,
        description: string
        due_date: string
    }
    
    let body: CreateBody = req.body;

    let createObject = {
        name: body.name,
        description: body.description,
        due_date: new Date(body.due_date).toISOString()
    }

    try {
        res.json({
            data: await TaskModel.create(createObject)
        })
        console.log('Task created with this data: ', req.body)

    } catch (error) {
        res.status(500).json({
            message: "Server Error!"
        })
    }
});