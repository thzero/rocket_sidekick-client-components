<script>
import { ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useMotorUtilityComponent } from '@/components/external/motorUtilityComponent';

export function useRocketsUtilityComponent(props, context, options) {
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
		motorImpulseClasses,
		motorMountDiameters,
		motorCaseInfo,
		motorMountDiameter,
		motorMountName,
		motorUrl
	} = useMotorUtilityComponent(props, context);

	const rocketTypes = ref(Object.getOwnPropertyNames(AppCommonConstants.Rocketry.RocketTypes).filter(l => l !== 'high').map((item) => { return { id: item.toLowerCase(), name: LibraryClientUtility.$trans.t('strings.content.rockets.levels.' + item.toLowerCase()) }; }));
	
	const hasCoverUrl = (item) => {
		if (!item)
			return null;
		return !String.isNullOrEmpty(item.coverUrl);
	};
	const rocketCg = (stages) => {
		if (!stages)
			return null;
		// TODO: assuming all the same units...?
		const primary = rocketStagePrimary(stages);
		if (!primary)
			return null;
		let cg = 0;
		for (const stage of stages)
			if (stage.cg > cg)
				cg = stage.cg;
		return cg ? cg + ' ' + AppUtility.measurementUnitTranslateLength(correlationId(), primary.cgMeasurementUnitsId, primary.cgMeasurementUnitId) : '';
	};
	const rocketCp = (stages) => {
		if (!stages)
			return null;
		// TODO: assuming all the same units...?
		const primary = rocketStagePrimary(stages);
		if (!primary)
			return null;
		let cp = 0;
		for (const stage of stages)
			if (stage.cp > cp)
				cp = stage.cp;
		return cp ? cp + ' ' + AppUtility.measurementUnitTranslateLength(correlationId(), primary.cpMeasurementUnitsId, primary.cpMeasurementUnitId) : '';
	};
	const rocketDiameter = (stages) => {
		if (!stages)
			return null;
		// TODO: assuming all the same units...?
		const primary = rocketStagePrimary(stages);
		if (!primary)
			return null;
		let diameter = 0;
		for (const stage of stages)
			if (stage.diameterMajor > diameter)
				diameter = stage.diameterMajor;
		return diameter ? diameter + ' ' + AppUtility.measurementUnitTranslateLength(correlationId(), primary.diameterMajorMeasurementUnitsId, primary.diameterMajorMeasurementUnitId) : '';
	};
	const rocketLength = (stages) => {
		if (!stages)
			return null;
		const primary = rocketStagePrimary(stages);
		if (!primary)
			return null;
		let length = 0;
		for (const stage of stages)
			if (stage.length > length)
				length = stage.length;
		return length ? length + ' ' + AppUtility.measurementUnitTranslateLength(correlationId(), primary.lengthMeasurementUnitsId, primary.lengthMeasurementUnitId) : '';
	};
	const rocketManufacturer = (stages) => {
		if (!stages)
			return null;
		const primary = rocketStagePrimary(stages);
		if (!primary)
			return null;
		if (!primary.manufacturerId)
			return null;

		if (!options.manufacturers)
			return null;

		const temp = options.manufacturers.find(l => l.id === primary.manufacturerId);
		return temp ? temp.name : null;
	};
	const rocketMotorMountName = (item) => {
		if (!item)
			return null;
		return motorMountName(item);
	};
	const rocketMotorMountNames = (item) => {
		if (!item || !item.stages)
			return null;
		let output = [];
		for (const stage of item.stages) {
			for (const motor of stage.motors) {
				if (motor.diameter)
					output.push(motorMountName(motor));
			}
		}
		return output.join(', ');
	};
	const rocketMotorNames = (item) => {
		const results = rocketMotors(item);
		const output = [];
		for (const temp of results) {
			for (const item2 of temp.motors)
				output.push(`${item2.diameter} ${LibraryClientUtility.$trans.t('strings.content.rockets.with')} ${item2.name} ${LibraryClientUtility.$trans.t('strings.content.rockets.in')} ${item2.caseName}`);
		}
		return output.join(', ');
	};
	// const rocketMotors = (item) => {
	// 	if (!item || !item.stages || !item.rocket || !item.rocket.stages)
	// 		return null;
	// 	let output = [];
	// 	let motor2;
	// 	let stage2;
	// 	for (const stage of item.rocket.stages) {
	// 		stage2 = item.stages.find(l => l.index === stage.index);
	// 		for (const motor of stage.motors) {
	// 			if (!motor.diameter)
	// 				continue;

	// 			motor2 = stage2 ? stage2.motors.find(l => l.index === motor.index) : null;

	// 			output.push(motorMountName(motor)) + ' ' + motorMountName(motor2);
	// 		}
	// 	}
	// 	return output.join(', ');
	// };
	const rocketMotorNamesByStage = (item, stage) => {
		const results = rocketMotors(item);
		const output = [];
		const index = 0;
		for (const temp of results) {
			for (const item2 of temp.motors)
				output.push(`${item2.diameter} ${LibraryClientUtility.$trans.t('strings.content.rockets.with')} ${item2.name} ${LibraryClientUtility.$trans.t('strings.content.rockets.in')} ${item2.caseName}`);
			
			if (index === stage)
				break;

			stage++;
		}
		return output.join(', ');
	};
	const rocketMotors = (item) => {
		if (!item || !item.stages || !item.motors)
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
		for (const stage of item.stages) {
			temp = {
				index: stage.index + 1,
				motors: []
			}
			output.push(temp);
			for (const motor of stage.motors) {
				temp1 = item.motors.find(l => l.motorId === motor.motorId);
				if (!temp1)
					continue;
				
				temp5 = item.rocket.stages.find(l => l.index === stage.index);
				if (!temp5)
					continue;
				temp5 = temp5.motors.find(l => l.index === motor.index);
				if (!temp5)
					continue;

				count = null;
				temp3 = item.rocket.stages.find(l => l.index === stage.index);
				if (temp3) {
					temp4 = temp3.motors.find(l => l.index === motor.index);
					if (temp4)
						count = temp4.count;
				}
				motorName = temp1.manufacturer + ' ' + temp1.designation;
				if (count > 1)
					motorName += ' x ' + count;
				
				temp2 = item.motorCases.find(l => l.id === motor.motorCaseId);
				motorCaseName = '';
				if (temp2)
					motorCaseName += temp2.manufacturer + ' ' + temp2.name;

				temp.motors.push({ index: motor.index + 1, name: motorName, designation: temp5.designation, diameter: temp5.diameter + 'mm', manufacturerAbbrev: temp1.manufacturerAbbrev, caseName: motorCaseName });
			}
		}
		return output;
	};
	const rocketStagePrimary = (stages) => {
		return stages ? stages.find(l => l.index === 0) : null;
	};
	const rocketStages = (stages) => {
		return stages ? stages.length : 0;
	};
	const rocketTypeIcon = (item) => {
		const icon = rocketTypeIconDetermine(item);
		if (!icon)
			return null;
		return '/icons/' + icon;
	};
	const rocketTypeIconDetermine = (item) => {
		if (!item)
			return null;
		
		if (item.rocketTypes) {
			let typeId = null;
			let typeRank = null;
			let temp;
			for (const type of item.rocketTypes) {
				temp = AppCommonConstants.Rocketry.RocketTypeRanks[type];
				if (temp > typeRank) {
					typeRank = temp;
					typeId = type;
				}
			}
			if (!typeId)
				return null;

			return rocketTypeIconDetermine2(typeId);
		}

		return rocketTypeIconDetermine2(item.typeId);
	};
	const rocketTypeIconDetermine2 = (typeId) => {
		if (!typeId)
			return null;

		if (typeId === AppCommonConstants.Rocketry.RocketTypes.highone)
			return 'rocket_level1.png';
		if (typeId === AppCommonConstants.Rocketry.RocketTypes.hightwo)
			return 'rocket_level2.png';
		if (typeId === AppCommonConstants.Rocketry.RocketTypes.highthree)
			return 'rocket_level3.png';
		if (typeId === AppCommonConstants.Rocketry.RocketTypes.low)
			return 'rocket_low.png';
		if (typeId === AppCommonConstants.Rocketry.RocketTypes.mid)
			return 'rocket_mid.png';
		
		return null;
	};
	const rocketTypeName = (id) => {
		return (rocketTypes.value.find(l => l.id === id) ?? {}).name;
	};

	const rocketTypeNames = (ids) => {
		if (!Array.isArray(ids)) 
			ids = [ ids ];
		let temp = rocketTypes.value.filter(l => ids.includes(l.id));
		temp = temp.map(l => l.name);
		return temp.join(', ');
	};
	const rocketWeight = (stages) => {
		if (!stages)
			return null;
		// TODO: assuming all the same units...?
		const primary = rocketStagePrimary(stages);
		if (!primary)
			return null;
		let weight = 0;
		for (const stage of stages)
			if (stage.weight > length)
				weight = stage.weight;
		return weight ? weight + ' ' + AppUtility.measurementUnitTranslateWeight(correlationId(), primary.weightMeasurementUnitsId, primary.weightMeasurementUnitId) : '';
	};

	return {
		rocketTypes,
		hasCoverUrl,
		rocketCg,
		rocketCp,
		rocketDiameter,
		rocketLength,
		rocketManufacturer,
		rocketMotorMountName,
		rocketMotorMountNames,
		rocketMotorNames,
		rocketMotorNamesByStage,
		rocketMotors,
		rocketStagePrimary,
		rocketStages,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rocketTypeName,
		rocketTypeNames,
		rocketWeight
	};
};
</script>
