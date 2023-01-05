/* eslint-disable react/jsx-indent */
import { InsertRowAboveOutlined } from '@ant-design/icons';
import savedIcon from '../assets/images/saved.png';
import instagramReelIcon from '../assets/images/instagram-reel.png';
import taggedIcon from '../assets/images/tagged.png';

export const tabsItem = [{
  label:
(<span className="tab-profile post-tab-profile">
  <InsertRowAboveOutlined />
  Posts
 </span>),
  key: 'Posts',
}, {
  label: <span className="tab-profile">
    <img src={instagramReelIcon} alt="Reels" width={12} />
    Reels
         </span>,
  key: 'Reels',
}, {
  label:
  <span className="tab-profile">
    <img src={savedIcon} alt="bookMark" width={12} />
    Saved
  </span>,
  key: 'Saved',
},
{
  label: <span className="tab-profile">
    <img src={taggedIcon} alt="tagged" width={12} />
    Tagged
         </span>,
  key: 'Tagged',
}];
