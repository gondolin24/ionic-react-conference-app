import React from 'react';
import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import SpeakerItem from '../components/SpeakerItem';
import {Speaker} from '../models/Speaker';
import {Session} from '../models/Schedule';
import {connect} from '../data/connect';
import * as selectors from '../data/selectors';
import './SpeakerList.scss';
import {createUseStyles} from 'react-jss'
import {shareSocial} from "ionicons/icons";


const useStyles = createUseStyles({
  shareArea: {
    display: 'flex',
    direction: 'row',
    justifyContent: 'flex-end',
    align: {
      self: 'center',
      items: 'center',
    }
  }
})

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

const SpeakerList: React.FC<SpeakerListProps> = ({speakers, speakerSessions}) => {
  const classes = useStyles()

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
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Little Lucas</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>

                <img src={'https://momlovesbest.com/wp-content/uploads/2018/07/How_To_Keep_Toddler_In_Crib-1.jpg'}/>
                <div className={classes.shareArea}>
                  <IonChip color="instagram">
                    <IonIcon icon={shareSocial}></IonIcon>
                    <IonLabel>Share</IonLabel>
                  </IonChip>
                </div>
              </IonCardContent>
            </IonCard>

            {speakers.map(speaker => (
              <IonCol size="12" size-md="6" key={speaker.id}>
                <SpeakerItem
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
  component: React.memo(SpeakerList)
});
