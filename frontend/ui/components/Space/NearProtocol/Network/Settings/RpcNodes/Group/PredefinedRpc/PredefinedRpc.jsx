import { RadioButton } from '../../../../../../../_general/RadioButton/RadioButton.jsx';
import cn from './PredefinedRpc.module.scss';

// import all logos inside logos directory and create a logo map
const logoFiles = import.meta.glob('@assets/logos/*', { eager: true, import: 'default' });
const logos = {};

for (const path in logoFiles) {
  const fileName = path.split('/').pop();
  logos[fileName] = logoFiles[path];
}

export const PredefinedRpc = ({ rpc }) => {
  const logoUrl = logos[rpc.logo];
  return (
    <div className={cn.rpc}>
      <RadioButton register={() => {}}/>
      <img src={logoUrl} alt={`${rpc.name} logo`} className={cn.logo} />
      <div className={cn.nameUrl}>
        <h3 className={cn.name}>{rpc.name}</h3>
        <span className={cn.url}>{rpc.url}</span>
      </div>
    </div>
  );
};
