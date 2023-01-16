import { FC } from 'react';

import { Spin } from 'antd';

import './style.css';

const Loading: FC = () => (
  <div className="loading"><Spin /></div>

);

export default Loading;
