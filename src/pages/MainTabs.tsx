import React from 'react';
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import {Redirect, Route} from 'react-router';
import {book, briefcase, camera, people} from 'ionicons/icons';
import SchedulePage from './MainStorePage';
import SpeakerDetail from './SpeakerDetail';
import SessionDetail from './SessionDetail';
import MemoriesList from "./memories/MemoriesList";
import LibraryMainPage from "./library/LibraryMainPage";
import LibraryDetail from "./library/LibraryDetail";

interface MainTabsProps {
}

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/schedule"/>
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/live" render={() => <SchedulePage/>} exact={true}/>
        <Route path="/tabs/memories" render={() => <MemoriesList/>} exact={true}/>
        <Route path="/tabs/store" render={() => <SchedulePage/>} exact={true}/>
        <Route path="/tabs/library" render={() => <LibraryMainPage/>} exact={true}/>
        <Route path="/tabs/speakers/:id" component={SpeakerDetail} exact={true}/>
        <Route path="/tabs/schedule/:id" component={SessionDetail}/>
        <Route path="/tabs/library/:id" component={LibraryDetail}/>
        <Route path="/tabs/speakers/sessions/:id" component={SessionDetail}/>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="live" href="/tabs/live">
          <IonIcon icon={camera}/>
          <IonLabel>Live</IonLabel>
        </IonTabButton>
        <IonTabButton tab="memories" href="/tabs/memories">
          <IonIcon icon={people}/>
          <IonLabel>Memories</IonLabel>
        </IonTabButton>
        <IonTabButton tab="library" href="/tabs/library">
          <IonIcon icon={book}/>
          <IonLabel>Library</IonLabel>
        </IonTabButton>
        <IonTabButton tab="store" href="/tabs/store">
          <IonIcon icon={briefcase}/>
          <IonLabel>Store</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
