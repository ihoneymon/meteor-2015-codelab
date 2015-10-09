//로그인한 유저인지 확인해서 처리
Meteor.methods({
  "addPost": function(post) {
    check(this.userId, String); // 로그인 체크 userId가 'String'으로 들어왔느냐?
    Posts.insert({
      author: {
        name: Meteor.user().username,
        profile_image: Gravatar.imageUrl(Meteor.user().emails[0].address, {d: 'retro'})
      },
      pageId: post.pageId,
      message: post.message,
      createdDate: new Date()
    })
  }
});
