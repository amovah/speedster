import React from 'react';
import { InputNumber } from 'antd';

export default (props) => {
  const {
    input,
    ...rest
  } = props;

  return (
    <InputNumber
      onChange={value => input.onChange(value)}
      value={input.value}
      {...rest}
    />
  );
};
