-- AlterTable
CREATE SEQUENCE project_order_seq;
ALTER TABLE "Project" ALTER COLUMN "order" SET DEFAULT nextval('project_order_seq');
ALTER SEQUENCE project_order_seq OWNED BY "Project"."order";

-- AlterTable
CREATE SEQUENCE team_order_seq;
ALTER TABLE "Team" ALTER COLUMN "order" SET DEFAULT nextval('team_order_seq');
ALTER SEQUENCE team_order_seq OWNED BY "Team"."order";

-- AlterTable
CREATE SEQUENCE workspace_order_seq;
ALTER TABLE "Workspace" ALTER COLUMN "order" SET DEFAULT nextval('workspace_order_seq');
ALTER SEQUENCE workspace_order_seq OWNED BY "Workspace"."order";
