<template>
    <div>
<Navbar/>
<form  @submit.prevent="liste()">
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" value="L1" v-model="niveau" required checked="true" ><label class="form-check-label" for="L1">L1</label>
    </div>
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" value="L2" v-model="niveau" required><label class="form-check-label" for="L2">L2</label>
    </div>
    <div class="form-check form-check-inline">
         <input class="form-check-input" type="radio" value="L3" v-model="niveau" required><label class="form-check-label" for="L3">L3</label>
    </div>
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" value="M1" v-model="niveau" required><label class="form-check-label" for="M1">M1</label>
    </div>
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" value="M2" v-model="niveau" required><label class="form-check-label" for="M2">M2</label>
    </div>
    <input class="form-control text-center" placeholder="Annee Scolaire" type="number" v-model="annee" min="1986" required><br>
    <button class="btn btn-success" type="submit">Voir le classement</button>
</form>

<table class="table" style="margin-top:5%" v-if="resultat">
    <tr>
        <th>N°Inscription</th>
        <th>Nom</th>
        <th>Moyenne</th>
    </tr>
    <tr v-for="item in resultat" :key="item.n_inscription">
        <td>{{item.n_inscription}}</td>
        <td> {{item.nom}} </td>
        <td> {{Math.round(item.moyenne*100)/100}} </td>
    </tr>
</table>
<h2 v-else><br>Aucun Resultat</h2>
<h5 v-if="moyenneclass!=0">moyenne de classe : {{moyenneclass}} </h5>
    </div>
</template>

<script>
import Navbar from './navbar.vue';
import axios from 'axios'
    export default {
    components: { Navbar },
    data()
    {
        return{
       niveau:null,
       annee:null,
       moyenneclass:0,
       resultat:null,
       tab:null,
       ipadress:'localhost'
        }
    },
    methods:{
      liste()
      {
        this.moyenneclass=0
                axios.get("http://"+this.ipadress +":2002/classement", { params: { niveau:  this.niveau, annee: this.annee } })
                .then((reponse) => {
                if (reponse.data.length != 0) {
                      this.resultat=reponse.data
                      this.tab=this.resultat.length

                      for(let i=0;i<this.tab;i++)
                      {
                        this.moyenneclass=this.moyenneclass+ parseFloat(reponse.data[i].moyenne)
                      }
                      console.log(this.moyenneclass)
                      this.moyenneclass=Math.round((this.moyenneclass/this.tab)*100)/100 
                }
                else {
                    this.resultat = null;
                }
            })
                .catch((erreur) => console.log(erreur));        
      }

    }
}
</script>

<style scoped>
table{
    border-collapse: collapse;
}
th,td{
    border:black 1px solid;
    width:100px;
}
</style>