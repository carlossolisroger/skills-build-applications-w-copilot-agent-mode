import CollectionView from './CollectionView.jsx'
import { formatReference } from '../utils/format.js'
import { fetchCollection as fetch } from '../api.js'

function Users() {
  return (
    <CollectionView
      description="Meet the people building healthy habits with OctoFit."
      emptyMessage="No members are registered yet."
      endpoint="/api/users/"
      fetcher={fetch}
      title="Members"
    >
      {(users) => (
        <div className="data-card bg-white table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Team</th>
                <th scope="col">About</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id ?? user.id ?? user.email ?? index}>
                  <td className="fw-semibold">{user.name ?? 'Member'}</td>
                  <td>{user.email ?? '-'}</td>
                  <td>{formatReference(user.team)}</td>
                  <td>{user.bio || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CollectionView>
  )
}

export default Users
