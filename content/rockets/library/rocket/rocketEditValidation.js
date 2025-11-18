import { between, decimal, helpers, maxLength, minLength, required, url } from '@vuelidate/validators';

export function useRocketEditValidation(nameRequired, diameterRequired, lengthRequired, weightRequired) { 
	const validation = {
		detailItemAlbumLink: { 
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)),
			minLength: minLength(16),
			maxLength: maxLength(255),
			url,
			$autoDirty: true 
		},
		detailItemAlbumName: { 
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[!@#$%^&*()_\-\+=\[\]{}|\\:;"'<>,.?\/a-zA-Z0-9 (\r|\n)*$/)]*$/)),
			maxLength: maxLength(3),
			maxLength: maxLength(50),
			$autoDirty: true 
		},
		// detailItemAlbumType: { 
		// 	characters: helpers.withMessage('Invalid characters', helpers.regex(/^[!@#$%^&*()_\-\+=\[\]{}|\\:;"'<>,.?\/a-zA-Z0-9 (\r|\n)*$/)]*$/)),
		// 	minLength: minLength(3),
		// 	maxLength: maxLength(20),
		// 	url,
		// 	$autoDirty: true 
		// },
		detailItemCg: {  decimal, between: between(0, 2004), $autoDirty: true }, // TODO: max of length
		detailItemCgFrom: { minLength: minLength(3), maxLength: maxLength(50), $autoDirty: true },
		detailItemCgMeasurementUnitId: { $autoDirty: true },
		detailItemCgMeasurementUnitsId: { $autoDirty: true },
		detailItemCoverUrl: {
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)),
			minLength: minLength(16),
			maxLength: maxLength(255),
			url,
			$autoDirty: true 
		},
		detailItemCp: {  decimal, between: between(0, 2004), $autoDirty: true }, // TODO: max of length
		detailItemCpFrom: { minLength: minLength(3), maxLength: maxLength(50), $autoDirty: true },
		detailItemCpMeasurementUnitId: { $autoDirty: true },
		detailItemCpMeasurementUnitsId: { $autoDirty: true },
		detailItemDescription: { 
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[!@#$%^&*()_\-\+=\[\]{}|\\:;"'<>,.?\/a-zA-Z0-9 (\r|\n)*$/)]*$/)),
			maxLength: maxLength(300),
			maxLength: maxLength(1000),
			$autoDirty: true 
		},
		detailItemManufacturerRocketName: { 
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
			maxLength: maxLength(3),
			maxLength: maxLength(50),
			$autoDirty: true 
		},
		detailItemManufacturerStockId: { 
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
			maxLength: maxLength(3),
			maxLength: maxLength(50),
			$autoDirty: true 
		},
		detailItemPublic: { $autoDirty: true }
	};
	validation['detailItemName'] = (nameRequired === true ?
		{
			required,
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
			minLength: minLength(3),
			maxLength: maxLength(50),
			$autoDirty: true
		}
	:
		{
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
			minLength: minLength(3),
			maxLength: maxLength(50),
			$autoDirty: true
		}
	);
	validation['detailItemDiameter'] =  (diameterRequired === true ?
		{ required, decimal, between: between(0, 2004), $autoDirty: true }
	:
		{ decimal, between: between(0, 2004), $autoDirty: true }
	);
	validation['detailItemDiameterMeasurementUnitId'] =  (diameterRequired === true ?
		{ required, $autoDirty: true }
	:
		{ $autoDirty: true }
	);
	validation['detailItemDiameterMeasurementUnitsId'] =  (diameterRequired === true ?
		{ required, $autoDirty: true }
	:
		{ $autoDirty: true }
	);
	validation['detailItemLength'] =  (lengthRequired === true ?
		{ required, decimal, between: between(0, 120), $autoDirty: true }
	:
		{ decimal, between: between(0, 120), $autoDirty: true }
	);
	validation['detailItemLengthMeasurementUnitId'] =  (lengthRequired === true ?
		{ required, $autoDirty: true }
	:
		{ $autoDirty: true }
	);
	validation['detailItemLengthMeasurementUnitsId'] =  (lengthRequired === true ?
		{ required, $autoDirty: true }
	:
		{ $autoDirty: true }
	);
	validation['detailItemWeight'] =  (weightRequired === true ?
		{ required, decimal, between: between(0, 2004), $autoDirty: true }
	:
		{ decimal, between: between(0, 2004), $autoDirty: true }
	);
	validation['detailItemWeightMeasurementUnitId'] =  (weightRequired === true ?
		{ required, $autoDirty: true }
	:
		{ $autoDirty: true }
	);
	validation['detailItemWeightMeasurementUnitsId'] =  (weightRequired === true ?
		{ required, $autoDirty: true }
	:
		{ $autoDirty: true }
	);
	return validation;
}
