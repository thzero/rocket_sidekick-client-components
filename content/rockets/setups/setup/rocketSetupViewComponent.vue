<script>
import { computed } from 'vue';

import { useContentBaseComponent } from '@/components/content/contentBase';
import { useMotorUtilityComponent } from '@/components/external/motorUtilityComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';

export function useRocketSetupViewComponent(props, context, options) {
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
		motorImpulseClasses,
		motorMountDiameters,
		motorCaseInfo,
		motorMountDiameter,
		motorMountName,
		motorUrl
	} = useMotorUtilityComponent(props, context);

	const {
		rocketCg,
		rocketCp,
		rocketDiameter,
		rocketLength,
		rocketManufacturer,
		rocketMotors,
		rocketStagePrimary,
		rocketStages,
		rocketWeight
	} = useRocketsUtilityComponent(props, context, options);

	const cg = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return null;
		return rocketCg(props.detailItem.stages);
	});
	const coverUrl = computed(() => {
		return displayItem.value && displayItem.value.rocket ? displayItem.value.rocket.coverUrl : '';
	});
	const cp = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return null;
		return rocketCp(props.detailItem.rocket.stages);
	});
	const diameter = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return null;
		return rocketDiameter(props.detailItem.rocket.stages);
	});
	const displayItem = computed(() => {
		return props.detailItem ? props.detailItem : {};
	});
	const length = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return null;
		return rocketLength(props.detailItem.rocket.stages);
	});
	const manufacturer = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return null;
		return rocketManufacturer(props.detailItem.rocket.stages);
	});
	const stagePrimary = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return {};
		return rocketStagePrimary(props.detailItem.rocket.stages);
	});
	const stagePrimaryRocket = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return {};
		return rocketStagePrimary(props.detailItem.stages);
	});
	const stageRocketMotors = computed(() => {
		if (!props.detailItem || !props.detailItem.stages || !props.detailItem.motors)
			return null;
		let output = [];
		let motorCaseName;
		let motorName;
		let temp;
		let temp1;
		let temp2;
		let temp3;
		let temp4;
		let temp5;
		let count;
		for (const stage of props.detailItem.stages) {
			temp = {
				index: stage.index + 1,
				motors: []
			}
			output.push(temp);
			for (const motor of stage.motors) {
				temp1 = props.detailItem.motors.find(l => l.motorId === motor.motorId);
				if (!temp1)
					continue;
				
				temp5 = props.detailItem.rocket.stages.find(l => l.index === stage.index);
				if (!temp5)
					continue;
				temp5 = temp5.motors.find(l => l.index === motor.index);
				if (!temp5)
					continue;

				count = null;
				temp3 = props.detailItem.rocket.stages.find(l => l.index === stage.index);
				if (temp3) {
					temp4 = temp3.motors.find(l => l.index === motor.index);
					if (temp4)
						count = temp4.count;
				}
				motorName = temp1.manufacturer + ' ' + temp1.designation;
				if (count > 1)
					motorName += ' x ' + count;
				
				temp2 = props.detailItem.motorCases.find(l => l.id === motor.motorCaseId);
				motorCaseName = '';
				if (temp2)
					motorCaseName += temp2.manufacturer + ' ' + temp2.name;

				temp.motors.push({ index: motor.index + 1, name: motorName, designation: temp5.designation, diameter: temp5.diameter + 'mm', manufacturerAbbrev: temp1.manufacturerAbbrev, caseName: motorCaseName });
			}
		}
		return output;
	});
	const stages = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return 0;
		return rocketStages(props.detailItem.rocket.stages);
	});
	const weight = computed(() => {
		if (!props.detailItem || !props.detailItem.rocket)
			return null;
		return rocketWeight(props.detailItem.stages);
	});

	// const motorUrl = (item) => {
	// 	return AppUtilityConstants.External.thrustCurve + '/motors/' + item.manufacturer + '/' + item.designation
	// };

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
		cg,
		coverUrl,
		cp,
		diameter,
		displayItem,
		length,
		manufacturer,
		stagePrimary,
		stagePrimaryRocket,
		stageRocketMotors,
		stages,
		weight,
		motorUrl,
		rocketMotors
	};
};
</script>
