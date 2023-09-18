<script>
import { computed, onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import Constants from '@/utility/constants';
import AppCommonConstants from 'rocket_sidekick_common/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';

import { useMotorLookupComponent } from '@/components/external/motorLookupComponent';

export function useMotorLookupDialogComponent(props, context, options) {
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

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		motorDiameters,
		motorImpulseClasses,
		motorCaseInfo,
		motorUrl
	} = useMotorLookupComponent(props, context);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);
	const serviceExternalMotorSearch = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_EXTERNAL_MOTOR_SEARCH);

	const dialogMotorLookup = ref(null);
	const dialogResetManager = ref(new DialogSupport());
	const dialogResetMessage = ref(null);
	const filterItemDiameter = ref(null);
	const filterItemImpulseClass = ref(null);
	const filterItemMotor = ref(null);
	const filterItemManufacturer = ref(null);
	const filterItemSparky = ref(false);
	const filterItemSingleUse = ref(false);
	const manufacturers = ref(null);
	const results = ref([]);
	const ttl = ref(0);

	const buttonMotorSearchResetDisabled = computed(() => {
		// const ttl = .serviceStore.state.motorSearchResults ? serviceStore.state.motorSearchResults.ttl : 0;
		const now = LibraryCommonUtility.getTimestamp();
		return (ttl.value < now);
	});
	const searchLocaleName = computed(() => {
		return serviceExternalMotorSearch.nameLocale();
	});
	const searchUrl = computed(() => {
		return serviceExternalMotorSearch.urlHuman();
	});

	const buttonOkDisabledOverride = (disabled, invalid, invalidOverride) => {
		return invalid;
	};
	const clickMotorSearch = async () => {
		await dialogMotorLookup.value.submit(correlationId());
		// const correlationId = this.correlationId();

		// const result = await this.validation.$validate();
		// this.logger.debug('FormDialog', 'submit', 'result', result, correlationId);
		// if (!result)
		// 	return;

		// this.results = null;

		// const request = {
		// 	diameter: this.diameter,
		// 	impulseClass: this.impulseClass,
		// 	manufacturer: this.manufacturer,
		// 	singleUse: this.singleUse,
		// 	sparky: this.sparky
		// };

		// this.serviceStore.dispatcher.setMotorSearchCriteria(this.correlationId(), request);

		// // const response = await this.serviceExternalMotorSearch.search(correlationId, request);
		// const response = await this.serviceStore.dispatcher.requestMotorSearch(correlationId, request);
		// console.log(response);
		// this.results = response || [];
	};
	const clickMotorSearchClear = async () => {
		await dialogMotorLookup.value.reset(correlationId(), null, true);
	};
	const clickMotorSearchReset = async () => {
		const last = serviceStore.state.motorSearchResults ? serviceStore.state.motorSearchResults.last : 0;
		// const ttl2 = serviceStore.state.motorSearchResults ? serviceStore.state.motorSearchResults.ttl : 0;
		const ttl2 = ttl.value;

		const now = LibraryCommonUtility.getTimestamp();
		if (ttl2 < now) {
			return;
		}

		const duration = now - last;

		const spanInHours = 60 * 60 * 1000;
		const spanInDays = 24 * 60 * 60 * 1000;
		const spanInWeeks = 7 * 24 * 60 * 60 * 1000;

		const durationInWeeks = duration / spanInWeeks;
		const durationInDays = duration / spanInDays;
		const durationInHours = duration / spanInHours;

		let message = LibraryClientUtility.$trans.t('motorSearch.motor_reset_message') + '<br>';
		if (durationInWeeks <= 1) {
			let timespan = '';
			if (durationInDays <= 1) {
				if (durationInHours < 1)
					timespan = LibraryClientUtility.$trans.t('motorSearch.motor_reset_message_time_hour_less');
				else
					timespan = LibraryClientUtility.$trans.t('motorSearch.motor_reset_message_time_duration', { duration: durationInHours, type: LibraryClientUtility.$trans.t('motorSearch.motor_reset_hours') });
			}
			else
				timespan = LibraryClientUtility.$trans.t('motorSearch.motor_reset_message_time_duration', { duration: durationInDays, type: LibraryClientUtility.$trans.t('motorSearch.motor_reset_days') });
			message += LibraryClientUtility.$trans.t('motorSearch.motor_reset_message_warning', { timespan: timespan }) + '<br>' + LibraryClientUtility.$trans.t('motorSearch.motor_reset_message_warning2') + '<br>';
		}
		message = message + '<br>' + LibraryClientUtility.$trans.t('motorSearch.motor_reset_message_confirm');

		dialogResetMessage.value = message;
		dialogResetManager.value.open();
	};
	const clickMotorSelect = async (item) => {
		context.emit('ok', item);
		return true;
	};
	const close = () => {
		context.emit('close');
	};
	const dialogResetOk = async () => {
		dialogResetManager.value.ok();
		const correlationIdI = correlationId();
		await serviceStore.dispatcher.requestMotorSearchReset(correlationIdI);
		ttl.value = serviceStore.state.motorSearchResults ? serviceStore.state.motorSearchResults.ttl : 0;
		await preCompleteOk(correlationIdI);
	};
	const preCompleteOk = async (correlationId) => {
		results.value = null;

		const request = {
			diameter: filterItemDiameter.value,
			impulseClass: filterItemImpulseClass.value,
			manufacturer: filterItemManufacturer.value,
			motor: filterItemMotor.value,
			singleUse: filterItemSingleUse.value,
			sparky: filterItemSparky.value
		};

		serviceStore.dispatcher.setMotorSearchCriteria(correlationId, request);

		const response = await serviceStore.dispatcher.requestMotorSearch(correlationId, request);
		results.value = response || [];
		ttl.value = serviceStore.state.motorSearchResults ? serviceStore.state.motorSearchResults.ttl : 0;
		return success(correlationId);
	};
	// eslint-disable-next-line
	const resetAdditional = async (correlationId, ignoreSettings) => {
		filterItemImpulseClass.value = null;
		filterItemManufacturer.value = null;
		filterItemMotor.value = null;
		results.value = null;

		ttl.value = serviceStore.state.motorSearchResults ? serviceStore.state.motorSearchResults.ttl : 0;

		if (ignoreSettings)
			return;

		const data = await serviceStore.getters.getMotorSearchCriteria();
		if (!data)
			return;

		filterItemDiameter.value = data.diameter;
		filterItemImpulseClass.value = data.impulseClass;
		filterItemManufacturer.value = data.manufacturer;
		filterItemMotor.value = data.motor;
		filterItemSparky.value = !LibraryCommonUtility.isNull(data.sparky) ? data.sparky : false;
		filterItemSingleUse.value = !LibraryCommonUtility.isNull(data.singleUse) ? data.singleUse : false;

		// (async () => {
		// 	// await clickMotorSearch();
		// 	await preCompleteOk(correlationId);
		// })();
		await preCompleteOk(correlationId);
	};

	onMounted(async () => {
		if (manufacturers.value)
			return;

		const response = await serviceStore.dispatcher.requestManufacturers(correlationId());
		if (hasFailed(response))
			return;

		let temp = response.results;
		if (options && options.filterManufacturers)
			temp = options.filterManufacturers(temp);

		temp = temp.filter(l => l.types.find(j => j === AppCommonConstants.Rocketry.ManufacturerTypes.motor));
		temp = temp.sort((a, b) => a.name.localeCompare(b.name));
		manufacturers.value = temp.map((item) => { return { id: item.id, name: item.name }; });
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
		buttonsDialog,
		buttonsForms,
		motorDiameters,
		motorImpulseClasses,
		motorCaseInfo,
		motorUrl,
		serviceExternalMotorSearch,
		serviceStore,
		dialogMotorLookup,
		dialogResetMessage,
		dialogResetManager,
		filterItemDiameter,
		filterItemImpulseClass,
		filterItemManufacturer,
		filterItemMotor,
		filterItemSparky,
		filterItemSingleUse,
		manufacturers,
		results,
		buttonMotorSearchResetDisabled,
		searchLocaleName,
		searchUrl,
		buttonOkDisabledOverride,
		clickMotorSearch,
		clickMotorSearchClear,
		clickMotorSearchReset,
		clickMotorSelect,
		close,
		dialogResetOk,
		preCompleteOk,
		resetAdditional,
		scope: 'MotorLookupDialog',
		validation: useVuelidate({ $scope: 'MotorLookupDialog' })
	};
};
</script>
