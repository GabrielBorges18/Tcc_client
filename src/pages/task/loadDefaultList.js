export function loadDefaultList(){
    const data = {
        pendentTasks: [
            { id: '1', title: 'User Experience', text: 'Melhorar e Otimizar todo o layout do sistema, deixando-o menos chapado e mais visualmente agradável' },
            { id: '2', title: 'Fazer parte funcional do módulo de Tarefas', text: 'Atualmente módulo de tarefa conta só como um layout, fazer o backend trabalhar com o frontend e deixa-lo funcional' }
        ],
        progressTasks: [
            { id: '3', title: "Terminar o Chat", text: "Terminar as funções e deixar mais visualmente agradável o CHAT do sistema" }
        ],
        concludedTasks: [
            { id: '4', title: "Painel Administrativo", text: "Moldar página responsável por cadastros e edições feitas pelo administrador do sistema" },
            { id: '5', title: "Login", text: "Fazer página de login funcional" },
            { id: '6', title: "Menu2", text: "Moldar versão inicial do Menu com icones sugestivos e navegação funcional, com opção para apenas usuario Administrador para acessar o Painel Administrativo" },
            { id: '7', title: "Login2", text: "Fazer página de login funcional" },
            { id: '8', title: "Menu3", text: "Moldar versão inicial do Menu com icones sugestivos e navegação funcional, com opção para apenas usuario Administrador para acessar o Painel Administrativo" },
            { id: '9', title: "Menu4", text: "Moldar versão inicial do Menu com icones sugestivos e navegação funcional, com opção para apenas usuario Administrador para acessar o Painel Administrativo" },
        ]
    };

    return data;
}