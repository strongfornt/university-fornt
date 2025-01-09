import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="flex items-center gap-2" >
        <Link to={'/'} >Dept</Link>
        <Link to={'/des'} >Designation</Link>
        <Link to={'/chat'} >Chat</Link>
    </div>
  )
}
