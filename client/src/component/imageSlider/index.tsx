import { FC, useRef, useState } from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

import './style.css';

const ImageSlider:FC<{media:string[]}> = ({ media }) => {
  const slider = useRef<any>(null);
  const [showNext, setShowNext] = useState<boolean>(true);
  const [showPrev, setShowPrev] = useState<boolean>(false);

  const onChange = (currentSlide: number):void => {
    if (currentSlide === media.length - 1) {
      setShowNext(false);
    } else {
      setShowNext(true);
    }

    if (currentSlide === 0) {
      setShowPrev(false);
    } else {
      setShowPrev(true);
    }
  };

  return (
    <div className="img-slider">

      {showPrev && (
      <LeftOutlined
        className="prev-btn"
        onClick={() => slider.current.prev()}
      />
      )}

      <Carousel afterChange={onChange} ref={slider}>
        {media.map((img:string) => (
          <div className="media-post" key={uuidv4()}>
            <img src={img} alt="img" />
          </div>
        ))}
      </Carousel>

      {showNext && (
      <RightOutlined
        className="next-btn"
        onClick={() => slider.current.next()}
      />
      )}
    </div>
  );
};

export default ImageSlider;
