-- CreateTable
CREATE TABLE "Nisit" (
    "id" SERIAL NOT NULL,
    "nisitId" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nisit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NisitStore" (
    "id" SERIAL NOT NULL,
    "nisitModelId" INTEGER NOT NULL,
    "nisitId" TEXT,
    "storeName" TEXT NOT NULL,
    "storeDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "BoothId" INTEGER,

    CONSTRAINT "NisitStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booth" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isAssigned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Booth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nisit_nisitId_key" ON "Nisit"("nisitId");

-- CreateIndex
CREATE UNIQUE INDEX "Nisit_email_key" ON "Nisit"("email");

-- CreateIndex
CREATE UNIQUE INDEX "NisitStore_nisitModelId_key" ON "NisitStore"("nisitModelId");

-- CreateIndex
CREATE UNIQUE INDEX "NisitStore_nisitId_key" ON "NisitStore"("nisitId");

-- CreateIndex
CREATE UNIQUE INDEX "NisitStore_BoothId_key" ON "NisitStore"("BoothId");

-- AddForeignKey
ALTER TABLE "NisitStore" ADD CONSTRAINT "NisitStore_nisitModelId_fkey" FOREIGN KEY ("nisitModelId") REFERENCES "Nisit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NisitStore" ADD CONSTRAINT "NisitStore_BoothId_fkey" FOREIGN KEY ("BoothId") REFERENCES "Booth"("id") ON DELETE SET NULL ON UPDATE CASCADE;
