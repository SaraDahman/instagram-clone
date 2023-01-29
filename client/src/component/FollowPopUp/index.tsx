/* eslint-disable no-unused-vars */
import {
  FC, useEffect, useState, useContext,
} from 'react';
import Modal from 'react-modal';
import Person from './Person';
import { ApiService } from '../../services';
import { AuthContext } from '../../context/AuthContext';
import { IFollower, IFollowPopUp } from '../../interfaces';
import './style.css';

const FollowPopUp:FC<IFollowPopUp> = ({
  isOpen, setIsOpen, type, userId,
}):any => {
  const [list, setList] = useState<IFollower[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const user = useContext(AuthContext);

  // console.log(user);

  const handleCancel = ():void => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async ():Promise<void> => {
      const query = type === 'followers' ? 'followedId' : 'followerId';

      setIsLoading(true);

      const { data } = await ApiService.get(`/api/v1/followings?${query}=${userId}`);
      setIsLoading(false);
      setList(data);

      console.log(data);
    };
    if (isOpen) fetchData();
  }, [isOpen, type]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCancel}
      style={{
        overlay: {
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          width: '25%',
          height: '400px',
          position: 'static',
          padding: 'auto',
        },
      }}
      ariaHideApp={false}
    >
      {
      isLoading ? <h1>Loading</h1> : (
        <div className="content">
          <p className="type">{type}</p>
          <div className="people">
            {
                list.map((e) => <Person item={e} key={e.id} />)
              }
          </div>
        </div>
      )
    }
    </Modal>
  );
};

export default FollowPopUp;
