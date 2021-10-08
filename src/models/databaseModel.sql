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
    nome_cliente text not null,  
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
    nome_cliente text, 
    descricao text,
    data_vencimento date not null,    
  	valor integer not null,
    esta_pago boolean default false,  
    foreign key (id_cliente) references clientes (id_cliente)
   );
   
  INSERT INTO clientes 
    ( id_usuario, nome_cliente, email_cliente, cpf_cliente, telefone_cliente, cep, logradouro, complemento, referencia, bairro, cidade) 
	VALUES 
   ( 1,'Diego Digiandomenico','_dabriza@email.com', '001.234.567-89','(71)12345-67890', '12345-678', 'Diego-logradouro', 'Diego-complemento','Diego-pontoDeReferencia', 'Diego-bairro','Diego-cidade'),
   ( 1,'Gabriele Landim', 'tecnologiacritica@email.com', '001.234.567-89', '(71)09876-54321', '87654-321','Gabriele-logradouro', 'Gabriele-complemento','Gabriele-pontoDeReferencia', 'Gabriele-bairro','Gabriele-cidade');

  INSERT INTO cobrancas 
    ( id_cliente, nome_cliente, descricao, data_vencimento, valor, esta_pago) 
	VALUES 
    ( 1,'Diego Digiandomenico', 'aaaaa', '2022-06-01', 1000, TRUE ),
    ( 1,'Diego Digiandomenico', 'bbbbb', '2022-06-01', 2000, TRUE ),
    ( 1,'Diego Digiandomenico', 'ccccc', '2021-09-01', 3000, FALSE ),
    ( 2,'Gabriele Landim', 'ddddd', '2022-06-01', 4000, FALSE ),
    ( 2,'Gabriele Landim', 'eeeee', '2021-11-01', 5000, FALSE );
