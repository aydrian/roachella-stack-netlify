/*
  Warnings:

  - You are about to drop the `scans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "scans";

-- CreateTable
CREATE TABLE "contacts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "first_name" STRING NOT NULL,
    "last_name" STRING NOT NULL,
    "github_username" STRING NOT NULL,
    "twitter" STRING,
    "shirt_size" STRING NOT NULL,
    "notes" STRING NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "primary" PRIMARY KEY ("id")
);
