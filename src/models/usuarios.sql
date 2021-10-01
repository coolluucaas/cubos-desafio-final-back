CREATE TABLE usuarios (
    id serial primary key ,
    nome text not null,  
    email text not null,
    senha text not null,
  	cpf varchar(14),
    telefone varchar(15)
  );
  