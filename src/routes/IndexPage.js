import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import Bezier from './bezier'

function IndexPage() {
  return (
    <div className={styles.normal}>
      <Bezier/>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
