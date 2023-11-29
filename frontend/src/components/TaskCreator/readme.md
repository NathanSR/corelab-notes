Este componente TaskCreator serve para criar o card para Cadastro, Vizualização e Edição de Tarefas.
Ele deve receber por parametro o method padrão, como: 
>POST = permite fazer o cadastro na api
>GET = mostra apenas o visual da tarefa, e não permite edição. Botões de salvar e excluir são ocultados.
>PUT = permite fazer alteração nos dados da tarefa, e apresenta botão de excluir;

Quando o componente é usado para mostrar ou editar uma tarefa (GET ou PUT) deve ser passado os dados da task para o parâmetro 'values'