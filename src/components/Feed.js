import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import Post from './Post';
import { Spinner } from './common';
import { TOKEN } from './../Credentials.js';
import { fetchPosts, loginToFacebook, fetchMorePosts } from './../actions';

class Feed extends Component {

  componentWillMount() {
    if (!this.props.loggedIn) {
      this.props.loginToFacebook(TOKEN);
      this.props.fetchPosts();
      this.createDataSource(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onEndReached() {
      if (!this.props.loading) {
          if (this.props.next) {
            this.props.fetchMorePosts(this.props.next);
          }
      }
  }

  createDataSource({ posts }) {
    const lv = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = lv.cloneWithRows(posts);
  }

  renderRow(post) {
    return (
      <Post key={post.id} post={post} />
    );
  }

  renderFooter() {
    return this.props.loading ? <Spinner /> : null;
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View style={styles.seperator} key={sectionID + rowID} />
    );
  }

  renderView() {
    if (this.props.loggedIn) {
      return (
        <ListView
          enableEmptySections
          style={styles.feedStyle}
          dataSource={this.dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          renderFooter={this.renderFooter.bind(this)}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={1}
        />
      );
    } else {
      return (
          <Spinner />
      );
    }
  }

  render() {
    return (
      this.renderView()
    );
  }
}

const styles = {
  feedStyle: {
    paddingTop: 20
  },
  seperator: {
    height: 1,
    backgroundColor: '#ddd'
  },
  feedLoadStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const mapStateToProps = (state) => {
  const { posts, loading, next } = state.posts;
  const { loggedIn } = state.auth;
  return { posts, loading, next, loggedIn };
};

export default connect(mapStateToProps, { fetchPosts, loginToFacebook, fetchMorePosts })(Feed);
