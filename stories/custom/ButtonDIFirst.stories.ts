import { applicationConfig, Meta, moduleMetadata, Story, StoryObj } from '@storybook/angular';
import { injectInjectorToProps } from '../../.storybook/injectors/injector.decorator';
import { Injector } from '@angular/core';
import { LoggerService } from './services/logger.service';

const meta: Meta = {
  title: 'Example/ButtonDIFirst',
  decorators: [
    moduleMetadata({
      imports: []
    }),
    applicationConfig({
      providers: [LoggerService],
    }),
    injectInjectorToProps()
  ]
};
export default meta;

// First variant (the preferable)
export const WithServiceInjectedOne: StoryObj = {
  render: (props) => ({
    props: {
      ...props,
      onBtnClick: (injector: Injector) => {
        injector.get(LoggerService).log('Message logged')
      }
    },
    template: `
      <button (click)="onBtnClick(injector)">Click</button>
    `
  })
};

// Second variant
const story: Story = (props) => {
  return {
    props: {
      ...props,
      onBtnClick: (injector: Injector) => {
        injector.get(LoggerService).log('Message logged')
      }
    },
    template: `
      <button (click)="onBtnClick(injector)">Click</button>
    `
  }
};
export const WithServiceInjectedTwo = story.bind({});



