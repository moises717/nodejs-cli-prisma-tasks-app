import loading from 'loading-cli';

import 'colors';
import { crearTarea, listarTareas } from './tasks/tasks';
import { displayMenu, pausa, readInput } from './displayMenu/displayMenu';

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
				console.log(tasks);
				break;
		}
		await pausa();
	} while (Option !== 0);
}

main();
