/* eslint-disable max-len */
import {
  FC, useContext, useState, useEffect,
} from 'react';
import { Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import { IFollower } from '../../interfaces';
import { AuthContext } from '../../context/AuthContext';
import { ApiService } from '../../services';

const Person:FC<{item : IFollower, remove:boolean}> = ({ item, remove }) => {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isRemoved, setIsRemoved] = useState<boolean>(false);

  const user = useContext(AuthContext);

  useEffect(() => {
    setIsFollowed(item.following);
  }, [item]);

  const handleFollow = async (removeFollower:boolean):Promise<void> => {
    if (removeFollower) {
      setLoading(true);
      await ApiService.delete(`/api/v1/followings/${item.id}?remove=true`);
      setIsRemoved(true);
      setLoading(false);
    } else if (isFollowed) {
      setLoading(true);
      await ApiService.delete(`/api/v1/followings/${item.id}`);
      setIsFollowed(!isFollowed);
      setLoading(false);
    } else {
      setLoading(true);
      await ApiService.post(`/api/v1/followings/${item.id}`, '');
      setIsFollowed(!isFollowed);
      setLoading(false);
    }
  };

  return (
    <div className="person">
      <Avatar
        src={item.image}
        className="avatar"
      />
      <div>
        <Link to={`/${item.username}`}>
          <p className="username">{item.username}</p>
        </Link>
        <p className="name">{item.name}</p>
      </div>
      { remove ? (
        <Button
          loading={loading}
          disabled={isRemoved}
          onClick={() => handleFollow(true)}
        >
          {isRemoved ? 'removed' : 'remove'}
        </Button>
      )
        : item.id !== user?.user?.id
          ? (
            <Button
              className={!isFollowed ? 'follow' : ''}
              onClick={() => handleFollow(false)}
              loading={loading}
              disabled={loading}
            >
              {isFollowed ? 'following' : 'follow'}
            </Button>
          ) : ''}
    </div>
  );
};

export default Person;
