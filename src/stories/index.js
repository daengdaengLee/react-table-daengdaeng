import React from 'react';
import { storiesOf } from '@storybook/react';
import DefaultTable from './default';
import FixedColsTable from './fixed-cols';

storiesOf('Basic', module)
  .add('default', () => <DefaultTable />)
  .add('fixed-cols', () => <FixedColsTable />);
