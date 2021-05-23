import { PrismaClient } from '@prisma/client'
import { address, lorem, company } from 'faker';
import *  as bcrypt from 'bcrypt';
const prisma = new PrismaClient()

async function main() {
    /* USERS */
    const saltRounds = 10;
    const user = await prisma.user.create({
        data: {
            name: '',
            email: 'test@gmail.com',
            password: await bcrypt.hash('test1234',saltRounds)
          }
    });

    await Promise.all([...Array(20).keys()].map(async () => {
        try {
            await prisma.organisation.create({
                data: {
                    country: address.countryCode(),
                    name: company.companyName(),
                    description: lorem.paragraph(),
                    owner: user.id
                }
            });
        } catch(e) {
            console.log(e)
        }
    }));
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })