import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  // Wipe in dependency order so FK constraints don't block deletion
  await prisma.invoiceItem.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.quoteItem.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.job.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();

  const company = await prisma.company.create({
    data: {
      name: 'Muster Handwerk GmbH',
      address: 'Musterstraße 1, 10115 Berlin',
      vatId: 'DE123456789',
    },
  });

  await prisma.user.create({
    data: {
      companyId: company.id,
      email: 'admin@muster.de',
      passwordHash: await bcrypt.hash('demo1234', 12),
      role: 'ADMIN',
    },
  });

  const [hans, anna, klaus] = await Promise.all([
    prisma.customer.create({
      data: {
        companyId: company.id,
        name: 'Hans Müller',
        email: 'hans@example.de',
        phone: '030 1234567',
        address: 'Berliner Str. 12, 10115 Berlin',
      },
    }),
    prisma.customer.create({
      data: {
        companyId: company.id,
        name: 'Anna Schmidt',
        email: 'anna@example.de',
        phone: '030 9876543',
        address: 'Hauptstraße 5, 10117 Berlin',
      },
    }),
    prisma.customer.create({
      data: {
        companyId: company.id,
        name: 'Klaus Weber',
        phone: '030 5554444',
      },
    }),
  ]);

  await Promise.all([
    prisma.job.create({
      data: {
        companyId: company.id,
        customerId: hans.id,
        title: 'Badezimmer renovieren',
        description: 'Fliesen erneuern, neue Dusche einbauen',
        status: 'IN_PROGRESS',
        address: hans.address ?? undefined,
      },
    }),
    prisma.job.create({
      data: {
        companyId: company.id,
        customerId: anna.id,
        title: 'Elektroinstallation Küche',
        description: 'Neue Steckdosen und Beleuchtung',
        status: 'OPEN',
        address: anna.address ?? undefined,
      },
    }),
    prisma.job.create({
      data: {
        companyId: company.id,
        customerId: klaus.id,
        title: 'Dach abdichten',
        status: 'DONE',
      },
    }),
  ]);

  console.log(`Seeded: company "${company.name}", 1 user, 3 customers, 3 jobs`);
  console.log('Login: admin@muster.de / demo1234');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
