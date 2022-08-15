import { useQuery } from "@tanstack/react-query"
import { getTheMostRecentData } from "../../api/statisticsAPI"

const LandingPage = () => {

  const query = useQuery(['theMostRecentStatistics'], getTheMostRecentData)

  return (
    <div>
      {query.isLoading
        ? 'Loading...'
        : query.isError
        ? 'Error!'
        : query.data
        ? JSON.stringify(query.data)
        : null}
    </div>
  )
}

export default LandingPage