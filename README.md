20151009 Meteor CodeLAB
=======================

# 0. 참조
* [Meteor site](https://www.meteor.com/)
  - [Meteor - github](https://github.com/meteor/meteor)
* [Meteor 시작하기 - ](http://kr.discovermeteor.com/chapters/getting-started/)
* [meteor.js 시작하기 - webframeworks.kr](http://webframeworks.kr/getstarted/meteorjs/)
* [Meteor KOREA](http://www.meteorjs.kr/)
* [Meteor 2015 codelab](https://github.com/MeteorKorea/meteor2015codelab)
* 실습반영 [Github repository](https://github.com/ihoneymon/meteor-2015-codelab)
* [meteor reference document](http://docs.meteor.com/#/basic/)

* 미티오 코드랩 1, 2회 추가진행될 예정

***

Modern Web Application with meteor
----------------------------------

# 0. 경직타파하기!!
* Front-end & Back-end & (Database)를 아우르는 '플랫폼Platform'의 영역에 들어섰다.
* Meteor에서 내린 결론
  - AngularJS, React 등을 사용해라.
  - 샌프란시스코로 가자?
  
# 1. Install METEOR
## 1.1. Linux/OS X
```
$ curl https://install.meteor.com | sh
```

## 1.2. Windows

***
# 2. 첫 Meteor APP
* 프로젝트명: sogon2x(소곤소곤)

## 2.1. Meteor create
```
$ meteor create sogon2x
$ cd sogon2x
```

## 2.2. 풀스택 개발자가 되는순간!!
```
honeymon@meteor-2015-codelab (master)*$ meteor 
[[[[[ ~/workspace/git-repository/meteor-2015-codelab ]]]]]

=> Started proxy.
=> Started MongoDB.
=> Started your app.

=> App running at: http://localhost:3000/
```

***
# 3. 목표
* 관심사 기반 마이크로 블로깅 서비스
1. 화면생성
2. 포스트 입력
3. 이벤트 처리
4. 포스트 정렬
5. 사용자 계정
6. 구독/탈퇴
7. 대시보드

***

> 개발속도가 빠르기 때문에 기획을 마치고 나면 구현을 완료한다.

***
# 4. 구조

## 4.1. Javascript 구조
## 4.1.1. Client
```
if (Meteor.isClient) {
  // client
}
```

### 4.1.2. Server
```
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
```

## 4.2. HTML Templae
```
<head>
  <title>meteor-codelab</title>
</head>

<body>
  <h1>Welcome to Meteor!</h1>

  {{> hello}}
</body>

<template name="hello">
  <button>Click Me</button>
  <p>You've pressed the button {{counter}} times.</p>
</template>
```

***
# 5. 부트스트랩bootstrap 적용
```
honeymon@meteor-2015-codelab (master)*$ meteor add twbs:bootstrap
                                                                                   
Changes to your project's package version selections:
                                              
twbs:bootstrap  added, version 3.3.5

                                              
twbs:bootstrap: The most popular front-end framework for developing responsive, mobile
first projects on the web.
```

***
> 한글계정을 사용할 경우에는 문제가 생길 수 있으니 영어로...

> 로컬 레퍼지토리는 `~/.meteor` 디렉토리에 생성함
***

# 6. HEAD & MAIN
* <https://github.com/MeteorKorea/meteor2015codelab/tree/02main>
# 6.1. HEAD - Bootstrap: navbar
* Bootstap:navbar <http://bootstrapk.com/components/#navbar>
* Bootstap:container

## 6.2. MAIN - Button addon
* bootstrap:inputgroup <http://bootstrapk.com/components/#input-groups-buttons>
* bootstrap:button-option <http://bootstrapk.com/css/#buttons-options>
* bootstrap:glyphicon <http://bootstrapk.com/components/#glyphicons>

# 7. POST Template
## 7.1. Media 컴포넌트 사용
* bootstrap:media <http://bootstrapk.com/components/#media-default>

> 프로그램을 만드는 이유:
> > 반복적으로 하는 일이 귀찮아서.

## 7.2. 반복구간 제거하기

***

# 8. 이사
## 8.1. `client` 폴더 생성후 html 파일 이동

## 8.2. Connect DB
### 8.2.1. posts.js 파일을 만들어서 
```
Template.posts.helpers({
  "posts": function() {
    return Posts.find();
  }
});
```

### 8.2.2. Collection을 추가하고
`/lib/collections.js` 생성
```
Posts = new Mongo.Collection('posts');
```

### 8.2.3. Collection에 데이터를 넣어자.
```
Posts.insert({"author": {"name": "주인님", "profile_image": "http://lorempixel.com/64/64/cats/"}, message: "뭐하냥?"});
```

### 8.2.4. find를 이용해서 찾아보자.
```
Posts.find().fetch();
```

***
# 9. Server Method: 보안이 필요한 시기
## 9.1. Remove insecure
* meteor remove insecure
```
honeymon@meteor-2015-codelab (master)$ meteor remove insecure
                                              
Changes to your project's package version selections:
                                              
insecure  removed from your project           

insecure: removed dependency
```
* insert failed: Access denied
* 사용자가 임의로 데이터 조작을 할 수 없음

## 9.2.  Methods
* `server/method.js` - 서버에서만 insert
> 서버 프로그래밍으로 돌입

```
Meteor.methods({
  "addPost": function(post) {
    Posts.insert({
      author: {
        name: post.name,
        profile_image: post.profile_image
      },
      message: post.message
    })
  }
});
```

## 9.3. Method 확인
```
Meteor.call("addPost", {"name": "Slave4U", "profile_image": "http://lorempixel.com/64/64/cats", message: "내 밥은 어디있냥??"});
```

***
# 10. 이벤트 핸들링Event handling
## 10.1. `client/main.js` 추가
```
Template.main.events({
  //버튼을 눌러 submit이 발생한 것을 확인하여 서버에 처리
  "submit": function(event, template) {
    Meteor.call("addPost", {
      "name": "Slave4U",
      "profile_image": "http://lorempixel.com/64/64/cats",
      message: template.find("#post").value //이벤트가 발생한 템플릿에서! #post 를 찾아서!
    });
  }
});
```


## 10.2. 이벤트 차단
```
Template.main.events({
  //버튼을 눌러 submit이 발생한 것을 확인하여 서버에 처리
  "submit": function(event, template) {
    Meteor.call("addPost", {
      "name": "Slave4U",
      "profile_image": "http://lorempixel.com/64/64/cats",
      message: template.find("#post").value //이벤트가 발생한 템플릿에서! #post 를 찾아서!
    });
    event.preventDefault(); // submit을 날리고 저장후에 리다이렉트되는 것을 방지
  }
});
```

## 10.3. 이벤트 처리 후 callback
```
Template.main.events({
  //버튼을 눌러 submit이 발생한 것을 확인하여 서버에 처리
  "submit": function(event, template) {
    Meteor.call("addPost", {
      "name": "Slave4U",
      "profile_image": "http://lorempixel.com/64/64/cats",
      message: template.find("#post").value //이벤트가 발생한 템플릿에서! #post 를 찾아서!
    }, function(error) {
      if(error) {
        throw(error);
      } else {
        template.find("#post").value = "";
      }
    });
    event.preventDefault(); // submit을 날리고 저장후에 리다이렉트되는 것을 방지
  }
});
```

***
# 11. 서버 초기화
## 11.1. 서버초기화
* `meteor reset`
```
honeymon@meteor-2015-codelab (master)$ meteor reset
Project reset.
```

## 11.2. 재기동
* `meteor reset`

***
# 12. `addPost` 수정
글이 밑에 붙으면서 불편함!!
* 메서드가 서버안에 있어야 하는 이유?
  - 클라이언트의 시간은 신뢰할 수 없다.
  
## 12.1. 순서를 결정하기 위한 구분자로 `createdDate` 필드 추가
* 메테오 초기화

> 오오... +_+) console.table()
```
console.table(Posts.find({}, {sort: {"createdDate": -1}}).fetch())
```

## 12.2. 데이터를 거꾸로 정렬되도록 정의
```
Template.posts.helpers({
  "posts": function() {
    return Posts.find({}, {
      "sort": {
        "createdDate": -1
      }
    });
  }
});
```

***
# 13. Session을 분리
> 주제별로 대화를 나눌 수 있도록 방을 분리

## 13.1. Session
### 13.1.1. 장점
### 13.1.2. 단점

## 13.2. Session 사용법
* 세션 읽기
```
Session.get('pageId');
```

* 세션 쓰기
```
Session.set('pageId', 'catLover');
```

## 13.3. Session 을 템플릿에 추가하도록 수정
* main.js
```
Template.main.helpers({
  'page': function() {
    return Session.get('pageId');
  }
});
```

* main.html
```
<h2>{{page}}'s Page</h2>
```

> * Reactive Programming
  - Reactivity
  
***
# 14. Publish/Subscribe
* 보고 싶은 것만 보고 싶다.
* meteor remove autopublish

## 14.1. autopublish 제거
* 서버의 자동배포를 껐음
```
honeymon@meteor-2015-codelab (master)$ meteor remove autopublish
                                              
Changes to your project's package version selections:
                                              
autopublish  removed from your project

autopublish: removed dependency 
```

## 14.2. subscribe
```
Meteor.subscribe('getPage');
```

***
# 15. Router
* 키워드별 POSTS

## 15.1. Router 추가
* <https://kadira.io/academy/meteor-routing-guide/content/introduction-to-flow-router>
```
meteor add kadira:flow-router
```

***
# 16. 로그인 - Accounts
* <https://www.meteor.com/accounts>
```
meteor add accounts-password
```
