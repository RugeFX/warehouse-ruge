const prisma = require('../src/db')
// const bcrypt = require('bcrypt')

async function main () {
  const menuItem = await prisma.menuItem.findMany()

  menuItem.forEach(async (menuItem) => {
    const privilege = {
      positionId: 1,
      MenuItemId: menuItem.id,
      view: 1,
      add: 1,
      edit: 1,
      delete: 1
    }

    await prisma.privilege.create({
      data: privilege
    })
  })
  // const password = await bcrypt.hash('12345', 10)
  // await prisma.position.create({
  //   data: {
  //     name: 'SuperAdmin',
  //     Staff: {
  //       create: {
  //         name: 'Raditya',
  //         registerDate: new Date(),
  //         address: 'jl.tengki',
  //         phone: '081219578713',
  //         User: {
  //           create: {
  //             username: 'superadmin123',
  //             password
  //           }
  //         }
  //       }
  //     }
  //   }
  // })
  // await prisma.menuGroup.createMany({
  //   data: [
  //     {
  //       name: 'Dashboard',
  //       icon: 'fa-chart-line'
  //     },
  //     {
  //       name: 'Inventory',
  //       icon: 'fa-warehouse'
  //     },
  //     {
  //       name: 'Admin',
  //       icon: 'fa-user-secret'
  //     }
  //   ]
  // })
  // await prisma.menuItem.createMany({
  //   data: [
  //     {
  //       name: 'Home',
  //       url: '/dashboard/app',
  //       icon: 'fa-house',
  //       MenuGroupId: 1
  //     },
  //     {
  //       name: 'Position',
  //       url: '/dashboard/position',
  //       icon: 'fa-network-wired',
  //       MenuGroupId: 3
  //     },
  //     {
  //       name: 'Staff',
  //       url: '/dashboard/staff',
  //       icon: 'fa-user-tie',
  //       MenuGroupId: 3
  //     },
  //     {
  //       name: 'User',
  //       url: '/dashboard/user',
  //       icon: 'fa-users',
  //       MenuGroupId: 3
  //     },
  //     {
  //       name: 'Product',
  //       url: '/dashboard/product',
  //       icon: 'fa-box',
  //       MenuGroupId: 2
  //     },
  //     {
  //       name: 'Supplier',
  //       url: '/dashboard/supplier',
  //       icon: 'fa-people-carry-box',
  //       MenuGroupId: 2
  //     },
  //     {
  //       name: 'Restock',
  //       url: '/dashboard/restock',
  //       icon: 'fa-square-plus',
  //       MenuGroupId: 2
  //     },
  //     {
  //       name: 'Category',
  //       url: '/dashboard/category',
  //       icon: 'fa-layer-group',
  //       MenuGroupId: 2
  //     },
  //     {
  //       name: 'Unit',
  //       url: '/dashboard/unit',
  //       icon: 'fa-ruler',
  //       MenuGroupId: 2
  //     }
  //   ]
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
