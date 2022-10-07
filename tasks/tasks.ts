import { PrismaClient, Tasks } from '@prisma/client';
import inquirer, { Answers, ChoiceBase, ChoiceOptions, ListChoiceOptions } from 'inquirer';
import { v4 as uuidv4 } from 'uuid';
import loading from 'loading-cli';
import { ListenOptions } from 'net';

const prisma = new PrismaClient();

export async function crearTarea(title: string) {
	return await prisma.tasks.create({
		data: {
			title,
			UserId: uuidv4(),
		},
	});
}

export async function listarTareas(): Promise<any> {
	let loaderList = loading('loading tasks'.blue).start();
	const choices = await getTaskChoices();
	loaderList.stop();

	return await inquirer.prompt([
		{
			type: 'checkbox',
			name: 'listOpt',
			message: 'Lista de tareas',
			choices,
		},
	]);
}

export async function getPendingTasks(): Promise<any> {
	let loaderList = loading('loading tasks'.blue).start();
	const pendingTasks = await prisma.tasks.findMany({
		where: {
			completed: false,
		},
	});

	let choices = pendingTasks.map((task, i) => {
		const id = `${i + 1}`.green;

		return {
			value: task.id,
			name: ` ${id}. ${task.title} ${task.completed ? '(completed)'.green : '(pending)'.red}`,
		};
	});

	loaderList.stop();

	return await inquirer.prompt([
		{
			type: 'checkbox',
			name: 'listOpt',
			message: 'Lista de tareas',
			choices,
		},
	]);
}

async function getTaskChoices(): Promise<ListChoiceOptions[]> {
	let tasks = await prisma.tasks.findMany();
	return tasks.map((task, i) => {
		const idList = `${i + 1}`.green;

		return {
			value: task.id,
			name: ` ${idList}. ${task.title} ${task.completed ? '(completed)'.green : '(pending)'.red}`,
		};
	});
}

export async function removeTask() {
	let loaderList = loading('loading tasks'.blue).start();
	let choices = await getTaskChoices();
	loaderList.stop();

	return await inquirer.prompt([
		{
			type: 'checkbox',
			name: 'listOpt',
			message: 'Lista de tareas',
			choices,
		},
	]);
}

export async function removeTaskFromDb(taskIds: string[]): Promise<Tasks[] | undefined> {
	let loaderList = loading('Deleting tasks...'.blue).start();
	if (taskIds.length <= 0) return;
	let task = await Promise.all(
		taskIds.map(async id => {
			return await prisma.tasks.delete({
				where: {
					id,
				},
			});
		}),
	);
	loaderList.stop();
	return task;
}

export async function checkCompleted(taskIds: string[]): Promise<Tasks[] | undefined> {
	let loaderList = loading('Checking tasks...'.blue).start();
	if (taskIds.length <= 0) return;
	let task = await Promise.all(
		taskIds.map(async id => {
			return await prisma.tasks.update({
				data: {
					completed: true,
				},
				where: {
					id,
				},
			});
		}),
	);
	loaderList.stop();
	return task;
}
