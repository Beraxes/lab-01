<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Software</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Software</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-item>
        <ion-input type="text" v-model="inputName"></ion-input>
        <ion-button @click="addItem">Guardar</ion-button>
      </ion-item>

      <ion-item v-for="item in items" :key="item?.id">
        <ion-label>
          {{ item.name }}
        </ion-label>
      </ion-item>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewDidEnter, onIonViewDidLeave, IonItem, IonLabel, IonInput } from "@ionic/vue";


const items = ref<any>();
const db = ref<SQLiteDBConnection>();
const sqlite = ref<SQLiteConnection>();
const inputName = ref<string>("");


onIonViewDidEnter(async () => {

  sqlite.value = new SQLiteConnection(CapacitorSQLite);
  const ret = await sqlite.value.checkConnectionsConsistency();
  const isConn = (await sqlite.value.isConnection("db_vite", false)).result;
  if (ret.result && isConn) {
    db.value = await sqlite.value.retrieveConnection("db_vite", false);
  } else {
    db.value = await sqlite.value.createConnection(
      "db_vite",
      false,
      "no-encryption",
      1,
      false
    );
    loadData();
  }
});
onIonViewDidLeave(async () => {
  await sqlite.value?.closeConnection("db_vite", false);
});

//insertar dato
const addItem = async () => {
  try {
    await db.value?.open();
    const respSelecT = await db.value?.query(`INSERT INTO software (id, name) values (?,?)`,
    [Date.now(),inputName.value]);

    console.log(`res: ${JSON.stringify(respSelecT)}`);
    await db.value?.close();
    items.value = respSelecT?.values;
  } catch (error) {
    console.log(error);
  }
}

//seleccion de la bd
const loadData = async () => {
  try {
    await db.value?.open();
    const respSelecT = await db.value?.query(`SELECT * FROM software`);

    console.log(`res: ${JSON.stringify(respSelecT)}`);
    await db.value?.close();
    items.value = respSelecT?.values;
  } catch (error) {
    console.log(error);
  }

}
</script>
