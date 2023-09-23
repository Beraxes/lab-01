<template>
    <ion-list>
  
      <ion-text color="light">
        <h1>Welcome Back!</h1>
      </ion-text>
      <ion-text color="light">
        <p>Sign in to continue</p>
      </ion-text>
      
      
      
      <ion-item>
        <ion-input label="Username" label-placement="floating" placeholder="" value="Jolivera"></ion-input>
      </ion-item>
      <ion-item>
        <ion-input label="Password" label-placement="floating" type="password" value="password"></ion-input>
      </ion-item>
      <ion-button href="/tabs" shape="round">Login Now</ion-button>
  
      
    </ion-list>
  </template>
  
  <script lang="ts">
    import { IonInput, IonItem, IonList, IonButton, IonLabel, IonHeader } from '@ionic/vue';
    import { defineComponent } from 'vue';
  
    export default defineComponent({
      components: { IonInput, IonItem, IonList, IonButton, IonLabel, IonHeader },
    });
  </script>