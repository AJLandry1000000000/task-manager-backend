import request from 'supertest';
import express from 'express';
import { router } from '../src/router/index';
import { TaskModel } from '../src/models/TaskModel';
import { create } from 'domain';


const app = express();
app.use(express.json());
app.use('/api/v1', router);

describe('Task Routes', () => {

	it('Test the health route.', async () => {
		const res = await request(app).get('/api/v1/health');
		expect(res.status).toBe(200);
		expect(res.text).toBe('ok');
	});


	it('Test the task creation route.', async () => {
		const newTask = {
			name: 'Test Task',
			description: 'Test Description',
			due_date: '2022-09-30',
		};

		// Spy on the TaskModel.create() method.
		const createSpy = jest.spyOn(TaskModel, 'create').mockImplementation(async () => {
			return {
				id: 1,
				...newTask,
				updated_at: new Date(),
				created_at: new Date(),
			} as any; 
		});

		const res = await request(app)
			.put('/api/v1/tasks-create/')
			.send(newTask);

		expect(res.status).toBe(200);
		expect(res.body.data).toHaveProperty('id');
		expect(res.body.data.name).toBe(newTask.name);
		expect(res.body.data.description).toBe(newTask.description);
		expect(new Date(res.body.data.due_date).toISOString()).toBe(new Date(newTask.due_date).toISOString());
		expect(createSpy).toHaveBeenCalledTimes(1);
	});


	it('Test the task update route.', async () => {
		const updateTask = {
			id: 1,
			name: 'Test Task',
			description: 'Test Description',
			due_date: '2022-09-30',
		};

		// Spy on the TaskModel.update() method.
		const updateSpy = jest.spyOn(TaskModel, 'update').mockImplementation(async () => {
			return {
				...updateTask,
				updated_at: new Date(),
				created_at: new Date(),
			} as any; 
		});

		const res = await request(app)
			.put('/api/v1/tasks-update/')
			.send(updateTask);

		expect(res.status).toBe(200);
		expect(res.body.data).toHaveProperty('id');
		expect(res.body.data.name).toBe(updateTask.name);
		expect(res.body.data.description).toBe(updateTask.description);
		expect(new Date(res.body.data.due_date).toISOString()).toBe(new Date(updateTask.due_date).toISOString());
		expect(updateSpy).toHaveBeenCalledTimes(1);
	});


	it('Test the fetching of tasks route.', async () => {
		let returnedTasks = [{
			id: 1,
			name: 'Test Task 1',
			description: 'Test Description 1',
			due_date: '2022-09-30',
			updated_at: new Date(),
			created_at: new Date(),
		}, {
			id: 2,
			name: 'Test Task 2',
			description: 'Test Description 2',
			due_date: '2025-09-30',
			updated_at: new Date(),
			created_at: new Date(),
		}, {
			id: 3,
			name: 'Test Task 3',
			description: 'Test Description 3',
			due_date: '1922-09-30',
			updated_at: new Date(),
			created_at: new Date(),
		}];

		// Spy on the TaskModel.all() method.
		const allSpy = jest.spyOn(TaskModel, 'all').mockImplementation(async () => {
			return returnedTasks as any; 
		});

		const page = 1;

		const res = await request(app).get(`/api/v1/tasks-get/${page}`);

		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body.length).toBe(3);
		expect(allSpy).toHaveBeenCalledTimes(1);
	});
});