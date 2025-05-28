import { createContext, useContext, useState } from 'react';

const PhotoUpdateContext = createContext();

export const usePhotoUpdate = () => useContext(PhotoUpdateContext);

export const PhotoUpdateProvider = ({ children }) => {
  const [updatedAt, setUpdatedAt] = useState(Date.now());

  const triggerUpdate = () => setUpdatedAt(Date.now());

  return (
    <PhotoUpdateContext.Provider value={{ updatedAt, triggerUpdate }}>
      {children}
    </PhotoUpdateContext.Provider>
  );
};
