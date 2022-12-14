
export default class TextScrambler
{
  constructor()
  {
  }

  init()
  {
    this.el = '';
    // this.chars = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'
    this.chars = 'F G H JKLTVWXYZ';
    // this.chars = 'OHZI';
    this.is_enabled = false;
    this.time = 10;
  }

  set_text(element, new_text)
  {
    const old_text = element.innerText;
    const length = Math.max(old_text.length, new_text.length);
    this.el = element;
    this.queue = [];

    for (let i = 0; i < length; i++)
    {
      const from = old_text[i] || '';
      const to = new_text[i] || '';
      const start = Math.floor(Math.random() * this.time);
      const end = start + Math.floor(Math.random() * this.time);
      this.queue.push({ from, to, start, end });
    }

    this.frame = 0;
    this.is_enabled = true;
  }

  update()
  {
    if (this.is_enabled)
    {
      let output = '';
      let complete = 0;

      for (let i = 0, n = this.queue.length; i < n; i++)
      {
        const { from, to, start, end } = this.queue[i];
        let { char } = this.queue[i];

        if (this.frame >= end)
        {
          complete++;
          output += to;
        }
        else if (this.frame >= start)
        {
          if (!char || Math.random() < 0.28)
          {
            char = this.__random_char();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        }
        else
        {
          output += from;
        }
      }

      this.el.innerHTML = output;

      if (complete === this.queue.length)
      {
        this.is_enabled = false;
      }
      else
      {
        this.frame++;
      }
    }
  }

  __random_char()
  {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}
