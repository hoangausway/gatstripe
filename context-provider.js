import React, { useState } from 'react'
import { BehaviorSubject } from 'rxjs'

export const appContext = React.createContext()

const AppContextProvider = props => {
  const [app$, setApp$] = useState(new BehaviorSubject())

  return (
    <appContext.Provider value={{ app$, setApp$ }}>
      {props.children}
    </appContext.Provider>
  )
}

const RootWrapper = ({ element }) => (
  <AppContextProvider>{element}</AppContextProvider>
)

export default RootWrapper
