import { useStoreEffect } from "../../../react-vault";
import { useMatch, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useNavigateToSavedRoute = (triggerPattern: string, fallbackRoute?: string) => {
  const navigateTo = useStoreEffect((store: any) => store.navigation.navigateTo);
  const match = useMatch(triggerPattern);
  const navigate = useNavigate();

  useEffect(() => {
    if (match) navigateTo({ match, navigate, fallbackRoute });
  }, [match]);
};