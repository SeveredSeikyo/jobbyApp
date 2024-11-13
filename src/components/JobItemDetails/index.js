import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {
    similarJobs: [],
    jobDetails: [],
    isFailed: false,
  }

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.getJobItemDetails(id)
  }

  getJobItemDetails = async id => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs
      this.setState({
        similarJobs,
        jobDetails,
      })
    } else {
      this.setState({
        isFailed: true,
      })
    }
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const {jobDetails, similarJobs, isFailed} = this.state
    const skills = jobDetails.skills || []
    const lifeAtCompany = jobDetails.life_at_company || []
    console.log(skills, lifeAtCompany)

    return (
      <div className="job-item-container">
        <Header />
        {!isFailed ? (
          <>
            <div className="job-item">
              <div className="company-details-container">
                <div>
                  <img
                    src={jobDetails.company_logo_url}
                    alt="job details company logo"
                  />
                </div>
                <div>
                  <h1>{jobDetails.title}</h1>
                  <div className="rating-container">
                    <FaStar className="star-icon" />
                    <p>{jobDetails.rating}</p>
                  </div>
                </div>
              </div>
              <div className="company-location-container">
                <div className="innerlocation-container">
                  <div>
                    <IoLocationSharp className="company-icon" />
                    <p>{jobDetails.location}</p>
                  </div>
                  <div>
                    <BsFillBriefcaseFill className="company-icon" />
                    <p>{jobDetails.employment_type}</p>
                  </div>
                </div>
                <div>
                  <p>{jobDetails.package_per_annum}</p>
                </div>
              </div>
              <hr />
              <div>
                <div className="description-container">
                  <h1>Description</h1>
                  <a href={jobDetails.company_website_url}>
                    <div>
                      <p>Visit</p>
                      <FiExternalLink />
                    </div>
                  </a>
                </div>
                <p>{jobDetails.job_description}</p>
              </div>
              <div>
                <h1>Skills</h1>
                <ul className="skills-container">
                  {skills.map(skill => (
                    <li key={skill.name}>
                      <div>
                        <img src={skill.image_url} alt={skill.name} />
                        <h1>{skill.name}</h1>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h1>Life at Company</h1>
                <div className="life-at-container">
                  <p>{lifeAtCompany.description}</p>
                  <img src={lifeAtCompany.image_url} alt={jobDetails.title} />
                </div>
              </div>
            </div>
            <div className="similar-jobs-container">
              <h1>Similar Jobs</h1>
              <ul>
                {similarJobs.map(job => (
                  <li key={job.id}>
                    <div className="job-item">
                      <div className="company-details-container">
                        <div>
                          <img
                            src={job.company_logo_url}
                            alt="similar job company logo"
                          />
                        </div>
                        <div>
                          <h1>{job.title}</h1>
                          <div className="rating-container">
                            <FaStar className="star-icon" />
                            <p>{job.rating}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h1>Description</h1>
                        <p>{job.job_description}</p>
                      </div>
                      <div className="company-location-container">
                        <div className="innerlocation-container">
                          <div>
                            <IoLocationSharp className="company-icon" />
                            <p>{job.location}</p>
                          </div>
                          <div>
                            <BsFillBriefcaseFill className="company-icon" />
                            <p>{job.employment_type}</p>
                          </div>
                        </div>
                        <div>
                          <p>{job.package_per_annum}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for.</p>
            <button
              type="button"
              className="retry-button"
              onClick={() => this.getJobItemDetails(id)}
            >
              Retry
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default JobItemDetails
