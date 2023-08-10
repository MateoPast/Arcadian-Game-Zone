import '../Connection/Connection.scss';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup ({ login }) {
    const navigate = useNavigate();

    const[user_name, setUser_name] = useState('');
    const[mail, setMail] = useState('');
    const[password, setPassword] = useState('');
    const[error_message, setErrorMessage] = useState(undefined);

    const SubmitForm  = async (e)=> {e.preventDefault();
        try {
            const response = await axios.post(`/API/auth/signup`, {user_name, mail, password});
            
            const data = response.data;

            if (data.status === 'success') {
                login(data.userId, data.access_token);
                navigate('/profil');

            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.error);
        }
    };

    return (
        <div className='sign_in'>
            <aside>
                <h1>Inscrivez-vous</h1>
                <p>pour créer votre compte</p>
            </aside>

            <form action='' onSubmit={SubmitForm}>
                <label htmlFor='userName'>Nom d'utilisateur</label>
                <input type='text' placeholder='John07'
                    value={user_name} onChange={(e)=>setUser_name(e.target.value)} />

                <label htmlFor='emailAddress'>Adresse e-mail</label>
                <input type='email' placeholder='johndoe@example.com' id='emailAddress'
                    value={mail} onChange={(e)=>setMail(e.target.value)} />

                <label htmlFor='userPassword'>Mot de passe</label>
                <input type='password' placeholder='*********' id='userPassword'
                    value={password} onChange={(e)=>setPassword(e.target.value)}/>

                <p className='error'>
                    {error_message}
                </p>

                <button type='submit'>
                    Créer un compte
                </button>
                <p className='form-input-login'>
                    Vous avez déjà un compte ?
                </p>
                <Link to='/connection' className='button'>Se connecter</Link>
            </form>
        </div>

    );
}
