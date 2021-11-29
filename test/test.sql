drop database if exists xpto
create database xpto
use xpto

create table funcionarios(
    matricula int not null auto_increment primary key,
    nomeCompleto varchar(153) not null,
    dataDesligamento varchar(10) not null,
    ultimoSalario decimal (6,2) not null
);
