
 CREATE TABLE clientes (
    id serial primary key ,
    usuario_id integer not null,
    nome text not null,  
    email text not null,
    senha text not null,
  	cpf varchar(14),
    telefone varchar(15),
   	cep varchar(9),
   	logradouro text,
   	complemento text,
    ponto_referencia text,
  	bairro text,
   	cidade text,   	
    foreign key (usuario_id) references usuarios (id)
   );