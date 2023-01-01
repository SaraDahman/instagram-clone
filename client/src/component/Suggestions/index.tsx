import { Avatar } from 'antd';
import { FC } from 'react';
import './style.css';

const Suggestions :FC = () => (
  <div className="suggestions-container">
    <section className="suggestions-current-user-container">
      <div className="current-user-box">
        <Avatar
          className="current-user-avatar"
          src="https://images.pexels.com/photos/6159139/pexels-photo-6159139.jpeg"
          alt="user-avatar"
        />
        <div className="current-username-box">
          <p className="current-username"> mah1mm2ad </p>
          <p className="current-name">Mohammed Omar</p>
        </div>
      </div>
      <p className="suggestions-switch-follow">Switch</p>
    </section>

    <section className="suggestions-for-you-box">
      <p className="suggestion-for-you-text"> Suggestions For You</p>
      <p className="seeAll">See All</p>
    </section>

    <section className="suggestions-other-user-container">
      <div className="suggestions-one-user">
        <div className="other-user-box">
          <Avatar
            className="other-user-avatar"
          // eslint-disable-next-line max-len
            src="http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcR8mRsgy0E0rw6Whm06Iu2_4chDeIR-WbtUxzMYFJHeDJTn6eY_WOtZo1ls8RY6By15"
            alt="avatar"
          />
          <div className="other-user-box-name">
            <p className="other-username">mah1mm2ad</p>
            <p className="other-user-info"> Followed by Shamshom and 3 more</p>
          </div>
        </div>
        <p className="suggestions-switch-follow">Follow</p>

      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '300px',
        // border: '1px solid blue',
        height: '55px',
        paddingTop: '10px',
        alignItems: 'center',

      }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <Avatar
          // eslint-disable-next-line max-len
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTafQcyMcnsxKp7cjLrB2BjaG711c3w4RIV2FAz9kso8Q&s"
            alt=""
            style={{
              width: '40px',
              height: '40px',

            }}
          />
          <div style={{
            display: 'flex',
            gap: '6px',
            // border: '1px solid blue',
            flexDirection: 'column',
          }}
          >
            <p style={{ color: 'black', fontWeight: '600', fontSize: '12px' }}>mah1mm2ad</p>
            <p style={{
              color: '#acacac',
              fontSize: '12px',
              width: '180px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',

            }}
            >
              Followed by Shamshom and 3 more
            </p>
          </div>
        </div>
        <p style={{ color: '#0095f6', fontSize: '12px', fontWeight: '600' }}>Follow</p>

      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '300px',
        // border: '1px solid blue',
        height: '55px',
        paddingTop: '10px',
        alignItems: 'center',

      }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <Avatar
          // eslint-disable-next-line max-len
            src="https://pbs.twimg.com/profile_images/1226626761611456513/MMyVfrYT_400x400.jpg"
            alt=""
            style={{
              width: '40px',
              height: '40px',

            }}
          />
          <div style={{
            display: 'flex',
            gap: '6px',
            // border: '1px solid blue',
            flexDirection: 'column',
          }}
          >
            <p style={{ color: 'black', fontWeight: '600', fontSize: '12px' }}>mah1mm2ad</p>
            <p style={{
              color: '#acacac',
              fontSize: '12px',
              width: '180px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',

            }}
            >
              Followed by Shamshom and 3 more
            </p>
          </div>
        </div>
        <p style={{ color: '#0095f6', fontSize: '12px', fontWeight: '600' }}>Follow</p>

      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '300px',
        // border: '1px solid blue',
        height: '55px',
        paddingTop: '10px',
        alignItems: 'center',

      }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <Avatar
          // eslint-disable-next-line max-len
            src="https://www.aljazeera.net/wp-content/uploads/2022/06/2-51.jpg?resize=770%2C513&quality=80"
            alt=""
            style={{
              width: '40px',
              height: '40px',

            }}
          />
          <div style={{
            display: 'flex',
            gap: '6px',
            // border: '1px solid blue',
            flexDirection: 'column',
          }}
          >
            <p style={{ color: 'black', fontWeight: '600', fontSize: '12px' }}>mah1mm2ad</p>
            <p style={{
              color: '#acacac',
              fontSize: '12px',
              width: '180px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',

            }}
            >
              Followed by Shamshom and 3 more
            </p>
          </div>
        </div>
        <p style={{ color: '#0095f6', fontSize: '12px', fontWeight: '600' }}>Follow</p>

      </div>
    </section>

  </div>
);

export default Suggestions;
