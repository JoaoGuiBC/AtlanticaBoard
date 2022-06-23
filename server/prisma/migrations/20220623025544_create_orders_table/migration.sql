-- DropForeignKey
ALTER TABLE "product_budgets" DROP CONSTRAINT "product_budgets_budgetId_fkey";

-- AlterTable
ALTER TABLE "product_budgets" ADD COLUMN     "orderId" TEXT;

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "serialNumber" SERIAL NOT NULL,
    "clientId" TEXT NOT NULL,
    "color" TEXT,
    "deadline" TIMESTAMP(3),
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "signed" BOOLEAN NOT NULL DEFAULT false,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "finished_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_budgets" ADD CONSTRAINT "product_budgets_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_budgets" ADD CONSTRAINT "product_budgets_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
