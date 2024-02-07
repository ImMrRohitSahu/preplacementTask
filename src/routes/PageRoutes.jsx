import { Route, Routes } from "react-router-dom"
import route from "./route.json"
import Home from "./../pages/Home"
import Cart from "../pages/Cart"

const PageRoutes = () => {
  return (
    <Routes>
        <Route path={route.HOME} element={<Home/>}></Route>
        <Route path={route.CART} element={<Cart/>} ></Route>
    </Routes>
  )
}

export default PageRoutes