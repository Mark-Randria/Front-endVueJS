<template>
    <div>

<Navbar/>
<button class="btn btn-outline-light" @click="()=>{this.btnajout=true,this.btnmodifier=false,this.codematiere=null,this.ninscription=null,this.niveau=null,this.note=null}">Ajouter une note</button>
  <div class="form-group" v-if="btnajout==true || btnmodifier==true">
       <form @submit.prevent="cu">
         <div>
            <label for="codemat">Code Matière</label>
            <select class="form-select text-center" v-if="btnajout==true" name="codemat" id="codemat" required v-model="codematiere"  >
                         <option v-for="item in objcode" :key="item.code_mat" :value="item.code_mat">{{item.code_mat}}</option>                      
            </select>
            <input class="form-control text-center" type="text" v-if="btnmodifier==true" v-model="codematiere" disabled>
         </div>
         <div>
            <label for="ninscri">N°Inscription</label>
            <select class="form-select text-center" name="ninscri" id="ninscri" required v-model="ninscription" v-if="btnajout==true" >
                         <option v-for="item in objnum" :key="item.n_inscription" :value="item.n_inscription">{{item.n_inscription}}</option>                      
            </select>
            <input class="form-control text-center" type="text" v-if="btnmodifier==true" v-model="ninscription" disabled>
         </div>
              <div>
                 <label for="niveau">Niveau:</label>
                 <select class="form-select text-center" name="niveau" v-model="niveau" required >
                     <option value="L1">L1</option>
                       <option value="L2">L2</option>
                       <option value="L3">L3</option>
                       <option value="M1">M1</option>
                       <option value="M2">M2</option>
                 </select>
              </div>
              <div>
                <label for="note">Note:</label>
                <input class="form-control text-center" type="number" v-model="note" min="0" max="20" required>
              </div><br>
              <button class="btn btn-primary" v-if="btnajout==true" type="submit">Ajouter</button>
              <button class="btn btn-warning" v-if="btnmodifier==true" type="submit">Modifier</button> 
              <button class="btn btn-danger" @click="clear">Annuler</button>

       </form>
  </div>
  <input class="form-control text-center" style="width:fit-content; margin-left: auto; margin-right: auto; margin-top: 20px; margin-bottom: 20px;" type="text" v-model="recherche" placeholder="Code matiere ou N°Inscription">
  <button class="btn btn-primary" @click="search">Rechercher</button><br>
<table class="table" style="margin-top:5%">
    <tr>
        <th>Code Matière</th>
        <th>N°Inscription</th>
        <th>Niveau</th>
        <th>Note</th>
        <th>Action à faire</th>
        <th>Action à faire</th>
    </tr>
    <tr v-for="item in resultat" :key="item.code_mat">
       <td>{{item.code_mat}}</td>
       <td>{{item.n_inscription}}</td>
       <td>{{item.niveau}}</td>
       <td>{{item.note}}</td>
       <td><button class="btn btn-outline-danger" @click="del(item.n_inscription,item.code_mat)">Supprimer</button></td>
       <td><button class="btn btn-outline-warning" @click="()=>{this.btnmodifier=true,this.btnajout=false,this.codematiere=item.code_mat,
                                this.ninscription=item.n_inscription,this.niveau=item.niveau,this.note=item.note
        }">Modifier</button></td> 
    </tr>
</table>
    </div>
</template>

<script>
import Navbar from './navbar.vue';
import axios from 'axios'

    export default {
    name: "Note",
    components: { Navbar },
    data()
    { return{
             btnajout:false,
             btnmodifier:false,
             codematiere:null,
             ninscription:null,
             niveau:null,
             note:null,
             ipadress:'localhost',
             objcode:null,
             objnum:null,
             recherche:'',
             resultat:null
            }
    },
    methods:{
        clear()
        {
        this.btnajout=false,this.btnmodifier=false,this.codematiere=null,this.ninscription=null,this.niveau=null,this.note=null
        },
        code()
        {
            axios.get("http://"+this.ipadress+":2002/recherche_matiere", { params: { recherche:"%%" } })
                .then((reponse) => {
                if (reponse.data.length != 0) {
                    this.objcode=reponse.data
                    
                }
            })
                .catch((erreur) => console.log(erreur));   
        },
        insc()
        {
            axios.get("http://"+this.ipadress+":2002/recherche_etudiant", { params: { recherche:"%%" } })
                .then((reponse) => {
                if (reponse.data.length != 0) {
                    this.objnum=reponse.data  
                }
            })
                .catch((erreur) => console.log(erreur));              
        },
        add()
        {
        axios.post("http://"+this.ipadress+":2002/ajout_note",{
            codematiere: this.codematiere,
            ninscription: this.ninscription,
            niveau: this.niveau,
            note: this.note
        })
           .then((reponse)=>{
            console.log(reponse)
            if(!reponse.data.errno)
            {
                alert('succés')
            }
            else{
                alert('Note déjà existant')
            }
                        axios.get("http://" + this.ipadress + ":2002/recherche_note", { params: { recherche: "%" + this.recherche + "%" } })
                .then((reponse) => {
                if (reponse.data.length != 0) {
                    this.resultat = reponse.data
                    console.log(reponse.data)                    
                }
                else {
                    this.resultat = null;
                }
            })
                .catch((erreur) => console.log(erreur));
            
           })
           .catch((erreur) => console.log(erreur));
        },
        cu()
        {
            if(this.btnajout)
            {this.add(),
             this.clear()}
             else{
                this.modifier(this.ninscription,this.codematiere),
                this.clear()

             }
        },
        search()
        {
            axios.get("http://" + this.ipadress + ":2002/recherche_note", { params: { recherche: "%" + this.recherche + "%" } })
                .then((reponse) => {
                if (reponse.data.length != 0) {
                    this.resultat = reponse.data
                    console.log(reponse.data)                    
                }
                else {
                    this.resultat = null;
                }
            })
                .catch((erreur) => console.log(erreur));
        },
        del(id,code)
        {
            axios.delete(`http://${this.ipadress}:2002/supprimer_note/${id}/${code}`)
                .then((reponse) => {
                console.log(reponse),
            axios.get("http://" + this.ipadress + ":2002/recherche_note", { params: { recherche: "%" + this.recherche + "%" } })
                .then((reponse) => {
                if (reponse.data.length != 0) {
                    this.resultat = reponse.data
                                        
                }
                else {
                    this.resultat = null;
                }
            })
                .catch((erreur) => console.log(erreur));
            })
                .catch((error) => console.log("Impossible de se connecter au base de données"));    
        },
        modifier(id,code)
        {
            axios.put("http://" + this.ipadress + ":2002/modifier_note", {
                ninscri: id,
                code: code,
                niveau: this.niveau,
                note: this.note,
            })
                .then((reponse) => {
                alert("modifié avec succés"),
                this.clear()
            axios.get("http://" + this.ipadress + ":2002/recherche_note", { params: { recherche: "%" + this.recherche + "%" } })
                .then((reponse) => {
                if (reponse.data.length != 0) {
                    this.resultat = reponse.data
                    console.log(reponse.data)                    
                }
                else {
                    this.resultat = null;
                }
            })
                .catch((erreur) => console.log(erreur));
            })
                .catch((erreur) => { alert("Impossible de se connecter à la base de donnée"); });            
        }
    },
    mounted()
    {
        this.code(),
        this.insc(),
        this.search()
    }
}
</script>

<style scoped>
table{
    border-collapse: collapse;
}
th,td{
    border:solid black 1px;
    width:100px
}
</style>