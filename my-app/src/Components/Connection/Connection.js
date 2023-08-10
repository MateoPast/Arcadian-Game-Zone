import './Connection.scss';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login ({ login }) {
    const navigate = useNavigate();
    const[mail, setMail] = useState('');
    const[password, setPassword] = useState('');
    const[error_message, setErrorMessage] = useState(undefined);

    const SendUsersDetails = async (e) => {e.preventDefault();
        try { 
            const response = await axios.post(`/API/auth/login`, {mail, password});
            
            const data = response.data;
            
            if (data.status === 'success') {
                login(data.userId, data.access_token);
                navigate("/");
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
                <h1>Identifiez-vous</h1>
                <p>pour enregistrer vos scores.</p>
            </aside>

            <form action='' onSubmit={SendUsersDetails}> 
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
                    Se connecter
                </button>
                <p className="form-input-login">
                    Vous n'avez pas encore de compte ?
                </p>
                <Link to='/signup' className='button'>Créer un compte</Link>
            </form>
        </div>
     );
 }


