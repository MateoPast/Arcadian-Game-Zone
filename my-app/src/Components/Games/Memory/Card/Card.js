import { useState, useEffect } from "react";
import classNames from 'classnames';
import clock from '../../../../assets/images/Games/Memory/clock.png';
import './Card.scss';

function Card({
    active,
    index,
    id,
    src,
    handleClick,
}) 


{
  //const [Flipped, setFlipped] = useState(false);
      

  return (
    <div id={id} className={classNames("card_memory", {'active-side' : active })} onClick={e => handleClick(index)} >
        <div className="card-front card-side">
          <img className="image_front-side" src={clock} alt="" />
        </div>
        <div className="card-back card-side">
            <img className="image_back-side" src={src} alt="" />
        </div>
    </div>
  );
}

export default Card;