import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './containers/App/App';

import registerServiceWorker from './registerServiceWorker';
import MetaTags from 'react-meta-tags';


ReactDOM.render(
	<div>
	<MetaTags>
	<title>Page 1</title>
	<meta name="viewport" content="width=device-width" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	</MetaTags>
    <App />
    </div>
, document.getElementById('root'));


registerServiceWorker();
