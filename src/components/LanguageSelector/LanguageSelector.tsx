import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LANGUAGES = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white shadow-lg rounded-full px-4 py-2 hover:shadow-xl transition-shadow"
      >
        <Languages className="w-5 h-5 text-gray-700" />
        <span className="text-2xl">{currentLanguage.flag}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-14 right-0 bg-white shadow-xl rounded-lg overflow-hidden min-w-[180px]">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors ${
                  i18n.language === lang.code ? 'bg-green-100' : ''
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-medium text-gray-800">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
