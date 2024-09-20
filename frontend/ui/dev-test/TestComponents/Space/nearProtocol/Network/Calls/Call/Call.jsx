import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const Call = ({ navHistory }) => {
  const { callId } = useParams();

  return (
    <div>
      <div>Call: {callId}</div>
    </div>
  );
};
