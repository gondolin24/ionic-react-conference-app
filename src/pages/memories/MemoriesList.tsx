import React from 'react';
import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {Speaker} from '../../models/Speaker';
import {Session} from '../../models/Schedule';
import {connect} from '../../data/connect';
import * as selectors from '../../data/selectors';
import '../SpeakerList.scss';
import MemoryItem from "./MemoryItem";


interface OwnProps {
};

interface StateProps {
  speakers: Speaker[];
  speakerSessions: { [key: string]: Session[] };
};

interface DispatchProps {
};

interface SpeakerListProps extends OwnProps, StateProps, DispatchProps {
};

const MemoriesList: React.FC<SpeakerListProps> = ({speakers, speakerSessions}) => {

  return (
    <IonPage id="speaker-list">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>Memories</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Speakers</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid fixed>
          <IonRow>
            {speakers.map(speaker => (
              <IonCol size="12" size-md="6" key={speaker.id}>
                <MemoryItem
                  key={speaker.id}
                  speaker={speaker}
                  sessions={speakerSessions[speaker.name]}
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    speakers: selectors.getSpeakers(state),
    speakerSessions: selectors.getSpeakerSessions(state)
  }),
  component: React.memo(MemoriesList)
});
