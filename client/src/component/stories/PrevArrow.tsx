import { FC } from 'react';

const PrevArrow: FC = ({
  className, onClick,
}:any) => (
  <button
    type="button"
    className={className}
    onClick={onClick}
    aria-label="Save"
  />
);

export default PrevArrow;
