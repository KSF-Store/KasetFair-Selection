-- CreateTable
CREATE TABLE "Sdg" (
    "SdgId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sdg_pkey" PRIMARY KEY ("SdgId")
);

-- CreateTable
CREATE TABLE "_SdgToStore" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SdgToStore_AB_unique" ON "_SdgToStore"("A", "B");

-- CreateIndex
CREATE INDEX "_SdgToStore_B_index" ON "_SdgToStore"("B");

-- AddForeignKey
ALTER TABLE "_SdgToStore" ADD CONSTRAINT "_SdgToStore_A_fkey" FOREIGN KEY ("A") REFERENCES "Sdg"("SdgId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SdgToStore" ADD CONSTRAINT "_SdgToStore_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("storeId") ON DELETE CASCADE ON UPDATE CASCADE;
