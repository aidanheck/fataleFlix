import React from 'react';
import { connect } from 'react-redux';

function Queue(props) {
  console.log(props)
  const {userProfile} = props;

  if (!userProfile) return <div className="login-container"></div>

  return(
    <React.Fragment>
      <div className="queue">
        {!userProfile.Queue && <div>no movies</div>}
        {userProfile.Queue &&
          <ul>
            {queue.map(film =>
              <li key={film._id} className="relative">
                <Link className="img-block" to={`/films/${film._id}`}>
                  <img className="film-image" src={film.ImagePath} />
                </Link>
                <a className="delete-btn" onClick={e => this.deleteQueueItem(film._id)}>X</a>
              </li>
            )}
          </ul>}
      </div>
    </React.Fragment>
  )
}

export default connect(mapStateToProps)(Queue)