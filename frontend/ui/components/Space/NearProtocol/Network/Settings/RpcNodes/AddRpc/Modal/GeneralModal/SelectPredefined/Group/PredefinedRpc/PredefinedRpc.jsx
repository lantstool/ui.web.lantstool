import { SelectButton } from '../../../../../../_general/SelectButton/SelectButton.jsx';
import { OuterLink } from '../../../../../../_general/OuterLink/OuterLink.jsx';
import cn from './PredefinedRpc.module.scss';

// import all logos inside logos directory and create a logo map
const logoFiles = import.meta.glob('@assets/logos/*', { eager: true, import: 'default' });
const logos = {};

for (const path in logoFiles) {
  const fileName = path.split('/').pop();
  logos[fileName] = logoFiles[path];
}

export const PredefinedRpc = ({ rpc, selectedRpcId, selectRpc }) => {
  const logoUrl = logos[rpc.logo];
  const isSelected = selectedRpcId === rpc.id;

  const select = () => {
    if (!isSelected) selectRpc(rpc.id);
  };

  return (
    <div className={cn.rpc}>
      <div className={cn.selectButtonWrapper}>
        <SelectButton isSelected={isSelected} select={select} />
      </div>
      <img src={logoUrl} alt={`${rpc.name} logo`} className={cn.logo} />
      <div className={cn.nameUrl}>
        <h3 className={cn.name}>{rpc.name}</h3>
        <span className={cn.url}>{rpc.url}</span>
      </div>
      <div className={cn.links}>
        {rpc.links.map((link) => (
          <OuterLink key={link.url} link={link} />
        ))}
      </div>
    </div>
  );
};
