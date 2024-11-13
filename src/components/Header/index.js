import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const {history} = props
  const logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const imageUrl = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'
  return (
    <div>
      <div className="header-container-lg">
        <div>
          <Link to="/">
            <img src={imageUrl} alt="website logo" />
          </Link>
        </div>
        <ul className="links-container">
          <li>
            <Link to="/">
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <p>Jobs</p>
            </Link>
          </li>
        </ul>
        <div>
          <ul>
            <li>
              <button type="button" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="header-container-sm">
        <div>
          <Link to="/">
            <img src={imageUrl} alt="website logo" />
          </Link>
        </div>
        <div className="icons-container">
          <Link to="/">
            <AiFillHome className="icons" />
          </Link>
          <Link to="/jobs">
            <BsFillBriefcaseFill className="icons" />
          </Link>
          <button type="button" onClick={logout}>
            <FiLogOut className="icons" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
