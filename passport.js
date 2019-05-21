import passport from "passport";
import User from "./models/User";

// strategy : 로그인하는 방식, 인증하는 방식
// 아래의 내용은 passport-local-mongoose에서 제공하는 인증방식을 사용한다
// 즉, User 모델에 정의된 스키마 내용을 가지고 인증과정을 passport-local-mongoose가 처리한다.
passport.use(User.createStrategy());

// serialize : 쿠키에 담을 내용을 설정
passport.serializeUser(User.serializeUser());

// deserialize : 쿠키에 저장된 값을 어떻게 찾는가를 설정
passport.deserializeUser(User.deserializeUser());
