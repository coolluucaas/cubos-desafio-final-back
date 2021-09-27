DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id serial primary key ,
    nome text not null,  
    email text not null,
    senha text not null,
  	cpf varchar(11),
    telefone varchar(11),
  );
  
 CREATE TABLE clientes (
    id serial primary key ,
    usuario_id integer not null,
    nome text not null,  
    email text not null,
    senha text not null,
  	cpf varchar(11),
    telefone varchar(11),
   	cep varchar(8),
   	logradouro text,
   	complemento text,
  	bairro text,
   	cidade text,
   	estado text,
    foreign key (usuario_id) references usuarios (id)
   );