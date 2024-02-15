import cn from './NoContract.module.css';

export const NoContract = () => (
  <div className={cn.noContract}>
    <h4>
      Looks like there is not contract deployed on this account. Please deploy it first.
    </h4>
  </div>

);
