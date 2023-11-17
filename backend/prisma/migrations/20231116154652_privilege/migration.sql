/*
  Warnings:

  - You are about to drop the column `icon` on the `Privilege` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Privilege` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Privilege` table. All the data in the column will be lost.
  - Added the required column `add` to the `Privilege` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delete` to the `Privilege` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edit` to the `Privilege` table without a default value. This is not possible if the table is not empty.
  - Added the required column `view` to the `Privilege` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Privilege" DROP COLUMN "icon",
DROP COLUMN "name",
DROP COLUMN "url",
ADD COLUMN     "add" INTEGER NOT NULL,
ADD COLUMN     "delete" INTEGER NOT NULL,
ADD COLUMN     "edit" INTEGER NOT NULL,
ADD COLUMN     "view" INTEGER NOT NULL;
