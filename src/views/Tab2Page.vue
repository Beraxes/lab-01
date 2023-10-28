<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Alertas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
      </ion-header>

      <div class="cajas">
        <ion-card color="primary">
          <ion-card-header>
            <ion-card-title>Numero de licencias</ion-card-title>
            <ion-card-subtitle>{{ numeroDeLicencias }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content> Activas </ion-card-content>

        </ion-card>

        <ion-card color="warning">
          <ion-card-header>
            <ion-card-title>Numero de licencias</ion-card-title>
            <ion-card-subtitle>{{contadorLicenciasMenosDe60Dias}}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content> Alertas </ion-card-content>
        </ion-card>

        <ion-card color="danger">
          <ion-card-header>
            <ion-card-title>Numero de licencias</ion-card-title>
            <ion-card-subtitle>{{contadorLicenciasVencidas}}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content> Vencidas </ion-card-content>
        </ion-card>

        <ion-card color="tertiary">
          <ion-card-header>
            <ion-card-title>Card Title</ion-card-title>
            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content> Card Content </ion-card-content>
        </ion-card>

        <ion-card color="success">
          <ion-card-header>
            <ion-card-title>Card Title vencieron</ion-card-title>
            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content> Card Content </ion-card-content>
        </ion-card>

        <ion-card color="warning">
          <ion-card-header>
            <ion-card-title>Card Title</ion-card-title>
            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content> Card Content </ion-card-content>
        </ion-card>



        <ion-card color="light">
          <ion-card-header>
            <ion-card-title>Card Title</ion-card-title>
            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content> Card Content </ion-card-content>
        </ion-card>

        <ion-card color="medium">
          <ion-card-header>
            <ion-card-title>Card Title</ion-card-title>
            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content> Card Content </ion-card-content>
        </ion-card>

        <ion-card color="dark">
          <ion-card-header>
            <ion-card-title>Card Title</ion-card-title>
            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content> Card Content </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>


<style scoped>
/* iOS places the subtitle above the title */
.cajas {
  display: flex;
  flex-wrap: wrap;
}
</style>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';

// Supongamos que apiResponse es una variable que contiene la respuesta de la API con name, fechaInicio y fechaFin.
const apiResponse = ref([]);

// Calcula el número de elementos en la respuesta de la API
const numeroDeLicencias = computed(() => apiResponse.value.length);

// Contador para licencias con diferencia de menos de 60 días
const contadorLicenciasMenosDe60Dias = computed(() => {
  return apiResponse.value.filter((item) => {
    const fechaInicio = new Date(item.fechaInicio);
    const fechaFin = new Date(item.fechaFin);
    const diferenciaDias = (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24);
    return diferenciaDias < 60;
  }).length;
});
// Contador para licencias vencidas
const contadorLicenciasVencidas = computed(() => {
  return apiResponse.value.filter((item) => {
    const fechaFin = new Date(item.fechaFin);
    const fechaActual = new Date();
    const diferenciaDias = (fechaFin - fechaActual) / (1000 * 60 * 60 * 24);
    return diferenciaDias <= 0;
  }).length;
});

// Realiza la solicitud a la API y almacena la respuesta en apiResponse
const fetchDataFromAPI = async () => {
  try {
    const response = await fetch('http://127.0.0.1:3658/m1/403744-0-default/licNombresFecha');
    apiResponse.value = await response.json();
  } catch (error) {
    console.error('Error al obtener datos de la API', error);
  }
};

onMounted(() => {
  // Llama a la función para obtener datos de la API cuando se monta el componente
  fetchDataFromAPI();
});
</script>
