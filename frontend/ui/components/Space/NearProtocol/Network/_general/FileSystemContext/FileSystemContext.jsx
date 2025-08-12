import { useState, createContext, useContext } from 'react';

const FileSystemContext = createContext(null);

export const FileSystemProvider = ({ children }) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  return (
    <FileSystemContext.Provider
      value={{
        openMenuId,
        setOpenMenuId,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystemContext = () => useContext(FileSystemContext);
