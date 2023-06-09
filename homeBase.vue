<script>
import { computed, onMounted, ref } from 'vue';

import AppSharedConstants from '@/utility/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useHomeBaseComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success
	} = useBaseComponent(props, context, options);

	const serviceFeatures = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_FEATURES);
	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	const externalGithub = ref(AppSharedConstants.External.github);

	let featuresTemp = (serviceFeatures ? serviceFeatures.features() : null);
	featuresTemp = (featuresTemp ? featuresTemp : (options ? options.features : null));
	featuresTemp = (featuresTemp ? featuresTemp : {});

	const features = ref(featuresTemp);

	const initializeCompleted = ref(false);

	const contentDescription = (item,) => {
		return (item.markup ? item.description : LibraryClientUtility.$trans.t(item.description));
	};
	const contentLink = (item,) => {
		if (item.markup)
			return `/content/info/${item.id}`;

		return item.link;
	};
	const contentTitle = (item,) => {
		return (item.markup ? item.title : LibraryClientUtility.$trans.t(item.title));
	};

	const hasContent = computed(() => {
		const content = serviceStore.getters.getContent();
		return content && content.length > 0;
	});
	const hasContentInfo = computed(() => {
		const content = serviceStore.getters.getContentInfo();
		return content && content.length > 0;
	});
	const hasContentTools = computed(() => {
		const content = serviceStore.getters.getContentTools();
		return content && content.length > 0;
	});
	const info = computed(() => {
		let info = serviceStore.getters.getContentInfo();
		return info.sort((a, b) => a.order >= b.order);
	});
	const isLoggedIn = computed(() => {
		return serviceStore.user && serviceStore.userAuthIsLoggedIn;
	});
	const newsCount = computed(() => {
		if (!serviceStore.news.latest)
			return 0;

		const news = serviceStore.news.latest.slice(0);
		return news.length;
	});
	const tools = computed(() => {
		let tools = serviceStore.getters.getContentTools();
		return tools.sort((a, b) => a.order >= b.order);
	});
	const user = computed(() => {
		return serviceStore.user;
	});
	const userDisplayName = computed(() => {
		return AppUtility.userDisplayName(correlationId(), serviceStore.user);
	});

	LibraryClientUtility.$EventBus.on('initialize-completed', (value) => {
		initializeCompleted.value = value;
	});

	onMounted(async () => {
		await serviceStore.dispatcher.requestContent(correlationId());

		// // Selecting the iframe element
		const iframe = document.getElementById('slideshow');
		// // Adjusting the iframe height onload event
		// // frame.onload = function()
		// // function execute while load the iframe
		// iframe.addEventListener('load', function() {
		// 	iframe.style.height = (Number(iframe.style.width.replace('%')) * 0.75) + 'px';
		// 	// iframe.style.width = iframe.contentWindow.body.scrollWidth + 'px';
		// });
		iframe.src = 'https://docs.google.com/presentation/d/e/2PACX-1vQdHTQzjsz9rYx3DUY7sXjoPOxGJ7emhlGBJ-jMbuntHD9i9JbktdR_WuWXxe72VaJa_Q1y2jYIFAc0/embed?start=true&loop=true&delayms=3000';
	});

	return {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		serviceStore,
		externalGithub,
		features,
		initializeCompleted,
		contentDescription,
		contentLink,
		contentTitle,
		hasContent,
		hasContentInfo,
		hasContentTools,
		info,
		isLoggedIn,
		newsCount,
		tools,
		user,
		userDisplayName
	};
};
</script>
