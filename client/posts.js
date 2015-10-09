Template.posts.helpers({
  "posts": function() {
    return Posts.find({}, {
      "sort": {
        "createdDate": -1
      }
    });
  }
});
