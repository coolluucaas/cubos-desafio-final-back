 CREATE TABLE cobrancas (
    id_cobranca serial primary key,    
    id_cliente integer not null,
    nome_cliente text, 
    descricao text,
  	valor integer not null,
    data_vencimento date not null,    
    esta_pago boolean default false,  
    foreign key (id_cliente) references clientes (id_cliente),
    foreign key (nome_cliente) references clientes (nome_cliente)
   );   