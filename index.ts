import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	let users = await prisma.users.create({
		data: {
			name: 'Juan',
		},
	});
	console.log(users);
}

main()
	.catch(e => {
		console.log(e.message);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
