/*
  Warnings:

  - Added the required column `qr_code` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "qr_code" STRING NOT NULL;
