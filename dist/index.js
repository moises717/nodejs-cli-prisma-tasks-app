import inquirer from 'inquirer';
import loading from 'loading-cli';
import 'colors';
import { crearTarea, listarTareas } from './tasks/tasks.js';
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
const listsMenu = [
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
                name: `${'3.'.green} Borrar tarea`,
            },
            {
                value: 0,
                name: `${'4.'.green} Salir`,
            },
        ],
    },
];
async function displayMenu() {
    console.clear();
    console.log('=========================='.green);
    console.log('  Select an option'.white);
    console.log('==========================\n'.green);
    const { Option } = await inquirer.prompt(listsMenu);
    return Option;
}
const pausa = async () => {
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
async function readInput({ message, nameInput }) {
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
main();
//# sourceMappingURL=index.js.map