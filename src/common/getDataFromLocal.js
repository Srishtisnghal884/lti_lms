export const getAuthDataFromLocalStorage = () => { 
    const storedAuth = localStorage.getItem('userAuth');
    if (storedAuth) {
            return JSON.parse(storedAuth);
        } 
  } 