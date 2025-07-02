/*
  Warnings:

  - Added the required column `pointAfter` to the `PointTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pointBefore` to the `PointTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PointTransaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "pointBefore" INTEGER NOT NULL,
    "pointAfter" INTEGER NOT NULL,
    "description" TEXT,
    "discordUserId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PointTransaction_discordUserId_fkey" FOREIGN KEY ("discordUserId") REFERENCES "DiscordUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PointTransaction" ("amount", "createdAt", "description", "discordUserId", "id", "updatedAt") SELECT "amount", "createdAt", "description", "discordUserId", "id", "updatedAt" FROM "PointTransaction";
DROP TABLE "PointTransaction";
ALTER TABLE "new_PointTransaction" RENAME TO "PointTransaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
