
class RequestManager
{
  constructor()
  {
    this.callbacks = {};
    this.error_callbacks = {};

    this.browser = undefined;
    this.worker = undefined;
  }

  init(browser)
  {
    this.browser = browser;
    this.worker = this.__create_worker();
    this.__setup_worker();
  }

  on_message(e)
  {
    const message = e.data;
    // console.log('ON MESSAGE', message, this.callbacks);
    switch (message.type)
    {
    case 'response':
      this.callbacks[message.url](message.status, message.data);
      break;
    case 'error':
      this.error_callbacks[message.url](message.status, message.data);
      break;
    }
  }

  get(url, callback, error_callback)
  {
    this.__request({
      url: url,
      method: 'GET',
      callback,
      error_callback
    });
  }

  post(url, data, callback, error_callback)
  {
    this.__request({
      url: url,
      method: 'POST',
      data,
      callback,
      error_callback
    });
  }

  put(url, data, callback, error_callback)
  {
    this.__request({
      url: url,
      method: 'PUT',
      data,
      callback,
      error_callback
    });
  }

  delete(url, data, callback, error_callback)
  {
    this.__request({
      url: url,
      method: 'DELETE',
      data,
      callback,
      error_callback
    });
  }

  __request({ url, headers, method, data, with_data, callback = this.on_callback.bind(this), error_callback = this.on_error.bind(this) })
  {
    this.callbacks[url] = callback;
    this.error_callbacks[url] = error_callback;

    this.worker.postMessage({
      type: 'request',
      url: url,
      headers: headers,
      method: method,
      data: data,
      with_data: with_data
    });
  }

  on_callback(e)
  {
    console.warn('Request not handlered', e);
  }

  on_error(e)
  {
    console.error('Error not handlered', e);
  }

  __create_worker()
  {
    const worker = new Worker(
      new URL('./RequestWorker.js', import.meta.url),
      { name: 'OHZI - RequestManager', type: 'module' });

    return worker;
  }

  __setup_worker()
  {
    this.worker.addEventListener('message', this.on_message.bind(this));

    this.worker.postMessage({ type: 'is_safari', data: this.browser.is_safari });
  }
}

const request_manager = new RequestManager();
export { request_manager as RequestManager };
