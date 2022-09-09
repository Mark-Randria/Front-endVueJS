import { createRouter, createWebHistory } from 'vue-router'
import etudiant from '../views/etudiant.vue'
import matiere from '../views/matiere.vue'
import note from '../views/note.vue'
import bulletin from '../views/bulletin.vue'
import classement from '../views/classement.vue'
import notfound from '../views/NotFound.vue'
import accueil from '../views/Accueil.vue'
import credit from '../views/credit.vue'

const routes = [
  {
    path: '/',
    name: 'accueil',
    component: accueil
  },
  {
    path: '/etudiant',
    name: 'etudiant',
    component: etudiant
  },
  {
    path: '/matiere',
    name: 'matiere',
    component: matiere
  },
  {
    path: '/note',
    name: 'note',
    component: note
  },
  {
    path: '/bulletin',
    name: 'bulletin',
    component: bulletin
  },
  {
    path: '/classement',
    name: 'classement',
    component: classement
  },
  {
    path: '/:catchAll(.*)',
    name: 'notfound',
    component: notfound
  },
  {
    path: '/credit',
    name: 'credit',
    component: credit
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
