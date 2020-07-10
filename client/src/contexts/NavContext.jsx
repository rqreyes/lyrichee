import React, { createContext, useState } from 'react';

export const NavContext = createContext();

const NavContextProvider = ({ children }) => {
  const [historyStack, setHistoryStack] = useState({
    index: -1,
    stack: [],
  });

  const pathAdd = (path) => {
    setHistoryStack({
      index: historyStack.index + 1,
      stack: [...historyStack.stack, path],
    });
  };

  const pathBack = () => {
    setHistoryStack({
      ...historyStack,
      index: historyStack.index - 1,
    });
  };

  const pathForward = () => {
    setHistoryStack({
      ...historyStack,
      index: historyStack.index + 1,
    });
  };

  const pathBranch = (path) => {
    setHistoryStack({
      index: historyStack.index + 1,
      stack: [...historyStack.stack.slice(0, historyStack.index + 1), path],
    });
  };

  return (
    <NavContext.Provider
      value={{ historyStack, pathAdd, pathBack, pathForward, pathBranch }}
    >
      {children}
    </NavContext.Provider>
  );
};

export default NavContextProvider;
