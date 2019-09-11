import React from 'react';
import TestRenderer from 'react-test-renderer';

import { RoadIcon, HomeIcon, WavesIcon, TaskIcon } from '../../svgIcons';
import { MappingTypeIcon } from '../index';

it('test if MappingTypeIcon with BUILDINGS option returns the correct icon', () => {
  const element = TestRenderer.create(<MappingTypeIcon type={'BUILDINGS'}/>);
  const testInstance = element.root;
  expect(
    testInstance.findByType(HomeIcon).props.title
  ).toBe('Buildings');
  expect(
    testInstance.findByType(HomeIcon).props.className
  ).toBe('ml1 mr3');
  expect(
    testInstance.findByType(HomeIcon).props.height
  ).toBe('23');
});

it('test if MappingTypeIcon with ROADS option returns the correct icon', () => {
  const element = TestRenderer.create(<MappingTypeIcon type={'ROADS'}/>);
  const testInstance = element.root;
  expect(
    testInstance.findByType(RoadIcon).props.title
  ).toBe('Roads');
});

it('test if MappingTypeIcon with WATERWAYS option returns the correct icon', () => {
  const element = TestRenderer.create(<MappingTypeIcon type={'WATERWAYS'}/>);
  const testInstance = element.root;
  expect(
    testInstance.findByType(WavesIcon).props.title
  ).toBe('Waterways');
});

it('test if MappingTypeIcon with LAND_USE option returns the correct icon', () => {
  const element = TestRenderer.create(<MappingTypeIcon type={'LAND_USE'}/>);
  const testInstance = element.root;
  expect(
    testInstance.findByType(TaskIcon).props.title
  ).toBe('Land use');
});

it('test if MappingTypeIcon with wrong option returns an empty html tag', () => {
  const element = TestRenderer.create(<MappingTypeIcon type={'OTHER'}/>);
  const testInstance = element.root;
  expect(
    () => testInstance.findByType(TaskIcon)
  ).toThrow(
    new Error('No instances found with node type: "TaskIcon"'),
  );
  expect(
    () => testInstance.findByType(HomeIcon)
  ).toThrow(
    new Error('No instances found with node type: "HomeIcon"'),
  );
  expect(
    () => testInstance.findByType(WavesIcon)
  ).toThrow(
    new Error('No instances found with node type: "WavesIcon"'),
  );
  expect(
    () => testInstance.findByType(WavesIcon)
  ).toThrow(
    new Error('No instances found with node type: "WavesIcon"'),
  );
});
