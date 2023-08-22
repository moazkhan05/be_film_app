/*
  Warnings:

  - You are about to drop the column `userId` on the `Film` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Film" DROP CONSTRAINT "Film_userId_fkey";

-- AlterTable
ALTER TABLE "Film" DROP COLUMN "userId",
ALTER COLUMN "releaseDate" DROP NOT NULL,
ALTER COLUMN "ticketPrice" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "genre" DROP NOT NULL,
ALTER COLUMN "photo" DROP NOT NULL;
