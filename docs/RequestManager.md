# OHZI Components

## RequestManager
- Sends JSON HTTP requests from a Web Worker, so fetching and body parsing stay off the main thread.
- Singleton. `import { RequestManager } from 'ohzi-components'` gives you the instance, so don't call `new`.

### Methods

- `init(browser)`: Initialize component. Creates the worker.
  - `browser`: [Browser](https://github.com/ohzinteractive/core/blob/main/src/Browser.ts) from `ohzi-core`. Call it after `Browser.init()`. Safari requests use `cache: 'no-cache'`, other browsers use `'default'`.

- `get(url, callback, error_callback)`: Sends a `GET` request.

- `post(url, data, callback, error_callback)`: Sends a `POST` request with `data` as the JSON body.

- `put(url, data, callback, error_callback)`: Sends a `PUT` request with `data` as the JSON body.

- `delete(url, data, callback, error_callback)`: Sends a `DELETE` request with `data` as the JSON body.

- `__request({ url, method, data, headers, with_data, callback, error_callback })`: The call behind the four methods above. (private)
  - `headers`: Extra headers, merged over `Content-Type: application/json`.
  - `with_data`: `false` skips reading the body, so `callback` gets the status only. Default `true`.

### Callbacks

Both callbacks receive `(status, data)`:

- `callback`: The response arrived and its status isn't 4xx. `data` is the parsed JSON body, or the raw text when the body isn't JSON.
- `error_callback`:
  - 4xx response: `status` is the response status and `data` is the parsed body.
  - Network failure: `status` is `0` and `data` is the error message.

A missing callback logs `Request not handlered` (or `Error not handlered`).

### Request options

Every request uses `mode: 'cors'`, `credentials: 'same-origin'`, `redirect: 'follow'` and `Content-Type: application/json`, and sends `JSON.stringify(data)` as the body.

### Example

```typescript
import { Browser } from 'ohzi-core';
import { RequestManager } from 'ohzi-components';

RequestManager.init(Browser);

RequestManager.get('/api/scores',
  (status, data) =>
  {
    console.log(status, data);
  },
  (status, error) =>
  {
    console.warn('Could not load scores', status, error);
  });

RequestManager.post('/api/scores', { name: 'ohzi', score: 10 }, on_saved, on_failed);
```

### Notes

- 5xx responses go to `callback`, not `error_callback`. Check `status` in `callback`.
- Callbacks are stored by URL. If two requests to the same URL are in flight, both responses go to the callbacks of the last one.
- A relative URL like `api/scores` resolves against the worker script, not the page. Use root-relative (`/api/scores`) or absolute URLs.
- There is no timeout or abort.
- The worker is loaded from `./RequestWorker.ts`, next to the module. That works when the app bundles `ohzi-components` from `src/`, as the boilerplate's Vite alias does. The published `build/index.module.mjs` keeps that URL but doesn't ship the worker file.
