import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>
      {props.repos.map((item, i)=>{
        return <RepoListEntry key={i} repo={item} />;
      })}
    </div>
  </div>
)

export default RepoList;