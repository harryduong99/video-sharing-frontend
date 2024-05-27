import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

type WrappedProps = { children: ReactNode };
type Dispatch = {
  type: "setCurrentEmail";
  payload: unknown;
};

type ContextType = {
  state: {
    currentEmail: string | null;
  };
  dispatch: React.Dispatch<Dispatch>;
  waitForMessage: (sourceChainId: number, txHash: string) => void;
};

const AppContext = createContext<ContextType | null>(null);

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "setCurrentEmail": {
      return { ...state, currentEmail: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const AppContextWrapper = ({ children }: WrappedProps) => {
  const [state, dispatch] = useReducer(reducer, {
    currentEmail: null,
  } as ContextType["state"]);

  const appContextValue: any = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useStateDispatcher = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("dispatcher must be used within AppContextWrapper");
  }
  return context;
};
