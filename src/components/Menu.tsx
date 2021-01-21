import React from 'react';
import { RouteComponentProps, withRouter, useLocation } from 'react-router';

import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonToggle } from '@ionic/react';
import {
  calendarOutline,
  hammer,
  moonOutline,
  help,
  informationCircleOutline,
  logIn,
  logOut,
  mapOutline,
  peopleOutline,
  person,
  personAdd,
  briefcaseOutline, bookOutline, cameraOutline
} from 'ionicons/icons';

import { connect } from '../data/connect';
import { setDarkMode } from '../data/user/user.actions';

import './Menu.css'

const routes = {
  appPages: [
    { title: 'Live', path: '/tabs/live', icon: cameraOutline },
    { title: 'Memories', path: '/tabs/memories', icon: peopleOutline },
    { title: 'Store', path: '/tabs/store', icon: briefcaseOutline },
    { title: 'Library', path: '/tabs/library', icon: bookOutline },
    { title: 'About', path: '/tabs/about', icon: informationCircleOutline }
  ]
};

interface Pages {
  title: string,
  path: string,
  icon: string,
  routerDirection?: string
}
interface StateProps {
  darkMode: boolean;
  isAuthenticated: boolean;
  menuEnabled: boolean;
}

interface DispatchProps {
  setDarkMode: typeof setDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }

const Menu: React.FC<MenuProps> = ({ darkMode, history, isAuthenticated, setDarkMode, menuEnabled }) => {
  const location = useLocation();

  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem detail={false} routerLink={p.path} routerDirection="none" className={location.pathname.startsWith(p.path) ? 'selected' : undefined}>
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu  type="overlay" disabled={!menuEnabled} contentId="main">
      <IonContent forceOverscroll={false}>
        <IonList lines="none">
          <IonListHeader>STORY TELLER</IonListHeader>
          {renderlistItems(routes.appPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>OTHER</IonListHeader>
          <IonItem>
            <IonIcon slot="start" icon={moonOutline}></IonIcon>
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
          </IonItem>

        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin,
    menuEnabled: state.data.menuEnabled
  }),
  mapDispatchToProps: ({
    setDarkMode
  }),
  component: withRouter(Menu)
})
