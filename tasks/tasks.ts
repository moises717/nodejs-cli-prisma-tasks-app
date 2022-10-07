import { PrismaClient } from '@prisma/client';
import inquirer from 'inquirer';
import { v4 as uuidv4 } from 'uuid';
import loading from 'loading-cli';

const prisma = new PrismaClient();

export async function crearTarea(title: string) {
	return await prisma.tasks.create({
		data: {
			title,
			UserId: uuidv4(),
		},
	});
}

export async function listarTareas(): Promise<void> {
	let loaderList = loading('loading tasks'.blue).start();
	let tasks = await prisma.tasks.findMany();
	const choices = tasks.map((task, i) => {
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

export async function removeTask() {
	let loaderList = loading('loading tasks'.blue).start();
	let tasks = await prisma.tasks.findMany();
	const choices = tasks.map((task, i) => {
		const id = `${i + 1}`.green;

		return {
			value: task.id,
			name: ` ${id}. ${task.title} ${task.completed ? '(completed)'.green : '(pending)'.red}`,
		};
	});
	loaderList.stop();

	return await inquirer.prompt([
		{
			type: 'list',
			name: 'listOpt',
			message: 'Lista de tareas',
			choices,
		},
	]);
}
