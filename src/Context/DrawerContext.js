import React,{ createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export function DrawerProvider({ children }) {
   const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = useState(false);
   const handleDrawerOpen = () => {
   
      setOpen(!open);
    };
    const handleDrawerClose = () => {
      setOpen(!open);
    };


  return (
    <DrawerContext.Provider
      value={{
        
        handleDrawerOpen,
        handleDrawerClose,
        setModalOpen,
        open, 
        setOpen,
        modalOpen
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawerContext() {
  return useContext(DrawerContext);
}
