 CREATE TABLE clientes (
    id_cliente serial primary key ,
    id_usuario integer not null,
    nome_cliente text not null unique,  
    email_cliente text not null unique,   
  	cpf_cliente varchar(14) unique,
    telefone_cliente varchar(15),
   	cep varchar(9),
   	logradouro text,
   	complemento text,
    referencia text,
  	bairro text,
   	cidade text,   	
    foreign key (id_usuario) references usuarios (id_usuario)
 );  