import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TuiButtonModule } from './components/tui-button/tui-button.module';

const meta: Meta = {
  title: 'Example/TuiButton',
  decorators: [
    moduleMetadata({
      imports: [TuiButtonModule]
    })
  ]
};

export default meta;

export const Basic: StoryObj = {
  render: (props) => ({
    props,
    template: `
      <tui-button></tui-button>  
    `
  })
};
