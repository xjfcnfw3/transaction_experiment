create table book
(
    id   varchar(36) default (uuid()) null,
    name varchar(225)                 null
);