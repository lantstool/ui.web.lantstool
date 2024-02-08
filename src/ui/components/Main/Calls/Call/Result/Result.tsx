import { useParams, Link } from "react-router-dom";
import { useStoreState } from "../../../../../../react-vault";
import cn from './Result.module.css';

export const Result = () => {
  const { callId } = useParams();
  // const call = useStoreState((store: any) => store.calls.map[callId]);

  console.log(callId);

  return (
    <div className={cn.call}>
      <h1>Result: {callId}</h1>
      <Link to="..">Back</Link>
    </div>
  );
};
