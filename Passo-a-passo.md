Backend

1º Iniciei o npm na pasta backend e instalei as bibliotecas e seus tipos: express, typescript, helmet, body-parser, mongoose, ts-node, bcrypt, passport...

2º Configurei o typescript, e o script 'start' no package.json;

3º Instalei e configurei o dotenv para guardar as variaveis de ambiente do servidor

3º Criei as pastas padrão para os arquivos do servidor, como models, controllers, routes, configs;

4º Criei e configurei o arquivo mongoose para se conectar com um banco de teste no mongo atlas;

5º Criei o Schema e Model do usuário com mongoose; adicionei um gancho para que toda vez que um usuário or salvo, sua senha seja criptografado com a biblioteca bcrypt;

6º Configurei os controladores de autenticação, que são o registro de usuário, de login e o de retorno de informações do usuário logado;
    > no registro de usuário é recebido os campos de nome, email e senha; Depois, esses campos são validados pois não podem estar vazio e por fim é criado uma instancia do usuário para ser salva no banco;
    > no login é recebido o email e senha; É feito uma consulta para ver se o usuário com o email informado existe, e em seguida, sua senha é validada; Por fim, se o user for autentico, será criado um token criptografado como resposta à requisição.
    > no aboutMe é retornado as informações pessoais do usuário autenticado.


Obs: antes de configurar o controlador de login, eu configurei o passport para poder criar os tokens de autenticação...

7º Adicionei os arquivos de rotas de '/auth' e conectei com o app do express. Lembrando que para a rota /auth/me, tive que botar um middleware de verificação se o usuário está autenticado.


Após terminar de configurar as rotas de autenticação de usuário, comecei a trabalhar no model das tarefas.






Verificar a ordem da lista que foi criada aqui



