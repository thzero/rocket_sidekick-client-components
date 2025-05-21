<script>
import { ref } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';
import ConvertUtility from 'rocket_sidekick_common/utility/convert.js';
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
	const rocketCg = (stage) => {
		if (!stage)
			return null;
		return stage.cg ? stage.cg + ' ' + AppUtility.measurementUnitTranslateLength(correlationId(), stage.cgMeasurementUnitsId, stage.cgMeasurementUnitId) : '';
	};
	const rocketCgHighest = (stages) => {
		if (!stages)
			return null;
		// TODO: assuming all the same units...?
		const primary = rocketStagePrimary(stages);
		if (!primary)
			return null;
		// let cg = 0;
		// let stageCg;
		// for (const stage of stages) {
		// 	stageCg = ConvertUtility.convert(stage.cg, primary.cgMeasurementUnitId, 'cm');
		// 	if (stageCg > cg)
		// 		cg = stageCg;
		// }
		// cg = ConvertUtility.convert(cg, 'cm', primary.cgMeasurementUnitId);
		const cg = _highestMeasurement(stages, 'cg', primary.cgMeasurementUnitId, primary.cgMeasurementUnitsId, 'cm');
		return cg ? cg + ' ' + AppUtility.measurementUnitTranslateLength(correlationId(), primary.cgMeasurementUnitsId, primary.cgMeasurementUnitId) : '';
	};
	const rocketCp = (stage) => {
		if (!stage)
			return null;
		return stage.cp ? stage.cp + ' ' + AppUtility.measurementUnitTranslateLength(correlationId(), stage.cpMeasurementUnitsId, stage.cpMeasurementUnitId) : '';
	};
	const rocketCpHighest = (stages) => {
		if (!stages)
			return null;
		// TODO: assuming all the same units...?
		const primary = rocketStagePrimary(stages);
		if (!primary)
			return null;
		// let cp = 0;
		// let stageCp;
		// for (const stage of stages) {
		// 	stageCp = ConvertUtility.convert(stage.cp, primary.cpMeasurementUnitId, 'cm');
		// 	if (stageCp > cp)
		// 		cp = stage.cp;
		// }
		// cp = ConvertUtility.convert(cp, 'cm', primary.cpMeasurementUnitId);
		if (!primary.cpMeasurementUnitId || !primary.cpMeasurementUnitsId)
			return null;
		const cp = _highestMeasurement(stages, 'cp', primary.cpMeasurementUnitId, primary.cpMeasurementUnitsId, 'cm');
		return cp ? cp + ' ' + AppUtility.measurementUnitTranslateLength(correlationId(), primary.cpMeasurementUnitsId, primary.cpMeasurementUnitId) : '';
	};
	const rocketDiameter = (stage) => {
		if (!stage)
			return null;
		return stage.diameterMajor ? stage.diameterMajor + ' ' + AppUtility.measurementUnitTranslateLength(correlationId(), stage.diameterMajorMeasurementUnitsId, stage.diameterMajorMeasurementUnitId) : '';
	};
	const rocketDiameterHighest = (stages) => {
		if (!stages)
			return null;
		// TODO: assuming all the same units...?
		const primary = rocketStagePrimary(stages);
		if (!primary)
			return null;
		// let diameterMajor = 0;
		// let stageDiameterMajor;
		// for (const stage of stages) {
		// 	stageDiameterMajor = ConvertUtility.convert(stage.diameterMajor, primary.diameterMajorMeasurementUnitId, 'cm');
		// 	if (stageDiameterMajor > diameterMajor)
		// 		diameterMajor = stageDiameterMajor;
		// }
		// diameterMajor = ConvertUtility.convert(diameter, 'cm', primary.diameterMajorMeasurementUnitId);
		if (!primary.diameterMajorMeasurementUnitId || !primary.diameterMajorMeasurementUnitsId)
			return null;
		const diameterMajor = _highestMeasurement(stages, 'diameterMajor', primary.diameterMajorMeasurementUnitId, primary.diameterMajorMeasurementUnitId, 'cm');
		return diameterMajor ? diameterMajor + ' ' + AppUtility.measurementUnitTranslateLength(correlationId(), primary.diameterMajorMeasurementUnitsId, primary.diameterMajorMeasurementUnitId) : '';
	};
	const rocketLength = (stages) => {
		if (!stage)
			return null;
		return stage.length ? stage.length + ' ' + AppUtility.measurementUnitTranslateLength(correlationId(), stage.lengthMeasurementUnitsId, stage.lengthMeasurementUnitId) : '';
	};
	const rocketLengthHighest = (stages) => {
		if (!stages)
			return null;
		const primary = rocketStagePrimary(stages);
		if (!primary)
			return null;
		// let length = 0;
		// let stageLength;
		// for (const stage of stages) {
		// 	stageLength = ConvertUtility.convert(stage.length, primary.lengthMeasurementUnitId, 'cm');
		// 	if (stageLength > length)
		// 		length = stageLength;
		// }
		// diameter = ConvertUtility.convert(length, 'cm', primary.lengthMeasurementUnitId);
		if (!primary.lengthMeasurementUnitId || !primary.lengthMeasurementUnitsId)
			return null;
		const length = _highestMeasurement(stages, 'length', primary.lengthMeasurementUnitId, primary.lengthMeasurementUnitsId, 'cm');
		return length ? length + ' ' + AppUtility.measurementUnitTranslateLength(correlationId(), primary.lengthMeasurementUnitsId, primary.lengthMeasurementUnitId) : '';
	};
	const rocketLengthOverall = (stages) => {
		if (!stages)
			return null;
		const primary = rocketStagePrimary(stages);
		if (!primary)
			return null;
		// let length = 0;
		// let stageLength;
		// for (const stage of stages) {
		// 	stageLength = ConvertUtility.convert(stage.length, primary.lengthMeasurementUnitId, 'cm');
		// 	if (stageLength > length)
		// 		length = stageLength;
		// }
		// diameter = ConvertUtility.convert(length, 'cm', primary.lengthMeasurementUnitId);
		if (!primary.lengthMeasurementUnitId || !primary.lengthMeasurementUnitsId)
			return null;
		const length = _overallMeasurement(stages, 'length', primary.lengthMeasurementUnitId, primary.lengthMeasurementUnitsId, 'cm');
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
	const rocketMotorMountNames = (item, separator) => {
		separator = separator ?? ', ';
		if (!item || !item.stages)
			return null;
		let output = [];
		for (const stage of item.stages) {
			for (const motor of stage.motors) {
				if (motor.diameter)
					output.push(motorMountName(motor));
			}
		}
		return output.join(separator);
	};
	const rocketMotorNames = (item, separator) => {
		separator = separator ?? ', ';
		const output = [];
		const results = rocketMotors(item);
		if (!results)
			return output;
		for (const temp of results) {
			for (const item2 of temp.motors)
				output.push(`${item2.diameter} ${LibraryClientUtility.$trans.t('strings.content.rockets.with')} ${item2.name} ${LibraryClientUtility.$trans.t('strings.content.rockets.in')} ${item2.caseName}`);
		}
		return output.join(separator);
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
		const output = [];
		const results = rocketMotors(item);
		if (!results)
			return output;
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
				motorName = temp1.manufacturer + ' ' + temp1.designation + (temp1.sparky ?  ` (${LibraryClientUtility.$trans.t('forms.external.motorSearch.sparky')})` : '');
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
	const rocketWeight = (stage) => {
		if (!stage)
			return null;
		return stage.weight ? stage.weight + ' ' + AppUtility.measurementUnitTranslateLength(correlationId(), stage.weightMeasurementUnitsId, stage.weightMeasurementUnitId) : '';
	};
	const rocketWeightHighest = (stages) => {
		if (!stages)
			return null;
		// TODO: assuming all the same units...?
		const primary = rocketStagePrimary(stages);
		if (!primary)
			return null;
		// let weight = 0;
		// let stageWeight;
		// for (const stage of stages) {
		// 	stageWeight = ConvertUtility.convert(stage.weight, primary.weightMeasurementUnitId, 'cm');
		// 	if (stageWeight > weight)
		// 		weight = stageWeight;
		// }
		// weight = ConvertUtility.convert(weight, 'cm', primary.weightMeasurementUnitId);
		if (!primary.weightMeasurementUnitId || !primary.weightMeasurementUnitsId)
			return null;
		const weight = _highestMeasurement(stages, 'weight', primary.weightMeasurementUnitId, primary.weightMeasurementUnitsId, 'g');
		return weight ? weight + ' ' + AppUtility.measurementUnitTranslateWeight(correlationId(), primary.weightMeasurementUnitsId, primary.weightMeasurementUnitId) : '';
	};

	const _highestMeasurement = (stages, property, unitId, unitsId, internalUnitId) => {
		if (!stages)
			return null;
		if (!property)
			return null;
		let value = 0;
		let temp;
		let temp2;
		for (const stage of stages) {
			temp = 0;
			temp2 = stage[property];
			if (temp2)
				temp = ConvertUtility.convert(stage[property], unitId, internalUnitId);
			if (temp > value)
				value = temp;
		}
		value = ConvertUtility.round(ConvertUtility.convert(value, internalUnitId, unitId), 2);
		return value;
	};

	const _overallMeasurement = (stages, property, unitId, unitsId, internalUnitId) => {
		if (!stages)
			return null;
		if (!property)
			return null;
		let value = 0;
		let temp;
		let temp2;
		for (const stage of stages) {
			temp = 0;
			temp2 = stage[property];
			if (temp2)
				temp = ConvertUtility.convert(stage[property], unitId, internalUnitId);
			value += temp;
		}
		value = ConvertUtility.round(ConvertUtility.convert(value, internalUnitId, unitId), 2);
		return value;
	};

	return {
		rocketTypes,
		hasCoverUrl,
		rocketCg,
		rocketCgHighest,
		rocketCp,
		rocketCpHighest,
		rocketDiameter,
		rocketDiameterHighest,
		rocketLength,
		rocketLengthHighest,
		rocketLengthOverall,
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
		rocketWeight,
		rocketWeightHighest
	};
};
</script>
