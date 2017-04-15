/* eslint-env browser */
import ReactDOM from 'react-dom';
import {createElement as h} from 'react';
import MyComponent from 'components/MyComponent';

const container = document.createElement('div');
if (document.body){
	document.body.appendChild(container);
	const props = {
		myprop: 'Custom myprop',
		mybad: 123
	};
	const component = h(MyComponent, props);
	ReactDOM.render(component, container);
}
