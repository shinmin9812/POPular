import { NavLink } from 'react-router-dom';

export interface AccodionItemType {
  name: string;
  path: string;
}

interface Props {
  accodion: AccodionItemType;
}

const AccodionItem = ({ accodion }: Props) => {
  return <NavLink to={accodion.path}>{accodion.name}</NavLink>;
};

export default AccodionItem;
