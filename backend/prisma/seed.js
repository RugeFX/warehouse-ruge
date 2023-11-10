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
