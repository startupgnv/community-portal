import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import AppContext from './AppContext';
import SidebarHeader from './SidebarHeader';
import JobList from './JobList';
import Error from './Error';
import MapContainer from './MapContainer';
import MapPin from './MapPin';
import { Marker } from 'react-map-gl';

import { LinearProgress } from '@material-ui/core';

const CompanyPageContainer = styled.div`
  .company-name {
    margin: 0;
  }
`;

const CompanyContent = styled.div`
  width: ${({ theme }) => theme.contentMaxWidth};
  margin: 0 auto;
  padding: 50px 30px 30px;
`;

const CompanyLink = styled.div`
  margin-bottom: 10px;

  a {
    color: ${({ theme }) => theme.textMedium};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const MapWrap = styled.div`
  height: 200px;
`;

export const CompanyPage = ({
  match: {
    params: { companySlug }
  }
}) => {
  const [companyValue, companyLoading, companyError] = useCollection(
    db.collection('companies').where('slug', '==', companySlug)
  );
  const { jobs, jobsLoading } = useContext(AppContext);
  if (companyLoading || jobsLoading) {
    return <LinearProgress />;
  }
  if (companyError || companyValue.empty) {
    return <Error />;
  }
  const company = {
    id: companyValue.docs[0].id,
    ...companyValue.docs[0].data()
  };
  const {
    id,
    name,
    logoPath,
    coverPath = '',
    description = '',
    url = '',
    coordinates: { latitude, longitude }
  } = company;
  const viewport = {
    latitude,
    longitude,
    zoom: 12
  };
  const companyJobs = jobs.filter(job => job.companyID === id);

  return (
    <CompanyPageContainer>
      <SidebarHeader title={name} coverPath={coverPath} logoPath={logoPath} />
      <CompanyContent>
        <CompanyLink>
          <a href={url} rel="noopener noreferrer" target="_blank">
            View Website
          </a>
        </CompanyLink>
        <p className="description">{description}</p>
        {companyJobs && companyJobs.length && (
          <>
            <h2>Jobs</h2>
            <JobList
              jobs={companyJobs}
              showTitle={false}
              showCompanyInfo={false}
            />
          </>
        )}
        <h2>Culture</h2>
        <MapWrap>
          <MapContainer viewport={viewport}>
            <Marker longitude={longitude} latitude={latitude}>
              <MapPin size={36} />
            </Marker>
          </MapContainer>
        </MapWrap>
      </CompanyContent>
    </CompanyPageContainer>
  );
};

export default CompanyPage;