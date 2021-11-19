import React from 'react';
import api from '../../services/api'

export default class Redirect extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            code: ""
        };
    }

    async componentDidMount() {
        const currentUrl = window.location.href;
        const searchParams = new URL(currentUrl).searchParams;
        const code = searchParams.get('code');
        const user_id = localStorage.getItem('@seger/user_info')
        const response = await api.post("calendar/setToken", { code, user_id });
        if(response.status == 200){
            alert("Integração efetuada com sucesso, recarregue a página de edição de usuario");
        }
        else{
            alert("Erro ao efetuar integração, tente novamente mais tarde");
        }
        window.close();
    }


    render() {
        return (
            <>
                Efetuando integração, aguarde...
            </>
        )
    }


}


