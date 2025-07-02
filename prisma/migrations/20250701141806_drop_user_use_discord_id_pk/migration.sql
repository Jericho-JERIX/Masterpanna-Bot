/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `discordId` on the `DiscordUser` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Users_discordId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Users";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DiscordUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "point" INTEGER NOT NULL DEFAULT 0,
    "lastClaimedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_DiscordUser" ("createdAt", "id", "lastClaimedAt", "point", "updatedAt") SELECT "createdAt", "id", "lastClaimedAt", "point", "updatedAt" FROM "DiscordUser";
DROP TABLE "DiscordUser";
ALTER TABLE "new_DiscordUser" RENAME TO "DiscordUser";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
