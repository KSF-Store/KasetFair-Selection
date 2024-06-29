/*
  Warnings:

  - A unique constraint covering the columns `[nisitId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_nisitId_key" ON "User"("nisitId");
