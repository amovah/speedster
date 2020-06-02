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
  const [details, setDetails] = useState({});

  return (
    <Card>
      <FormContext {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(data => console.log(data))}>
          <URLSection setDetails={setDetails} setShow={setShow} />
        </form>
        {show && (
          <>
            <Divider />
            <Info details={details} />
            <Divider />
            <Advanced details={details} />
          </>
        )}
      </FormContext>
    </Card>
  );
};

export default AddUrl;
