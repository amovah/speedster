import React from 'react';
import { connect } from 'react-redux';
import Downloads from 'Root/components/Downloads';

const Queue = props => <Downloads downloads={props.downloads} />;

const select = (state, props) => {
  switch (props.match.params.type) {
    case 'completeds': {
      return {
        downloads: state.downloads.filter(
          i => i.downloadStatus === 'completed' && i.queue,
        ),
      };
    }

    case 'incompleteds': {
      return {
        downloads: state.downloads.filter(
          i => i.downloadStatus !== 'completed' && i.queue,
        ),
      };
    }

    default: {
      return {
        downloads: state.downloads.filter(i => i.queue),
      };
    }
  }
};

export default connect(select)(Queue);
