-- AlterTable: add createdAt and updatedAt columns to Issue
-- Using CURRENT_TIMESTAMP so existing 4 rows get a valid timestamp
ALTER TABLE `Issue`
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
