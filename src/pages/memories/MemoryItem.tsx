import React from 'react';
import {Session} from '../../models/Schedule';
import {Speaker} from '../../models/Speaker';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle, IonCardTitle,
  IonChip,
  IonIcon,
  IonItem,
  IonLabel
} from '@ionic/react';
import {shareSocial} from "ionicons/icons";
import {createUseStyles} from "react-jss";


interface SpeakerItemProps {
  speaker: Speaker;
  sessions: Session[];
}

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


const MemoryItem: React.FC<SpeakerItemProps> = ({speaker, sessions}) => {
  const classes = useStyles()

  return (
    <>
      <IonCard>

        <IonCardHeader>
          <IonCardTitle>{speaker.name}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>

          <img src={speaker.profilePic}/>

          <div className={classes.shareArea}>
            <IonItem detail={false} routerLink={`/tabs/speakers/${speaker.id}`} lines="none">
              <IonChip color="instagram">
                <IonIcon icon={shareSocial}/>
                <IonLabel>Share</IonLabel>
              </IonChip>

            </IonItem>
          </div>

        </IonCardContent>

      </IonCard>
    </>
  );
};

export default MemoryItem;
