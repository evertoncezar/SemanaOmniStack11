import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();
    
    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };
        
        try {
            //enviando os dados do formulário para o banco 
            const response = await api.post('ongs',data); 

            alert(`Seu ID de Acesso: ${response.data.id}`);
            
            history.push('/'); //envia o usuário para a rota /
        }
        catch (error)
        {
            alert('Error no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho Cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" value={name} onChange = {e => setName(e.target.value)} />
                    <input type="email" placeholder="E-mail" value={email} onChange = {e => setEmail(e.target.value)} />
                    <input placeholder="WhatsApp" value={whatsapp} onChange = {e => setWhatsApp(e.target.value)}/>
                    <div className="input-group">
                        <input placeholder="Cidade" value={city} onChange = {e => setCity(e.target.value)}/>
                        <input placeholder="UF" style={{ width: 80}} value={uf} onChange = {e => setUF(e.target.value)}/>                    
                    </div>

                <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Register;