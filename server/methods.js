Meteor.methods({
  "addPost": function(post) {
    Posts.insert({
      author: {
        name: post.name,
        profile_image: post.profile_image
      },
      pageId: post.pageId,
      message: post.message,
      createdDate: new Date()
    })
  }
});
