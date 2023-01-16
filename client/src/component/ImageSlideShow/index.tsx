import { FC, useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import './style.css';

import screen1 from '../../assets/images/screenshot1-2x.png';
import screen2 from '../../assets/images/screenshot2-2x.png';
import screen3 from '../../assets/images/screenshot3-2x.png';
import screen4 from '../../assets/images/screenshot4-2x.png';

const ImageSlideshow:FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [transitionState, setTransitionState] = useState('entered');

  const images = [screen1, screen2, screen3, screen4];
  useEffect(() => {
    const interval = setInterval(() => {
      setTransitionState('exiting');
      setCurrentImage((currentImage + 1) % images.length);
      setTransitionState('entering');
      setTransitionState('entered');
    }, 7000);
    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  return (
    <div className="auth-trailer">
      <Transition in timeout={1000}>
        {() => (
          <div
            key={currentImage}
            style={{
              transition: 'opacity 0.5s ease-in-out',
              opacity: transitionState === 'entering' || transitionState === 'exiting' ? 0 : 1,
            }}
            className="image-slide-show"
          >
            <img src={images[currentImage]} alt={`${currentImage + 1}`} />
          </div>
        )}
      </Transition>
    </div>
  );
};

export default ImageSlideshow;
