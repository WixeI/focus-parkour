import { I18nextProvider } from 'react-i18next';
import languageInstance from '../../configs/i18n/config';
import { ReactNode } from 'react';

interface ContextAggregatorProps {
  children: ReactNode;
}

const ContextAggregator = ({ children }: ContextAggregatorProps) => (
  <I18nextProvider i18n={languageInstance}>{children}</I18nextProvider>
);

export { ContextAggregator };
