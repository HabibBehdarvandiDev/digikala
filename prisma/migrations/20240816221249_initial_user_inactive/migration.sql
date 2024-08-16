-- AlterTable
ALTER TABLE `users` MODIFY `status` ENUM('active', 'inactive', 'banned') NULL DEFAULT 'inactive';
