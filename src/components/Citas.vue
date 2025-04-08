<template>
  <div class="container mt-4">
    <h1>Citas Médicas</h1>
    <button @click="showF()" class="btn btn-primary btn-sm">Crear Cita</button>
    <!-- Tabla de Citas -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cita in citas" :key="cita.id">
          <td>{{ cita.numeroCita }}</td>
          <td>{{ cita.nombre }}</td>
          <td>{{ cita.fecha }}</td>
          <td>{{ cita.hora }}</td>
          <td>{{ cita.tipo }}</td>
          <td>
            <button @click="editCita(cita.id)" class="btn btn-primary btn-sm">Editar</button>
            <button @click="deleteCita(cita.id)" class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario de Creación y Edición -->
    <div v-if="showForm" class="mt-4">
      <h2>{{ editing ? 'Editar' : 'Agregar' }} Cita</h2>
      {{ editing }}
      <form @submit.prevent="saveCita">
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre</label>
          <input type="text" id="nombre" v-model="cita.nombre" class="form-control" required  :disabled="editing" />
        </div>
        <div class="mb-3">
          <label for="fecha" class="form-label">Fecha</label>
          <input type="date" id="fecha" v-model="cita.fecha" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="hora" class="form-label">Hora</label>
          <input type="time" id="hora" v-model="cita.hora" class="form-control" required />
        </div>
        <div class="mb-3">
        <label>Tipo de Cita</label>
        <select
          class="form-control"  id="tipo" v-model="cita.tipo" >
          <option value="">Selecciona una opción</option>
          <option value="Consulta">Consulta</option>
          <option value="Servicio">Servicio</option>
          <option value="Tratamiento">Tratamiento</option>
          <option value="Emergencia">Emergencia</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-success">{{ editing ? 'Actualizar' : 'Agregar' }} Cita</button>
          <button @click="cancelEdit" class="btn btn-secondary ml-2">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { citasService } from '../services/citasService';

export default {
  data() {
    return {
      citas: [],
      cita: {
        id: null,
        nombre: '',
        fecha: '',
        hora: '',
        tipo:'',
      },
      showForm: false,
      editing: false,
    };
  },
  created() {
    this.fetchCitas();
  },
  methods: {
    async fetchCitas() {
      try {
        const response = await citasService.getAllCitas();
        this.citas = response.data;
      } catch (error) {
        console.error("Error fetching citas:", error);
      }
    },
    async editCita(id) {
      this.editing = true;
      this.showForm = true;
      try {
        const response = await citasService.getCita(id);
        this.cita = response.data;
      } catch (error) {
        console.error("Error fetching cita:", error);
      }
    },
    async saveCita() {
        this.showForm = true;
      try {
         // Si es nueva cita, asignamos un número aleatorio antes de guardar
         if (!this.cita.numeroCita) {
          this.cita.numeroCita = this.citaRandom().toString();
        }
        if (this.editing) {
          await citasService.updateCita(this.cita.id, this.cita);
        } else {
          await citasService.createCita(this.cita);
        }
        this.showForm = false;
        this.fetchCitas();
      } catch (error) {
        console.error("Error saving cita:", error);
      }
    },
    async showF(){
        this.showForm = true;  
        this.cita = { id: null ,nombre: '', fecha: '', hora: '',tipo: '' };
    },
    async deleteCita(id) {
      try {
        await citasService.deleteCita(id);
        this.fetchCitas();
      } catch (error) {
        console.error("Error deleting cita:", error);
      }
    },
    citaRandom(){
        const min = 1000; // Mínimo valor para el número de cita
        const max = 9999; // Máximo valor para el número de cita
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    cancelEdit() {
      this.showForm = false;
      this.editing = false;
      this.cita = { id: null ,nombre: '', fecha: '', hora: '',tipo: '' };
    }
  }
};
</script>
<style scoped>
table {
  margin-top: 20px;
}
</style>
