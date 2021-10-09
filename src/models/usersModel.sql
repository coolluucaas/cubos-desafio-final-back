CREATE TABLE usuarios (
    id_usuario serial primary key ,
    nome_usuario text not null,  
    email_usuario text not null unique,
    senha text not null,
  	cpf_usuario varchar(14),
    telefone_usuario varchar(15)
);