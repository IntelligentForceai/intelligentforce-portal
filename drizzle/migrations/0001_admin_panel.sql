-- Admin credentials table
CREATE TABLE IF NOT EXISTS `admin_credentials` (
  `id` int AUTO_INCREMENT NOT NULL,
  `username` varchar(64) NOT NULL,
  `passwordHash` varchar(256) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `admin_credentials_id` PRIMARY KEY(`id`),
  CONSTRAINT `admin_credentials_username_unique` UNIQUE(`username`)
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS `contact_submissions` (
  `id` int AUTO_INCREMENT NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(320) NOT NULL,
  `company` varchar(256),
  `category` varchar(64),
  `message` text NOT NULL,
  `isRead` boolean NOT NULL DEFAULT false,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `contact_submissions_id` PRIMARY KEY(`id`)
);

-- Page views table
CREATE TABLE IF NOT EXISTS `page_views` (
  `id` int AUTO_INCREMENT NOT NULL,
  `page` varchar(128) NOT NULL,
  `sessionId` varchar(64),
  `userAgent` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `page_views_id` PRIMARY KEY(`id`)
);

-- Agent views table
CREATE TABLE IF NOT EXISTS `agent_views` (
  `id` int AUTO_INCREMENT NOT NULL,
  `agentId` varchar(64) NOT NULL,
  `agentName` varchar(128) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `agent_views_id` PRIMARY KEY(`id`)
);
