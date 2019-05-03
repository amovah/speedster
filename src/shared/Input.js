import React from 'react';
import { Input } from 'antd';

export default (props) => {
  const {
    input,
    ...rest
  } = props;

  return (
    <Input
      onChange={event => input.onChange(event.target.value)}
      value={input.value}
      {...rest}
    />
  );
};
