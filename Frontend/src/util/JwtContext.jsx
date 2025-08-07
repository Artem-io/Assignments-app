import { createContext } from 'react';

export const JwtContext = createContext({
  jwt: '',
  setJwt: () => {},
});

