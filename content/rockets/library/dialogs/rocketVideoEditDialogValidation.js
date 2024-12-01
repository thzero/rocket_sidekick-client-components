import { between, decimal, helpers, maxLength, minLength, required } from '@vuelidate/validators';

export const useRocketVideoEditDialogValidation = {
	detailItemLink: {
		characters: helpers.withMessage('Invalid characters', helpers.regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)),
		minLength: minLength(3),
		maxLength: maxLength(255),
		required,
		$autoDirty: true
	},
	detailItemName: {
		characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
		minLength: minLength(3),
		maxLength: maxLength(50),
		required,
		$autoDirty: true
	},
	detailItemType: {
		characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
		minLength: minLength(3),
		maxLength: maxLength(20),
		$autoDirty: true
	}
};
