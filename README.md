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

