/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `email` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `email` ON `users`(`email`);
