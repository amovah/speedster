import React, { useCallback } from 'react';
import {
  Row,
  Col,
  Button,
  Input,
  Typography,
  InputNumber,
} from 'antd';
import { remote } from 'electron';
import { useFormContext, Controller } from 'react-hook-form';

const {
  Title,
  Text,
} = Typography;

export default function Advanced({ details }) {
  const {
    setValue, control,
  } = useFormContext();

  const changeLocation = useCallback(() => {
    remote.dialog.showOpenDialog({
      defaultPath: details.outputDir,
      properties: ['openDirectory'],
    }, (files) => {
      if (files) {
        setValue('outputDir', files[0]);
      }
    });
  }, []);

  return (
    <>
      <Title level={4}>
        Advanced Options:
      </Title>
      <Row>
        <Col span={10}>
          <Text>
            Max Speed:
          </Text>
          <br />
          <Controller
            as={(
              <Input
                placeholder="like 1KB, 512KB, 1MB, ..."
                type="text"
              />
            )}
            control={control}
            name="maxSpeed"
          />
        </Col>
        <Col span={2} />
        <Col span={10}>
          <Text>
            Save Location:
          </Text>
          <br />
          <Row>
            <Col span={17}>
              <Input
                type="text"
                disabled
                value={details.outputDir}
              />
            </Col>
            <Col span={1} />
            <Col span={5}>
              <Button
                type="primary"
                onClick={changeLocation}
              >
                Change Location
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={10}>
          <Text>
            Connections:
          </Text>
          <br />
          <Controller
            as={(
              <InputNumber
                min={1}
                max={16}
              />
            )}
            defaultValue={16}
            name="maxConnection"
          />
        </Col>
        <Col span={2} />
      </Row>
    </>
  );
}
