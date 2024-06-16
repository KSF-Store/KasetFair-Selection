-- CreateTable
CREATE TABLE "Table" (
    "id" SERIAL NOT NULL,
    "zone" TEXT NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "alreadyUse" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);
