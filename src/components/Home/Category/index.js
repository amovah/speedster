import React from 'react';
import { connect } from 'react-redux';
import Downloads from 'Root/components/Downloads';

const Category = props => <Downloads downloads={props.downloads} />;

export default connect((state, props) => ({
  downloads: state.downloads.filter(i => i.category.toLowerCase() === props.match.params.category),
}))(Category);
