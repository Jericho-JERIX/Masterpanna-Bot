-- CreateTable
CREATE TABLE "Economy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pointMean" REAL NOT NULL,
    "pointMax" INTEGER NOT NULL,
    "pointMin" INTEGER NOT NULL,
    "pointSd" REAL NOT NULL,
    "totalPoint" INTEGER NOT NULL,
    "totalUser" INTEGER NOT NULL,
    "totalTransaction" INTEGER NOT NULL,
    "csp" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
