import { FC, useState } from 'react';

import ProfilePosts from '../ProfilePosts';
import EmptyPosts from '../EmptyPosts';
import savedIcon from '../../assets/images/saved.png';
import { IProfilePosts } from '../../interfaces/IProfilePosts';

const Saved:FC = () => {
  const [isPostsLoading] = useState<boolean>(false);
  const [userPosts] = useState<IProfilePosts[]>([]);
  const [bookmarks] = useState<any>([]);
  return (
    <div>
      { bookmarks.length ? <ProfilePosts isPostsLoading={isPostsLoading} posts={userPosts} /> : (
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
