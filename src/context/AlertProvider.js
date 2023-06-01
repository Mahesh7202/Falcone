import { createContext, useState } from 'react';
import Alert from '../components/Alert/Alert';

const ALERT_TIME = 5000;
const initialState = {
  text: '',
  type: '',
};

const AlertContext = createContext({
  ...initialState,
  setAlert: () => {},
});

export const AlertProvider = ({ children }) => {
  const [text, setText] = useState('');
  const [type, setType] = useState('');
  const [open,setOpen] = useState(false)

  const setAlert = (text, type, open=true) => {
    setText(text);
    setType(type);
    setOpen(open)

    setTimeout(() => {
      setText('');
      setType('');
      setOpen(false);
    }, ALERT_TIME);
  };

  return (
    <AlertContext.Provider
      value={{
        text,
        type,
        setAlert,
      }}
    >
      {children}
      {open&&<Alert/>}
    </AlertContext.Provider>
  );
};


export default AlertContext;