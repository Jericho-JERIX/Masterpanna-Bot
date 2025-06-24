/*
  Warnings:

  - You are about to drop the column `claimedBy` on the `RandomApproach` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RandomApproach" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rewardPoints" INTEGER NOT NULL,
    "description" TEXT,
    "claimedByDiscordId" TEXT,
    "claimedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RandomApproach_claimedByDiscordId_fkey" FOREIGN KEY ("claimedByDiscordId") REFERENCES "DiscordUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_RandomApproach" ("claimedAt", "claimedByDiscordId", "createdAt", "description", "id", "rewardPoints", "updatedAt") SELECT "claimedAt", "claimedByDiscordId", "createdAt", "description", "id", "rewardPoints", "updatedAt" FROM "RandomApproach";
DROP TABLE "RandomApproach";
ALTER TABLE "new_RandomApproach" RENAME TO "RandomApproach";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
