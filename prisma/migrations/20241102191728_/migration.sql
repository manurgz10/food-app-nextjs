/*
  Warnings:

  - Made the column `desc` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `img` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `desc` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "desc" SET NOT NULL,
ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "img" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "desc" SET NOT NULL;
