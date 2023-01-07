import { FC } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { footerLinks } from '../../data/FooterLinks';
import './style.css';

const Footer: FC = () => (
  <footer className="footer-profile">
    {
    footerLinks.map((link) => (<p key={uuidv4()}>{link}</p>))
}
  </footer>
);

export default Footer;
