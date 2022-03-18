import { IonLabel, IonContent, IonIcon, IonItem, IonInput, IonTextarea, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption, IonChip, IonAlert, IonText } from '@ionic/react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { When } from 'react-if';

import { closeOutline, trashOutline } from 'ionicons/icons';

import CompanySelector from '../../CompanySelector/CompanySelector.jsx';

import LockButton from '../../LockButton/LockButton.jsx';
import { addJob } from '../../../store/jobs.js';
import { updateJob } from '../../../store/jobs.js';

import './jobForm.scss';

// selectedJobId replaces what was previously id
const JobForm = ({ disable, setDisable, showForm, setShowForm, setActiveForm, selectedJobId, setSelectedJobId, deleteHandler }) => {

  let jobState = useSelector(state => state.jobs.jobs);
  let dispatch = useDispatch();
  let currentJob = jobState.find(job => job.id === selectedJobId);
  const [values, setValues] = useState(currentJob ? currentJob : {});
  const [lock, setLock] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const token = useSelector(state => state.user.user.token);

  function handleChange(e) {
    setValues(prev => {
      return { ...prev, [e.target.name]: e.detail.value }
    });
  }

  function handleCompanyChange(change) {
    let { id, company } = change;
    console.log(`👽 ~ file: JobForm.jsx ~ line 35 ~ handleCompanyChange ~ company`, company);
    console.log(`👽 ~ file: JobForm.jsx ~ line 35 ~ handleCompanyChange ~ id`, id);
    setValues(prev => {
      return { ...prev, CompanyId: id, company: company }
    })
  }

  function toggleActive(e) {
    setValues(prev => {
      return { ...prev, status: e.target.value }
    });
  }

  function handleCloseForm() {
    setShowForm(!showForm);
    setDisable(false);
    setSelectedJobId(null);
  }

  function handleClick(e) {
    setShowAlert(false);
    if (e === 'confirm') {
      deleteHandler({ type: 'JOB', id: currentJob?.id });
      handleCloseForm();
    };
  }

  function toggleEditHandler(confirm) {
    if (confirm) {
      if (!selectedJobId) {
        values['company'] = 'Scuber';
        if (values.title && values.company) {
          dispatch(addJob(values, token));
          setSelectedJobId(null);
          setDisable(!disable);
          setLock(!lock);
        } else if (!values.title || !values.company) {
          setValues(currentJob || {});
          setSelectedJobId(null);
          setDisable(!disable);
          setLock(!lock);
        }
      } else if (selectedJobId) {
        console.log('update called')
        dispatch(updateJob(values, token))
        setSelectedJobId(null);
        setDisable(!disable);
        setLock(!lock);
      }
    } else if (!confirm) {
      setValues(currentJob || {});
      setDisable(!disable);
      setLock(!lock);
    }
  }

  // const stageChipBkgrds = {
  //   'not applied': { background: '#80808099' },
  //   'applied': { background: '#F2C70088' },
  //   'phone screen': { background: '#8C00B080' },
  //   'tech interview': { background: '#CB006399' },
  //   'onsite': { background: '#6ADFC299' },
  //   'offer': { background: 'linear-gradient(326deg, rgba(255,0,184,0.9682247899159664) 12%, rgba(74,175,252,1) 50%, rgba(74,252,129,1) 76%, rgba(252,248,69,1) 89%)' }
  // }

  // const stageBkgrds = {
  //   'stage-not-applied': { background: '#80808099' },
  //   'stage-applied': { background: '#F2C70088' },
  //   'stage-phone-screen': { background: '#8C00B080' },
  //   'stage-tech-interview': { background: '#CB006399' },
  //   'stage-onsite': { background: '#6ADFC299' },
  //   'stage-offer': { background: 'linear-gradient(326deg, rgba(255,0,184,0.9682247899159664) 12%, rgba(74,175,252,1) 50%, rgba(74,252,129,1) 76%, rgba(252,248,69,1) 89%)' }
  // }




  const stageBackgrounds =['#80808099', '#F2C70088', '#8C00B080', '#CB006399','#6ADFC299', 'linear-gradient(326deg, rgba(255,0,184,0.9682247899159664) 12%, rgba(74,175,252,1) 50%, rgba(74,252,129,1) 76%, rgba(252,248,69,1) 89%)'];
  let options = ['Not Applied', 'Applied', 'Phone Screen', 'Tech Interview', 'Onsite', 'Offer'];
  let stageBackground = stageBackgrounds[options.findIndex( element => element === values.stage)];
  console.log(stageBackground);
  return (
    <>
      <IonContent>
        <IonGrid>
            <IonRow class={'ion-justify-content-between ion-align-items-center'} style={{background: stageBackground}}>
            <IonIcon class="header-icon" icon={trashOutline} onClick={() => setShowAlert(true)}></IonIcon>
            <IonText class='status-item ion-padding-start' ><h3>{values?.stage || 'Application Status'}</h3></IonText>
            <IonIcon class="header-icon" icon={closeOutline} onClick={() => handleCloseForm()}></IonIcon> 
            </IonRow>
          <When condition={lock}>
            {/* We can modify status background, or use inline styling to adjust the background color of row to represent the status */}
            <IonRow>
              <CompanySelector currentCompany={{ company: values?.company, id: values?.CompanyId }} setActiveForm={setActiveForm} handleCompanyChange={handleCompanyChange} lock={lock} />
            </IonRow>

            <IonRow>
              <IonCol size='4'>Job:<h5>{values?.title}</h5></IonCol>
              <IonCol size='4'>ID:<h5>{values?.jobId}</h5></IonCol>
              <IonCol size='4'>Date Applied: <h5>{values?.appliedDate?.slice(0, 10)}</h5></IonCol>
            </IonRow>

            <IonRow>
              <IonCol size='4'>Stage: <h5>{values?.stage}</h5></IonCol>
              <IonCol size='4'>Status:
                {values?.status ?
                  <IonChip style={{ display: 'block', width: '6rem', textAlign: 'center' }} color="success"><IonLabel color="success">ACTIVE</IonLabel></IonChip>
                  :
                  <IonChip style={{ display: 'block', width: '6rem', textAlign: 'center' }} color="danger"><IonLabel color="danger">INACTIVE</IonLabel></IonChip>}
              </IonCol>
              <IonCol size='4'>Positions Open: <h5>{values?.openPositions}</h5></IonCol>
            </IonRow>

            <IonRow>
              <IonCol>Location: <h5 style={{ display: 'inline' }}>{values?.location}</h5></IonCol>
            </IonRow>

            <IonRow>
              <IonCol>Technologies: <h5 style={{ display: 'inline' }}>{values?.technologies}</h5></IonCol>
            </IonRow>

            <IonRow>
              <IonCol>Notes: <h5>{values?.notes}</h5></IonCol>
            </IonRow >

          </When >
          <When condition={!lock}>

            <IonRow>
              <CompanySelector currentCompany={{ company: values?.company, id: values?.CompanyId }} setActiveForm={setActiveForm} handleCompanyChange={handleCompanyChange} lock={lock} />
            </IonRow>

            <IonRow>
              <IonCol size='4'>
                <IonLabel>Job: </IonLabel>
                <IonInput value={values?.title} onIonChange={e => handleChange(e)} placeholder='Job Title' required={true} name='title' clearInput></IonInput>
              </IonCol>

              <IonCol size='4'>
                <IonLabel>ID: </IonLabel>
                <IonInput value={values?.jobId} onIonChange={e => handleChange(e)} placeholder='Job ID' name='jobId' clearInput></IonInput>
              </IonCol>

              <IonCol size='4'>
                <IonLabel>Date Applied: </IonLabel>
                <IonInput value={values?.appliedDate?.slice(0, 10)} onIonChange={e => handleChange(e)} placeholder='yyyy-mm-dd' name='appliedDate' clearInput></IonInput>
              </IonCol >
            </IonRow >

            <IonRow>
              <IonCol size='4'>
                <IonLabel>Stage: </IonLabel>
                <IonSelect value={values?.stage} multiple={false} cancelText="Cancel" okText="Okay" onIonChange={e => handleChange(e)} name='stage'>
                  {options.map((e, idx) => <IonSelectOption key={e + idx}>{e}</IonSelectOption>)}
                </IonSelect>
              </IonCol>

              <IonCol size='4'>
                <IonLabel>Status: </IonLabel>
                {values?.status ?
                  <IonChip onClick={e => toggleActive(e)} name='status' value={false} style={{ display: 'block', width: '6rem', textAlign: 'center' }} color="success">ACTIVE</IonChip>
                  :
                  <IonChip onClick={e => toggleActive(e)} name='status' value={true} style={{ display: 'block', width: '6rem', textAlign: 'center' }} color="danger">INACTIVE</IonChip>}
              </IonCol>

              <IonCol size='4'><IonLabel>Positions Open: </IonLabel>
                <IonInput value={values?.openPositions} type='number' min={0} onIonChange={e => handleChange(e)} placeholder='number' name='openPositions' clearInput></IonInput>
              </IonCol>

            </IonRow>

            <IonRow>
              <IonCol>
                <IonLabel>Location: </IonLabel>
                <IonInput value={values?.location} onIonChange={e => handleChange(e)} name='location' clearInput></IonInput>
              </IonCol>
            </IonRow >

            <IonRow>
              <IonCol>
                <IonLabel>Technologies: </IonLabel>
                <IonInput value={values?.technologies} onIonChange={e => handleChange(e)} name='technologies' clearInput></IonInput>
              </IonCol>
            </IonRow >

            <IonRow>
              <IonCol size='12'>
                <IonLabel>Notes: </IonLabel>
                <IonTextarea value={values?.notes} onIonChange={e => handleChange(e)} name='notes' clearInput></IonTextarea>
              </IonCol>
            </IonRow >

          </When >
          <LockButton toggleEditHandler={toggleEditHandler} lock={lock} />
        </IonGrid >
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass='ion-text-center'
          header={'CONFIRM DELETE'}
          message={'Deleting this Job will be <strong>Permanent!</strong>'}
          buttons={[
            {
              text: 'Cancel',
              id: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                handleClick('cancel');
              }
            },
            {
              text: 'Confirm',
              id: 'accept',
              cssClass: 'success',
              handler: () => {
                handleClick('confirm');
              }
            },
          ]}
        />
      </IonContent>
    </>
  )
}

export default JobForm;