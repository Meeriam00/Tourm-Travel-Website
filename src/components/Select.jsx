import React, { useEffect, useState } from 'react';
import { Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const SelectLanguage = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
      setCurrentLang(storedLanguage);
    }
  }, [i18n]);

  const handleChange = (value) => {
    if (value === 'Azerbaijan') {
      i18n.changeLanguage('az');
      localStorage.setItem('language', 'az');
    } else if (value === 'English') {
      i18n.changeLanguage('en');
      localStorage.setItem('language', 'en');
    }
  };

  return (
    <Space wrap>
      <Select
        value={currentLang === 'en' ? 'English' : 'Azerbaijan'} // Seçilmiş dilin doğru göstərilməsi
        style={{ width: 120, height: 30, fontSize: '14px', borderRadius: '30px' }}
        onChange={handleChange}
        options={[
          {
            value: 'English',
            label: 'English',
          },
          {
            value: 'Azerbaijan',
            label: 'Azerbaijan',
          },
        ]}
      />
    </Space>
  );
};

export default SelectLanguage;
