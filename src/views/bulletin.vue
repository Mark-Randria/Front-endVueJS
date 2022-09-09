<template>
    <div>
<Navbar/>
<form @submit.prevent="()=>{this.btnbulletin=true,this.search(),this.search2()}">
<input class="form-control text-center" style="width:fit-content; margin-left: auto; margin-right: auto; margin-top: 20px; margin-bottom: 20px;" type="text" placeholder="Numero d'inscription" v-model="recherche" required>
<button class="btn btn-success" type="submit">Etablir le bulletin</button>
</form>
<div v-if="btnbulletin==true"><br>
<h5>NOM :  {{nom}}     </h5><h5>NIVEAU : {{niveau}}</h5>
<h5>ANNEE :  {{annee}}</h5>
</div>
  
  <table class="table" v-if="moyenne">
    <tr>
        <th>Désignation</th>
        <th>Coefficient</th>
        <th>Note</th>
        <th>Note Pondéré</th>
    </tr>
    <tr v-for="item in resultat" :key="item.designation">
        <td>{{item.designation}}</td>
        <td>{{item.coef}}</td>
        <td>{{item.note}}</td>
        <td>{{item.pondere}}</td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td>Moyenne</td>
        <td>{{moyenne}}</td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td>Observation</td>
        <td>{{observation}}</td>
    </tr>
  </table>
    </div>
</template>

<script>
import Navbar from './navbar.vue';
import axios from 'axios'
    export default {
    name: "Bulletin",
    components: { Navbar },
    data()
    {
        return{
          recherche:null,
          btnbulletin:false,
          nom:null,
          niveau:null,
          annee:null,
          resultat:null,
          moyenne:null,
          observation:null,
          ipadress:'localhost'
        }
    },
    methods:{
        search()
        {
            
                axios.get("http://"+this.ipadress +":2002/bulletin", { params: { recherche:  this.recherche } })
                .then((reponse) => {
                if (reponse.data.length != 0) {
                    this.recherche=reponse.data[0].n_inscription,
                    this.nom=reponse.data[0].nom,
                    this.niveau=reponse.data[0].niveau,
                    this.annee=reponse.data[0].annee,
                    this.observation=reponse.data[0].Resultat,
                    this.moyenne=Math.round(reponse.data[0].moyenne*100)/100                    
                }
                else {
                    this.resultat = null;
                }
            })
                .catch((erreur) => console.log(erreur));
        },
        search2()
        {
                axios.get("http://"+this.ipadress +":2002/bulletin2", { params: { recherche:  this.recherche } })
                .then((reponse) => {
                if (reponse.data.length != 0) {
                    this.resultat=reponse.data,
                    console.log(this.resultat)                   
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
td,th{
    border:black 1px solid;
}
</style>