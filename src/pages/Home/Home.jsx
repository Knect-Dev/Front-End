import { IonContent, IonPage } from '@ionic/react';
import { useLocation } from "react-router";
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../store/currentPage';
import { useState, useEffect } from 'react';
// import ExploreContainer from '../../components/ExploreContainer';

import './home.scss';

import Form from '../../components/ParentForm/ParentForm.jsx';
import AddFAB from '../../components/AddFab/AddFAB.jsx';
import PageHeader from '../../components/PageHeader/PageHeader';
import JobsList from '../../components/JobsList/JobsList';

const jobs = [ // TEMP
  { company: 'Amazon' },
  { company: 'Boogie Woogie' },
  { company: 'Charlie\'s Chocolates' },
  { company: 'Decks on Decks' },
  { company: 'Everyone Shops Here' },
  { company: 'Faith, Hope, & Love' },
  { company: 'Golf Goobers' },
  { company: 'Hotel Hotel' },
]
const Home = () => {


  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(setCurrentPage(location.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);




  return (
    <IonPage>
      <PageHeader title={'Jorbs'} />
      <IonContent fullscreen> {/* TEST does this mess up header/footer on scroll? */}
        <Form showForm={showForm} setShowForm={setShowForm} />
        <AddFAB showForm={showForm} setShowForm={setShowForm} />
        <JobsList jobs={jobs} /> {/* jobs prop is TEMP */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
