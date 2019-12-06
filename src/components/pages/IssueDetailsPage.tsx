import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import classnames from 'classnames'
import { useComments } from 'redux/comments'

import { insertMentionLinks } from 'utils/stringUtils'
import { IssueComments } from '../partials/IssueComments'
// import { IssueLabels } from 'components/IssueLabels'
// import { RootState } from 'app/rootReducer'
// import { fetchIssue } from 'features/issuesList/issuesSlice'

// import { IssueMeta } from '../../../src copy/features/issueDetails/IssueMeta'
// import { IssueComments } from '../../../src copy/features/issueDetails/IssueComments'
// import { fetchComments } from '../../../src copy/features/issueDetails/commentsSlice'

import styles from './IssueDetailsPage.module.css'
import './IssueDetailsPage.css'
import { useIssuesDisplay, showIssuesList } from 'redux/issuesDisplay'
import { IssueMeta } from '../partials/IssueMeta'
import { IssueLabels } from '../partials/IssueLabels'

export const IssueDetailsPage = () => {
  const { issue } = useIssuesDisplay()
  const comments = useComments()
  const loading = !comments, error = null;

  const backToIssueListButton = (
    <button className="pure-button" onClick={showIssuesList}>
      Back to Issues List
    </button>
  )

  return <div>{issue == null ?
    <div className="issue-detail--loading">
      {backToIssueListButton}
      <p>Loading...</p>
    </div> :
    <div className={classnames('issueDetailsPage', styles.issueDetailsPage)}>
      <h1 className="issue-detail__title">{issue.title}</h1>
      {backToIssueListButton}
      <IssueMeta issue={issue} />
      <IssueLabels labels={issue.labels} className={styles.issueLabels} />
      <hr className={styles.divider} />
      <div className={styles.summary}>
        <ReactMarkdown
          className={'testing'}
          source={insertMentionLinks(issue.body)}
        />
      </div>
      <hr className={styles.divider} />

      <ul>{
        comments &&
        <IssueComments />

        || loading &&
        <div className="issue-detail--loading">
          <p>Loading comments...</p>
        </div>

        || error &&
        <div className="issue-detail--error">
          <h1>Could not load comments for issue #{issue.id}</h1>
          <p>{`${error}`}</p>
        </div>

        || null
      }</ul>
    </div>
  }</div>
}
