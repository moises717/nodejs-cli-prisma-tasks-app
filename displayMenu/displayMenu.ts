import inquirer, { QuestionCollection } from 'inquirer';

const listsMenu: QuestionCollection = [
	{
		type: 'list',
		name: 'Option',
		choices: [
			{
				value: 1,
				name: `${'1.'.green} Crear tarea`,
			},
			{
				value: 2,
				name: `${'2.'.green} Listar tareas`,
			},
			{
				value: 3,
				name: `${'3.'.green} Listar tareas pendientes`,
			},
			{
				value: 4,
				name: `${'4.'.green} Borrar tareas`,
			},
			{
				value: 0,
				name: `${'5.'.green} Salir`,
			},
		],
	},
];

export async function displayMenu() {
	console.clear();
	console.log('=========================='.green);
	console.log('  Select an option'.white);
	console.log('==========================\n'.green);

	const { Option } = await inquirer.prompt(listsMenu);

	return Option;
}

export const pausa = async () => {
	const question = [
		{
			type: 'input',
			name: 'enter',
			message: `Presione ${'enter'.green} para continuar`,
		},
	];

	console.log('\n');
	await inquirer.prompt(question);
};

export async function readInput({ message, nameInput }: { message: string; nameInput: string }) {
	return await inquirer.prompt([
		{
			type: 'input',
			name: nameInput,
			message,
			validate(value) {
				if (value.length === 0) {
					return 'Por favor ingrese un valor';
				}
				return true;
			},
		},
	]);
}
