const prisma = require('../src/Db')
const bcrypt = require('bcrypt')

async function main () {
  const password = await bcrypt.hash('12345', 10)
  const position = await prisma.position.create({
    data: {
      name: 'SuperAdmin',
      staff: {
        create: {
          name: 'Raditya',
          registerDate: new Date(),
          address: 'jl.tengki',
          phone: '081219578713',
          image: 'null',
          user: {
            create: {
              username: 'superadmin123',
              password
            }
          }
        }
      }
    }
  })
  await prisma.menuGroup.createMany({
    data: [
      {
        name: 'Dashboard',
        icon: 'fa-chart-line'
      },
      {
        name: 'Inventory',
        icon: 'fa-warehouse'
      },
      {
        name: 'Admin',
        icon: 'fa-user-secret'
      }
    ]
  })
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Home',
        url: '/dashboard/app',
        icon: 'fa-house',
        menuGroupId: 1
      },
      {
        name: 'Position',
        url: '/dashboard/position',
        icon: 'fa-network-wired',
        menuGroupId: 3
      },
      {
        name: 'Staff',
        url: '/dashboard/staff',
        icon: 'fa-user-tie',
        menuGroupId: 3
      },
      {
        name: 'User',
        url: '/dashboard/user',
        icon: 'fa-users',
        menuGroupId: 3
      },
      {
        name: 'Product',
        url: '/dashboard/product',
        icon: 'fa-box',
        menuGroupId: 2
      },
      {
        name: 'Supplier',
        url: '/dashboard/supplier',
        icon: 'fa-people-carry-box',
        menuGroupId: 2
      },
      {
        name: 'Restock',
        url: '/dashboard/restock',
        icon: 'fa-square-plus',
        menuGroupId: 2
      },
      {
        name: 'Category',
        url: '/dashboard/category',
        icon: 'fa-layer-group',
        menuGroupId: 2
      },
      {
        name: 'Unit',
        url: '/dashboard/unit',
        icon: 'fa-ruler',
        menuGroupId: 2
      }
    ]
  })
  const menuItem = await prisma.menuItem.findMany()

  menuItem.forEach(async (menuItem) => {
    const privilege = {
      positionId: position.id,
      menuItemId: menuItem.id,
      view: 1,
      add: 1,
      edit: 1,
      delete: 1
    }
    await prisma.privilege.create({
      data: { ...privilege }
    })
  })
  await prisma.supplier.create({
    data: {
      name: 'Raditya',
      registerDate: new Date(),
      address: 'jl.tengki',
      phone: '081219578713',
      image: 'null',
      information: 'supplier 1'
    }
  })
  await prisma.category.create({
    data: {
      itemType: 'Fashion'
    }
  })
  await prisma.unit.create({
    data: {
      unitName: 'Pieces',
      shortName: 'Pcs'
    }
  })
  await prisma.product.create({
    data: {
      name: 'Product A',
      stock: 0,
      netPrice: 100000,
      image: 'null',
      information: 'Product A',
      unitId: 1,
      categoryId: 1,
      supplierId: 1
    }
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
