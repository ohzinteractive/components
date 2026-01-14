class RequestWorker
{
  is_safari: any;
  response: any;
  
  run()
  {
    this.response = undefined;
    this.is_safari = false;

    this.__bind_messages();
  }

  __bind_messages()
  {
    self.addEventListener('message', (e) =>
    {
      const message = e.data;

      switch (message.type)
      {
      case 'is_safari':
        this.is_safari = message.data;

        break;
      case 'request':

        this.request(message.url, message.headers, message.method, message.data, message.with_data);

        break;
      }
    });
  }

  request(url: any, external_headers = {}, method: any, data: any, with_data = true)
  {
    const cache = this.is_safari ? 'no-cache' : 'default';
    // console.log(this.is_safari, url, method, data);

    const headers = {
      'Content-Type': 'application/json'
    };

    Object.assign(headers, external_headers);

    const on_response = with_data ? this.on_response.bind(this, url) : this.on_quick_response.bind(this, url);

    fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: cache, // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: headers,
      redirect: 'follow', // manual, *follow, error
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then(this.check_response.bind(this))
      .then(on_response)
      .catch(this.on_error.bind(this, url));
  }

  async on_response(url: any, response: any)
  {
    const body = await response.text();

    postMessage({
      type: 'response',
      url: url,
      status: response.status,
      data: this.text_to_json(body)
    });
  }

  async on_quick_response(url: any, response: any)
  {
    postMessage({
      type: 'response',
      url: url,
      status: response.status
    });
  }

  async on_error(url: any, response: any)
  {
    console.warn(url, response);

    let data = undefined;
    let status = 0;

    if (response.text)
    {
      status = response.status;

      const body = await response.text();
      data = this.text_to_json(body);
    }
    else
    {
      data = response.message;
    }

    postMessage({
      type: 'error',
      url: url,
      status: status,
      data: data
    });
  }

  check_response(response: any)
  {
    if (Math.floor(response.status / 100) === 4)
    {
      throw response;
    }

    return response;
  }

  text_to_json(text: any)
  {
    if (this.__is_json(text))
    {
      return JSON.parse(text);
    }
    else
    {
      return text;
    }
  }

  __response_to_blob(response: any)
  {
    return response.blob();
  }

  __log(data = 'empty log')
  {
    console.error(data);
  }

  __is_json(str: any)
  {
    try
    {
      JSON.parse(str);
    }
    catch (e)
    {
      return false;
    }

    return true;
  }
}

new RequestWorker().run();
