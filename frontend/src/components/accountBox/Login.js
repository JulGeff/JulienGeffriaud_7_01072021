import loginpic from "../../assets/login-image.png";
import '../../styles/Login_signup.css'
import { useState } from 'react'


function handleSubmit(e) {
    e.preventDefault()

}

function Login() {

const [loginOpen, setLoginOpen] = useState(true);

    return loginOpen? (<div className='loginsignup'> 
                <img src={loginpic} alt='Groupomania' className='loginpic' />
                <h1>Connectez-vous</h1>
                <form className="logform"  onSubmit={handleSubmit}>
                <label>
                   email
                    <input className="input" type="email" name="email" />
                </label>
                <label>
                   mot de passe
                    <input className="input" type="password" name="password" />
                </label>

                <input  className="button" type="submit" value="Connexion" />
                </form>
                <p>C'est votre première visite ?</p>
                <p className="changelog" onClick={() => setLoginOpen(false)}>Créez un compte</p>
            </div>):(
                <div className='loginsignup'> 
                <img src={loginpic} alt='Groupomania' className='loginpic' />
                <h1>Créez un compte</h1>
                <form className="logform" onSubmit={handleSubmit}>
                <label>
                   email
                    <input className="input" type="email" name="email" />
                </label>
                <label>
                   mot de passe
                    <input className="input" type="password" name="password" />
                </label>

                <input className="button" type="submit" value="Je crée mon compte" />
                </form>
                
                <p>Vous avez déjà un compte ?</p>
                <p className="changelog" onClick={() => setLoginOpen(true)}>Connectez-vous</p>
            </div>
            )
            
}

export default Login