import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
import { ContentContainer } from "../components/MainHome";
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title" size="large">Metric Converter</IonTitle>
          <IonTitle className="title" size="small">Created by: Lordy Lawrence Parihala</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Content */}
      <IonContent fullscreen className='ion-padding'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer /> */}
        <ContentContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
