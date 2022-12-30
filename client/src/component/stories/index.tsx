/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { Avatar } from 'antd';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import me from '../../assets/me.jpg';
import './style.css';

const SamplePrevArrow = (props:any) => {
  const { style, className, onClick } = props;
  return (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        color: 'black',
        fontWeight: 'bolder',
        backgroundColor: 'rgba(255, 255, 255, 0.479)',
      }}
      onClick={onClick}
    />
  );
};

const Stories:FC = () => {
  const size = 55;
  // const [options, setOptions] = useState({ width: 600, display: true });

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    slide: 'div',
    // eslint-disable-next-line react/no-unstable-nested-components
    customPaging: () => (
      <button type="button">
        {/* This is the next arrow icon */}
        <svg viewBox="0 0 24 24" width="24" height="24" style={{ backgroundColor: 'black' }}>
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>
    ),
    nextArrow: <SamplePrevArrow />,
  };
  return (
    <div className="stories-container">
      {/* <button type="button">+</button> */}
      <Slider
        {...settings}
        vertical={false}
        className="mohammed"

      >
        <div className="user-story">
          <div className="avatar-story">
            <Avatar src={me} size={size} />
          </div>
          <p className="username-story">5horses.co</p>
        </div>

        <div className="user-story">
          <div className="avatar-story">
            <Avatar src={me} size={size} />
          </div>
          <p className="username-story">ali_shbair</p>
        </div>

        <div className="user-story">
          <div className="avatar-story">
            <Avatar src={me} size={size} />
          </div>
          <p className="username-story">nader_esh</p>
        </div>

        <div className="user-story">
          <div className="avatar-story">
            <Avatar src={me} size={size} />
          </div>
          <p className="username-story">mahmoud..</p>
        </div>

        <div className="user-story">
          <div className="avatar-story">
            <Avatar src={me} size={size} />
          </div>
          <p className="username-story">yahya_alkhal</p>
        </div>

        <div className="user-story">
          <div className="avatar-story">
            <Avatar src={me} size={size} />
          </div>
          <p className="username-story">sami_reefai </p>
        </div>
      </Slider>
      {/* <button type="button">-</button> */}
    </div>
  );
};

export default Stories;
