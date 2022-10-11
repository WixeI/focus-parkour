import i18n from 'i18next';

export const translations = {
  br: {
    'Clear-Field': 'Limpar Campo',
    Optional: 'Opcional',
    Loading: 'Carregando',
    Attention: 'Atenção',
    'Delete-Item': 'Deletar Item',
    Files: 'Arquivos',
    'Click-Here': 'Clique aqui para adicionar',
    'Dropzone-Information-Singular': 'ou arraste e solte o arquivo',
    'Dropzone-Information-Plural': 'ou arraste e solte os arquivos',
    Finished: 'Finalizado',
    Current: 'Atual'
  },
  en: {
    'Clear-Field': 'Clear Field',
    Optional: 'Optional',
    Loading: 'Loading',
    Attention: 'Attention',
    'Delete-Item': 'Delete Item',
    Files: 'Files',
    'Click-Here': 'Click here to add',
    'Dropzone-Information-Singular': 'or drag and drop the file',
    'Dropzone-Information': 'or drag and drop the files',
    Finished: 'Finished',
    Current: 'Current'
  }
};

/*
  TODO:
    - Change how resources work and better organize translations file into "localization" folder
      - Add global/identity translation words (and mark by category if possible)
      - See if it's possible to create a translation file per component to be in the folder and make the code gather all of them
*/

const languageInstance = i18n.createInstance();

languageInstance.init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    br: { global: translations.br },
    en: { global: translations.en }
  }
});

type LanguageOptions = 'br' | 'en';

export function changeLanguage(newLanguage: LanguageOptions) {
  languageInstance.changeLanguage(newLanguage);
}

export default languageInstance;
