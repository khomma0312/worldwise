import { FC, ReactNode, createContext, useContext, useReducer } from 'react'

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

type User = typeof FAKE_USER;

type AuthContextType = {
  user: null | User;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

type State = {
  user: null | User;
  isAuthenticated: boolean;
};

type Action = {
  type: "login" | "logout";
  payload?: User;
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload ? action.payload : null,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Invalid action type");
  }
};

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider: FC<{children: ReactNode}> = ({children}) => {
  const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState);

  const login = (email: string, password: string) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({type: "login", payload: FAKE_USER})
    }
  };

  const logout = () => {
    dispatch({type: "logout"});
  };

  return (
    <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
