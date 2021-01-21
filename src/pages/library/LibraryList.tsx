import {AlertButton, IonAlert, IonItemDivider, IonItemGroup, IonLabel, IonList} from '@ionic/react';
import React, {useCallback, useState} from 'react';
import {Schedule, Session} from '../../models/Schedule';
import LibraryItem from './LibraryItem';
import {connect} from '../../data/connect';
import {addFavorite, removeFavorite} from '../../data/sessions/sessions.actions';

interface OwnProps {
  schedule: Schedule;
  listType: 'all' | 'favorites';
  hide: boolean;
}

interface StateProps {
  favoriteSessions: number[];
}

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

interface SessionListProps extends OwnProps, StateProps, DispatchProps {
};

const LibraryList: React.FC<SessionListProps> = ({addFavorite, removeFavorite, favoriteSessions, hide, schedule, listType}) => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertButtons, setAlertButtons] = useState<(AlertButton | string)[]>([]);

  const handleShowAlert = useCallback((header: string, buttons: AlertButton[]) => {
    setAlertHeader(header);
    setAlertButtons(buttons);
    setShowAlert(true);
  }, []);


  return (
    <>
      <IonList style={hide ? {display: 'none'} : {}}>
        {schedule.groups.map((group, index: number) => (
          <IonItemGroup key={`t-group-${index}`}>
            <IonItemDivider sticky>
              <IonLabel>
                {`Category ${index}`}
              </IonLabel>
            </IonItemDivider>
            {group.sessions.map((session: Session, sessionIndex: number) => (
              <LibraryItem
                onShowAlert={handleShowAlert}
                isFavorite={favoriteSessions.indexOf(session.id) > -1}
                onAddFavorite={addFavorite}
                onRemoveFavorite={removeFavorite}
                key={`group-${index}-${sessionIndex}`}
                session={session}
                listType={listType}
              />
            ))}
          </IonItemGroup>
        ))}
      </IonList>
      <IonAlert
        isOpen={showAlert}
        header={alertHeader}
        buttons={alertButtons}
        onDidDismiss={() => setShowAlert(false)}
      ></IonAlert>
    </>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    favoriteSessions: state.data.favorites
  }),
  mapDispatchToProps: ({
    addFavorite,
    removeFavorite
  }),
  component: LibraryList
});
