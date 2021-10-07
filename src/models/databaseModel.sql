DROP TABLE IF EXISTS cobrancas;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id serial primary key ,
    nome text not null,  
    email text not null unique,
    senha text not null,
  	cpf varchar(14),
    telefone varchar(15)
);

  INSERT INTO usuarios 
    ( nome, email, senha) 
	VALUES 
   ( 'Maria','culinariamaterna@email.com', 'sucoAbacate'),
   ( 'Lucas Prates', 'brinquedoscriativos@email.com','coolToys');
  
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

   INSERT INTO clientes 
    ( usuario_id, nome, email ) 
	VALUES 
   ( 1,'Diego Digiandomenico','_dabriza@email.com'),
   ( 2,'Gabriele Landim', 'tecnologiacritica@email.com');

 CREATE TABLE cobrancas (
    id serial primary key,    
    cliente_id integer not null,
    nome text, 
    descricao text,
    data_vencimento date not null,    
  	valor integer not null,
    esta_pago boolean default false,  
    foreign key (cliente_id) references clientes (id)
   );

  INSERT INTO cobrancas 
    ( cliente_id, nome, descricao, data_vencimento, valor, esta_pago) 
	VALUES 
    ( 1,'Diego Digiandomenico', 'aaaaa', '2022-06-01', 1000, TRUE ),
    ( 1,'Diego Digiandomenico', 'bbbbb', '2022-06-01', 2000, TRUE ),
    ( 1,'Diego Digiandomenico', 'ccccc', '2021-09-01', 3000, FALSE ),
    ( 2,'Gabriele Landim', 'ddddd', '2022-06-01', 4000, FALSE ),
    ( 2,'Gabriele Landim', 'eeeee', '2021-11-01', 5000, FALSE );
