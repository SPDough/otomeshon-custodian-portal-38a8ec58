
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Remove favicon link in index.html when deploying

createRoot(document.getElementById("root")!).render(<App />);
