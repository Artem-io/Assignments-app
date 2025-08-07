CREATE TABLE assignment_names
(
    name    VARCHAR(100) NOT NULL,
    `order` INT          NOT NULL,
    CONSTRAINT pk_assignmentnames PRIMARY KEY (name)
);

ALTER TABLE assignments add column name VARCHAR(100);