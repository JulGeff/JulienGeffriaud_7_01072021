
import '../styles/Banner.css'
import logo from '../assets/logo.png'

function Banner() {
    return  <div className='banner'> 
                <img src={logo} alt='Groupomania' className='logo' />
                <h1>Bienvenue sur le réseau interne Groupomania !</h1>
            </div>
}

export default Banner