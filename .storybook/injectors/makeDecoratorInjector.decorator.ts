import { makeDecorator } from '@storybook/preview-api'
import { ICollection } from '@storybook/angular/dist/client/types';
import { APP_INITIALIZER, Injector } from '@angular/core';

export const makeDecoratorInjectInjectorToProps = makeDecorator({
  name: 'injectInjectorToProps',
  parameterName: 'injectInjectorToProps',
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { parameters }) => {
    const story = getStory(context) as {props: ICollection, applicationConfig: any};

    if(!story.applicationConfig.providers) {
      story.applicationConfig.providers = [];
    }

    story.applicationConfig.providers.push({
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector): void => {
        Object.assign(story.props, {injector});
      },
      deps: [Injector]
    });

    return story;
  },
});
