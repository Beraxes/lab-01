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
          <ion-title size="large">Licencias</ion-title>
        </ion-list-header>
        
        <!-- Utiliza v-for para generar elementos ion-item dinámicamente -->
        <ion-item v-for="item in apiResponse" :key="item.name">
          <ion-label>{{ item.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
//nota importante, JAMAS BORRES ESTO⬇️⬇️⬇️
import { IonItem, IonLabel, IonList, IonListHeader, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
//nota importante, JAMAS BORRES ESTO⬆️⬆️⬆️
const apiResponse = ref([]);

const fetchDataFromAPI = async () => {
  try {
    const response = await fetch('http://127.0.0.1:3658/m1/403744-0-default/licNombresFecha');
    apiResponse.value = await response.json();
  } catch (error) {
    console.error('Error al obtener datos de la API', error);
  }
};

onMounted(() => {
  fetchDataFromAPI();
});
</script>
