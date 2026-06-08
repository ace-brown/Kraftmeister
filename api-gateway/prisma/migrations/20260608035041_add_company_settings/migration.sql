-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "bankBic" TEXT,
ADD COLUMN     "bankIban" TEXT,
ADD COLUMN     "bankName" TEXT,
ADD COLUMN     "defaultVatRate" DOUBLE PRECISION,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "paymentTermsDays" INTEGER;
