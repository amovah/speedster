import React from 'react';
import { connect } from 'react-redux';
import Downloads from 'Root/components/Downloads';

const Incompletes = props => <Downloads downloads={props.downloads} />;

export default connect(state => ({
  downloads: state.downloads.filter(i => i.downloadStatus !== 'completed'),
}))(Incompletes);
