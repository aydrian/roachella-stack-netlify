-- CreateTable
CREATE TABLE "cards" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "first_name" STRING NOT NULL,
    "last_name" STRING NOT NULL,
    "github_username" STRING NOT NULL,
    "shirt_size" STRING NOT NULL,

    CONSTRAINT "primary" PRIMARY KEY ("id")
);
