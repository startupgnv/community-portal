import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Marker } from 'react-map-gl';

import { db } from '../firebase';
import Error from './Error';
import Loading from './Loading';
import MapPin from './MapPin';
import MapContainer from './MapContainer';
import MapPageCompany from './MapPageCompany';
import MapPageJob from './MapPageJob';
import MapPageIndex from './MapPageIndex';

import Header from './Header';
import Sidebar from './Sidebar';

const MapPageContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .main-content {
    height: calc(100vh - 70px);
    clear: both;
  }
`;

const defaultCenter = {
  latitude: 29.6499279,
  longitude: -82.3327508
};

export const MapPage = ({
  match: {
    params: { company }
  }
}) => {
  const {
    error: companiesError,
    loading: companiesLoading,
    value: companiesValue
  } = useCollection(db.collection('companies'));
  const {
    error: jobsError,
    loading: jobsLoading,
    value: jobsValue
  } = useCollection(db.collection('jobs'));
  const {
    error: categoriesError,
    loading: categoriesLoading,
    value: categoriesValue
  } = useCollection(db.collection('jobCategories'));
  const [viewport, setViewport] = useState(currentCompany || defaultCenter);

  if (companiesError || jobsError || categoriesError) {
    return <Error />;
  }
  if (companiesLoading || jobsLoading || categoriesLoading) {
    return <Loading />;
  }

  const companies = companiesValue.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  const jobs = jobsValue.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const categories = categoriesValue.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  const currentCompany = companies.find(({ name }) => name === company);

  return (
    <MapPageContainer>
      <Header />
      <div className="main-content">
        <Sidebar>
          <Route
            exact
            path="/"
            render={props => (
              <MapPageIndex
                {...props}
                companies={companies}
                jobs={jobs}
                categories={categories}
              />
            )}
          />
          <Route
            exact
            path="/company/:company"
            component={({
              match: {
                params: { company }
              },
              match,
              ...props
            }) => (
              <MapPageCompany
                {...props}
                match={match}
                company={companies.find(({ slug }) => company === slug)}
              />
            )}
          />
          <Route
            exact
            path="/job/:jobId"
            component={({
              match: {
                params: { jobId }
              },
              match,
              ...props
            }) => {
              const job = jobs.find(({ id }) => jobId === id);
              const company = companies.find(({ id }) => id === job.companyID);
              return (
                <MapPageJob
                  {...props}
                  match={match}
                  job={job}
                  company={company}
                />
              );
            }}
          />
        </Sidebar>
        <MapContainer
          viewport={viewport}
          onViewportChange={viewport => setViewport(viewport)}
        >
          {companies
            .filter(({ coordinates }) => coordinates)
            .map(({ name, coordinates: { latitude, longitude } }) => (
              <Marker key={name} longitude={longitude} latitude={latitude}>
                <MapPin height={36} />
              </Marker>
            ))}
        </MapContainer>
      </div>
    </MapPageContainer>
  );
};

export default MapPage;
