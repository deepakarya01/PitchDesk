/*
  Warnings:

  - Changed the type of `views` on the `Startup` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Startup" DROP COLUMN "views",
ADD COLUMN     "views" INTEGER NOT NULL;
