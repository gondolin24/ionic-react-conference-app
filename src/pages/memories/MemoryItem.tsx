import React, {useState} from 'react';
import {Session} from '../../models/Schedule';
import {Speaker} from '../../models/Speaker';
import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonLoading, IonToast} from '@ionic/react';
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
  },
  memoryCard: {
    background: 'danger'
  }
})


const MemoryItem: React.FC<SpeakerItemProps> = ({speaker, sessions}) => {

  const [showToast1, setShowToast1] = useState(false);
  const messageTitle = `Selected ${speaker.name}`

  const classes = useStyles()
  return (
      <div>
        <IonToast
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message = {messageTitle}
          duration={200}
        />


      <IonCard className={classes.memoryCard} onClick={()=> setShowToast1(true)}   color={'light-shade'}>

        <IonCardHeader>
          <IonCardTitle>{speaker.name}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>

          <img src={speaker.profilePic}/>

        </IonCardContent>

      </IonCard>
      </div>

  );
};

export default MemoryItem;
