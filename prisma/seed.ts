// ./prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const recipes = [
    {
      id: 1,
      title: 'チキンカレー',
      making_time: '45分',
      serves: '4人',
      ingredients: '玉ねぎ,肉,スパイス',
      cost: 1000,
      created_at: new Date('2016-01-10 12:10:12'),
      updated_at: new Date('2016-01-10 12:10:12'),
    },
    {
      id: 2,
      title: 'オムライス',
      making_time: '30分',
      serves: '2人',
      ingredients: '玉ねぎ,卵,スパイス,醤油',
      cost: 700,
      created_at: new Date('2016-01-11 13:10:12'),
      updated_at: new Date('2016-01-11 13:10:12'),
    },
  ];

  for (const recipe of recipes) {
    await prisma.recipe.create({
      data: recipe,
    });
  }

  console.log('Seed data inserted successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
