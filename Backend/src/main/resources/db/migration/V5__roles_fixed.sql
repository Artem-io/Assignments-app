CREATE TABLE user_roles
(
    user_id BINARY(16)   NOT NULL,
    role  VARCHAR(50) NULL
);

ALTER TABLE user_roles
    ADD CONSTRAINT fk_user_roles_on_user FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE users
    RENAME COLUMN authorities to roles;