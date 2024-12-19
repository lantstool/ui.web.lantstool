import { Link } from 'react-router-dom';
import { Button } from '../../../../../../../_general/Button/Button.jsx';
import cn from './OuterLink.module.scss';

export const OuterLink = ({ link: { type, url } }) => (
  <Link target="_blank" rel="noopener noreferrer" to={url}>
    <Button size="small" color="tertiary" IconLeft={() => <span className={cn[type]} />} />
  </Link>
);
