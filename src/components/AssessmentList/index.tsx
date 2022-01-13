import { memo } from 'react';
import { Assessment } from './Assessment';
import styles from './styles.module.scss';

function AssessmentListComponent() {
  return (
    <div className={styles.container}>
      <Assessment />
    </div>
  )
}

export const AssessmentList = memo(AssessmentListComponent, (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
})