import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello.vue';
import Profile from '@/components/Profile.vue';
import Collection from '@/components/Collection.vue';
import Auth from '@okta/okta-vue';
import config from '@/config.json';

/* eslint-disable @typescript-eslint/camelcase */
Vue.use(Auth, {
	issuer: config.authClient,
	client_id: config.clientId,
	redirect_uri: config.redirectUrl,
	scope: 'openid profile email',
});
/* eslint-enable @typescript-eslint/camelcase */

Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Hello',
			component: Hello,
		},
		{
			path: '/implicit/callback',
			component: Auth.handleCallback(),
		},
		{
			path: '/Profile',
			name: 'Profile',
			component: Profile,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/Collection',
			name: 'Collection',
			component: Collection,
			meta: {
				requiresAuth: true,
			},
		},
	],
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
