/*
  Warnings:

  - Added the required column `photo` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profile` ADD COLUMN `photo` VARCHAR(191) NOT NULL;
