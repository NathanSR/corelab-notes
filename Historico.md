Backend

1º Iniciei o npm na pasta backend e instalei as bibliotecas e seus tipos: express, typescript, helmet, body-parser, mongoose, ts-node, bcrypt, passport...

2º Configurei o typescript, e o script 'start' no package.json;

3º Instalei e configurei o dotenv para guardar as variaveis de ambiente do servidor

4º Criei as pastas padrão para os arquivos do servidor, como models, controllers, routes, configs;

5º Criei e configurei o arquivo mongoose para se conectar com um banco de teste no mongo atlas;

6º Criei o Schema e Model do usuário com mongoose; adicionei um gancho para que toda vez que um usuário or salvo, sua senha seja criptografado com a biblioteca bcrypt;

7º Configurei os controladores de autenticação, que são o registro de usuário, de login e o de retorno de informações do usuário logado;
    > no registro de usuário é recebido os campos de nome, email e senha; Depois, esses campos são validados pois não podem estar vazio e por fim é criado uma instancia do usuário para ser salva no banco;
    > no login é recebido o email e senha; É feito uma consulta para ver se o usuário com o email informado existe, e em seguida, sua senha é validada; Por fim, se o user for autentico, será criado um token criptografado como resposta à requisição.
    > no aboutMe é retornado as informações pessoais do usuário autenticado.


Obs: antes de configurar o controlador de login, eu configurei o passport para poder criar os tokens de autenticação...

8º Adicionei os arquivos de rotas de '/auth' e conectei com o app do express. Lembrando que para a rota /auth/me, tive que botar um middleware de verificação se o usuário está autenticado.

9º Após terminar de configurar as rotas de autenticação de usuário, comecei a trabalhar no model das tarefas. Além dos campos de titulo, e descrição, implementei o campo de cor e favorito.

10º Com model pronto, comecei a criar os controladores para as tasks, como o controlador
    > de registro, que recebe um objeto data com as informações da tarefa para ser registrado no banco;
    > getTasks, que retorna todas as tarefas do usuário logado, além de filtrá-los caso seja passado valores de pesquisa nos parametros de query;
    > updateTask, que recebe o id da tarefa por parametro e o objeto de informações para a atualização da tarefa;
    > deleteTask, que remove a tarefa do usuário cujo o id foi passado por parametro.

11º após o crud das tarefas ser criado, configurei as rotas da tarefa para atender seus controladores;

OBS:Lembrando que durante a configuração de todas as rotas, eu fui testando com a extensão Thunder do Vscode para ver se as entradas e saídas de cada requisição estava funcionando corretamente...

Backend finalizado... Agora é hora de criar a interface com o React...


Frontend

1º A primeira coisa a se fazer é instalar o projeto react com typescript;

2º Depois instalei a biblioteca de rotas do react, criei as pastas e arquivos das páginas padrão, como Initial, Home, Register e Login, e configurei as rotas para cada uma delas, como /, /register, /login, /home

3º Criei a página inicial, cujo foco principal é apresentar os botões para as páginas de Registro e Login;








Verificar a ordem da lista que foi criada aqui



