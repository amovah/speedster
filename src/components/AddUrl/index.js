import React, { useState } from 'react';
import {
  Card,
  Divider,
} from 'antd';
import { useForm, FormContext } from 'react-hook-form';
import URLSection from './URLSection';
import Info from './Info';
import Advanced from './Advanced';

const AddUrl = () => {
  const formMethods = useForm();
  const [show, setShow] = useState(false);

  return (
    <Card>
      <FormContext {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(data => console.log(data))}>
          <URLSection />
        </form>
      </FormContext>
      {show && (
        <>
          <Divider />
          <Info />
          <Divider />
          <Advanced />
        </>
      )}
    </Card>
  );
};

export default AddUrl;
