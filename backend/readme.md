API de Tarefas

Nessa api, deve-se registrar usuário para poder cadastrar, ler, atualizar ou deletar tarefas.

    Rotas de autenticação

    > POST /auth/register
        - objetivo: registrar usuário
        - inputs:
            - req.body => name, email, password

    > POST /auth/login
        - objetivo: autenticar usuário
        - inputs: 
            - req.body => email, password

    > GET /auth/me
        - objetivo: retornar informações do usuário logado



    Rotas de Tarefas

    > POST /tasks
        - objetivo: Cadastrar tarefa relacionada ao usuário logado
        - inputs:
            - req.body => data = { title, description, color, isFavorite }

    > GET /tasks
        - objetivo: Retornar tarefas relacionadas ao usuário logado. Pode ser passado filtros de consulta por query strings
        - inputs:
            - req.query => title, description, color, isFavorite

    > PUT /tasks/:taskId
        - objetivo: Atualizar campos de uma tarefa relacionada ao usuário logado
        - inputs:
            - req.params => taskId = id da tarefa
            - req.body => data = { title, description, color, isFavorite }

    > DELETE /tasks/:taskId
        - objetivo: Deletar uma tarefa relacionada ao usuário logado
        - inputs:
            - req.params => taskId = id da tarefa

    