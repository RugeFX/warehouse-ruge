/*
  Warnings:

  - You are about to drop the column `MenuGroupId` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `MenuItemId` on the `Privilege` table. All the data in the column will be lost.
  - Added the required column `menuGroupId` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menuItemId` to the `Privilege` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MenuItem" DROP CONSTRAINT "MenuItem_MenuGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Privilege" DROP CONSTRAINT "Privilege_MenuItemId_fkey";

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "MenuGroupId",
ADD COLUMN     "menuGroupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Privilege" DROP COLUMN "MenuItemId",
ADD COLUMN     "menuItemId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_menuGroupId_fkey" FOREIGN KEY ("menuGroupId") REFERENCES "MenuGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Privilege" ADD CONSTRAINT "Privilege_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
