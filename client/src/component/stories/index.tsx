import { FC } from 'react';
import { Avatar } from 'antd';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import PrevArrow from './PrevArrow';
import NextArrow from './NextArrow';
import { userData } from '../../data/FakeUsersData';
import './style.css';

const Stories:FC = () => (
  <Slider
    dots={false}
    infinite={false}
    speed={500}
    slidesToShow={6}
    slidesToScroll={4}
    accessibility
    nextArrow={<NextArrow />}
    prevArrow={<PrevArrow />}
    className="story-slider"
  >
    {
        userData.map((story) => (
          <div className="story-user" key={story.id}>
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

export default Stories;
