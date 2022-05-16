-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_adresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "number" INTEGER,
    "state" TEXT,
    "city" TEXT,
    "district" TEXT,
    "cep" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT,
    CONSTRAINT "adresses_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_adresses" ("cep", "city", "clientId", "created_at", "district", "id", "number", "state", "street") SELECT "cep", "city", "clientId", "created_at", "district", "id", "number", "state", "street" FROM "adresses";
DROP TABLE "adresses";
ALTER TABLE "new_adresses" RENAME TO "adresses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
