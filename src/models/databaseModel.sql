DROP TABLE IF EXISTS cobrancas;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id_usuario serial primary key ,
    nome_usuario text not null,  
    email_usuario text not null unique,
    senha text not null,
  	cpf_usuario varchar(14),
    telefone_usuario varchar(15)
);
  
 CREATE TABLE clientes (
    id_cliente serial primary key ,
    id_usuario integer not null,
    nome_cliente text not null unique,  
    email_cliente text not null unique,   
  	cpf_cliente varchar(14),
    telefone_cliente varchar(15),
   	cep varchar(9),
   	logradouro text,
   	complemento text,
    referencia text,
  	bairro text,
   	cidade text,   	
    foreign key (id_usuario) references usuarios (id_usuario)
 );  

 CREATE TABLE cobrancas (
    id_cobranca serial primary key,    
    id_cliente integer not null,
    nome_cliente text not null, 
    descricao text not null,
  	valor bigint not null,
    data_vencimento date not null,    
    status text not null,    
    foreign key (nome_cliente) references clientes (nome_cliente),
    foreign key (id_cliente) references clientes (id_cliente)   
   );    

