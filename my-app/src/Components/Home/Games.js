import {games} from './GamesDetails';
import titlejeu from '../../assets/images/Home/Titrepagejeu.png';
import {Link} from 'react-router-dom';
import './Games.scss';

function ShowTitle () {
  
    return (
      <div className="showTitle-game">
        <div className='titleGame'>
          <img src={titlejeu} className='header-home' alt="Titre jeu" />
        </div>
      </div>
      
    );
  }

function ShowGames(props) {
  const name = props.name;
  const description = props.description;
  const picture = props.picture;
  const url = props.url;
  
  return (
    <div className="gameUp">
      <div className='gameZone'>
        <div className='overflow'>
          <img src={picture} className="picGame" alt="{name}" />
        </div>
        <div className="gameDescription"> 
          <h3 className='nameGame'> {name} </h3>
          <p className= 'descriptionGame'>{description} </p>
        </div>
        <Link to={url}> 
           <button className='btnGame'>Jouer</button> 

      </Link>
      </div>
    </div>
    

  );
}

export default function Games () {
  return ( 
    <section className='sectionGames'>
      <ShowTitle/>
      <div className= 'gameList'>
        
        {games.map(game => <ShowGames key={game.id} picture={game.picture} name={game.name} description={game.description} url={game.url}/>)}   
      </div>
     
    </section>
  );
}


