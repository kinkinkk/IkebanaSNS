
/* Drop Tables */

DROP TABLE AUTHOERS;
DROP TABLE AUTHOER_IMAGES;
DROP TABLE COMMENTS;
DROP TABLE FAVORIT;
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
	NAME TEXT NOT NULL,
	AUTHOER_IMAGES_ID INTEGER,
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


CREATE TABLE FAVORIT
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
	AUTHOER_IMAGES_ID INTEGER
);


CREATE TABLE ORGANS
(
	ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
	NAME TEXT NOT NULL,
	AUTHOER_IMAGES_ID INTEGER
);


CREATE TABLE TOOLS
(
	ID INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
	NAME TEXT NOT NULL,
	AUTHOER_IMAGES_ID INTEGER
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


