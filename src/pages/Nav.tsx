import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div>
        <Link to={'/'} >Post</Link>
        <Link to={'/user'} >User</Link>
    </div>
  )
}
