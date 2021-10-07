CREATE TABLE clientes (
    id serial primary key ,
    usuario_id integer not null,
    nome text not null,  
    email text not null,    
  	cpf varchar(14),
    telefone varchar(15),
   	cep varchar(9),
   	logradouro text,
   	complemento text,
    referencia text,
  	bairro text,
   	cidade text,   	
   foreign key (usuario_id) references usuarios (id)
);