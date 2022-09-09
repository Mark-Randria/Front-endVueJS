<template>
<Navbar/>
<button class="btn btn-outline-light" @click="()=>{this.btnajout=true,this.btnmodifier=false,this.numinscription=null}">Ajouter un(e) etudiant(e)</button>
    <div class="form-group" v-if="btnajout==true || btnmodifier==true">
      <form @submit.prevent="cu()">
              <div>
                 <label for="numinscri">Numéro d'Inscription:</label>
                 <input class="form-control text-center" v-if="btnajout==true" type="number" min="1" name="numinscri"  required v-model="numinscription">
                 <input class="form-control text-center" v-if="btnmodifier==true"  type="number" min="1" name="numinscri" required v-model="numinscription" disabled>
              </div>
              <div>
                 <label for="nom">Nom:</label>
                 <input class="form-control text-center" type="text" name="nom" required v-model="nom">
              </div>
              <div>
                 <label for="adresse">Adresse:</label>
                 <input class="form-control text-center" type="text" name="adresse" required v-model="adresse">
              </div>
              <div>
                 <label for="sexe">Sexe: </label><br>
                 <input class="form-check-input" type="radio" name="sexe" value="male" v-model="sexe" required ><label class="form-check-label">H</label> |
                 <input type="radio" name="sexe" value="femelle" v-model="sexe"  required><label class="form-check-label">F</label>
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
                 <label for="annee" >Année:</label>
                 <input class="form-control text-center" type="number" min="1986" name="annee" style="" required v-model="annee"><br>
              </div>
              <button class="btn btn-primary" v-if="btnajout==true" type="submit" >Ajouter</button> 
              <button class="btn btn-warning" v-if="btnmodifier==true" type="submit"  >Modifier</button> 
              <button class="btn btn-danger" @click="clear">Annuler</button> 
              
       </form>
       </div>
       
       
       
       <div>
           <input class="form-control text-center" style="width:fit-content; margin-left: auto; margin-right: auto; margin-top: 20px; margin-bottom: 20px;" type="text" placeholder="Numero d'inscription" v-model="recherche">
           <button class="btn btn-primary" @click="search">recherche</button>

           
           <table class="table" style="margin-top:5%"><!--TABLEAU-->
            <tr>
                <th>N° Inscription</th>
                <th>Nom</th>
                <th>Adresse</th>
                <th>Sexe</th>
                <th>Niveau</th>
                <th>Année</th>
                <th>Action à faire</th>
                <th>Action à faire</th>
                
            </tr>
            <tr  v-for="item in resultat" :key="item.n_inscriprion">
                
                <td>{{item.n_inscription}}</td>
                <td>{{item.nom}}</td>
                <td>{{item.adresse}}</td>
                <td>{{item.sexe}}</td>
                <td>{{item.niveau}}</td>
                <td>{{item.annee}}</td>
                <td><button class="btn btn-outline-danger" @click="del(item.n_inscription)">supprimer</button></td>
                <td> <button class="btn btn-outline-warning" @click="()=>{this.btnmodifier=true,
                                         this.btnajout=false ,
                                         this.numinscription=item.n_inscription,
                                         this.nom=item.nom,
                                         this.adresse=item.adresse,
                                         this.sexe=item.sexe,
                                         this.niveau=item.niveau,
                                         this.annee=item.annee}">modifier</button></td>
            </tr>
           
           </table>
           <h3>Effectif: {{effectif}} </h3>
        
    </div>
</template>

<script>
import axios from 'axios'
import Navbar from './navbar.vue'

    export default {
    name: "Etudiant",
    data() {
        return {
            numinscription: null,
            nom: null,
            adresse: null,
            sexe: null,
            niveau: null,
            annee: null,
            recherche: "",
            resultat: null,
            btnajout: false,
            btnmodifier: false,
            ipadress: "localhost",
            effectif:0
        };
    },
    methods: {
        clear() {
            this.btnajout=false,this.btnmodifier=false,this.numinscription=null,this.nom=null,this.adresse=null,this.sexe=null,this.niveau=null,this.annee=null
        },
        add() {
            axios.post("http://" + this.ipadress + ":2002/ajout_etudiant", {
                numeroi: this.numinscription,
                nom: this.nom,
                adresse: this.adresse,
                sexe: this.sexe,
                niveau: this.niveau,
                annee: this.annee
            })
                .then((reponse) => {
            
                if (!reponse.data.errno) {
                    alert("succès");
                }
                else {
                    alert("Numéro déjà existant")
                    console.log(reponse.data)
                }
                axios.get("http://" + this.ipadress + ":2002/recherche_etudiant", { params: { recherche: "%" + this.recherche + "%" } })
                    .then((reponse) => {
                    if (reponse.data.length != 0) {
                        this.resultat = reponse.data
                        
                    }
                    else {
                        this.resultat = null;
                    }
                    this.effectif=reponse.data.length,
                    this.clear()
                })
                    .catch((erreur) => console.log(erreur));
            })
                .catch((erreur) => { alert("Impossible de se connecter à la base de donnée"); });
        },
        search() {
            axios.get("http://" + this.ipadress + ":2002/recherche_etudiant", { params: { recherche: "%" + this.recherche + "%" } })
                .then((reponse) => {
                if (reponse.data.length != 0) {
                    this.resultat = reponse.data
                    console.log(this.resultat)
                    
                }
                else {
                    this.resultat = null;
                }
                this.effectif=reponse.data.length
            })
                .catch((erreur) => console.log(erreur));
        },
        del(id) {
            axios.delete(`http://${this.ipadress}:2002/supprimer_etudiant/${id}`)
                .then((reponse) => {
                console.log(reponse),
                    axios.get("http://" + this.ipadress + ":2002/recherche_etudiant", { params: { recherche: "%" + this.recherche + "%" } })
                        .then((reponse) => {
                        if (reponse.data.length != 0) {
                            this.resultat = reponse.data
                            
        
                        }

                        else {
                            this.resultat = null;
                        }
                        this.effectif=reponse.data.length
                    })
                        .catch((erreur) => console.log(erreur));
            })
                .catch((error) => console.log("Impossible de se connecter au base de données"));
        },
        modifier(id) {
            axios.put("http://" + this.ipadress + ":2002/modifier_etudiant", {
                numeroi: id,
                nom: this.nom,
                adresse: this.adresse,
                sexe: this.sexe,
                niveau: this.niveau,
                annee: this.annee
            })
                .then((reponse) => {
                alert("modifié avec succés"),
                this.clear()
                    axios.get("http://" + this.ipadress + ":2002/recherche_etudiant", { params: { recherche: "%" + this.recherche + "%" } })
                        .then((reponse) => {
                        if (reponse.data.length != 0) {
                            this.resultat = reponse.data
                            
                        }
                        else {
                            this.resultat = null;
                        }
                        this.effectif=reponse.data.length
                    })
                        .catch((erreur) => console.log(erreur));
            })
                .catch((erreur) => { alert("Impossible de se connecter à la base de donnée"); });
        },
        cu() {
            if (this.btnajout) {
                this.add();
            }
            else {
                this.modifier(this.numinscription);
            }
        }
    },
    components: { Navbar },
    mounted()
    {
        this.search()
    }
}
</script>

<style scoped>
 table{
    border-collapse: collapse;
 }
 th,td
 {border: 1px solid black;
  width:100px;
  }
</style>