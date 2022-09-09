<template>
    <div>
<Navbar/>
 <button class="btn btn-outline-light" @click="()=>{this.btnajout=true,this.btnmodifier=false,this.codematiere=null}">Ajouter une matiere</button>
    <div class="form-group" v-if="btnajout==true || btnmodifier==true" >
            <form @submit.prevent="cu" >
                <div>
                    <label for="matiere">Code Matière:</label>
                    <input class="form-control text-center" v-if="btnajout==true" type="number" name="matiere" id="matiere" v-model="codematiere" required min="1" >
                    <input class="form-control text-center" v-if="btnmodifier==true" type="number" name="matiere" id="matiere" v-model="codematiere" required disabled min="1" >
                </div>
                 <div>
                    <label for="libelle">Libelle:</label>
                    <input class="form-control text-center" type="text" name="libelle" id="libelle" v-model="libelle" required>
                 </div>
                <div>
                    <label for="coef">Coefficient:</label>
                    <input class="form-control text-center" type="number" name="coef" id="coef" v-model="coef" required min="1">
                </div><br>
                <button class="btn btn-primary" v-if="btnajout==true" type="submit">Ajouter</button>
                <button class="btn btn-warning" v-if="btnmodifier==true" type="submit">Modifier</button>
                <button class="btn btn-danger" @click="test1">Annuler</button>
                
            </form>
    </div>
    <input class="form-control text-center" style="width:fit-content; margin-left: auto; margin-right: auto; margin-top: 20px; margin-bottom: 20px;" type="text" v-model="recherche" placeholder="Code Matiere" >
    <button class="btn btn-primary" @click="search">Rechercher</button>
 <table class="table" style="margin-top:5%">
   <tr>
    <th>Code Matière</th>
    <th>Libelle</th>
    <th>Coefficient</th>
    <th>Action à faire</th>
    <th>Action à faire</th>
   </tr>

   <tr v-for="item in resultat" :key="item.code_mat">
     <td>{{item.code_mat}}</td>
     <td>{{item.libelle}}</td>
     <td>{{item.coef}}</td>
     <td><button class="btn btn-outline-danger" @click="del(item.code_mat)">Supprimer</button></td>
     <td><button class="btn btn-outline-warning" @click="()=>{this.btnmodifier=true,this.btnajout=false,this.codematiere=item.code_mat,
                              this.libelle=item.libelle,this.coef=item.coef
                             
        }">Modifier</button></td>     
   </tr>


 </table>
    </div>
</template>

<script>
import Navbar from './navbar.vue'
import axios from 'axios'
    export default {
    name: "Matiere",
    components: { Navbar },
    data()
    {
        return{
            btnajout:false,
            btnmodifier:false,
            ipadress:'localhost',
            codematiere:null,
            libelle:null,
            coef:null,
            recherche:'',
            resultat:null


        }
    },
    methods:{
     test1()
     {
        this.btnajout=false,this.codematiere=null,this.libelle=null,this.coef=null,this.btnmodifier=false
     },
     add()
     {
        axios.post("http://"+this.ipadress+":2002/ajout_matiere",{
            codematiere: this.codematiere,
            libelle: this.libelle,
            coef: this.coef
        })
        .then((reponse)=>{
            console.log(reponse)
            if(!reponse.data.errno){alert('succés');}
            else{alert("Numéro déjà existant")}
                console.log(reponse.data)
            this.test1()
                        axios.get("http://" + this.ipadress + ":2002/recherche_matiere", { params: { recherche: "%" + this.recherche + "%" } })
                .then((reponse) => {
                if (reponse.data.length != 0) {
                    console.log(reponse.data)
                    this.resultat = reponse.data  
                }
                else {
                    this.resultat = null;
                }
            })
                .catch((erreur) => console.log(erreur));  
        })
        .catch((erreur)=>{alert('Impossible de se connecter aux base de données')})
     },
     search()
     {
            axios.get("http://" + this.ipadress + ":2002/recherche_matiere", { params: { recherche: "%" + this.recherche + "%" } })
                .then((reponse) => {
                if (reponse.data.length != 0) {
                    console.log(reponse.data)
                    this.resultat = reponse.data  
                }
                else {
                    this.resultat = null;
                }
            })
                .catch((erreur) => console.log(erreur));        
     },
     del(id)
     {
            axios.delete(`http://${this.ipadress}:2002/supprimer_matiere/${id}`)
                .then((reponse) => {
                console.log(reponse),
                            axios.get("http://" + this.ipadress + ":2002/recherche_matiere", { params: { recherche: "%" + this.recherche + "%" } })
                           .then((reponse) => {
                             if (reponse.data.length != 0) {
                                 console.log(reponse.data)
                                this.resultat = reponse.data  
                                  }
                             else {
                                  this.resultat = null;
                                   }
                                    })
                .catch((erreur) => console.log(erreur));   
                })
                .catch((erreur)=>{alert('impossible de se connecter à la base de données')})
     },
     modifier(id)
     {
            axios.put("http://" + this.ipadress + ":2002/modifier_matiere", {
                codemat: id,
                libelle: this.libelle,
                coef: this.coef
            })
                .then((reponse) => {
                alert("modifié avec succés"),
                this.test1()
                    axios.get("http://" + this.ipadress + ":2002/recherche_matiere", { params: { recherche: "%" + this.recherche + "%" } })
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
                .catch((erreur) => { alert("Impossible de se connecter à la base de donnée"); });
     },
     cu()
     {
        if(this.btnajout)
        {
            this.add()
        }
        else
        {
            this.modifier(this.codematiere)
        }
     }
    },
    mounted()
    {
        this.search()
    }
}
</script>

<style scoped>
table
{
    border-collapse: collapse ;
}
th, td
{
    border:solid 1px black;
    width:100px;
}
</style>