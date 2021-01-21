import React, {useState} from 'react';
import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon, IonItem, IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {Speaker} from '../../models/Speaker';
import {Session} from '../../models/Schedule';
import {connect} from '../../data/connect';
import * as selectors from '../../data/selectors';
import '../SpeakerList.scss';
import {camera, mic, trendingUp, videocam} from "ionicons/icons";
import ReactPlayer from "react-player";
import {createUseStyles} from "react-jss";


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

const useStyles = createUseStyles({
  shareArea: {
    pointerEvents: 'none'
  }
})
const LivePage: React.FC<SpeakerListProps> = ({speakers, speakerSessions}) => {
  const [action, setAction] = useState('Feed')
  const classes = useStyles()

  return (
    <IonPage id="speaker-list">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>Live</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

<IonItem>
  <div className={classes.shareArea}>
    <ReactPlayer
      muted={true}
      loop={true}
      playing={true}
      controls={false}
      url='https://www.youtube.com/watch?v=eAnkDcH1mfw'
    />
  </div>

</IonItem>
<IonItem>
  <IonLabel>
    {`Live ${action}`}
  </IonLabel>
</IonItem>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton>
            <IonIcon icon={trendingUp}/>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton onClick={()=>{setAction('Recording')}}><IonIcon icon={videocam}/></IonFabButton>
          </IonFabList>

          <IonFabList side="start">
            <IonFabButton onClick={()=>{setAction('Camera')}}><IonIcon icon={camera}/></IonFabButton>
          </IonFabList>
          <IonFabList side="end">
            <IonFabButton onClick={()=>{setAction('Microphone')}}><IonIcon icon={mic}/></IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    speakers: selectors.getSpeakers(state),
    speakerSessions: selectors.getSpeakerSessions(state)
  }),
  component: React.memo(LivePage)
});
