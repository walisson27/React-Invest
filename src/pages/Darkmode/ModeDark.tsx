import { useEffect } from 'react';
import { useDarkMode } from '../../Contexte/Context';
import './Dark.css';

const ModeDark = () => {
  const { dark, setDark } = useDarkMode();

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [dark]);

  return (
    
    <button onClick={() => setDark(!dark)} className="btn btn-secondary">
     Dark Mode
    </button>
  );
};
console.log("DarkMode ativo:",);


export default ModeDark;
