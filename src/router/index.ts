import { TaskModel } from '../models/TaskModel';
import Router from 'express';
import type { Response, Request } from 'express';

export const router = Router();

router.get('/health', (req: Request, res: Response) => {
    res.status(200).send('ok')
});

router.get('/tasks-get/:page', async (req: Request, res: Response) => {
    try {
        let page: number = Number(req.params.page)

        type expectedParams = { // This type describes the expected parameters for requests satisfying the "(Should have)" user stories.
            page: number; // Page number. Default functionality is 1.
            search?: string; // Search string. This variable is used to filter the results by searching for a substring matching the 'search' valiable in the name column. Default functionality is no search filtering.
            order?: string; // Order of the results. This variable can only be 'asc' or 'desc'. Default functionality is 'desc'.
            due_date?: boolean; // This is a boolean variable that indicates if the results should be ordered by the due_date column. Default functionality is false.
            created_at?: boolean; // This is a boolean variable that indicates if the results should be ordered by the created_at column. Default functionality is false.
        }

        if (!page || !(Number(page) >= 0)) {
            page = 1;
        }
        let data = await TaskModel.all(page);
        res.status(200).json(data)
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

        res.status(200).json({
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
        res.status(200).json({
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
        res.status(200).json({
            data: await TaskModel.create(createObject)
        })
        console.log('Task created with this data: ', req.body)

    } catch (error) {
        res.status(500).json({
            message: "Server Error!"
        })
    }
});