
import React, { useEffect, } from 'react';
import Api from './Api'
import '../styles/Directory.css'
import { Redirect } from 'react-router-dom';

let token = localStorage.getItem('token')

function Directory({loggedIn}) {

    const [directory, setDirectory] = React.useState([]); //initialisation du state vide
    
    useEffect(() => {

        Api.get('/auth/users',
        {   headers: {
            'Authorization': `${token}` // On sécurise la requête en incluant le token dnas les headers (cf middleware "auth")
        }}
        ) //requête GET via Axios
        .then(function (response)  {
            const directory = response.data.data;
            setDirectory(directory);
            console.log(directory)
          })
          .catch(function (response) { // Si erreur
            console.log("pb frontend", response.data);
            });
            }
      , [])

      if (!loggedIn) {
        return <Redirect to="/"/>
        }

    return (
        <div className="directory">
        <h1>Annuaire Groupomania</h1>
            <table>
                <thead>
                    <tr>
                    <td>Nom</td>
                    <td>Prénom</td>
                    <td> </td>
                    </tr>
                </thead>
                <tbody>
                    {directory.map((item,i) => 
                        <tr key={i}>
                            <td>{item.lastName}</td>
                            <td>{item.firstName}</td>
                            <td><a href={"mailto:" + item.email}> <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#E02F04" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg></a></td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    );
  };
  
export default Directory


