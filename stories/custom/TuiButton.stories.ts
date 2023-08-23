import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TuiButtonModule } from './components/tui-button/tui-button.module';
import { action } from '@storybook/addon-actions';

const meta: Meta = {
  title: 'Example/TuiButton',
  decorators: [
    moduleMetadata({
      imports: [TuiButtonModule]
    })
  ],
  argTypes: {
    icon: {
      control: { type: 'select', defaultValue: 'alert' },
      options: ['alert', 'pointer', 'arrow', 'default'],
      defaultValue: 'alert'
    },
    variant: {
      control: { type: 'radio' },
      options: ['small', 'middle', 'large', 'extra-large'],

    },
    text: { type: 'string', defaultValue: 'Default text' }
  },
  args: {
    icon: 'alert',
    variant: 'small',
    text: 'lorem ipsum'
  },
  parameters: {
    backgrounds: {
      values: [
        { name: 'black', value: '#000' },
        { name: 'dark', value: '#222' },
        { name: 'light', value: '#ddd' },
        { name: 'white', value: '#fff' },
      ]
    }
  }
};

export default meta;

export const Basic: StoryObj = {
  render: (props) => ({
    props,
    template: `
      <tui-button
        [icon]="icon"
        [variant]="variant"
        [text]="text"
      ></tui-button>
    `
  })
};

export const WithClickHandler: StoryObj = {
  render: (props) => ({
    props: {
      ...props,
      onButtonClick: action('onButtonClick event')
    },
    template: `
      <tui-button
        [icon]="icon"
        [variant]="variant"
        [text]="text"
        (onButtonClick)="onButtonClick($event)"
      ></tui-button>
    `
  })
};
