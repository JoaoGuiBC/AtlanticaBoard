-- DropForeignKey
ALTER TABLE "product_budgets" DROP CONSTRAINT "product_budgets_budgetId_fkey";

-- AddForeignKey
ALTER TABLE "product_budgets" ADD CONSTRAINT "product_budgets_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
