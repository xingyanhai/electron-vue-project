import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/video',
            component: require('@/views/index').default,
            children: [
                {
                    path: 'video',
                    component: require('@/views/video/video').default
                },
                {
                    path: '/landing-page',
                    name: 'landing-page',
                    component: require('@/components/LandingPage').default
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
