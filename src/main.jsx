import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './routes/App.jsx';
import { HashRouter } from 'react-router';
import { NameProvider } from './contexts/nameContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<NameProvider>
			<HashRouter>
				<App />
			</HashRouter>
		</NameProvider>
	</StrictMode>,
);
