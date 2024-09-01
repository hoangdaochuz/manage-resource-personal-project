/*
  Warnings:

  - You are about to drop the column `projectIds` on the `Workspace` table. All the data in the column will be lost.
  - You are about to drop the column `teamIds` on the `Workspace` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "projectIds",
DROP COLUMN "teamIds";
