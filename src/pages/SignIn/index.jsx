import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMyContext } from '../../hooks/useMyContext';
import api from '../../services/Api';
import './style.css';

function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {user, setUser} = useMyContext();
    const navigate = useNavigate();

    useEffect(()=>{

        if(user && user.token){
            navigate('/main');
        }

    }, []);

    async function HandleSubmit(e){
        e.preventDefault();

        

        try {
            if(!email || !password){
                return alert("Todos os campos devem ser preenchidos!");
            }

            const response = await api.post('/login', { email, senha: password });
            const {usuario, token} = response.data;

            setUser({token, usuario});
            navigate('/main');
            
        } catch (error) {
            console.log(error.response);
            alert(error.response.data);
        }

    }

    return(
        <div className='container-signIn'>
            <div className='container-left'></div>
            <div className='container-rigth'>
                <div className="container-form">
                    <form onSubmit={HandleSubmit}>
                        <span>Bem vindo!</span>
                        <h1>Faça o login com sua conta</h1>
                        <div className='container-inputs'>
                            <input 
                                type="text" 
                                name='email'
                                value={email} 
                                placeholder='E-mail'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input 
                                type="password" 
                                name='password' 
                                value={password}
                                placeholder='Senha'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button 
                            className='btn-green'
                            type='submit'
                        >
                            Login
                        </button>
                    </form>
                </div>
                <p>Não tem cadastro? 
                    <Link to='/sign-up'>
                        &nbsp; Clique aqui!
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignIn;
