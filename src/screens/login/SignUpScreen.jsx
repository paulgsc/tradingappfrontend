import SignUpFormLayout from "./layout/SignUpFormLayout";
import ExpiredToken from "./component/validations/ExpiredToken";
import LoginSuccess from "./component/validations/LoginSuccess";

function SignUpScreen() {
  return (
    <div>
      <ExpiredToken login={false}>
        <SignUpFormLayout />
        <LoginSuccess />
      </ExpiredToken>
    </div>
  );
}

export default SignUpScreen;
