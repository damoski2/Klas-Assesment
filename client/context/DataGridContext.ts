import React, { createContext, useEffect, useState } from "react";
import { IUser } from '../types'


type ContextProp = {
    children: JSX.Element;
  };

export const DataGridContext: React.Context<null> = createContext<null>(null);



export const DataGridProvider: React.FC<ContextProp> = ({ children }) => {

    const [users, setUsers] = useState<IUser | []>([]);

    return(
        <DataGridContext.Provider 
            value={{
                users,
            }}
        >
            {children}
        </DataGridContext.Provider>
    );
}

