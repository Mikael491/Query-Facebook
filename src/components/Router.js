import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Feed from './Feed';
import PostDetail from './PostDetail';

const RouterComponent = () => {
  return (
    <Router
    navigationBarStyle={styles.navStyle}
    titleStyle={styles.titleStyle}
    sceneStyle={styles.sceneStyle}
    >
      <Scene key='feed' component={Feed} title="Timeline" initial />
      <Scene
        key='detail'
        component={PostDetail}
        title='Post'
        backTitle={'back'}
        backButtonTextStyle={{ color: '#fff' }}
        leftButtonIconStyle={{ tintColor: '#fff' }}
      />
    </Router>
  );
};

const styles = {
  titleStyle: {
    color: '#fff'
  },
  navStyle: {
    backgroundColor: '#3F5896'
  },
  sceneStyle: {
    paddingTop: 65
  }
};

export default RouterComponent;
