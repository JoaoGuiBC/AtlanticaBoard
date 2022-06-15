-- DropForeignKey
ALTER TABLE "budgets" DROP CONSTRAINT "budgets_clientId_fkey";

-- DropForeignKey
ALTER TABLE "product_budgets" DROP CONSTRAINT "product_budgets_productId_fkey";

-- AddForeignKey
ALTER TABLE "product_budgets" ADD CONSTRAINT "product_budgets_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
