import cn from './Key.module.css';
import { PrivateItem } from './PrivateItem/PrivateItem.tsx';
import { PublicItem } from './PublicItem/PublicItem.tsx';
import {useParams} from "react-router-dom";
import {SideMenu} from "./SideMenu/SideMenu.tsx";

export const Key = ({data}:any) => {
  const params = useParams();
  console.log(params)

  return (
    <div className={cn.container}>
      <div className={cn.head}>
        <button>back</button>
        <h2 className={cn.title}>{data?.publicKey}</h2>
        <SideMenu/>
      </div>
      <div>
        <h2>Key Data</h2>
        <h4>Public Key</h4>
        <PublicItem text={data?.publicKey} />
        <h4>Private Key</h4>
        <PrivateItem text={data?.privateKey} />
        {data?.seedPhrase && <h4>Seed Phrase</h4>}
        {data?.seedPhrase && <PrivateItem text={data?.seedPhrase} />}
        <h4>Derivation Path</h4>
        {data?.derivationPath && <PublicItem text={data?.derivationPath} />}
        <div>
          <h4>Wallet</h4>
          <p>{data?.wallet}</p>
        </div>
      </div>
    </div>
  );
};
