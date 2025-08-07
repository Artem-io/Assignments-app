CREATE TABLE assignments
(
    id              BINARY(16)   NOT NULL,
    status          VARCHAR(100) NULL,
    githuburl       VARCHAR(100) NULL,
    branch          VARCHAR(100) NULL,
    review_videourl VARCHAR(100) NULL,
    user_id         BINARY(16)   NULL,
    CONSTRAINT pk_assignments PRIMARY KEY (id)
);

CREATE TABLE users
(
    id                BINARY(16)   NOT NULL,
    username          VARCHAR(100) NULL,
    password          VARCHAR(100) NULL,
    cohort_start_date date         NULL,
    CONSTRAINT pk_users PRIMARY KEY (id)
);

ALTER TABLE assignments
    ADD CONSTRAINT FK_ASSIGNMENTS_ON_USER FOREIGN KEY (user_id) REFERENCES users (id);