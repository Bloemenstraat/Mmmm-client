import { useEffect, useState } from 'react';
import './LanguageSelect.css';

export default function LanguageSelect ({ setLanguage }: { setLanguage: React.Dispatch<React.SetStateAction<string>>}) {

    const languages = ['English', 'Swedish', 'Spanish', 'Danish', 'French', 'Italian'];
    const [index, setIndex] = useState(0); // TODO : prendre en considération l'ancienne langue

    const selectLanguage = (i: number) => {
        setIndex(i);
        setLanguage(languages[i]);    
    }

    return (
        <div className="lang-select">
            {languages.map((e, i) => 
                    <p 
                    key={i}
                    className={i == index ? 'lang-selected' : 'lang'} 
                    onClick={() => selectLanguage(i)}>
                        {e}
                    </p> 
            )}

        </div>
    );
}