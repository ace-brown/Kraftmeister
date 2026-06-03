-- CreateTable
CREATE TABLE "AiFeedback" (
    "id" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "rating" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiFeedback_pkey" PRIMARY KEY ("id")
);
