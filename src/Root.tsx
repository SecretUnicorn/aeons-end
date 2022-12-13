import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';

import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import ThemeProvider from '@/theme/Provider';

import './root.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <RecoilRoot>
        <HelmetProvider>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <App />
            </LocalizationProvider>
          </ThemeProvider>
        </HelmetProvider>
      </RecoilRoot>
    </StrictMode>,
  );
}

export default render;
