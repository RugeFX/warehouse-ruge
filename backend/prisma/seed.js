const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require ('bcrypt')

async function main (){
    await prisma.position.upsert({
      where: {},
      update: {},
      create: {
        name: 'SuperAdmin',
        Staff: {
          create: {
            positionId:1,
            name:"Raditya",
            registerDate: new Date(),
            address:"jl.tengki",
            phone:"081219578713",
            User:{
              create:{
                username:"superadmin123",
                password: bcrypt.hash("12345"),
                staffId : 1
              }
            }
          },
        },
      },
    })
    // await prisma.staff.create({
            // positionId:1,
            // name:"Raditya",
            // registerDate: new Date(),
            // address:"jl.tengki",
            // phone:"081219578713",
    // })
    // await prisma.user.create({
            // username:"superadmin123",
            // password: bcrypt.hash("12345"),
            // staffId : 1
    // })
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
