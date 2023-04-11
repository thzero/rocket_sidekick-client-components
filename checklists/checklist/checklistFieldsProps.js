export const useChecklistFieldsProps = {
	readonly: {
		type: Boolean,
		value: false
	},
	validation: {
		type: Object
	},
	// must be included in props
	modelValue: {
		default: null
	}
};
