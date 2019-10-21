import React from 'react';
import renderer from 'react-test-renderer';
import Card from './card';

it(`Cards are displayed correctly`, () => {
  const card = renderer
    .create(<Card
      title={`title`}
    />)
  .toJSON();
  expect(card).toMatchSnapshot();
});