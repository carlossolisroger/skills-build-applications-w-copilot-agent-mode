import CollectionView from './CollectionView.jsx'
import { fetchCollection as fetch } from '../api.js'

function Workouts() {
  return (
    <CollectionView
      description="Choose a workout that fits your goals and your day."
      emptyMessage="No suggested workouts are available right now."
      endpoint="/api/workouts/"
      fetcher={fetch}
      title="Workouts"
    >
      {(workouts) => (
        <div className="row g-3">
          {workouts.map((workout, index) => {
            const equipment = Array.isArray(workout.equipment) ? workout.equipment : []

            return (
              <div
                className="col-12 col-md-6 col-xl-4"
                key={workout._id ?? workout.id ?? `${workout.title}-${index}`}
              >
                <article className="workout-card bg-white p-4">
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {workout.category && (
                      <span className="badge text-bg-success">{workout.category}</span>
                    )}
                    {workout.difficulty && (
                      <span className="badge text-bg-light">{workout.difficulty}</span>
                    )}
                  </div>
                  <h2 className="h5">{workout.title ?? 'Workout'}</h2>
                  <p className="text-secondary mb-3">
                    {workout.description ?? 'A workout to help you keep moving.'}
                  </p>
                  <p className="small fw-semibold mb-2">
                    {workout.durationMinutes ?? '-'} minutes
                  </p>
                  {equipment.length > 0 && (
                    <p className="small text-secondary mb-0">
                      Equipment: {equipment.join(', ')}
                    </p>
                  )}
                </article>
              </div>
            )
          })}
        </div>
      )}
    </CollectionView>
  )
}

export default Workouts
