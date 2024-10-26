/*
  Warnings:

  - The `Tags` column on the `Loops` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Loops" DROP COLUMN "Tags",
ADD COLUMN     "Tags" TEXT[];
