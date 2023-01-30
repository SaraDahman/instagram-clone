import { FC } from 'react';

import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const ImageLoading : FC = () => <Spin indicator={antIcon} />;
export default ImageLoading;
