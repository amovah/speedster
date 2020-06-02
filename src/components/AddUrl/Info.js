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
    <Title level={4}>
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
        <Text>
          File Size: {pretty(parseInt(details.totalLength || 0, 10))}
        </Text>
      </Col>
      <Col span={1} />
      <Col span={7}>
        <Text>
          Category: {details.category}
        </Text>
      </Col>
    </Row>
  </>
);

export default Details;
