import inquirer from 'inquirer';
import { v4 as uuidv4 } from 'uuid';
import 'colors';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    let Option;
    do {
        Option = await displayMenu();
        if (Option === 1) {
            crearTarea();
        }
        else if (Option === 2) {
            listarTareas();
        }
    } while (Option !== 0);
}
async function crearTarea() {
    const { title } = await readInput({ message: 'Enter task title:', nameInput: 'title' });
    let task = await prisma.tasks.create({
        data: {
            title,
            UserId: uuidv4(),
        },
    });
    console.log(task);
}
async function listarTareas() {
    console.log('WAIT FOR TASKS...');
    let tasks = await prisma.tasks.findMany();
    const choices = tasks.map((task, i) => {
        const id = `${i + 1}`.green;
        return {
            value: id,
            name: ` ${id}. ` + task.title,
            checked: task.completed ?? false,
        };
    });
    let { seltask } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'seltask',
            message: 'Lista de tareas',
            choices,
        },
    ]);
    console.log(seltask);
}
async function displayMenu() {
    console.clear();
    console.log('=========================='.green);
    console.log('  Select an option'.white);
    console.log('==========================\n'.green);
    const { Option } = await inquirer.prompt([
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
                    value: 0,
                    name: `${'3.'.green} Salir`,
                },
            ],
        },
    ]);
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
    // await inquirer.prompt(question);
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
main().catch(e => {
    console.log(e.message);
});
//# sourceMappingURL=index.js.map