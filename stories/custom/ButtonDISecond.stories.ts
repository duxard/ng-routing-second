import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { Injector } from '@angular/core';
import { LoggerService } from './services/logger.service';
import { makeDecoratorInjectInjectorToProps } from '../../.storybook/injectors/makeDecoratorInjector.decorator';

const meta: Meta = {
  title: 'Example/ButtonDISecond',
  decorators: [
    moduleMetadata({
      imports: []
    }),
    applicationConfig({
      providers: [LoggerService],
    }),
    makeDecoratorInjectInjectorToProps
  ],
  parameters: {
    injectInjectorToProps: true,
  }
};
export default meta;

export const WithServiceInjected: StoryObj = {
  render: (props) => {
    return {
      props: {
        ...props,
        onBtnClick: (injector: Injector) => {
          injector.get(LoggerService).log('Message logged');
        }
      },
      template: `
      <button (click)="onBtnClick(injector)">Clock</button>
    `
    }
  }
};
