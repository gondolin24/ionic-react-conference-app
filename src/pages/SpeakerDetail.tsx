import React, {useState} from 'react';
import {RouteComponentProps} from 'react-router';

import './SpeakerDetail.scss';

import {ActionSheetButton} from '@ionic/core';
import {
  IonActionSheet,
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonToolbar
} from '@ionic/react'
import {
  callOutline,
  callSharp,
  logoFacebook,
  logoInstagram,
  logoTwitter, logoYoutube,
  shareOutline,
  shareSharp
} from 'ionicons/icons';

import {connect} from '../data/connect';
import * as selectors from '../data/selectors';

import {Speaker} from '../models/Speaker';
import {createUseStyles} from "react-jss";


interface OwnProps extends RouteComponentProps {
  speaker?: Speaker;
};

interface StateProps {
};

interface DispatchProps {
};

interface SpeakerDetailProps extends OwnProps, StateProps, DispatchProps {
};


const useStyles = createUseStyles({
  flexRow: {
    display: 'flex',
    direction: 'row',
    justifyContent: 'flex-start',
    align: {
      self: 'center',
      items: 'center',
    }
  }
})

const SpeakerDetail: React.FC<SpeakerDetailProps> = ({speaker}) => {
  const classes = useStyles()

  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<ActionSheetButton[]>([]);
  const [actionSheetHeader, setActionSheetHeader] = useState('');


  if (!speaker) {
    return <div>Speaker not found</div>
  }

  return (
    <IonPage id="speaker-detail">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/speakers"/>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="speaker-background">
          <img src={speaker.profilePic}
               alt={speaker.name}/>
          <h2>{speaker.name}</h2>
        </div>

        <div className="ion-padding speaker-detail">
          <h3>Share on:</h3>
          <div className={classes.flexRow}>
            <IonChip color="twitter">
              <IonIcon icon={logoTwitter}></IonIcon>
              <IonLabel>Twitter</IonLabel>
            </IonChip>
            <IonChip color="facebook">
              <IonIcon icon={logoFacebook}></IonIcon>
              <IonLabel>Facebook</IonLabel>
            </IonChip>
          </div>

          <div className={classes.flexRow}>
            <IonChip color="instagram">
              <IonIcon icon={logoInstagram}></IonIcon>
              <IonLabel>Instagram</IonLabel>
            </IonChip>
            <IonChip color="danger">
              <IonIcon icon={logoYoutube}></IonIcon>
              <IonLabel>Youtube</IonLabel>
            </IonChip>
          </div>


        </div>
      </IonContent>
      <IonActionSheet
        isOpen={showActionSheet}
        header={actionSheetHeader}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={actionSheetButtons}
      />
    </IonPage>
  );
};


export default connect({
  mapStateToProps: (state, ownProps) => ({
    speaker: selectors.getSpeaker(state, ownProps)
  }),
  component: SpeakerDetail
});
