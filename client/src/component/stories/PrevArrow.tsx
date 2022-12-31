import { FC } from 'react';

const PrevArrow: FC = (props:any) => (
  <button
    type="button"
    className="story-arrow"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    style={{
      position: 'relative',
      left: '25px',
      marginBottom: '20px',
      top: '10px',
      zIndex: '70',
    }}
  />
);

export default PrevArrow;
