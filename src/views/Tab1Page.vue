<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Licencia</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
      </ion-header>     
      <ion-list>
    <ion-list-header>
      <ion-title size="large">Video Games</ion-title>
    </ion-list-header>
    <ion-item>
      <ion-label>Pokémon Yellow</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Mega Man X</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>The Legend of Zelda</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Pac-Man</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Super Mario World</ion-label>
    </ion-item>
  </ion-list>
    </ion-content>

  </ion-page>
  
</template>


<script>
  import { IonItem, IonLabel, IonList, IonListHeader } from '@ionic/vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: { IonItem, IonLabel, IonList, IonListHeader },
  });
</script>
<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';

</script>
