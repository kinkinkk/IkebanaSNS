
/* Drop Indexes */

DROP INDEX AUTHOER_INDEXS;
DROP INDEX AUTHOER_IMAGE_INDEXS;
DROP INDEX COMMENT_INDEXS;
DROP INDEX FAVORITE_INDEXS;
DROP INDEX FLOWER_INDEXS;
DROP INDEX ORGAN_INDEXS;
DROP INDEX TOOL_INDEXS;
DROP INDEX USE_FLOWER_INDEXS;
DROP INDEX USE_ORGAN_INDEXS;
DROP INDEX USE_TOOL_INDEXS;



/* Drop Tables */

DROP TABLE AUTHOERS;
DROP TABLE AUTHOER_IMAGES;
DROP TABLE COMMENTS;
DROP TABLE FAVORITES;
DROP TABLE USE_FLOWERS;
DROP TABLE FLOWERS;
DROP TABLE USE_ORGANS;
DROP TABLE ORGANS;
DROP TABLE USE_TOOLS;
DROP TABLE TOOLS;
DROP TABLE USERS;




/* Create Tables */

CREATE TABLE USERS
(
	ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
	NICKNAME TEXT NOT NULL,
	AUTH_CODE TEXT DEFAULT '0' NOT NULL,
	BIRTHDAY TEXT DEFAULT 'null',
	AUTHOER_IMAGES_ID INTEGER,
	CREATE_DATE TEXT,
	UPDATE_DATE TEXT
);


CREATE TABLE AUTHOERS
(
	ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
	USER_ID INTEGER DEFAULT 1 NOT NULL,
	TITLE TEXT NOT NULL,
	AUTHOER_IMAGES_ID INTEGER,
	POSTING_DATE TEXT,
	LOCATE TEXT DEFAULT 'null',
	SCHOOL TEXT,
	STYLE TEXT,
	ORGAN_ID INTEGER DEFAULT null,
	USE_FLOWER_ID INTEGER DEFAULT null,
	USE_TOOL_ID INTEGER DEFAULT null,
	APPEAL TEXT DEFAULT 'null',
	CHECK_POINT TEXT DEFAULT 'null',
	CREATE_DATE TEXT DEFAULT 'null',
	UPDATE_DATE TEXT DEFAULT 'null',
	FOREIGN KEY (USER_ID)
	REFERENCES USERS (ID)
);


CREATE TABLE AUTHOER_IMAGES
(
	ID INTEGER NOT NULL,
	BRANCH_ID INTEGER NOT NULL,
	IMAGE NONE
);


CREATE TABLE COMMENTS
(
	ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	SERVER_AUTHOER_ID INTEGER NOT NULL,
	CONTENT TEXT
);


CREATE TABLE FAVORITES
(
	ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	SERVER_AUTHOER_ID INTEGER NOT NULL UNIQUE
);


CREATE TABLE FLOWERS
(
	ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
	NAME TEXT NOT NULL,
	NAME_KANA TEXT NOT NULL,
	SEASON_MONTH NUMERIC NOT NULL,
	IMAGE NONE
);


CREATE TABLE ORGANS
(
	ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
	NAME TEXT NOT NULL,
	IMAGE NONE
);


CREATE TABLE TOOLS
(
	ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
	NAME TEXT NOT NULL,
	IMAGE NONE
);


CREATE TABLE USE_FLOWERS
(
	ID INTEGER NOT NULL,
	FLOWER_ID INTEGER NOT NULL,
	FOREIGN KEY (FLOWER_ID)
	REFERENCES FLOWERS (ID)
);


CREATE TABLE USE_ORGANS
(
	ID INTEGER,
	ORGAN_ID INTEGER NOT NULL,
	FOREIGN KEY (ORGAN_ID)
	REFERENCES ORGANS (ID)
);


CREATE TABLE USE_TOOLS
(
	ID INTEGER,
	TOOL_ID INTEGER NOT NULL,
	FOREIGN KEY (TOOL_ID)
	REFERENCES TOOLS (ID)
);



/* Create Indexes */

CREATE INDEX AUTHOER_INDEXS ON AUTHOERS (USER_ID, TITLE, POSTING_DATE, LOCATE, SCHOOL, STYLE, ORGAN_ID);
CREATE INDEX AUTHOER_IMAGE_INDEXS ON AUTHOER_IMAGES (ID);
CREATE INDEX COMMENT_INDEXS ON COMMENTS (ID, SERVER_AUTHOER_ID);
CREATE INDEX FAVORITE_INDEXS ON FAVORITES (ID, SERVER_AUTHOER_ID);
CREATE INDEX FLOWER_INDEXS ON FLOWERS (ID, NAME, NAME_KANA, SEASON_MONTH);
CREATE INDEX ORGAN_INDEXS ON ORGANS (ID, NAME);
CREATE INDEX TOOL_INDEXS ON TOOLS (ID, NAME);
CREATE INDEX USE_FLOWER_INDEXS ON USE_FLOWERS (ID);
CREATE INDEX USE_ORGAN_INDEXS ON USE_ORGANS (ID);
CREATE INDEX USE_TOOL_INDEXS ON USE_TOOLS (ID);



