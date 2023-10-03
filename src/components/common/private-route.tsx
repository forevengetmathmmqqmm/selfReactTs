import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { userToken } from "../../actions";
const PrivateRoute = (props: { children: React.ReactNode, token: string, setToken: (token: string) => void }): JSX.Element => {
  let { children, token } = props
  let isLoggedIn: boolean = true;
  if (token) {
    isLoggedIn = true;
  } else if(localStorage.getItem('token')){
    isLoggedIn = true;
    props.setToken(localStorage.getItem('token') || '');
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
  setToken: (token: string) => dispatch(userToken(token))
})
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);