CREATE TABLE comments
(
    id            BINARY(16) NOT NULL,
    creation_time DATETIME   NULL,
    text          TEXT       NULL,
    user_id       BINARY(16) NULL,
    assignment_id BINARY(16) NULL,
    CONSTRAINT pk_comments PRIMARY KEY (id),
    CONSTRAINT FK_COMMENTS_ON_ASSIGNMENT FOREIGN KEY (assignment_id) REFERENCES assignments (id),
    CONSTRAINT FK_COMMENTS_ON_USER FOREIGN KEY (user_id) REFERENCES users (id)
);