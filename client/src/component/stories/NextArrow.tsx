import { FC } from 'react';

import './style.css';

const NextArrow: FC = (props:any) => (
  <button
    type="button"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    style={{
      marginBottom: '20px',
      position: 'relative',
      top: '10px',
      right: '45px',
    }}
  />
);

export default NextArrow;
