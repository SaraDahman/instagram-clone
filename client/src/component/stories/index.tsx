/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { Avatar } from 'antd';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import PrevArrow from './PrevArrow';
import NextArrow from './NextArrow';
import { stories } from '../../data/storyData';
import './style.css';

const Stories:FC = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6.2,
    slidesToScroll: 4,
    accessibility: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider
      {...settings}
      className="story-slider"
    >
      {
        stories.map((story) => (
          <div className="story-user">
            <div className={story.seen ? 'avatar-story-seen' : 'avatar-story-unseen'}>
              <Avatar
                src={story.image}
                className="avatar"
              />
            </div>
            <p className={story.seen ? 'story-username story-username-seen '
              : 'story-username story-username-unseen'}
            >
              {story.name}

            </p>
          </div>
        ))
        }
    </Slider>
  );
};

export default Stories;
