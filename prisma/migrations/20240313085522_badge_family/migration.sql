/*
  Warnings:

  - Added the required column `badge_family_id` to the `Badge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `Badge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Badge" ADD COLUMN     "badge_family_id" TEXT NOT NULL,
ADD COLUMN     "rank" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "BadgeFamily" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BadgeFamily_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_badge_family_id_fkey" FOREIGN KEY ("badge_family_id") REFERENCES "BadgeFamily"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
