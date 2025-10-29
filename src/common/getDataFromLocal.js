export const getAuthDataFromLocalStorage = () => { 
    const storedAuth = localStorage.getItem('userAuth');
    if (storedAuth) {
            return JSON.parse(storedAuth);
        } 
  } 

export const getUserDataFromLocalStorage = () => { 
    const storedAuth = localStorage.getItem('userData');
    if (storedAuth) {
            return JSON.parse(storedAuth);
    } 
} 