import {devs} from './DevsDetails';
import './About.scss';

function WhoWeAre () {
  return (
    <div className="about">

      <h1 className='about_main_title'> A PROPOS </h1>
      <p className="introduction">

        Les années 80: c'est cette ère très colorée que voulut faire découvrir une développeuse web aux plus jeunes d'entre nous à travers une application regroupant des jeux plus ou moins rétros et appréciés par les gamers de tout âge.
        Elle fut rejointe dans cette aventure par deux autres développeuses nées comme elle dans les eighties, et par deux développeurs tout aussi séduits par l'idée, nés, eux, à la fin des années 90 et à l’orée des années 2000.
        Tous plus friands les uns que les autres de jeux vidéo, de société et d'arcade, ils donnèrent naissance à “Arcadian Game Zone”.
      </p>    
    </div>
  );
}
 
function Developer(props) {
  const name = props.name;
  const bio = props.bio;
  const picture = props.picture;
  return (
    <div className="dev">
      <div className='pic_name_and_bio'>
          <img src={picture} className="pic" alt="{name}" />
          <div className="name_and_bio"> 
            <h3 className='dev_name'> {name} </h3>
            <p className= 'bio'>{bio} </p>
          </div>
      </div>
    </div>
  );
}

export default function About () {
  return ( 
    <section className='about_main_section'>
      <WhoWeAre/> 

      <h2 className="about_secondary_title">Nos développeurs</h2>

      <div className= 'dev_list'>
        {devs.map((dev, i) => <Developer picture={dev.picture} name={dev.name} bio={dev.bio} key={i} />)}  
      </div>
    </section>
  );
}
