import jwt from 'jsonwebtoken';

//만약 포스트를 좋아요 누를때
// 좋아요 버튼을 누름 => auth 미들웨어가 승인or거부함 (next로 넘김) => 컨트롤러가 like 

const auth = async (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];
        /* const isCustomAuth = token.length < 500;  => 구글  Oauth가 바뀌면서 토큰 방식이 바뀜.
        client/components/Auth/Auth.js에서 토큰을 미리 디코딩 한 것을 보내기 때문에
        오히려 디코딩 하지 않은 웹에서 만든 아이디의 토큰이 훨씬 길게 된다.
        */
        const isCustomAuth = token.length > 100;

        let decodedData; 
        if(token && isCustomAuth) { //웹에서 만든 아이디
            decodedData = jwt.verify(token, 'test');
            
            req.userId = decodedData?.id;

        } else{ //google oauth로 로그인한 아이디
            //미리 디코딩을 해서 보내기 때문에.. 여기서 따로 디코딩 할 필요 없이 바로 토큰을 전달한다.
            //decodedData = jwt.decode(token);
            req.userId = token;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;