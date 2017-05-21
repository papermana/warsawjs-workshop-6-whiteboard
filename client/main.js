import React from 'react';
import ReactDom from 'react-dom';
import App from '../imports/client/components/App';

Meteor.startup(() => {
  ReactDom.render(<App />, document.getElementById('app-root'));
});
