import {
  FC, useRef, useState, useEffect,
} from 'react';
import { Carousel } from 'antd';
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

import './style.css';

const MediaSlider:FC<{media:string[]}> = ({ media }) => {
  const slider = useRef<any>(null);
  const imageRef = useRef<any>(null);

  const [showNext, setShowNext] = useState<boolean>(true);
  const [showPrev, setShowPrev] = useState<boolean>(false);
  const [imageHeight, setImageHeight] = useState<number>(0);

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

  useEffect(() => {
    const { offsetHeight } = imageRef.current;
    setImageHeight(+offsetHeight);
  }, []);

  return (
    <div className="img-slider">

      {showPrev && (
      <LeftCircleFilled
        className="prev-btn"
        onClick={() => slider.current.prev()}
      />
      )}

      <Carousel afterChange={onChange} ref={slider}>
        {media.map((img:string, i:number) => (
          <div className="media-post" key={uuidv4()}>
            <img
              ref={i ? undefined : imageRef}
              height={i ? imageHeight : undefined}
              src={img}
              alt="img"
            />
          </div>
        ))}
      </Carousel>

      {showNext && (
      <RightCircleFilled
        className="next-btn"
        onClick={() => slider.current.next()}
      />
      )}
    </div>
  );
};

export default MediaSlider;
