import { Component } from 'pet-dex-utilities';
import './index.scss';

const events = [
  'change',
  'value:change',
  'text:change',
  'name:change',
  'disable',
];

const html = `
<label class="radio-container" data-select="radio-container">
    <input data-select="radio-button" type="radio" class="radio-container__input" name="" value="">
    <span data-select="radio-button-text" class="radio-container__dot"></span>
</label>
`;

export default function RadioButton({
  check = false,
  text = '',
  value = '',
  name = '',
  disabled = false,
  borderless = false,
} = {}) {
  Component.call(this, { html, events });

  this.setCheck(check);
  this.setText(text);
  this.setValue(value);
  this.setName(name);
  this.setDisabled(disabled);
  this.setBorderless(borderless);
  const $radioButton = this.selected.get('radio-button');

  $radioButton.addEventListener('change', (e) => {
    this.setCheck(e.target.checked);
  });
}

RadioButton.prototype = Object.assign(
  RadioButton.prototype,
  Component.prototype,
  {
    isChecked() {
      return this.selected.get('radio-button').checked;
    },

    setCheck(check = false) {
      const $radioButton = this.selected.get('radio-button');
      $radioButton.checked = check;
      this.emit('change', check);
    },

    setText(text = '') {
      const $radioButtonText = this.selected.get('radio-button-text');
      $radioButtonText.textContent = text;
      this.emit('text:change', text);
    },
    getText() {
      return this.selected.get('radio-button-text').textContent;
    },
    setValue(value = '') {
      const $radioButton = this.selected.get('radio-button');
      $radioButton.value = value;
      this.emit('value:change', value);
    },
    getValue() {
      return this.selected.get('radio-button').value;
    },
    isDisabled() {
      return this.selected.get('radio-button').disabled;
    },
    setDisabled(disabled = false) {
      const $radioButton = this.selected.get('radio-button');
      $radioButton.disabled = disabled;
      this.emit('disable', disabled);
    },
    getName() {
      const $radioButton = this.selected.get('radio-button');
      return $radioButton.name;
    },

    setName(name = '') {
      const $radioButton = this.selected.get('radio-button');
      $radioButton.name = name;
      this.emit('name:change', name);
    },

    setBorderless(borderless = false) {
      const $radioContainer = this.selected.get('radio-container');
      if (borderless) {
        $radioContainer.classList.add('radio-container--borderless');
      } else {
        $radioContainer.classList.remove('radio-container--borderless');
      }
    },
  },
);
