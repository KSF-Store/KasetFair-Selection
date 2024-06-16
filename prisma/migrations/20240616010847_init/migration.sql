-- CreateTable
CREATE TABLE "Nisit" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nisitId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nisit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NisitStore" (
    "id" SERIAL NOT NULL,
    "nisitId" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "storeDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NisitStore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nisit_email_key" ON "Nisit"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Nisit_nisitId_key" ON "Nisit"("nisitId");

-- AddForeignKey
ALTER TABLE "NisitStore" ADD CONSTRAINT "NisitStore_nisitId_fkey" FOREIGN KEY ("nisitId") REFERENCES "Nisit"("nisitId") ON DELETE RESTRICT ON UPDATE CASCADE;
