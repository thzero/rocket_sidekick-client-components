<script>
import { onMounted, ref } from 'vue';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useContentBaseComponent } from '@/components/content/contentBase';
import { useContentLoadSignalComponent } from '@/components/content/contentLoadSignal';

export function useToolsBaseComponent(props, context, options) {
	const {
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
		sortByOrder,
		target
	} = useContentBaseComponent(props, context, options);

	const {
		contentLoadSignal,
		contentLoadStart,
		contentLoadStop
	} = useContentLoadSignalComponent(props, context, options);
	
	const contentId = options ? options.id : null;

	const calculationOutput = ref([]);
	const content = ref(null);
	const contentTitle = ref(options ? options.title : null);
	const errors = ref(null);
	const errorMessage = ref(null);
	const hasAttribution = ref(false);
	const notifyColor = ref(null);
	const notifyMessage = ref(null);
	const notifyMessageTimer = ref(null);
	const notifySignal = ref(false);
	const notifyTimeout = ref(3000);
	const settings = ref(null);
	const successMessage = ref(null);

	const calculateI = async (correlationId, calculationResults, func) => {
		try {
			initCalculationOutput(correlationId);
			calculationResults.value = initCalculationResults(correlationId, calculationResults);

			if (func) {
				if (!(await func(correlationId, calculationResults)))
					return;
			}

			calculationResults.value.calculated = true;
		}
		catch(err) {
			logger.exception('useToolsBaseComponent', 'calculateI', err, correlationId);
		}
	};
	const handleListener = (correlationId, type, name, value, setName, symbols) => {
		const prefix = !String.isNullOrEmpty(setName) ? `${setName}: ` : '';
		if (type === symbols.symTypeEvaluate)
			calculationOutput.value.push(`${prefix}${name}`);
		else if (type === symbols.symTypeSet)
			calculationOutput.value.push(`${prefix}${name} = ${value}`);
	};
	const handleAttribution = (e) => {
		hasAttribution.value = e;
	};
	const initCalculationOutput = (correlationId) => {
		calculationOutput.value = [];
	};
	const initCalculationResults = (correlationId, results) => {
		if (!results)
			return;

		results.value = {};
		results.value.calculated = false;
		return results;
	};
	const resetAdditional = (correlationId, value) => {
		initCalculationOutput(correlationId);
		initCalculationResults(correlationId, value);

		if (options.resetAdditional)
			options.resetAdditional(correlationId);
	};
	const setErrorMessage = (correlationId, error) => {
		errorMessage.value = error;
		
		if (String.isNullOrEmpty(error))
			return;
		
		notifyColor.value = 'error';
		notifyMessage.value = error;
		notifySignal.value = true;

		if (notifyMessageTimer.value) 
			clearTimeout(notifyMessageTimer.value);
		notifyMessageTimer.value = setTimeout(() => {
			notifySignal.value = false;
		}, notifyTimeout.value);
	};
	const setNotify = (correlationId, message, transformed) => {
		if (String.isNullOrEmpty(message))
			return;

		message = (!transformed ? LibraryClientUtility.$trans.t(message) : message);
		if (String.isNullOrEmpty(message))
			return;

		notifyColor.value = null;
		notifyMessage.value = (!transformed ? LibraryClientUtility.$trans.t(message) : message);
		notifySignal.value = true;
	};
	const setSuccessMessage = (correlationId, success) => {
		successMessage.value = success;
		
		if (String.isNullOrEmpty(success))
			return;
		
		notifyColor.value = 'green';
		notifyMessage.value = success;
		notifySignal.value = true;
	};

	onMounted(async () => {
		const correlationIdI = correlationId();

		settings.value = serviceStore.getters.user.getUserSettings();

		if (!String.isNullOrEmpty(contentId)) {
			const tools = serviceStore.getters.getContentTools();
			const results = tools.find(l => l.id === contentId);
			if (!results)
				return;
			content.value = results;
		}

		if (options && LibraryCommonUtility.isObject(options) && options.formRef && options.formRef.value)
			// await options.formRef.value.resetForm(correlationId, false);
			await options.formRef.value.reset(correlationIdI, false);
			
		if (contentId)
			AppUtility.usageMetricsMeasurementTag(correlationIdI, 'tools.' + contentId);
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
		sortByOrder,
		target,
		contentLoadSignal,
		contentLoadStart,
		contentLoadStop,
		calculationOutput,
		content,
		contentTitle,
		errors,
		errorMessage,
		hasAttribution,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		settings,
		calculateI,
		handleListener,
		handleAttribution,
		initCalculationOutput,
		initCalculationResults,
		resetAdditional,
		setErrorMessage,
		setNotify,
		setSuccessMessage
	};
};
</script>
