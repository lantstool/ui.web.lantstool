import { MenuItem } from '../../../../../../../../_general/menu/MenuItem/MenuItem.jsx';
import { Menu as GeneralMenu } from '../../../../../../../../_general/menu/Menu/Menu.jsx';
import cn from './Menu.module.scss';

export const Menu = () => {
  return (
    <GeneralMenu classes={{ container: cn.container, menu: cn.menu }}>
      <MenuItem label="Edit" icon="edit-rename-outline" />
      <MenuItem label="Delete" icon="trash-bin-outline" />
    </GeneralMenu>
  );
};
