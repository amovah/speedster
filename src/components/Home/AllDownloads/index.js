import React from 'react';
import { connect } from 'react-redux';
import Downloads from 'Root/components/Downloads';

const AllDownloads = props => <Downloads downloads={props.downloads} />;

export default connect(state => ({
  downloads: state.downloads,
}))(AllDownloads);
