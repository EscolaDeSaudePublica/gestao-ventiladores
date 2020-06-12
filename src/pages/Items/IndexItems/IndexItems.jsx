import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import LoadingBar from '../../_common/components/LoadingBar';
import Layout from '../../_layout/Layout';
import ItemsPage from '../ItemPage/ItemsPage';


const IndexItems = (props) => {
  const {
    loading,
    progress,
    items,
  } = props;

  if (loading) {
    return (
      <>
        <LoadingBar progress={progress} />
      </>
    );
  }

  return (
    <>
      <Layout data-testid="itemPage">
        <Container>
          <ItemsPage items={items} />
        </Container>
      </Layout>
    </>
  );
};

IndexItems.defaultProps = {
  loading: true,
  items: [],
  progress: 0,
};

IndexItems.propTypes = {
  loading: PropTypes.bool,
  progress: PropTypes.number,
  items: PropTypes.instanceOf(Array),
};

export default IndexItems;
