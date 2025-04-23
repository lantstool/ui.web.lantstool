import { useLayoutEffect, useRef } from 'react';
import { Log } from './Log/Log.jsx';
import { useAutoScrollToBottom } from '@hooks/useAutoScrollToBottom.js';
import cn from './Logger.module.scss';

export const Logger = ({ logs }) => {
  const scrollRef = useRef(null);

  // scroll to the end of the log list every time user open the page
  useLayoutEffect(() => {
    const el = scrollRef.current;
    el.scrollTo({ top: el.scrollHeight, behavior: 'auto' });
  }, []);

  useAutoScrollToBottom({ ref: scrollRef, deps: [logs], nearBottomHeight: 35 });

  return (
    <div className={cn.logger}>
      <h3 className={cn.label}>Logs</h3>
      <div className={cn.logs}>
        <div className={cn.scrollable} ref={scrollRef}>
          {logs.map((log) => (
            <Log key={log.timestamp} log={log} />
          ))}
        </div>
      </div>
    </div>
  );
};
