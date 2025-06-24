-- CreateTable
CREATE TABLE "PointTransaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "description" TEXT,
    "discordUserId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PointTransaction_discordUserId_fkey" FOREIGN KEY ("discordUserId") REFERENCES "DiscordUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
