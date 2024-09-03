/*
  Warnings:

  - The primary key for the `Loops` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_loopId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "loopId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Loops" DROP CONSTRAINT "Loops_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Loops_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Loops_id_seq";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_loopId_fkey" FOREIGN KEY ("loopId") REFERENCES "Loops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
