  INSERT INTO clientes 
    ( id_usuario, nome_cliente, email_cliente, cpf_cliente, telefone_cliente, cep, logradouro, complemento, referencia, bairro, cidade) 
	VALUES 
   ( 1,'Diego Digiandomenico','_dabriza@email.com', '001.234.567-89','(71)12345-67890', '12345-678', 'Diego-logradouro', 'Diego-complemento','Diego-pontoDeReferencia', 'Diego-bairro','Diego-cidade'),
   ( 1,'Gabriele Landim', 'tecnologiacritica@email.com', '001.234.567-89', '(71)09876-54321', '87654-321','Gabriele-logradouro', 'Gabriele-complemento','Gabriele-pontoDeReferencia', 'Gabriele-bairro','Gabriele-cidade');

  INSERT INTO cobrancas 
    ( id_cliente, nome_cliente, descricao, data_vencimento, valor, status) 
	VALUES 
    ( 1,'Diego Digiandomenico', 'aaaaa', '2022-06-01', 1000, TRUE ),
    ( 1,'Diego Digiandomenico', 'bbbbb', '2022-06-01', 2000, TRUE ),
    ( 1,'Diego Digiandomenico', 'ccccc', '2021-09-01', 3000, FALSE ),
    ( 2,'Gabriele Landim', 'ddddd', '2022-06-01', 4000, FALSE ),
    ( 2,'Gabriele Landim', 'eeeee', '2021-11-01', 5000, FALSE );