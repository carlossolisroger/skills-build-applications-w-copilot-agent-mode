import CollectionView from './CollectionView.jsx'
import { formatReference } from '../utils/format.js'

function Teams() {
  return (
    <CollectionView
      description="Find your crew and see who's training together."
      emptyMessage="No teams have been created yet."
      endpoint="/api/teams/"
      title="Teams"
    >
      {(teams) => (
        <div className="row g-3">
          {teams.map((team, index) => {
            const members = Array.isArray(team.members) ? team.members : []

            return (
              <div className="col-12 col-md-6 col-xl-4" key={team._id ?? team.id ?? index}>
                <article className="data-card h-100 bg-white p-4">
                  <div className="d-flex align-items-start justify-content-between gap-3">
                    <h2 className="h5 mb-2">{team.name ?? 'Team'}</h2>
                    <span className="badge rounded-pill text-bg-light">
                      {members.length} {members.length === 1 ? 'member' : 'members'}
                    </span>
                  </div>
                  <p className="text-secondary mb-3">
                    {team.description || 'Ready to reach a new goal together.'}
                  </p>
                  {members.length > 0 && (
                    <ul className="list-unstyled mb-0 small">
                      {members.map((member, memberIndex) => (
                        <li key={member?._id ?? member?.id ?? memberIndex}>
                          {formatReference(member)}
                        </li>
                      ))}
                    </ul>
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

export default Teams
