# Myblog
![Myblog1](https://user-images.githubusercontent.com/83111488/221815572-eed022d8-395f-456c-984f-e9ba676443c9.JPG)

## 1.기술스택
![기술스택](https://user-images.githubusercontent.com/83111488/221815876-194f08dc-f7c2-4f78-9403-541bdbc5fe46.png)




- 라이브러리: 리액트 16.12v
- 상태관리 툴: Redux
- 디자인 툴: Material-UI
- API 통신: Axios
- 서버: express
- db: mongoDB(mongoose)
- 인증토큰: JWT, Google Oauth2.0
- 비밀번호 암호화: bcrypt


## 2.주요기능

- 유저 관련
    - 로그인: 이름, 이메일, 비밀번호, 비밀번호 확인의 간단 회원가입 (추가 인증기능 추후 구현.) 및 로그인 후 JWT 토큰 발급, 인증
            구글Oauth 2.0: 구글 로그인을 통해 구글 토큰 발급
    - 좋아요: 마음에 들어하는 포스트를 좋아요 누르기, 취소하기 가능 (ID 기반)
    - 검색: 원하는 포스트를의 제목, 태그를 검색해서 검색

- 포스트 관련
    - 포스트 생성, 읽기, 수정, 삭제 기능 -> 로그인 인증 후 포스트 원글 작성자만 UPDATE, DELETE 가능
    - PAGINATION: 불필요하게 모든 포스트를 LOAD할 필요없이 한 페이지당 특정 개수의 포스트만 출력하도록 설정
    - 댓글: 해당 포스트에 원하는 댓글 작성 가능(추후 댓글 수정,삭제 구현 예정)
    - 추천 포스트: 현재 읽는 글과 동일한 태그의 글들을 추천하는 기능 (추후 좋아요 개수에 따라 우선순위로 정렬하는 기능 구현 예정)
    - 그외 회원가입 시 관심사를 설정하도록 해서, 매 로그인 시 해당 관심사에 맞는 기사 크롤링 기능 도입 예정

- 디자인 관련
   - Material-UI 기반으로 mobile-responsive
   - (추후 모바일 친화적인 검색 모달팝업, 모달 방식의 포스트 작성 기능 구현 예정)


## 3.구조도
-업데이트 예정


## 4.파일구성
```
├── client
|   ├── public
|   └── src
|       ├── actions
|       |   ├── auth.js
|       |   └── posts.js
|       ├── api
|       |   └──index.js
|       ├── components
|       |   ├── Auth
|       |   |     ├── Auth.js
|       |   |     ├── Icon.js
|       |   |     ├── Input.js 
|       |   |     └── styles.js
|       |   ├── Form
|       |   |     ├── Form.js
|       |   |     └── styles.js
|       |   ├── Home
|       |   |     ├── Home.js
|       |   |     └── styles.js
|       |   ├── Modal
|       |   |     ├── Modal.js
|       |   |     └── Modal.css
|       |   ├── Navbar
|       |   |     ├── Navbar.js
|       |   |     └── styles.js
|       |   ├── PostDetails
|       |   |     ├── CommentSection.jsx
|       |   |     ├── PostDetails.jsx
|       |   |     └── styles.js
|       |   ├── Posts
|       |   |     ├── Posts.jsx
|       |   |     └── styles.js
|       |   |     └── Post.js
|       |   |           ├── Post.jsx
|       |   |           └── styles.js
|       |   ├── pagination.jsx
|       |   └── styles.js
|       ├── constants
|       |   └── actionTypes.js
|       ├── images
|       |   ├── logo.png
|       |   ├── logoText.png
|       |   └── noImages.png
|       ├── reducers
|       |   ├── auth.js
|       |   ├── index.js
|       |   └── posts.js
|       ├── App.js
|       ├── index.css
|       └── index.js
|   ├── .eslintrc.js
|   ├── package-lock.json
|   └── package.json
|
└── server
    ├── controllers
    |    ├── posts.js
    |    └── user.js
    ├── middleware
    |    └── auth.js
    ├── models
    |    ├── postMessage.js
    |    └── user.js
    ├── routes
    |    ├── posts.js
    |    └── users.js
    ├── index.js
    ├── package-lock.js  
    └── package.json
```
