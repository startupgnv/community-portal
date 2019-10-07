import React from 'react';
import { db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const AppContext = new React.createContext();

export class AppProvider extends React.Component {
  state = {
    jobs: [],
    jobsLoading: true,
    companies: [],
    companiesLoading: true,
    jobsByCompany: {},
    jobCategories: [],
    companyCategories: []
  };

  componentDidMount = () => {
    db.collection('jobs')
      .get()
      .then(jobRefs => {
        this.setState({
          jobs: jobRefs.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })),
          jobsLoading: false
        });
      })
      .catch(() => {});
    db.collection('companies')
      .get()
      .then(companyRefs => {
        this.setState({
          companies: companyRefs.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })),
          companiesLoading: false
        });
      })
      .catch(() => {});
  };

  setActiveCompany = id => {
    this.setState({ activeCompanyID: id });
  };

  render() {
    const { children } = this.props;
    const {
      jobs,
      companies,
      jobsLoading,
      companiesLoading,
      jobCategories,
      companyCategories
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          jobs,
          companies,
          jobsLoading,
          companiesLoading,
          jobCategories,
          companyCategories
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer = AppContext.Consumer;
export default AppContext;
