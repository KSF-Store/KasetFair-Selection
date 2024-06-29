-- CreateTable
CREATE TABLE "Category" (
    "categoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "_StoreToCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryId_key" ON "Category"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "_StoreToCategory_AB_unique" ON "_StoreToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_StoreToCategory_B_index" ON "_StoreToCategory"("B");

-- AddForeignKey
ALTER TABLE "_StoreToCategory" ADD CONSTRAINT "_StoreToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreToCategory" ADD CONSTRAINT "_StoreToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Store"("storeId") ON DELETE CASCADE ON UPDATE CASCADE;
