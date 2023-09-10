import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMyContext } from '../../hooks/useMyContext';
import api from '../../services/Api';
import './style.css';

function SignUp(){
    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: ''
    })
    const {user} = useMyContext()  ;
    const navigate = useNavigate();

    useEffect(()=>{

        if(user && user.token){
            navigate('/main');
        }

    }, []);

    async function HandleSubmit(e){
        e.preventDefault();

        try {
            if(!form.nome || !form.email || !form.senha){
                return alert('Todos os campos são obrigatórios!');
            }

            await api.post('/usuarios', form);
            alert('Usuário cadastrado com sucesso!');
            navigate('/');

        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data);
        }

    }

    function HandleChange({target}){
        setForm({...form, [target.name]: target.value});
    }

    return(
        <div className='container-signUp'>
            <div className='container-left'>
                <div className="container-form">
                    <form onSubmit={HandleSubmit}>
                        <h1>Cadastre-se</h1>
                        <div className='container-inputs'>
                            <input 
                                type="text" 
                                name='nome'
                                value={form.nome} 
                                placeholder='Nome'
                                onChange={HandleChange}
                            />
                            <input 
                                type="text" 
                                name='email'
                                value={form.email} 
                                placeholder='E-mail'
                                onChange={HandleChange}
                            />
                            <input 
                                type="password" 
                                name='senha'
                                value={form.senha} 
                                placeholder='Senha'
                                onChange={HandleChange}
                            />
                        </div>
                        <div className='container-buttons'>
                            <button 
                                className='btn-green'
                                type='submit'
                            >
                                Cadastrar
                            </button>
                            <Link to='/'>                    
                                <button 
                                    className='btn-red'
                                    type='button'
                                >
                                    Cancelar
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
                <p>Já tem cadastro? 
                    <Link to='/'>
                        &nbsp; Clique aqui!
                    </Link>
                </p>
            </div>
            <div className='container-rigth'></div>
        </div>
    );
}

export default SignUp;
