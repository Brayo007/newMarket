import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

const userData = [
    {
      email: 'alice@example.com',
      first_name: 'Alice',
      last_name: 'Wangare',
      password: bcrypt.hashSync('123456'),
      user_type: 'admin',
      address1: 'Kimbo',
      city: 'Nairobi',
      state:'M',
      phone: '0722123456',
      date_created: '2022-05-05T16:14:20.000Z',



      
    },
]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of userData) {
      const customer = await prisma.customers.create({
        data: u,
      })
      console.log(`Created customer with id: ${customer.id}`)
    }
    console.log(`Seeding finished.`)
  }

  main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

  //add to package.json
  //"type": "module"