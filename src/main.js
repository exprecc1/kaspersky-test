import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import 'antd/dist/reset.css';
import './index.scss';
createRoot(document.getElementById('root')).render(_jsx(Provider, { store: store, children: _jsx(App, {}) }));
