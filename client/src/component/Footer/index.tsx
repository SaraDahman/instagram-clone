import { FC } from 'react';

import { footerLinks } from '../../data/FooterLinks';
import './style.css';

const Footer: FC = () => (
  <footer className="footer-profile">
    {
    footerLinks.map((link) => (<p>{link}</p>))
}
  </footer>
);

export default Footer;
