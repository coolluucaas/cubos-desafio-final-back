 CREATE TABLE dividas (
    id serial primary key,    
    cliente_id integer not null,  
    data_vencimento date not null,    
  	valor integer not null,
    data_pagamento date,  
    foreign key (cliente_id) references clientes (id)
   );