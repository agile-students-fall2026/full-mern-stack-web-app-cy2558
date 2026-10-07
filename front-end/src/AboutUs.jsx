import { useState, useEffect } from 'react'
import axios from 'axios'
import loadingIcon from './loading.gif'

const AboutUs = props => {
  const [about, setAbout] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about`)
      .then(response => setAbout(response.data))
      .catch(err => setError(JSON.stringify(err, null, 2)))
  }, [])

  if (error) return <p>{error}</p>
  if (!about) return <img src={loadingIcon} alt="loading" />

  return (
    <>
      <h1>About Us</h1>
      <img src={about.imageUrl} alt={about.name} width={200} />
      {about.paragraphs.map((segments, i) => (
        <p key={i}>
          {segments.map((segment, j) =>
            typeof segment === 'string' ? (
              segment
            ) : (
              <a key={j} href={segment.url} target="_blank" rel="noreferrer">
                {segment.text}
              </a>
            ),
          )}
        </p>
      ))}
    </>
  )
}

export default AboutUs
