import React from 'react';
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import { PaletteTree } from './palette';
import AdminLoginPage from '../pages/AdminLoginPage';

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/AdminLoginPage">
        <AdminLoginPage />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
