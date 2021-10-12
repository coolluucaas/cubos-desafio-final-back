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