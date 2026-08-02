import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetData } from 'react-helmet-async';
import App from '@/App';

export function renderApp({ path }) {
  const helmetData = new HelmetData({});
  let stream;
  let renderError = null;

  stream = renderToPipeableStream(
    <StaticRouter location={path}>
      <App helmetContext={helmetData.context} />
    </StaticRouter>,
    {
      onAllReady() {},
      onError(err) {
        renderError = err;
        console.error(`[prerender] error on ${path}:`, err.message);
      },
    }
  );

  return { stream, helmetData, getRenderError: () => renderError };
}
