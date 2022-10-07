import loading from 'loading-cli';

import 'colors';
import {
	checkCompleted,
	crearTarea,
	getPendingTasks,
	listarTareas,
	removeTask,
	removeTaskFromDb,
} from './tasks/tasks.js';
import { displayMenu, pausa, readInput } from './displayMenu/displayMenu.js';
import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient();

async function main() {
	let Option;

	do {
		Option = await displayMenu();

		switch (Option) {
			case 1:
				const { title } = await readInput({ message: 'Enter task title:', nameInput: 'title' });
				let loader = loading('Entering task'.blue).start();
				await crearTarea(title);
				loader.succeed('task created!!'.green);
				loader.stop();
				break;
			case 2:
				let tasks = await listarTareas();
				await checkCompleted(tasks.listOpt);
				break;
			case 3:
				let ptasks = await getPendingTasks();
				await checkCompleted(ptasks.listOpt);
				break;
			case 4:
				let taskToDeleted = await removeTask();
				await removeTaskFromDb(taskToDeleted.listOpt);
				break;
		}
		await pausa();
	} while (Option !== 0);
	{
		prisma.$disconnect();
	}
}

main();
