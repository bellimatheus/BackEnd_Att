drop database if exists getNinja
create database getNinja
use getNinja

create table func(
    idPrest int not null auto_increment primary key,
    prestador varchar(153) not null,
    horasTrab decimal(3,1) not null,
    valorHr decimal (3,1) not null
);