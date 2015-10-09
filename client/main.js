Template.main.onCreated(function() {
  //on으로 시작하는 것은 자기자신에서 불러온다.
  this.subscribe('getPage');
});

Template.main.helpers({
  'page': function() {
    return Session.get('pageId');
  }
});


Template.main.events({
  //버튼을 눌러 submit이 발생한 것을 확인하여 서버에 처리
  "submit": function(event, template) {
    Meteor.call("addPost", {
      "name": "Slave4U",
      "profile_image": "http://lorempixel.com/64/64/cats",
      message: template.find("#post").value //이벤트가 발생한 템플릿에서! #post 를 찾아서!
    }, function(error) {
      if (error) {
        throw (error);
      } else {
        template.find("#post").value = "";
      }
    });
    event.preventDefault(); // submit을 날리고 저장후에 리다이렉트되는 것을 방지
  }
});
