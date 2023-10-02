import { Navigate } from "react-router-dom"
const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
 const { children } = props
 // 拿到判断是否登录的变量
 const isLoggedIn:boolean = false

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
export default PrivateRoute;