/*
  Warnings:

  - The primary key for the `Sdg` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `SdgId` on the `Sdg` table. All the data in the column will be lost.
  - You are about to drop the `_SdgToStore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SdgToStore" DROP CONSTRAINT "_SdgToStore_A_fkey";

-- DropForeignKey
ALTER TABLE "_SdgToStore" DROP CONSTRAINT "_SdgToStore_B_fkey";

-- AlterTable
ALTER TABLE "Sdg" DROP CONSTRAINT "Sdg_pkey",
DROP COLUMN "SdgId",
ADD COLUMN     "sdgId" SERIAL NOT NULL,
ADD CONSTRAINT "Sdg_pkey" PRIMARY KEY ("sdgId");

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "description" TEXT,
ADD COLUMN     "slogan" TEXT;

-- DropTable
DROP TABLE "_SdgToStore";

-- CreateTable
CREATE TABLE "_InvitationStoreToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_StoreToSdg" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InvitationStoreToUser_AB_unique" ON "_InvitationStoreToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_InvitationStoreToUser_B_index" ON "_InvitationStoreToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StoreToSdg_AB_unique" ON "_StoreToSdg"("A", "B");

-- CreateIndex
CREATE INDEX "_StoreToSdg_B_index" ON "_StoreToSdg"("B");

-- AddForeignKey
ALTER TABLE "_InvitationStoreToUser" ADD CONSTRAINT "_InvitationStoreToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Store"("storeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvitationStoreToUser" ADD CONSTRAINT "_InvitationStoreToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreToSdg" ADD CONSTRAINT "_StoreToSdg_A_fkey" FOREIGN KEY ("A") REFERENCES "Sdg"("sdgId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreToSdg" ADD CONSTRAINT "_StoreToSdg_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("storeId") ON DELETE CASCADE ON UPDATE CASCADE;
