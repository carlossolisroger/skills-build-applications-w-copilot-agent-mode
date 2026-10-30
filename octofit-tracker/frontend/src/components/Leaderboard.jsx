import CollectionView from './CollectionView.jsx'
import { formatReference } from '../utils/format.js'
import { fetchCollection as fetch } from '../api.js'

function Leaderboard() {
  return (
    <CollectionView
      description="Celebrate the members and teams leading the way."
      emptyMessage="The leaderboard is waiting for its first scores."
      endpoint="/api/leaderboard/"
      fetcher={fetch}
      title="Leaderboard"
    >
      {(entries) => (
        <div className="data-card bg-white table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Member</th>
                <th scope="col">Team</th>
                <th scope="col">Points</th>
                <th scope="col">Period</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry._id ?? entry.id ?? `${entry.user}-${index}`}>
                  <td className="fw-bold">#{index + 1}</td>
                  <td className="fw-semibold">{formatReference(entry.user)}</td>
                  <td>{formatReference(entry.team)}</td>
                  <td>{entry.points ?? 0}</td>
                  <td className="text-capitalize">{entry.period ?? 'all-time'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CollectionView>
  )
}

export default Leaderboard
