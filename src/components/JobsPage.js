import React, { useState, useContext } from 'react';
import styled from 'styled-components/macro';
import AppContext from './AppContext';
import Hero from './Hero';
import PageContent from './PageContent';
import JobList from './JobList';
import JobsFilter from './JobsFilter';
import heroBG from '../assets/images/hero-bg2.jpg';

import { LinearProgress } from '@material-ui/core';

const JobsPageContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 0 0 0;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

export const MapPageIndex = () => {
  const [jobsFilter, setJobsFilter] = useState({ search: '', categories: [] });
  const { jobs, companies, jobsLoading, companiesLoading } = useContext(
    AppContext
  );
  const onFilterChange = filterChanged => {
    setJobsFilter({
      ...jobsFilter,
      ...filterChanged
    });
  };
  if (jobsLoading || companiesLoading) {
    return <LinearProgress />;
  }
  return (
    <>
      <Hero bgImage={heroBG} title="Available Positions" size="medium" />
      <JobsPageContent>
        <FilterContainer>
          <JobsFilter onChange={onFilterChange} />
        </FilterContainer>
        <JobList
          jobs={jobs}
          companies={companies}
          filter={jobsFilter}
          showDescription={false}
          showTitle={false}
        />
      </JobsPageContent>
    </>
  );
};

export default MapPageIndex;
