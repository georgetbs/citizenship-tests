const fs = require('fs');
const path = require('path');

// Структура папок и файлов
const structure = {
  pages: {
    'index.js': '',
    'test.js': ''
  },
  components: {
    'Header.js': '',
    'Footer.js': '',
    'TestCard.js': ''
  },
  styles: {
    'globals.css': ''
  },
  public: {
    static: {
      locales: {
        en: {
          'common.json': ''
        },
        ru: {
          'common.json': ''
        },
        ka: {
          'common.json': ''
        }
      }
    }
  },
  data: {
    'language.json': '',
    'history.json': '',
    'law.json': ''
  },
  'tailwind.config.js': '',
  'next.config.js': ''
};

// Функция для создания файлов и папок
const createFiles = (base, structure) => {
  Object.keys(structure).forEach(key => {
    const filePath = path.join(base, key);
    if (typeof structure[key] === 'object') {
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      createFiles(filePath, structure[key]);
    } else {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, structure[key], 'utf8');
      }
    }
  });
};

// Запуск создания файлов и папок
createFiles(process.cwd(), structure);

console.log('Структура проекта создана.');
