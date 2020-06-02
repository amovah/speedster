import React from 'react';
import pretty from 'pretty-bytes';
import {
  Row,
  Col,
  Typography,
} from 'antd';

const { Title, Text } = Typography;

const Details = ({ details = {} }) => (
  <>
    <Title level={3}>
      File Details:
    </Title>
    <Row>
      <Col span={7}>
        <Text ellipsis>
          Name: {details.name}
        </Text>
      </Col>
      <Col span={1} />
      <Col span={7}>
        <p>
          File Size: {pretty(parseInt(details.totalLength || 0, 10))}
        </p>
      </Col>
      <Col span={1} />
      <Col span={7}>
        <p>
          Category: {details.category}
        </p>
      </Col>
    </Row>
  </>
);

export default Details;
