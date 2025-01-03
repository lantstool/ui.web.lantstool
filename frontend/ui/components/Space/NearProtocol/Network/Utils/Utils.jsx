import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import { TabButton } from '../../../../_general/tab/TabButton/TabButton.jsx';
import {
  TabContainer
} from '../../../../_general/tab/TabContainer/TabContainer.jsx';
import { KeyGenerator } from './KeyGenerator/KeyGenerator.jsx';
import cn from './Utils.module.scss';

export const Utils = () => {
  useSaveToHistory();
  return (
    <div className={cn.utils}>
      <div className={cn.contentContainer}>
        <h1 className={cn.headerTitle}>Utils</h1>
        <TabContainer>
          <TabButton onClick={() => {}} isActive={true}>
            Key Generator
          </TabButton>
        </TabContainer>
        <KeyGenerator />
      </div>

    </div>
  );
};
