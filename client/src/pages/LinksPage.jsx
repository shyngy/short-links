import React from 'react'
import LinksList from '../components/LinksList'
import Loader from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks'

function LinksPage() {
  const [links, setLinks] = React.useState()
  const { loading, request } = useHttp()
  const { token } = React.useContext(AuthContext)

  const fetchLinks = React.useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      })

      setLinks(fetched)
    } catch (error) {

    }
  }, [token, request])

  React.useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader />
  }
  console.log(links);
  return (
    <>
      {!loading && links && <LinksList links={links} />}
    </>
  )
}

export default LinksPage
