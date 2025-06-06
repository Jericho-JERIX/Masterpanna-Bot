-- CreateTable
CREATE TABLE "DiscordUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "discordId" TEXT NOT NULL,
    "point" INTEGER NOT NULL DEFAULT 0,
    "lastClaimedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "discordId" TEXT NOT NULL,
    "point" INTEGER NOT NULL DEFAULT 0,
    "lastClaimedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RandomApproach" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "claimedBy" TEXT,
    "rewardPoints" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "claimedByDiscordId" TEXT,
    CONSTRAINT "RandomApproach_claimedBy_fkey" FOREIGN KEY ("claimedBy") REFERENCES "DiscordUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordUser_discordId_key" ON "DiscordUser"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_discordId_key" ON "Users"("discordId");
