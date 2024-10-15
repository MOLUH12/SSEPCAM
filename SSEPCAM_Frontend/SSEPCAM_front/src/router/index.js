import { createRouter, createWebHistory } from 'vue-router'
import { useProfilStore } from '../stores/profilStore';
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProfileView from '../views/ProfileView.vue'
import ReportFormView from '../views/ReportFormView.vue'
import ProfileManagementView from '../views/ProfileManagementView.vue'
import ProfileEditView from '../views/ProfileEditView.vue'
import ProfileListView from '../views/ProfileListView.vue'
import ValidationView from '../views/ValidationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/Report',
      name: 'Report',
      component: ReportFormView
    },
    {
      path: '/validation',
      name: 'validation',
      component: ValidationView
    },
    {
      path: '/ProfileManagement',
      name: 'ProfileManagement',
      component: ProfileManagementView
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: ProfileView
    },
    {
      path: '/profileList',
      name: 'profileList',
      component: ProfileListView
    },
    {
      path: '/profileEdit',
      name: 'ProfileEdit',
      component: ProfileEditView
    },

    {
      path: '/dashboard',
      component: DashboardView,
      beforeEnter: (to, from, next) => {
          const profilStore = useProfilStore();
          const userRole = profilStore.profil.role;
          if (userRole === 'Super Administrateur' || userRole === 'Administrateur') {
              next();
          } else {
              next('/'); // Redirige vers la page d'accueil si l'utilisateur n'a pas le rôle requis
          }
      },
  },


    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
