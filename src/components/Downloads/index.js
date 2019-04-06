import React from 'react';
import { connect } from 'react-redux';
import DownloadTable from 'Root/components/DownloadTable';

const Downloads = props => <DownloadTable downloads={props.downloads} />;

const select = (state, props) => {
  if (props.match.params.category === 'completeds') {
    return {
      downloads: state.downloads.filter(
        i => i.downloadStatus === 'completed',
      ),
    };
  }

  if (props.match.params.category === 'incompleteds') {
    return {
      downloads: state.downloads.filter(
        i => i.downloadStatus !== 'completed',
      ),
    };
  }

  if (
    [
      'compresseds',
      'pictures',
      'musics',
      'videos',
      'others',
    ].includes(props.match.params.category)
  ) {
    return {
      downloads: state.downloads.filter(
        i => i.category.toLowerCase() === props.match.params.category,
      ),
    };
  }

  return {
    downloads: state.downloads,
  };
};

export default connect(select)(Downloads);
