import { FC, useEffect, useState } from 'react';

import ProfilePosts from '../ProfilePosts';
import EmptyPosts from '../EmptyPosts';
import savedIcon from '../../assets/images/saved.png';
import { IProfilePosts } from '../../interfaces/IProfilePosts';
import { ApiService } from '../../services/ApiService';

const Saved:FC = () => {
  const [isPostsLoading] = useState<boolean>(false);
  const [bookmarks, setBookMarks] = useState<IProfilePosts[]>([]);
  const getBookmarks = async ():Promise<void> => {
    try {
      const response = await ApiService.get('/api/v1/bookmarks/');
      setBookMarks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);
  return (
    <div style={{ marginBottom: '20px' }}>
      { bookmarks.length ? <ProfilePosts isPostsLoading={isPostsLoading} posts={bookmarks} /> : (
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
