import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {IoIosSearch} from 'react-icons/io'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

class Jobs extends Component {
  state = {
    jobs: [],
    jobTypes: [],
    salary: '',
    searchTerm: '',
    profile: [],
    jobsLoaded: true,
    profileLoaded: true,
  }

  componentDidMount() {
    this.fetchJobs()
    this.fetchProfile()
  }

  componentDidUpdate(prevProps, prevState) {
    // Call fetchJobs only if the filters or searchTerm state has changed
    const {jobTypes, salary, searchTerm} = this.state
    if (
      prevState.jobTypes !== jobTypes ||
      prevState.salary !== salary ||
      prevState.searchTerm !== searchTerm
    ) {
      this.fetchJobs()
    }
  }

  // Fetch jobs data on component mount
  fetchJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {jobTypes, salary, searchTerm} = this.state
    const jobTypeString = jobTypes.join(',')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${jobTypeString}&minimum_package=${salary}&search=${searchTerm}`
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const jobsResponse = await fetch(jobsUrl, options)
      if (jobsResponse.ok) {
        const jobsData = await jobsResponse.json()
        this.setState({
          jobs: jobsData.jobs,
          jobsLoaded: true,
        })
      } else {
        this.setState({jobsLoaded: false})
        console.error('Failed to fetch jobs')
      }
    } catch (error) {
      this.setState({jobsLoaded: false})
      console.error('Error fetching jobs:', error)
    }
  }

  fetchProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(profileApiUrl, options)
      if (response.ok) {
        const data = await response.json()
        this.setState({
          profile: data.profile_details,
          profileLoaded: true,
        })
      } else {
        this.setState({profileLoaded: false})
        console.error('Failed to fetch profile')
      }
    } catch (error) {
      this.setState({profileLoaded: false})
      console.error('Error fetching profile:', error)
    }
  }

  pushTypes = event => {
    const jobType = event.target.name
    this.setState(prevState => ({
      jobTypes: prevState.jobTypes.includes(jobType)
        ? prevState.jobTypes.filter(type => type !== jobType)
        : [...prevState.jobTypes, jobType],
    }))
  }

  addSalary = event => {
    console.log(event.target.id)
    this.setState({
      salary: event.target.id,
    })
  }

  changeSearchText = event => {
    this.setState({
      searchTerm: event.target.value,
    })
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {jobs, profile, searchTerm, jobsLoaded, profileLoaded} = this.state
    console.log(jobs, profile, jobsLoaded, profileLoaded)
    return (
      <>
        <Header />
        <div className="job-container">
          <div className="left-side-container">
            <div className="left-search-container">
              <input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={this.changeSearchText}
              />
              <button type="button" data-testid="searchButton">
                <IoIosSearch className="search-icon" />
              </button>
            </div>

            {profileLoaded ? (
              <div className="profile-container">
                <img src={profile.profile_image_url} alt="profile" />
                <h1>{profile.name}</h1>
                <p>{profile.short_bio}</p>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  className="retry-button"
                  onClick={this.fetchProfile}
                >
                  Retry
                </button>
              </div>
            )}

            <hr />

            <div className="filter-container">
              <h1>Type of Employment</h1>
              <ul>
                {employmentTypesList.map(item => (
                  <li key={item.employmentTypeId} className="list-container">
                    <input
                      type="checkbox"
                      id={item.employmentTypeId}
                      name={item.employmentTypeId}
                      onChange={this.pushTypes}
                    />
                    <label htmlFor={item.employmentTypeId}>{item.label}</label>
                  </li>
                ))}
              </ul>
            </div>

            <hr />

            <div className="filter-container">
              <h1>Salary Range</h1>
              <ul>
                {salaryRangesList.map(item => (
                  <li key={item.salaryRangeId} className="list-container">
                    <input
                      type="radio"
                      name="salary"
                      value={item.label}
                      id={item.salaryRangeId}
                      onChange={this.addSalary}
                    />
                    <label htmlFor={item.salaryRangeId}>{item.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="right-side-container">
            <div className="right-search-container">
              <input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={this.changeSearchText}
              />
              <IoIosSearch className="search-icon" />
            </div>

            <div className="jobs-list-container">
              {jobs.length > 0 ? (
                <div>
                  {jobsLoaded ? (
                    <ul>
                      {jobs.map(job => (
                        <li key={job.id}>
                          <Link to={`/jobs/${job.id}`}>
                            <div className="job-item">
                              <div className="company-details-container">
                                <div>
                                  <img
                                    src={job.company_logo_url}
                                    alt="company logo"
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
                              <hr />
                              <div>
                                <h1>Description</h1>
                                <p>{job.job_description}</p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                        alt="failure view"
                      />
                      <h1>Oops! Something Went Wrong</h1>
                      <p>
                        We cannot seem to find the page you are looking for.
                      </p>
                      <button
                        type="button"
                        className="retry-button"
                        onClick={this.fetchJobs}
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                    alt="no jobs"
                  />
                  <h1>No Jobs Found</h1>
                  <p>We could not find any jobs. Try other filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
