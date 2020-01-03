import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import { JobList } from './components/JobList';
import { jobsService as vm } from '../+state/jobs.service'
import { useJobsFacade } from '../hooks/jobs.hook';
import { FormValues } from '../models/search.model';
import '../App.scss';

export const Jobs = () => {
  const [{jobs}, selectJob] = useJobsFacade();

  const _encodeQueryString = (params: any) => {
    const keys = Object.keys(params);
    const vals = Object.values(params).filter(val => val !== '');
    let query: string;
    let URL = 'http://localhost:3001/jobs';

    if (vals.length === 2) {
      query = '?' + keys.map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])).join("&")
      return URL + query;
    }else if (vals.length === 1) {
      query = '?' + keys.map(key => {
        if (params[key] !== '') {
          return encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
        }
        return ''
      }).join("");
      return URL + query;
    } else {
      return URL
    }
  }

  const searchJobs = (values: FormValues) => {
    let query = _encodeQueryString(values);
    vm.loadJobs(query);
  }

  return (
    <Container fluid>
      <Row className="header-row">
        <Col className="p-3 bg-white border-bottom shadow-sm">
          <SearchBar handleSubmit={searchJobs} />
        </Col>
      </Row>
      <Row>
        <Col className="mt-4">
          <JobList jobs={jobs} onSelect={selectJob} />
        </Col>
      </Row>
    </Container>
  )
}

export default Jobs;
