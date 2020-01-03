import * as React from 'react';
import { Job } from '../models/job.model';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { singletonService as vm } from '../+state/singleton.service'

interface Props {
  active: Job | null;
}

interface State {
  active: Job | null;
}

export class JobDetails extends React.PureComponent<Props, State> {
  state: { active: Job | null } = { active: this.props.active };

  componentDidMount() {
    const id = window.location.pathname.slice(1,window.location.pathname.length);
    const URL = `http://localhost:3001/jobs?id=${id}`
    vm.loadJob(URL).subscribe(job => this.setState({ active: job[0] }));
  }

  render() {
    return (
      <div style={{padding:"50px"}}>
        <Card>
          <Card.Body>
            <Card.Title>{this.state.active?.positionName}</Card.Title>
            <Card.Text>{this.state.active?.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{this.state.active?.companyName}</ListGroupItem>
            <ListGroupItem>{this.state.active?.countryName}</ListGroupItem>
            <ListGroupItem>{this.state.active?.cityName}</ListGroupItem>
            <ListGroupItem>{this.state.active?.durationDayText}</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href={this.state.active?.imageUrl} target="_blank">Company Site</Card.Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default JobDetails;
