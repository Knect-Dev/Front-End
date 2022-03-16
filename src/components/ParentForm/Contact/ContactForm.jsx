import { IonLabel, IonContent, IonButton, IonIcon, IonItem, IonInput, IonGrid, IonRow, IonCol, IonAccordionGroup, IonAccordion, IonList } from '@ionic/react';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { When } from 'react-if';

import { closeOutline } from 'ionicons/icons';
import { lockOpenOutline, lockClosedOutline } from 'ionicons/icons';

const ContactForm = ({ state, showForm, setShowForm }) => {
  const [lock, setLock] = useState(true);

  let contactState = useSelector(state => state.contacts.contacts);
  let dispatch = useDispatch();

  function handleChange(e) {
    dispatch({ type: 'SET_CONTACTS', payload: { id: e.target.about, name: e.target.name, value: e.detail.value } });
  }

  function toggleEditHandler() {
    setLock(!lock);
  }

  // const accordionGroupRef = useRef(null);

  // const closeAccordion = () => {
  //   if (accordionGroupRef.current) {
  //     accordionGroupRef.current.value = undefined;
  //   }
  // }

  return (
    <>
      <IonContent>
        <IonGrid>
          <When condition={lock}>

            <IonRow class='ion-justify-content-around'>
              <IonCol><IonItem color='success'>Application Status</IonItem></IonCol>
            </IonRow>

            <IonRow>
              <IonCol size='5'>{state.contact.company || 'Company Name'}</IonCol>
              <IonCol size='5'>Career Page</IonCol>
              <IonCol size='2'>
                <IonButton color='danger' onClick={() => setShowForm(!showForm)}><IonIcon icon={closeOutline}></IonIcon></IonButton>
              </IonCol>
            </IonRow>
            <IonAccordionGroup>
              {contactState.map(contact => {
                return (
                  <IonAccordion key={contact.id}>
                    <IonItem slot="header">
                      <IonLabel><h1 style={{ display: 'inline' }}>{contact.name}</h1> <h5 style={{ display: 'inline' }}>&nbsp;     {contact.role}</h5></IonLabel>
                    </IonItem>

                    <IonList slot="content">
                      <IonItem>
                        LinkedIn: <h5>&nbsp; {contact.linkedIn}</h5>
                      </IonItem>
                      <IonItem>
                        Email: <h5>&nbsp; {contact.email}</h5>
                      </IonItem>
                      <IonItem>
                        Phone: <h5>&nbsp; {contact.phone}</h5>
                      </IonItem>
                    </IonList>
                  </IonAccordion>
                )
              })}
            </IonAccordionGroup>
          </When >
          <When condition={!lock}>
            <IonRow class='ion-justify-content-around'>
              <IonCol><IonItem color='success'>Application Status</IonItem></IonCol>
            </IonRow>

            <IonRow>
              <IonCol size='5'>{state.contact.company}</IonCol>
              <IonCol size='5'>Career Page</IonCol>
              <IonCol size='2'>
                <IonButton color='danger' onClick={() => setShowForm(!showForm)}><IonIcon icon={closeOutline}></IonIcon></IonButton>
              </IonCol>
            </IonRow>

            <IonAccordionGroup>
              {contactState.map(contact => {
                return (
                  <IonAccordion key={contact.id}>
                    <IonItem slot="header">
                      <IonLabel><h1 style={{ display: 'inline' }}>{contact.name}</h1> <h5 style={{ display: 'inline' }}>&nbsp;     {contact.role}</h5></IonLabel>
                    </IonItem>

                    <IonList slot="content">
                      <IonItem>
                        <IonLabel>Name: </IonLabel>
                        <IonInput about={contact.id} value={contact.name} onIonChange={e => handleChange(e)} name='name' clearInput></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel>Role: </IonLabel>
                        <IonInput about={contact.id} value={contact.role} onIonChange={e => handleChange(e)} name='role' clearInput></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel>LinkedIn: </IonLabel>
                        <IonInput about={contact.id} value={contact.linkedIn} onIonChange={e => handleChange(e)} name='linkedIn' clearInput></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel>Email: </IonLabel>
                        <IonInput about={contact.id} value={contact.email} onIonChange={e => handleChange(e)} name='email' clearInput></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel>Phone: </IonLabel>
                        <IonInput about={contact.id} value={contact.phone} onIonChange={e => handleChange(e)} name='phone' clearInput></IonInput>
                      </IonItem>
                    </IonList>
                  </IonAccordion>
                )
              })}
            </IonAccordionGroup>
          </When>
          {lock ?
            <IonIcon class="edit-form-icon" icon={lockClosedOutline} onClick={toggleEditHandler}></IonIcon>
            :
            <IonIcon class="edit-form-icon" icon={lockOpenOutline} onClick={toggleEditHandler} ></IonIcon>}
        </IonGrid >
      </IonContent>
    </>
  )
}

export default ContactForm;