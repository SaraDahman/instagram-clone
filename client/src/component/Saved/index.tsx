import { FC, useState } from 'react';

import ProfilePosts from '../ProfilePosts';
import EmptyPosts from '../EmptyPosts';
import savedIcon from '../../assets/images/saved.png';

const Saved:FC = () => {
  const [bookmarks] = useState<any>([]);
  return (
    <div>
      { bookmarks.length ? <ProfilePosts /> : (
        <EmptyPosts
          icon={savedIcon}
          title="Start Saving"
          content="Save photos and videos to your all posts collection"
          isPost={false}
        />
      ) }
    </div>

  );
};

export default Saved;
