const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require ('bcrypt')

async function main (){
  const password = await bcrypt.hash("12345",10)
    await prisma.position.create({
      data: {
        name: 'SuperAdmin',
        Staff: {
          create: {
            name:"Raditya",
            registerDate: new Date(),
            address:"jl.tengki",
            phone:"081219578713",
            User:{
              create:{
                username:"superadmin123",
                password: password,
              }
            }
          },
        },
      },
    })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
