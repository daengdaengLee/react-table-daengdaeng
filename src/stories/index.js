import React from 'react';
import { storiesOf } from '@storybook/react';
import DefaultTable from './default';
import FixedColsTable from './fixed-cols';
import MarginHorizontalTable from './margin-horizontal';

storiesOf('Basic', module)
  .add('default', () => <DefaultTable />)
  .add('fixed-cols', () => <FixedColsTable />)
  .add('margin-horizontal', () => <MarginHorizontalTable />);
