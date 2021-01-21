import React, {useState} from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList, IonLoading,
  IonPage, IonPopover, IonProgressBar,
  IonText,
  IonToolbar
} from '@ionic/react';
import {connect} from '../data/connect';
import {RouteComponentProps, withRouter} from 'react-router';
import * as selectors from '../data/selectors';
import {cloudDownload, share, star, starOutline} from 'ionicons/icons';
import './SessionDetail.scss';
import {addFavorite, removeFavorite} from '../data/sessions/sessions.actions';
import {Session} from '../models/Schedule';

interface OwnProps extends RouteComponentProps {
};

interface StateProps {
  session?: Session;
  favoriteSessions: number[],
};

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

type SessionDetailProps = OwnProps & StateProps & DispatchProps;

const SessionDetail: React.FC<SessionDetailProps> = ({session, addFavorite, removeFavorite, favoriteSessions}) => {
  const [showLoading, setShowLoading] = useState(false);

  const [showPopover, setShowPopover] = useState(false);

  if (!session) {
    return <div>Session not found</div>
  }

  const isFavorite = favoriteSessions.indexOf(session.id) > -1;

  const toggleFavorite = () => {
    isFavorite ? removeFavorite(session.id) : addFavorite(session.id);
  };
  const shareSession = () => {
  };
  const sessionClick = (text: string) => {
    console.log(`Clicked ${text}`);
  };


  return (
    <IonPage id="session-detail-page">
      <IonLoading
        isOpen={showLoading}
        duration={1500}
        spinner="crescent"
        onDidDismiss={() => setShowLoading(false)}

      />

      <IonPopover
        isOpen={showPopover}
        onDidDismiss={e=>{
          setShowPopover(false)
        }}
      >
        <br />
        <IonProgressBar type="indeterminate"></IonProgressBar><br />
        <IonProgressBar type="indeterminate" reversed={true}></IonProgressBar><br />
      </IonPopover>

        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/schedule"></IonBackButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={() => toggleFavorite()}>
                {isFavorite ?
                  <IonIcon slot="icon-only" icon={star}></IonIcon> :
                  <IonIcon slot="icon-only" icon={starOutline}></IonIcon>
                }
              </IonButton>
              <IonButton onClick={() => shareSession}>
                <IonIcon slot="icon-only" icon={share}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="ion-padding">
            <h1>{session.name}</h1>
            <span className={`session-track-food`}>Genre</span>
            <p>{'Song about how babies love music'}</p>
            <p>{'Author: Not real Artist'}</p>

            <IonText color="medium">
              {session.location}
            </IonText>
          </div>
          <IonList>
            <IonItem onClick={() =>  setShowPopover(true)} button>
              <IonLabel color="primary">Preview</IonLabel>
            </IonItem>
            <IonItem onClick={() => setShowLoading(true)} button>
              <IonLabel color="primary">Download Song</IonLabel>
              <IonIcon slot="end" color="primary" size="small" icon={cloudDownload}></IonIcon>
            </IonItem>
          </IonList>
        </IonContent>
    </IonPage>
);
};

export default connect
  <OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
  session: selectors.getSession(state, OwnProps),
  favoriteSessions: state.data.favorites
}),
  mapDispatchToProps: {
  addFavorite,
  removeFavorite
},
  component: withRouter(SessionDetail)
})
