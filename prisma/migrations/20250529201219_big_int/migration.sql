/*
  Warnings:

  - You are about to alter the column `lastClaimedAt` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "discordId" TEXT NOT NULL,
    "point" INTEGER NOT NULL DEFAULT 0,
    "lastClaimedAt" BIGINT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Users" ("createdAt", "discordId", "id", "lastClaimedAt", "point", "updatedAt") SELECT "createdAt", "discordId", "id", "lastClaimedAt", "point", "updatedAt" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_discordId_key" ON "Users"("discordId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
