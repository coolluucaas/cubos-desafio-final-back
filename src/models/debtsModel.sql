 CREATE TABLE cobrancas (
    id serial primary key,    
    cliente_id integer not null,  
    data_vencimento date not null,    
  	valor integer not null,
    esta_pago boolean default false,  
    foreign key (cliente_id) references clientes (id)
   );