import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  console.log('Hii')
  return (
    <div style={{height: '100vh', overflow: 'hidden'}}>
      <Header />
      <div className="home-container">
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button type="button">
          <Link to="/jobs">Find Jobs</Link>
        </button>
      </div>
    </div>
  )
}

export default Home
