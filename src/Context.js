import React, { useState, useEffect , useContext } from 'react';
import  { AuthProvider }   from "./services/ContextUser.js";

import Navigator from './Navigator';

const Context = () => {
  

  return (
    <AuthProvider>
      <Navigator></Navigator>
    </AuthProvider>
  );
};



export default Context;
