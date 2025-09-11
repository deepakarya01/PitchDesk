/*
  Warnings:

  - Added the required column `pitch` to the `Startup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Startup" ADD COLUMN     "pitch" TEXT NOT NULL;
