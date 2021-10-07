DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS cobrancas;

CREATE TABLE usuarios (
    id serial primary key ,
    nome text not null,  
    email text not null unique,
    senha text not null,
  	cpf varchar(14),
    telefone varchar(15)
  );
  
 CREATE TABLE clientes (
    id serial primary key ,
    usuario_id integer not null,
    nome text not null,  
    email text not null unique,   
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

 CREATE TABLE cobrancas (
    id serial primary key,    
    cliente_id integer not null,  
    data_vencimento date not null,    
  	valor integer not null,
    esta_pago boolean default false,  
    foreign key (cliente_id) references clientes (id)
   );