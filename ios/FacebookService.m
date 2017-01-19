//
//  FacebookService.m
//  SproutSocialCodingChallenge
//
//  Created by Mikael Teklehaimanot on 1/6/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "FacebookService.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>

@implementation FacebookService

RCT_EXPORT_MODULE()

FBSDKAccessToken *accessToken;

RCT_EXPORT_METHOD(login:(NSString *)access_token:(RCTResponseSenderBlock)callback) {

  accessToken = [[FBSDKAccessToken alloc] initWithTokenString:[NSString stringWithFormat:@"%@", access_token] permissions:@[@"user-posts"] declinedPermissions:nil appID:@"1154191958013082" userID:@"SproutSocialCodingChallenge" expirationDate:nil refreshDate:nil];
  callback(@[[NSNull null], @TRUE]);
}

//TODO: Refactor/consolida query methods

RCT_EXPORT_METHOD(fetchPosts:(RCTResponseSenderBlock)callback) {
  if (accessToken) {
    [[[FBSDKGraphRequest alloc] initWithGraphPath:[NSString stringWithFormat:@"/v2.3/274995322539308/posts?limit=15&access_token=%@", accessToken.tokenString] parameters:nil]
     startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
       if (!error) {
         callback(@[[NSNull null], result]);
       }
     }];
  }

}

RCT_EXPORT_METHOD(fetchMorePosts:(NSString *)queryString:(RCTResponseSenderBlock)callback) {
  if (accessToken) {
    [[[FBSDKGraphRequest alloc] initWithGraphPath:[NSString stringWithFormat:@"%@", queryString] parameters:nil]
     startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
       if (!error) {
         callback(@[[NSNull null], result]);
       } else {
         callback(@[error.description, [NSNull null]]);
       }
     }];
  }
}

RCT_EXPORT_METHOD(likePost:(NSString *)objectID:(RCTResponseSenderBlock)callback) {
  if (accessToken) {
    FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                                  initWithGraphPath:[NSString stringWithFormat:@"/v2.3/%@/likes?access_token=%@", objectID, accessToken.tokenString]
                                  parameters:nil
                                  HTTPMethod:@"POST"];
    [request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection,
                                          id result,
                                          NSError *error) {
      if (!error) {
        callback(@[[NSNull null], result]);
      } else {
        callback(@[error.description, [NSNull null]]);
      }
      
    }];
  }
}

@end
