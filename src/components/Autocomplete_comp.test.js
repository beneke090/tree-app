import React from 'react';
import renderer from 'react-test-renderer';
import AutocompleteComp from './Autocomplete_comp';

describe('AutocompleteComp', () => {
  test('should match snapshot.', () => {
    const component = renderer.create(
      <AutocompleteComp
        label="testlabel"
        items={['a', 'b', 'c']}
        onChange={() => {}}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
