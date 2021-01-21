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
  IonList,
  IonLoading,
  IonPage,
  IonPopover,
  IonProgressBar,
  IonToolbar
} from '@ionic/react';
import '../About.scss';
import {chevronForward, star} from 'ionicons/icons';
import {RouteComponentProps} from "react-router";
import {Session} from "../../models/Schedule";
import {addFavorite, removeFavorite} from '../../data/sessions/sessions.actions';

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


const LibraryDetail: React.FC<SessionDetailProps> = ({session, addFavorite, removeFavorite, favoriteSessions}) => {
  const [showLoading, setShowLoading] = useState(false);
  const [showPlayer, setShowingPlayer] = useState(false);

  const [showPopover, setShowPopover] = useState(false);
  const [location, setLocation] = useState<'madison' | 'austin' | 'chicago' | 'seattle'>('madison');
  const [conferenceDate, setConferenceDate] = useState('2047-05-17T00:00:00-05:00');


  return (


    <IonPage id="about-page">
      <IonLoading
        isOpen={showLoading}
        duration={1500}
        spinner="crescent"
        onDidDismiss={() => setShowLoading(false)}

      />
      {/*<IonPopover*/}
      {/*  isOpen={showPlayer}*/}
      {/*  onDidDismiss={e => {*/}
      {/*    setShowingPlayer(false)*/}
      {/*  }}*/}
      {/*>*/}
      {/*</IonPopover>*/}

      <IonPopover
        isOpen={showPopover}
        onDidDismiss={e => {
          setShowPopover(false)
        }}
      >

        <br/>
        <IonProgressBar type="indeterminate"></IonProgressBar><br/>
        <IonProgressBar type="indeterminate" reversed={true}></IonProgressBar><br/>
      </IonPopover>

      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/schedule"></IonBackButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={() => {
              }}>
              </IonButton>
              <IonButton onClick={() => {
              }}>
                <IonIcon slot="icon-only" icon={star}></IonIcon> :
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="about-header">
          {/* Instead of loading an image each time the select changes, use opacity to transition them */}
          <div className="about-image madison" style={{'opacity': location === 'madison' ? '1' : undefined}}></div>
          <div className="about-image austin" style={{'opacity': location === 'austin' ? '1' : undefined}}></div>
          <div className="about-image chicago" style={{'opacity': location === 'chicago' ? '1' : undefined}}></div>
          <div className="about-image seattle" style={{'opacity': location === 'seattle' ? '1' : undefined}}></div>
        </div>
        <div className="about-info">
          <h3 className="ion-padding-top ion-padding-start">Song Name</h3>

          <h3 className="ion-padding-top ion-padding-start">Options</h3>

          <IonList>
            <IonItem onClick={() => setShowPopover(true)} button>
              <IonLabel color="primary">Play On Story Teller</IonLabel>
              <IonIcon slot="end" color="primary" size="small" icon={chevronForward}></IonIcon>
            </IonItem>

            <IonItem onClick={() => setShowPopover(true)} button>
              <IonLabel color="primary">Preview</IonLabel>
            </IonItem>


            <IonItem onClick={() => {
            }} button>
              <IonLabel color="danger">Delete</IonLabel>
            </IonItem>
          </IonList>


          <h3 className="ion-padding-top ion-padding-start">{`About Song`}</h3>

          <p className="ion-padding-start ion-padding-end">
            Description of the song. This is a paragraph of how to song came to be.

          </p>


        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(LibraryDetail);
