import * as React from 'react';
import { Job } from '../../models/job.model';
import { Card, CardColumns } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Props {
  job: Job;
  onEdit: Function;
}

export class JobItem extends React.PureComponent<Props> {
  render() {
    const { companyName, positionName, description, id } = this.props.job;

    return (
      <Card bg="light">
        <Card.Header>{companyName}</Card.Header>
        <Card.Body>
          <Card.Title>{positionName}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Link className="btn btn-primary" to={`/${id}`}>INCELE</Link>
        </Card.Body>
      </Card>
    );
  }
}

interface JobssProps {
  jobs: Job[];
  onSelect: Function;
}

export class JobList extends React.PureComponent<JobssProps> {
  render() {
    const jobs = this.props.jobs.map((job: any) => {
      return (
        <JobItem key={job.id} job={job} onEdit={this.props.onSelect} />
      );
    });

    return <CardColumns>{jobs}</CardColumns>;
  }
}
