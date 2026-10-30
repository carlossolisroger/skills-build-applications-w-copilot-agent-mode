import CollectionView from './CollectionView.jsx'
import { formatDate, formatReference } from '../utils/format.js'

function Activities() {
  return (
    <CollectionView
      description="See the latest training sessions logged by the OctoFit community."
      emptyMessage="No activities have been logged yet."
      endpoint="/api/activities/"
      title="Activities"
    >
      {(activities) => (
        <div className="data-card bg-white table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">Member</th>
                <th scope="col">Activity</th>
                <th scope="col">Duration</th>
                <th scope="col">Distance</th>
                <th scope="col">Calories</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity._id ?? activity.id ?? `${activity.type}-${index}`}>
                  <td className="fw-semibold">{formatReference(activity.user)}</td>
                  <td className="text-capitalize">{activity.type ?? 'Activity'}</td>
                  <td>{activity.durationMinutes ?? '-'} min</td>
                  <td>
                    {activity.distanceKm == null || activity.distanceKm === 0
                      ? '-'
                      : `${activity.distanceKm} km`}
                  </td>
                  <td>{activity.calories ?? '-'} kcal</td>
                  <td>{formatDate(activity.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CollectionView>
  )
}

export default Activities
