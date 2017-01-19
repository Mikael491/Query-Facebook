import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { View, Text, Image, TouchableOpacity, ActionSheetIOS } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { likePost } from './../actions';

const OPTIONS = ['Like', 'Love', 'Haha', 'Wow', 'Sad', 'Angry', 'Cancel'];
const CANCEL_INDEX = 6;

class ReusablePostView extends Component {

  onlikePost() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: OPTIONS,
      cancelButtonIndex: CANCEL_INDEX
    },
    (index) => {
      if (index !== 6) {
        this.props.likePost(this.props.post.actions[1].link);
      }
    });
  }

  toDetail() {
    const { post } = this.props;
    Actions.detail({ post });
  }

  renderLikeButton() {
    if (this.props.timelineView) {
      return (
        <TouchableOpacity
          onPress={this.onlikePost.bind(this)}
          activeOpacity={0.8}
        >
          <View style={styles.likeButtonContainer}>
            <Image
              style={styles.likeButtonStyle}
              source={require('./../assets/likeIcon.png')}
            />
            <Text style={{ color: '#B3B3B3' }}>Like</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  renderTouchableCells() {
    const { post } = this.props;
    if (this.props.timelineView) {
        return (
          <TouchableOpacity
            onPress={this.toDetail.bind(this)}
            activeOpacity={1}
          >
            <Text style={styles.postTextStyle}>{post.message}</Text>
            <View style={styles.imageContainerStyle}>
              <Image
              style={styles.postImageStyle}
              source={renderImage(post)}
              />
            </View>
          </TouchableOpacity>
        );
    } else {
      return (
        <View>
          <Text style={styles.postTextStyle}>{post.message}</Text>
          <View style={styles.imageContainerStyle}>
            <Image
            style={styles.postImageStyle}
            source={renderImage(post)}
            />
          </View>
        </View>
      );
    }
  }

  render() {
    console.log(this.props.post);
    const { post } = this.props;
    return (
      <View style={styles.containerStyle}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.userImageStyle}
            source={require('./../assets/Dwayne.jpg')}
          />
        </View>
        <View style={styles.postElementsContainer}>
          <View>
            <Text style={styles.userNameStyle}>{post.from.name}</Text>
            <Text style={styles.timestampStyle}>
              {`${moment(post.created_time).format('MMMM DD')} at ${new Date(post.created_time).toLocaleTimeString('en-US').replace(/:\d+ /, '').toLowerCase()}`}
            </Text>
          </View>
          {this.renderTouchableCells()}
          {this.renderLikeButton()}
        </View>
      </View>
    );
  }
}

const renderImage = (post) => {
  return (
    post.picture ? { uri: post.picture } : require('./../assets/placeholder_post_image.png')
  );
};

const styles = {
  containerStyle: {
    backgroundColor: '#8A8A8A',
    height: 325,
    flexDirection: 'row'
  },
  imageContainer: {
    backgroundColor: '#fff',
    flex: 1
  },
  postElementsContainer: {
    backgroundColor: '#FFFFFF',
    flex: 5,
    justifyContent: 'space-around',
    paddingRight: 10
  },
  userImageStyle: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginTop: 6
  },
  userNameStyle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#3B5998'
  },
  timestampStyle: {
    fontSize: 11,
    fontWeight: '500',
    color: '#B3B3B3',
    marginTop: 5
  },
  postTextStyle: {
    marginBottom: 5,
    fontSize: 12,
    fontWeight: '400',
    color: '#4D4D4D'
  },
  imageContainerStyle: {
    height: 200
  },
  postImageStyle: {
    flex: 1,
    width: null
  },
  likeButtonStyle: {
    width: 30,
    height: 20,
    resizeMode: 'contain'
  },
  likeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export default connect(null, { likePost })(ReusablePostView);
