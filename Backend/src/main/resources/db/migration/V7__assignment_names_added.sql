CREATE TABLE assignment_names
(
    id   BINARY(16)   NOT NULL,
    name VARCHAR(255) NULL,
    CONSTRAINT pk_assignmentnames PRIMARY KEY (id)
);

ALTER TABLE assignments
    ADD assignment_name_id BINARY(16) NULL;

ALTER TABLE assignments
    ADD CONSTRAINT FK_ASSIGNMENTS_ON_ASSIGNMENTNAME FOREIGN KEY (assignment_name_id) REFERENCES assignment_names (id);