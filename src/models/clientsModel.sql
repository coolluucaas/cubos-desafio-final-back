CREATE TABLE clientes (
    id serial primary key ,
    id_usuario integer not null,
    nome_cliente text not null,  
    email text not null,    
  	cpf varchar(14),
    telefone varchar(15),
   	cep varchar(9),
   	logradouro text,
   	complemento text,
    referencia text,
  	bairro text,
   	cidade text,   	
   foreign key (id_usuario) references usuarios (id)
);