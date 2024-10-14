import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'johndoe@gmail.com' },
    update: {},
    create: {
      username: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      isActive: true,
      isVerified: true,
      isDeleted: false,
      deleteAt: null,
    },
  });

  const workspace = await prisma.workspace.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Workspace 1',
      owner: 1,
      order: 1,
      siteId: -1,
    },
  });

  const project = await prisma.project.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Project 1',
      description: 'Project 1 description',
      owner: 1,
      order: 1,
      workspaceId: 1,
    },
  });

  const team = await prisma.team.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Team 1',
      owner: 1,
      order: 1,
      memberIds: [],
      workspaceId: 1,
    },
  });

  console.log(user, team, project, workspace);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
