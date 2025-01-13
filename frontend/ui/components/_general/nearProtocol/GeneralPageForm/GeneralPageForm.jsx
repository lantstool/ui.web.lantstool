import { TabButton } from '../../tab/TabButton/TabButton.jsx';
import { TabContainer } from '../../tab/TabContainer/TabContainer.jsx';
import { BackButton } from '../../BackButton/BackButton.jsx';
import logoLantstool from '@assets/logoLantstool.svg';
import cn from './GeneralPageForm.module.scss';

export const GeneralPageForm = ({ navigationBack = false, setTab, tab, children }) => (
  <div className={cn.container}>
    {navigationBack && <BackButton classes={{ container: cn.backButtonContainer }} />}
    <img className={cn.logo} src={logoLantstool} alt="Lantstool logo" />
    <h1 className={cn.title}>Add Network</h1>
    <p className={cn.description}>
      Select from standard options or add your own. You can manage them later in settings.
    </p>
    <div className={cn.tabs}>
      <TabContainer>
        <TabButton onClick={() => setTab('selectPredefined')} isActive={tab === 'selectPredefined'}>
          Select preset
        </TabButton>
        <TabButton onClick={() => setTab('addManually')} isActive={tab === 'addManually'}>
          Add manually
        </TabButton>
      </TabContainer>
    </div>
    {children}
  </div>
);
