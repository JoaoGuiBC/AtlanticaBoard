-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_employees" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_employees" ("email", "id", "isAdmin", "name", "password") SELECT "email", "id", "isAdmin", "name", "password" FROM "employees";
DROP TABLE "employees";
ALTER TABLE "new_employees" RENAME TO "employees";
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
