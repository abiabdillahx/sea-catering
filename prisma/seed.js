// prisma/seed.js
import { PrismaClient } from '@prisma/client';
import mealPlans from '../src/app/data/mealPlans';

const prisma = new PrismaClient();

async function main() {
  // Seed MealPlans
  console.log('Seeding meal plans...');
  for (const plan of mealPlans) {
    await prisma.mealPlan.upsert({
      where: { id: plan.id },
      update: plan,
      create: plan,
    });
  }
  console.log('✅ Meal plans seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });