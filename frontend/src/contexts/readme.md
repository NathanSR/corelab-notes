O Global Context serve como uma variável global que pode ser acessada em qualquer parte do sistema.
>>Ele possui um storage que é envolvido no index.tsx root da aplicação para poder ser acessada desde o componente App;
>>Ele tambem possui o context que deve ser passado para cada useContext em qualquer componente para que os valores do storage possam ser acessados no componente;