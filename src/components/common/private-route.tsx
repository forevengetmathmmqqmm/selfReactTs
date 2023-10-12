import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { userIdAct, userInfoAct, userToken } from "../../actions";
import { userInfoInter } from "../../utils/inter";
const PrivateRoute: React.FC<{
  children: React.ReactNode
  token: string
  setToken: (token: string) => void
  setUserId: (val: string) => void
  setUserInfo: (val: userInfoInter) => void
}> = (props) => {
  let { children, token } = props
  let isLoggedIn: boolean = true;
  if (token) {
    isLoggedIn = true;
  } else if(localStorage.getItem('token')){
    isLoggedIn = true;
    props.setToken(localStorage.getItem('token') as string);
    props.setUserInfo(JSON.parse(localStorage.getItem('userInfo') as string));
    props.setUserId(localStorage.getItem('userId') as string)
  } else {
    isLoggedIn = false;
  }
  return isLoggedIn ? (
    <>{children}</>
  ) : (
      <>
        <Navigate
          replace={true}
          to="/login"
          state={{ from: `${location.pathname}${location.search}` }}
        />
      </>
  )
}
const mapStateToProps = (state: any) => {
  return {
    token: state.user.token
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  setToken: (token: string) => dispatch(userToken(token)),
  setUserInfo: (userinfo: userInfoInter) => dispatch(userInfoAct(userinfo)),
  setUserId: (id: string) => dispatch(userIdAct(id)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);