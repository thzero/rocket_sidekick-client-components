import { between, decimal, helpers, maxLength, minLength, required, url } from '@vuelidate/validators';

export function useRocketEditValidation(nameRequired) { 
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
		detailItemDiameter: { decimal, between: between(0, 2004), $autoDirty: true },
		detailItemDiameterMeasurementUnitId: { $autoDirty: true },
		detailItemDiameterMeasurementUnitsId: { $autoDirty: true },
		detailItemLength: { decimal, between: between(0, 120), $autoDirty: true },
		detailItemLengthMeasurementUnitId: { $autoDirty: true },
		detailItemLengthMeasurementUnitsId: { $autoDirty: true },
		detailItemPublic: { $autoDirty: true },
		detailItemWeight: { decimal, between: between(0, 2004), $autoDirty: true },
		detailItemWeightMeasurementUnitId: { $autoDirty: true },
		detailItemWeightMeasurementUnitsId: { $autoDirty: true }
	};
	validation['detailItemName'] =  (nameRequired === true ?
		{
			required,
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
			minLength: minLength(3),
			maxLength: maxLength(50),
			$autoDirty: true
		}
	:
		validation['detailItemName'] = {
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
			minLength: minLength(3),
			maxLength: maxLength(50),
			$autoDirty: true
		}
	);
	return validation;
}
