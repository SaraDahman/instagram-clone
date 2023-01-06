import { FC } from 'react';

import './style.css';

const NextArrow: FC = ({ className, onClick }: any) => (
  <button
    type="button"
    className={className}
    onClick={onClick}
    aria-label="Save"
  />
);

export default NextArrow;
