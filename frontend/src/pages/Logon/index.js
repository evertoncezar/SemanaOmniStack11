import React , {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

function Logon(){
const [id, setID] = useState('');
const history = useHistory();

async function handleLogin(e){

    e.preventDefault(); //usado para não recarregar a página 

    try 
    {
        const response  = await api.post('sessions', { id });

       localStorage.setItem('ongId',id); //salva a informação no storage do navegador , para que toda a aplicação tenha acesso à essa informação
        localStorage.setItem('ongName',response.data.name);

        history.push('/profile');
    } 
    catch (error) 
    {
        alert('Falha no Login, tente novamente.');    
    }

}

return(
    <div className="logon-container">
        <section className="form">
            <img src={logoImg} alt="Be The Hero"/>
            <form onSubmit= {handleLogin}>  
                <h1>Faça seu Logon</h1>
                <input placeholder="Sua ID" value={id} onChange={ e => setID(e.target.value) }/>
                <button className="button" type="submit">Entrar</button>
                
                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041" />
                    Não tenho Cadastro
                </Link>
            </form>
        </section>

        <img src={heroesImg} alt="Heroes"/>
    </div>
    
);
}


export default Logon;