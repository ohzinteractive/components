import path from 'path';
import fs from 'fs';
import replace from 'replace-in-file';

class ModalCreator
{
  constructor()
  {
  }

  create_modal(name)
  {
    const js_folder = path.join('..', 'app', 'js', 'view_components', 'modal', 'states');
    const js_view_path = path.join(js_folder, `${this.capitalize(name)}ModalState.js`);

    const pug_folder = path.join('..', 'app', 'views', 'components', 'modal', 'states');
    const pug_path = path.join(pug_folder, `${name}.pug`);

    const scss_folder = path.join('..', 'app', 'css', 'components', 'modal', name);
    const scss_path = path.join(scss_folder, `_${name}.scss`);

    this.__copy_template_js(js_folder, js_view_path, name, 'ModalState');
    this.__copy_template_pug(pug_folder, pug_path, name);
    this.__copy_template_scss(scss_folder, scss_path, name);

    this.__update_modal_pug_file(name);
    this.__update_application_scss_file(name);
    this.__update_modal_component_file(name);
  }

  __update_modal_component_file(name)
  {
    const new_import = `__MODAL_STATES_IMPORTS__\nimport { ${this.capitalize(name)}ModalState } from './states/${this.capitalize(name)}ModalState';`;
    const file_path = path.join('..', 'app', 'js', 'view_components', 'modal', 'ModalComponent.js');

    const options_1 = {
      files: file_path,
      from: '__MODAL_STATES_IMPORTS__',
      to: new_import
    };

    const new_section = `__MODAL_STATES__\n      ${name.toLowerCase()}: new ${this.capitalize(name)}ModalState('${name.replace(/_/g, '-')}'),`;

    const options_2 = {
      files: file_path,
      from: '__MODAL_STATES__',
      to: new_section
    };

    try
    {
      replace.sync(options_1);
      replace.sync(options_2);
      console.log('\x1b[33m', `${file_path} Modified`);
    }
    catch (error)
    {
      console.error('Error occurred:', error);
    }
  }

  __update_modal_pug_file(name)
  {
    const new_data = `__MODAL_STATES__\n    include states/${name}`;
    const file_path = path.join('..', 'app', 'views', 'components', 'modal', 'modal.pug');

    const options = {
      files: file_path,
      from: '__MODAL_STATES__',
      to: new_data
    };

    try
    {
      replace.sync(options);
      console.log('\x1b[33m', `${file_path} Modified`);
    }
    catch (error)
    {
      console.error('Error occurred:', error);
    }
  }

  __update_application_scss_file(name)
  {
    const new_data = `__MODAL_STATES__\n@import 'components/modal/${name}/${name}';`;
    const file_path = path.join('..', 'app', 'css', 'application.scss');

    const options = {
      files: file_path,
      from: '__MODAL_STATES__',
      to: new_data
    };

    try
    {
      replace.sync(options);
      console.log('\x1b[33m', `${file_path} Modified`);
    }
    catch (error)
    {
      console.error('Error occurred:', error);
    }
  }

  __copy_template_js(js_folder, view_path, name, file_type)
  {
    fs.mkdir(js_folder, { recursive: true }, (err) =>
    {
      if (err)
      {
        console.error(err);
      }
      else
      {
        fs.copyFileSync(
          path.join('tasks', 'create_modal', `Template${file_type}.js`),
          view_path
        );

        this.__replace_js_words(view_path, name);
      }
    });
  }

  __copy_template_pug(pug_folder, pug_path, name)
  {
    fs.mkdir(pug_folder, { recursive: true }, (err) =>
    {
      if (err)
      {
        console.error(err);
      }
      else
      {
        fs.copyFileSync(
          path.join('tasks', 'create_modal', 'template.pug'),
          pug_path
        );

        this.__replace_pug_words(pug_path, name);
      }
    });
  }

  __copy_template_scss(scss_folder, scss_path, name)
  {
    fs.mkdir(scss_folder, { recursive: true }, (err) =>
    {
      if (err)
      {
        console.error(err);
      }
      else
      {
        fs.copyFileSync(
          path.join('tasks', 'create_modal', '_template.scss'),
          scss_path
        );

        this.__replace_scss_words(scss_path, name);
      }
    });
  }

  __replace_js_words(path, name)
  {
    const options_1 = {
      files: path,
      from: /Template/g,
      to: this.capitalize(name)
    };

    const options_2 = {
      files: path,
      from: /TEMPLATE/g,
      to: name.toUpperCase()
    };

    const options_3 = {
      files: path,
      from: 'template',
      to: name.replace(/_/g, '-')
    };

    const options_4 = {
      files: path,
      from: /template_opacity/g,
      to: `${name}_opacity`
    };

    try
    {
      replace.sync(options_1);
      replace.sync(options_2);
      replace.sync(options_3);
      replace.sync(options_4);

      console.log('\x1b[32m', `${path} Created`);
    }
    catch (error)
    {
      console.error('Error occurred:', error);
    }
  }

  __replace_scss_words(path, name)
  {
    const options = {
      files: path,
      from: 'template',
      to: `${name.replace(/_/g, '-')}`
    };

    try
    {
      replace.sync(options);

      console.log('\x1b[32m', `${path} Created`);
    }
    catch (error)
    {
      console.error('Error occurred:', error);
    }
  }

  __replace_pug_words(path, name)
  {
    const options = {
      files: path,
      from: 'template',
      to: `${name.replace(/_/g, '-')}`
    };

    try
    {
      replace.sync(options);

      console.log('\x1b[32m', `${path} Created`);
    }
    catch (error)
    {
      console.error('Error occurred:', error);
    }
  }

  capitalize(string)
  {
    let aux_string = this.snake_to_camelcase(string);
    aux_string = this.capitalize_first_letter(aux_string);

    return aux_string;
  }

  capitalize_first_letter(string)
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  snake_to_camelcase(string)
  {
    return string.toLowerCase().replace(/[-_][a-z0-9]/g, (group) => group.slice(-1).toUpperCase());
  }
}

new ModalCreator().create_modal(process.argv.slice(2)[0]);
