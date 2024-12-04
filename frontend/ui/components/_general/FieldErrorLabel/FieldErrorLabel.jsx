import cnm from 'classnames';
import cn from './FieldErrorLabel.module.scss';

export const FieldErrorLabel = ({ error, dynamicErrorSpace = false }) => (
  <p className={cnm(cn.error, dynamicErrorSpace && cn.dynamicErrorSpace, error && cn.activeError)}>
    {error}
  </p>
);
