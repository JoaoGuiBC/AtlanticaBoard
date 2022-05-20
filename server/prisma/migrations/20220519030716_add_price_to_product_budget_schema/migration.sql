/*
  Warnings:

  - Added the required column `price` to the `product_budgets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_budgets" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
