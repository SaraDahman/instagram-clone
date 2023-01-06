/* eslint-disable react/jsx-indent */
import { InsertRowAboveOutlined } from '@ant-design/icons';
import savedIcon from '../../assets/images/saved.png';
import instagramReelIcon from '../../assets/images/instagram-reel.png';
import taggedIcon from '../../assets/images/tagged.png';

export const tabsItem = [{
  label:
(<span className="tab-profile post-tab-profile">
  <InsertRowAboveOutlined className="tab-icon" />
  <span className="tab-text">Posts</span>
 </span>),
  key: 'Posts',
},

{
  label:
  <span className="tab-profile">
    <img src={savedIcon} alt="bookMark" width={12} />
    <span className="tab-text">Saved</span>

  </span>,
  key: 'Saved',
},

{
  label: <span className="tab-profile">
    <img src={instagramReelIcon} alt="Reels" width={12} />
    <span className="tab-text">Reels</span>
         </span>,
  key: 'Reels',
  disabled: true,
},

{
  label: <span className="tab-profile tagged-icon">
    <img src={taggedIcon} alt="tagged" width={12} />
    <span className="tab-text">Tagged</span>
         </span>,
  key: 'Tagged',
  disabled: true,

}];
