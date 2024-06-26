/*
  Warnings:

  - You are about to drop the `Nisit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NisitStore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NisitStore" DROP CONSTRAINT "NisitStore_BoothId_fkey";

-- DropForeignKey
ALTER TABLE "NisitStore" DROP CONSTRAINT "NisitStore_nisitModelId_fkey";

-- DropTable
DROP TABLE "Nisit";

-- DropTable
DROP TABLE "NisitStore";

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "nisitId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "reservePhone1" TEXT,
    "reservePhone2" TEXT,
    "storeId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Store" (
    "storeId" SERIAL NOT NULL,
    "storeRole" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mainProductType" TEXT NOT NULL,
    "subProductType" TEXT,
    "innovation" TEXT,
    "status" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "isAssigned" BOOLEAN NOT NULL DEFAULT false,
    "boothId" INTEGER,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("storeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nisitId_key" ON "User"("nisitId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_name_key" ON "Store"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Store_ownerId_key" ON "Store"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_boothId_key" ON "Store"("boothId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("storeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE SET NULL ON UPDATE CASCADE;
