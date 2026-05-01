import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ShowcaseApp from './showcase/showcase-app';
import SaasApp from './saas/saas-app';
import PureApp from './pure/pure-app';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const pathname = window.location.pathname.replace(/\/$/, '');

function pickApp() {
  if (pathname === `${base}/saas-showcase`) return <SaasApp />;
  if (pathname === `${base}/pure-showcase`) return <PureApp />;
  return <ShowcaseApp />;
}

createRoot(document.getElementById('root')!).render(<StrictMode>{pickApp()}</StrictMode>);
