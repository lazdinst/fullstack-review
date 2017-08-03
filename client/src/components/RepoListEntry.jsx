import React from 'react';

const RepoListEntry = (props) => (
  <div className="section group">
    <div className="col span_1_of_3">
      <img className="avatar" src={props.repo.owner.avatar_url}/>
      <div>{props.repo.full_name.split('/')[0]}</div>
    </div>
    <div className="col span_2_of_3">
      <div>{props.repo.name}</div>
    </div>
  </div>
);

export default RepoListEntry;