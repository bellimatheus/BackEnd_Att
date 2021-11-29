drop database if exists XPTO
create database XPTO
use XPTO

create table funcionarios(
    matricula int not null auto_increment primary key,
    nomeCompleto varchar(153) not null,
    dataDesligamento date not null,
    ultimoSalario decimal (6,2) not null,
    aliquota float (4,3)
    irrp float (4,1)
);
