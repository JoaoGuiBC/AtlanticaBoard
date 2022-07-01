/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `budgets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "budgets_serialNumber_key" ON "budgets"("serialNumber");
