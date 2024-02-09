import { computed, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import AppCommonConstants from 'rocket_sidekick_common/constants.js';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';
import ChecklistStepData from 'rocket_sidekick_common/data/checklists/step';
import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';
import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useContentSecurityComponent } from '@/components/content/contentSecurityComponent';
import { useDetailSecondaryComponent } from '@/components/content/detailSecondaryComponent';
import { useLocationsUtilityComponent } from '@/components/content/locations/locationUtilityComponent';
import { useRocketsUtilityComponent } from '@/components/content/rockets/rocketsUtilityComponent';


export function useChecklistComponent(props, context, options) {
const {
correlationId, error, hasFailed, hasSucceeded, initialize, logger, noBreakingSpaces, notImplementedError, success, successResponse, isSaving, serverErrors, setErrors, notifyColor, notifyMessage, notifySignal, notifyTimeout, setNotify, serviceStore, formControlRef, dirty, detailItem, dialogDeleteManager, dialogDeleteMessage, dialogDeleteParams, invalid, canDelete, detailItemData, detailItemTextRows, isDeleting, isEditable, isNew, dialogDeleteCancel, dialogDeleteError, dialogDeleteOk, dialogDeleteOpen, dirtyCallback, invalidCallback, handleCancel, handleClose, handleOk, preCompleteOk, resetAdditional, dialogDeleteSecondaryManager, dialogDeleteSecondaryMessage, dialogDeleteSecondaryParams, dialogEditSecondaryManager, dialogEditSecondaryParams, canAddSecondary, canDeleteSecondary, canEditSecondary, isDeletingSecondary, isEditingSecondary, dialogDeleteSecondaryCancel, dialogDeleteSecondaryError, dialogDeleteSecondaryOk, dialogDeleteSecondaryOpen, dialogEditSecondaryCancel, dialogEditSecondaryError, dialogEditSecondaryOk, dialogEditSecondaryOpen, handleAddSecondary
} = useDetailSecondaryComponent(props, context, {
deleteSecondary: async (correlationIdI, id) => {
LibraryCommonUtility.deleteArrayById(detailItemData.value.steps, id);
return success(correlationId);
},
dialogDeleteMessage: 'checklists.step',
init: (correlationId, value) => {
// detailItemDescription.value = value ? value.description : null;
// detailItemIsDefault.value = value ? value.isDefault : null;
// detailItemName.value = value ? value.name : null;
resetData(correlationId, value);
},
initNewSecondary: async (correlationId) => {
detailItemData.value.stages = detailItemData.value.stages ?? [];
detailItemData.value.stages.push(new ChecklistStepData());
return success(correlationId);
},
preCompleteOk: async (correlationId) => {
setData(correlationId);

const response = await serviceStore.dispatcher.saveChecklist(correlationId, detailItemData.value);
logger.debug('checklistComponent', 'preCompleteOk', 'response', response, correlationId);
return response;
},
resetAdditional: (correlationId, orig) => {
// detailItemDescription.value = orig ? orig.description : null;
// detailItemIsDefault.value = orig ? orig.isDefault : null;
// detailItemName.value = orig ? orig.name : null;
resetData(correlationId, orig);
}
});

const {
isAdmin, isOwner, isPublic, isPublicDisplay, isUser
} = useContentSecurityComponent(props, context);

const {
location, locationIterations, locationIterationName
} = useLocationsUtilityComponent(props, context);

const {
rocketMotorNames
} = useRocketsUtilityComponent(props, context, options);

const {
buttonsDialog, buttonsForms
} = useButtonComponent(props, context);

const dialogDeleteConfirmationManager = ref(new DialogSupport());
const dialogDeleteConfirmationMessage = ref(null);
const dialogDeleteConfirmationParams = ref(null);
const dialogLocationLookupManager = ref(new DialogSupport());
const dialogRocketLookupManager = ref(new DialogSupport());
const dialogRocketSetupLookupManager = ref(new DialogSupport());
const detailItemDate = ref(null);
const detailItemDescription = ref(null);
const detailItemIsDefault = ref(null);
const detailItemLocationId = ref(null);
const detailItemLocationIterationId = ref(null);
const detailItemLocationName = ref(null);
const detailItemName = ref(null);
const detailItemReorder = ref(false);
const detailItemRocketId = ref(null);
const detailItemRocketName = ref(null);
const detailItemRocketSetupId = ref(null);
const detailItemRocketSetupName = ref(null);
const detailitemStatus = ref(null);

const isDefault = computed(() => {
return detailItemData.value ? detailItemData.value.isDefault ?? false : false;
});
const isDefaultEdit = computed(() => {
return isNew.value && isAdmin.value;
});
const isDefaultView = computed(() => {
return isDefault.value;
});
const isInProgress = computed(() => {
return detailItemData.value ? detailItemData.value.statusId === AppCommonConstants.Checklists.ChecklistStatus.inProgress : false;
});
const isShared = computed(() => {
return detailItemData.value ? detailItemData.value.isShared ?? false : false;
});
const statusName = computed(() => {
if (!detailItemData.value)
return null;
if (!detailItemData.value.statusId)
return null;
if (detailItemData.value.statusId == AppCommonConstants.Checklists.ChecklistStatus.completed)
return LibraryClientUtility.$trans.t('forms.content.checklists.completed');
if (detailItemData.value.statusId == AppCommonConstants.Checklists.ChecklistStatus.inProgress)
return LibraryClientUtility.$trans.t('forms.content.checklists.inProgress');
return null;
});
const steps = computed(() => {
return detailItemData.value ? detailItemData.value.steps : [{}];
});
const viewLocation = computed(() => {
if (isDefault.value)
return false;
if (isEditable.value)
return true;

return detailItemLocationId.value;
});
const viewRocket = computed(() => {
if (isDefault.value)
return false;
if (isEditable.value)
return true;

return detailItemRocketId.value;
});
const viewRocketSetup = computed(() => {
if (isDefault.value)
return false;
if (isEditable.value)
return true;

return detailItemRocketSetupId.value;
});

const clickRemoveLocation = async (item) => {
dialogDeleteConfirmationParams.value = { id: detailItemLocationId.value, type: 'location' };
dialogDeleteConfirmationManager.value.open();
};
const clickRemoveRocket = async (item) => {
dialogDeleteConfirmationParams.value = { id: detailItemRocketId.value, type: 'rocket' };
dialogDeleteConfirmationManager.value.open();
};
const clickRemoveRocketSetup = async (item) => {
dialogDeleteConfirmationParams.value = { id: detailItemRocketSetupId.value, type: 'rocketSetup' };
dialogDeleteConfirmationManager.value.open();
};
const clickSearchLocations = async (correlationId) => {
dialogLocationLookupManager.value.open();
};
const clickSearchRockets = async (correlationId) => {
dialogRocketLookupManager.value.open();
};
const clickSearchRocketSetups = async (correlationId) => {
dialogRocketSetupLookupManager.value.open();
};
const clickViewLocation = async (item) => {
if (!item)
return;
LibraryClientUtility.$navRouter.push('/user/locations/' + item.locationId);
};
const clickViewRocket = async () => {
if (!item)
return;
LibraryClientUtility.$navRouter.push('/user/rockets/' + item.rocketId);
};
const clickViewRocketSetup = async () => {
if (!item)
return;
LibraryClientUtility.$navRouter.push('/user/rocketsetups/' + item.rocketSetupId);
};
const dialogDeleteConfirmationCancel = async () => {
try {
dialogDeleteConfirmationManager.value.cancel();
}
finally {
dialogDeleteConfirmationParams.id = null;
}
};
const dialogDeleteConfirmationError = async (err) => {
try {
dialogDeleteConfirmationManager.value.cancel();
}
finally {
dialogDeleteConfirmationParams.id = null;
}
};
const dialogDeleteConfirmationOk = async (correlationId) => {
try {
if (!dialogDeleteConfirmationParams.value.type)
return;

if (dialogDeleteConfirmationParams.value.type === 'location') {
await removeLocation(correlationId);
return;
}
else if (dialogDeleteConfirmationParams.value.type === 'rocket') {
await removeRocket(correlationId);
return;
}
else if (dialogDeleteConfirmationParams.value.type === 'rocketSetup') {
await removeRocketSetup(correlationId);
return;
}
}
finally {
dialogDeleteConfirmationParams.id = null;
dialogDeleteConfirmationManager.value.ok();
}
};
const dialogDeleteConfirmationOpen = (item) => {
if (!item)
return;
if (!canDelete(item)) {
setNotify(correlationId(), 'errors.security');
return;
}

dialogDeleteConfirmationParams.id = item.id;
dialogDeleteConfirmationManager.value.open();
};
const requestLocation = async (correlationId, id) => {
const response = await serviceStore.dispatcher.requestLocationById(correlationId, id);
return hasSucceeded(response) ? response.results : null;
};
const resetData = (correlationId, value) => {
detailItemDate.value = value ? value.date : null;
detailItemDescription.value = value ? value.description : null;
detailItemIsDefault.value = value ? value.isDefault : null;
detailItemName.value = value ? value.name : null;
detailitemStatus.value = value ? value.statusId : null;

if (value && value.location) {
detailItemLocationId.value = value.location.id;
detailItemLocationIterationId.value = value.locationIterationId;
detailItemLocationName.value = value.location.name;
location.value = value.location;
// (async () => {
// 	location.value = await requestLocation(correlationId, value.location.id);
// })();
}
else {
detailItemLocationId.value = null;
detailItemLocationIterationId.value = null;
detailItemLocationName.value = null;
location.value = null;
}

if (value && value.rocketSetup) {
if (value && value.rocketSetup.rocket) {
detailItemRocketId.value = value.rocketSetup.rocket.id;
detailItemRocketName.value = value.rocketSetup.rocket.name;
}
else {
detailItemRocketId.value = null;
detailItemRocketName.value = null;
}

detailItemRocketSetupId.value = value.rocketSetup.id;
detailItemRocketSetupName.value = rocketName(value.rocketSetup);
}
else {
detailItemRocketId.value = null;
detailItemRocketName.value = null;
detailItemRocketSetupId.value = null;
detailItemRocketSetupName.value = null;
}

value.canLaunch = canLaunchI(value);
};
const rocketName = (item) => {
if (!item)
return null;
return item.name ? item.name : rocketMotorNames(item);
};
const removeLocation = async () => {
detailItemLocationId.value = null;
detailItemLocationName.value = null;
location.value = null;
};
const removeRocket = async () => {
detailItemRocketId.value = null;
detailItemRocketName.value = null;
detailItemRocketSetupId.value = null;
detailItemRocketSetupName.value = null;
};
const removeRocketSetup = async () => {
detailItemRocketSetupId.value = null;
detailItemRocketSetupName.value = null;
};
const selectLocation = async (item) => {
try {
if (!item)
return error('useLaunchEditComponent', 'selectPart', 'Invalid item.', null, null, null, correlationId);

detailItemLocationId.value = item.id;
detailItemLocationName.value = item.name;
location.value = await requestLocation(correlationId(), item.id);
}
finally {
dialogLocationLookupManager.value.ok();
}
};
const selectRocket = async (item) => {
try {
if (!item)
return error('useLaunchEditComponent', 'selectRocket', 'Invalid item.', null, null, null, correlationId);

detailItemRocketId.value = item.id;
detailItemRocketName.value = item.name;
}
finally {
dialogRocketLookupManager.value.ok();
}
};
const selectRocketSetup = async (item) => {
try {
if (!item)
return error('useLaunchEditComponent', 'selectRocketSetup', 'Invalid item.', null, null, null, correlationId);

detailItemRocketSetupId.value = item.id;
detailItemRocketSetupName.value = rocketName(item);
}
finally {
dialogRocketSetupLookupManager.value.ok();
}
};
const setData = (correlationId) => {
detailItemData.value.date = detailItemDate.value;
detailItemData.value.description = String.trim(detailItemDescription.value);
detailItemData.value.name = String.trim(detailItemName.value);
delete detailItemData.value.isDefault;

detailItemData.value.locationId = detailItemLocationId.value;
detailItemData.value.locationIterationId = detailItemLocationIterationId.value;

detailItemData.value.rocketId = detailItemRocketId.value;
detailItemData.value.rocketSetupId = detailItemRocketSetupId.value;
};
const updateOrder = async (payload, addedIndex, removedIndex) => {
console.log('updateOrder', payload);
console.log('updateOrder', addedIndex);
console.log('updateOrder', removedIndex);

let item = null;
let steps = detailItemData.value.steps;
for (const id of payload.idChain) {
console.log('updateOrder', id);
item = steps.find(l => l.id == id);
if (item)
steps = item.steps;
}
if (!item)
throw Error('Invalid item in updateOrder...');

console.log('updateOrder', item.steps);
if (item.steps) {
let itemToAdd = payload.item;
if (removedIndex !== null)
itemToAdd = item.steps.splice(removedIndex, 1)[0];

if (addedIndex !== null)
item.steps.splice(addedIndex, 0, itemToAdd);
}
console.log('updateOrder', detailItemData.value);

detailItemReorder.value = !detailItemReorder.value;
};
const updateStatus = async (correlationId, id, status, launch) => {
console.log('updateStatus', id);
console.log('updateStatus', status);

let item = updateStatusFindStep(correlationId, detailItemData.value.steps, id);
if (!item)
throw Error('Invalid item in updateStatus...');

console.log('updateStatus', item.statusId);
item.statusId = status;

if (launch) {
detailItemData.value.launched = true;
detailItemData.value.statusId = AppCommonConstants.Checklists.ChecklistStatus.completed;
}
await formControlRef.value.submit(true);
detailItemData.value.canLaunch = canLaunchI(detailItemData.value);
};
const updateStatusFindStep = (correlationId, steps, id) => {
if (!steps)
return null;

let item = steps.find(l => l.id === id);
if (item)
return item;

for (const temp of steps) {
if (!temp.steps)
continue;

item = updateStatusFindStep(correlationId, temp.steps, id);
if (item)
return item;
}
};

const canLaunchI = (value, depth) => {
depth = depth ?? '';
if (!value)
return false;
// console.log(depth + 'value ' + value.id + ' ' + value.name + ' ' + value.typeId + ' ' + value.statusId + ' ' + (value.steps ? value.steps.length : null));
let results;
for (const temp of value.steps) {
// console.dir(temp);
// console.log(depth + 'temp ' + temp.id + ' ' + temp.name + ' ' + temp.typeId + ' ' + temp.statusId + ' ' + (temp.steps ? temp.steps.length : null));
if ((temp.typeId !== AppCommonConstants.Checklists.ChecklistStepTypes.launch) &&
(temp.typeId !== AppCommonConstants.Checklists.ChecklistStepTypes.section)) {

if (temp.statusId !== AppCommonConstants.Checklists.ChecklistStepStatus.completed) {
// console.log(depth + 'temp ' + temp.id + ' ' + (false));
return false;
}
};

if (temp.steps) {
results = canLaunchI(temp, depth + '\t');
if (!results) {
// console.log(depth + 'temp ' + temp.id + ' ' + (false));
return false;
}
}
}

return true;
};

// const dataModel = ref(
// {
// 	"id":"d99dfilopphpzhss52lmk",
// 	"ownerId": "aeUlOLSfDtwt5glvblEDl",
// 	"typeId":"launch",
// 	"description":"Checklist for dual deploy launch with electronics.",
// 	"isDefault":true,
// 	"name":"Single altimeter dual deploy checklist",
// 	"launchTypeId":"all",
// 	"steps":[
// 		{
// 			"id":"rbl39kuhoyoow0scu0ugx",
// 			"checklistId":"d99dfilopphpzhss52lmk",
// 			"parentId":"d99dfilopphpzhss52lmk",
// 			"description":null,
// 			"name":"Parachutes",
// 			"order":0,
// 			"typeId":"section",
// 			"steps":[
// 				{
// 					"id":"dawadbe7bipktr6gpg9xa",
// 					"checklistId":"d99dfilopphpzhss52lmk",
// 					"parentId":"rbl39kuhoyoow0scu0ugx",
// 					"description":null,
// 					"name":"Drogue",
// 					"order":0,
// 					"typeId":"section",
// 					"steps":[
// 						{
// 							"id":"beb689e3-9949-426a-a21f-3c0b54433fde",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"dawadbe7bipktr6gpg9xa",
// 							"description":null,
// 							"name":"Parachute",
// 							"order":0,
// 							"recoveryTypeId":"drogue",
// 							"stage":1,
// 							"typeId":"preprecovery"
// 						},
// 						{
// 							"id":"mgK2r8RUFom591RtfSLRP",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"dawadbe7bipktr6gpg9xa",
// 							"description":null,
// 							"name":"Swivel",
// 							"order":1,
// 							"typeId":"checkable"
// 						},
// 						{
// 							"id":"wKhiBzwJNkEMJbaKlLsEC",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"dawadbe7bipktr6gpg9xa",
// 							"description":null,
// 							"name":"Attached to Booster",
// 							"order":2,
// 							"typeId":"checkable"
// 						},
// 						{
// 							"id":"brAQ0R1WR07pJnOUrdggK",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"dawadbe7bipktr6gpg9xa",
// 							"description":null,
// 							"name":"Attached to Ebay",
// 							"order":3,
// 							"typeId":"checkable"
// 						}
// 					]
// 				},
// 				{
// 					"id":"Bsuh0ExOxDWttRlZsYCfE",
// 					"checklistId":"d99dfilopphpzhss52lmk",
// 					"parentId":"rbl39kuhoyoow0scu0ugx",
// 					"description":null,
// 					"name":"Main",
// 					"order":1,
// 					"typeId":"section",
// 					"steps":[
// 						{
// 							"id":"WuIjeYdjco10XN4J5n6sD",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"Bsuh0ExOxDWttRlZsYCfE",
// 							"description":null,
// 							"name":"Parachute",
// 							"order":0,
// 							"recoveryTypeId":"main",
// 							"stage":1,
// 							"typeId":"preprecovery"
// 						},
// 						{
// 							"id":"1cSTBFuCdIYRQKkIOlqqY",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"Bsuh0ExOxDWttRlZsYCfE",
// 							"description":null,
// 							"name":"Swivel",
// 							"order":1,
// 							"typeId":"checkable"
// 						},
// 						{
// 							"id":"Lu248swelExRR78yc08kY",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"Bsuh0ExOxDWttRlZsYCfE",
// 							"description":null,
// 							"name":"Attached to Booster",
// 							"order":2,
// 							"typeId":"checkable"
// 						},
// 						{
// 							"id":"3n7ZtJrL5CwFZ3IaSVgR1",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"Bsuh0ExOxDWttRlZsYCfE",
// 							"description":null,
// 							"name":"Attached to Ebay",
// 							"order":3,
// 							"typeId":"checkable"
// 						}
// 					]
// 				}
// 			]
// 		},
// 		{
// 			"id":"rsv6ty3iuc6ufksv4brtz",
// 			"checklistId":"d99dfilopphpzhss52lmk",
// 			"parentId":"d99dfilopphpzhss52lmk",
// 			"description":null,
// 			"name":"Altimeters",
// 			"order":1,
// 			"typeId":"section",
// 			"steps":[
// 				{
// 					"id":"q0blesvp87pcgmci3plcd",
// 					"checklistId":"d99dfilopphpzhss52lmk",
// 					"parentId":"rsv6ty3iuc6ufksv4brtz",
// 					"description":null,
// 					"name":"Primary",
// 					"order":0,
// 					"typeId":"section",
// 					"steps":[
// 						{
// 							"id":"Lhr4fGKROWIQLrcELZ7Be",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"q0blesvp87pcgmci3plcd",
// 							"description":null,
// 							"name":"Insert Flag",
// 							"order":0,
// 							"typeId":"checkable"
// 						},
// 						{
// 							"id":"Kqu6sUv4NRAlFQbXOqdJk",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"q0blesvp87pcgmci3plcd",
// 							"description":null,
// 							"name":"Altimeter Setup/On",
// 							"order":0,
// 							"altimeterTypeId":"primary",
// 							"stage":1,
// 							"typeId":"prepaltimeter"
// 						},
// 						{
// 							"id":"PORdna3HxOWQ1tyfAd5lC",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"q0blesvp87pcgmci3plcd",
// 							"description":null,
// 							"name":"Drogue",
// 							"order":1,
// 							"typeId":"section",
// 							"steps":[
// 								{
// 									"id":"99DHiHO3q9gFk3FFFHfbr",
// 									"checklistId":"d99dfilopphpzhss52lmk",
// 									"parentId":"PORdna3HxOWQ1tyfAd5lC",
// 									"description":null,
// 									"name":"Ejection Charge Installed",
// 									"order":2,
// 									"stage":1,
// 									"altimeterTypeId":"primary",
// 									"altimeterRecoveryTypeId":"drogue",
// 									"typeId":"prepejectioncharge"
// 								},
// 								{
// 									"id":"f9NXOC0yftR9fFkktZmcn",
// 									"checklistId":"d99dfilopphpzhss52lmk",
// 									"parentId":"PORdna3HxOWQ1tyfAd5lC",
// 									"description":null,
// 									"name":"Ejection Ignitor Installed",
// 									"order":3,
// 									"typeId":"checkable"
// 								}
// 							]
// 						},
// 						{
// 							"id":"AL98xm8URij9tNACObjII",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"q0blesvp87pcgmci3plcd",
// 							"description":null,
// 							"name":"Main",
// 							"order":2,
// 							"typeId":"section",
// 							"steps":[
// 								{
// 									"id":"5HE89BND0fbMIsCe1iY2D",
// 									"checklistId":"d99dfilopphpzhss52lmk",
// 									"parentId":"AL98xm8URij9tNACObjII",
// 									"description":null,
// 									"name":"Ejection Charge Installed",
// 									"order":2,
// 									"stage":1,
// 									"altimeterTypeId":"primary",
// 									"altimeterRecoveryTypeId":"main",
// 									"typeId":"prepejectioncharge"
// 								},
// 								{
// 									"id":"41CgM6AhrXaSpjoTHQRYQ",
// 									"checklistId":"d99dfilopphpzhss52lmk",
// 									"parentId":"AL98xm8URij9tNACObjII",
// 									"description":null,
// 									"name":"Ejection Ignitor Installed",
// 									"order":3,
// 									"typeId":"checkable"
// 								}
// 							]
// 						}
// 					]
// 				}
// 			]
// 		},
// 		{
// 			"id":"bnCzGw59ysJM3mirxUl1b",
// 			"checklistId":"d99dfilopphpzhss52lmk",
// 			"parentId":"d99dfilopphpzhss52lmk",
// 			"description":null,
// 			"name":"Staging",
// 			"order":2,
// 			"typeId":"section",
// 			"steps":[
// 				{
// 					"id":"RGtjdhxfv4YFmQALvQL8X",
// 					"checklistId":"d99dfilopphpzhss52lmk",
// 					"parentId":"bnCzGw59ysJM3mirxUl1b",
// 					"description":null,
// 					"name":"Booster Shear Pins",
// 					"order":0,
// 					"typeId":"checkable"
// 				},
// 				{
// 					"id":"xOiEwG3zDEe25vi310svM",
// 					"checklistId":"d99dfilopphpzhss52lmk",
// 					"parentId":"bnCzGw59ysJM3mirxUl1b",
// 					"description":null,
// 					"name":"Payload Shear Pins",
// 					"order":1,
// 					"typeId":"checkable"
// 				}
// 			]
// 		},
// 		{
// 			"id":"ir3OrnoQtiQ9K5gmVyyu2",
// 			"checklistId":"d99dfilopphpzhss52lmk",
// 			"parentId":"d99dfilopphpzhss52lmk",
// 			"description":null,
// 			"name":"Motor",
// 			"order":3,
// 			"typeId":"section",
// 			"steps":[
// 				{
// 					"id":"6knZ8K51Mr01APl23CwDg",
// 					"checklistId":"d99dfilopphpzhss52lmk",
// 					"parentId":"ir3OrnoQtiQ9K5gmVyyu2",
// 					"description":null,
// 					"name":"Insert Motor(s)",
// 					"order":0,
// 					"stage":1,
// 					"typeId":"prepmotor"
// 				},
// 				{
// 					"id":"7X3c1eZ5mWJtfYlwH916B",
// 					"checklistId":"d99dfilopphpzhss52lmk",
// 					"parentId":"ir3OrnoQtiQ9K5gmVyyu2",
// 					"description":null,
// 					"name":"Attach Retainer",
// 					"order":1,
// 					"typeId":"checkable"
// 				},
// 				{
// 					"id":"2gcpnhp5TJRlnNRLVyTYa",
// 					"checklistId":"d99dfilopphpzhss52lmk",
// 					"parentId":"ir3OrnoQtiQ9K5gmVyyu2",
// 					"description":null,
// 					"name":"Tape Ignitor(s) to Booster",
// 					"order":2,
// 					"typeId":"checkable"
// 				}
// 			]
// 		},
// 		{
// 			"id":"giKKMtKFwGOvQvh8DtRS0",
// 			"checklistId":"d99dfilopphpzhss52lmk",
// 			"parentId":"d99dfilopphpzhss52lmk",
// 			"description":null,
// 			"name":"Tracking",
// 			"order":4,
// 			"typeId":"section",
// 			"steps":[
// 				{
// 					"id":"Sdc9mGoOqmvi2mSuDzy12",
// 					"checklistId":"d99dfilopphpzhss52lmk",
// 					"parentId":"giKKMtKFwGOvQvh8DtRS0",
// 					"description":null,
// 					"name":"Primary",
// 					"order":0,
// 					"typeId":"section",
// 					"steps":[
// 						{
// 							"id":"VqC1ESUewsImYevX5Bf50",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"Sdc9mGoOqmvi2mSuDzy12",
// 							"description":null,
// 							"name":"GPS On",
// 							"order":1,
// 							"typeId":"checkable"
// 						},
// 						{
// 							"id":"H5sesqAUMIR4gpaBLEVTh",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"Sdc9mGoOqmvi2mSuDzy12",
// 							"description":null,
// 							"name":"Ground Station On",
// 							"order":2,
// 							"typeId":"checkable"
// 						},
// 						{
// 							"id":"BvJ5VXG4A1S180AX9TTQC",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"giKKMtKFwGOvQvh8DtRS0",
// 							"description":null,
// 							"name":"Verify Tracking",
// 							"order":3,
// 							"typeId":"checkable"
// 						},
// 						{
// 							"id":"EeKKtOecuN3BfZBVrMmx6",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"giKKMtKFwGOvQvh8DtRS0",
// 							"description":null,
// 							"name":"Installed",
// 							"order":3,
// 							"typeId":"checkable"
// 						}
// 					]
// 				},
// 				{
// 					"id":"uRZ5855rd9ONqAggyziw4",
// 					"checklistId":"d99dfilopphpzhss52lmk",
// 					"parentId":"giKKMtKFwGOvQvh8DtRS0",
// 					"description":null,
// 					"name":"Secondary",
// 					"order":2,
// 					"typeId":"section",
// 					"steps":[
// 						{
// 							"id":"l1pUrcjqtmZJgqmOzrGTY",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"uRZ5855rd9ONqAggyziw4",
// 							"description":null,
// 							"name":"GPS On",
// 							"order":1,
// 							"typeId":"checkable"
// 						},
// 						{
// 							"id":"OpnzyTKTZ03xdTUymy1jZ",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"uRZ5855rd9ONqAggyziw4",
// 							"description":null,
// 							"name":"Ground Station On",
// 							"order":2,
// 							"typeId":"checkable"
// 						},
// 						{
// 							"id":"57PUdBQm4QsMDSNC2JTKo",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"uRZ5855rd9ONqAggyziw4",
// 							"description":null,
// 							"name":"Verify Tracking",
// 							"order":3,
// 							"typeId":"checkable"
// 						},
// 						{
// 							"id":"OWRdFKjO5nGbuXAdUPIvc",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"uRZ5855rd9ONqAggyziw4",
// 							"description":null,
// 							"name":"Installed",
// 							"order":3,
// 							"typeId":"checkable"
// 						}
// 					]
// 				}
// 			]
// 		},
// 		{
// 			"id":"eX8QXlJdMGcyHgBoYvBZS",
// 			"checklistId":"d99dfilopphpzhss52lmk",
// 			"parentId":"d99dfilopphpzhss52lmk",
// 			"description":null,
// 			"name":"Camera",
// 			"order":5,
// 			"typeId":"section",
// 			"steps":[
// 				{
// 					"id":"6dCQYI1sWMxKEHggNXeAw",
// 					"checklistId":"d99dfilopphpzhss52lmk",
// 					"parentId":"eX8QXlJdMGcyHgBoYvBZS",
// 					"description":null,
// 					"name":"Turn On",
// 					"order":0,
// 					"typeId":"checkable"
// 				},
// 				{
// 					"id":"EgCp3OUHqhN2Do8IGkdJa",
// 					"checklistId":"d99dfilopphpzhss52lmk",
// 					"parentId":"eX8QXlJdMGcyHgBoYvBZS",
// 					"description":null,
// 					"name":"Install",
// 					"order":1,
// 					"typeId":"checkable"
// 				}
// 			]
// 		},
// 		{
// 			"id":"oR4mN06IZgfBf31rL64SB",
// 			"checklistId":"d99dfilopphpzhss52lmk",
// 			"parentId":"d99dfilopphpzhss52lmk",
// 			"description":null,
// 			"name":"On Rail",
// 			"order":7,
// 			"typeId":"section",
// 			"steps":[
// 				{
// 					"id":"zeXMLWoVeeCM2JIcigjyC",
// 					"checklistId":"d99dfilopphpzhss52lmk",
// 					"parentId":"oR4mN06IZgfBf31rL64SB",
// 					"description":null,
// 					"name":"Primary",
// 					"order":0,
// 					"typeId":"section",
// 					"steps":[
// 						{
// 							"id":"QMqlCiioFPveEqGq4b6Z8",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"zeXMLWoVeeCM2JIcigjyC",
// 							"description":null,
// 							"name":"Pull flag",
// 							"order":0,
// 							"typeId":"checkable"
// 						},
// 						{
// 							"id":"HcLjAsaNsyXZhzfNkvKCf",
// 							"checklistId":"d99dfilopphpzhss52lmk",
// 							"parentId":"zeXMLWoVeeCM2JIcigjyC",
// 							"description":null,
// 							"name":"Verify arming",
// 							"order":1,
// 							"typeId":"checkable"
// 						}
// 					]
// 				}
// 			]
// 		},
// 		{
// 			"id":"81zwFFizbzSY5uDYczDvu",
// 			"checklistId":"d99dfilopphpzhss52lmk",
// 			"parentId":"d99dfilopphpzhss52lmk",
// 			"description":null,
// 			"name":"Launch",
// 			"order":8,
// 			"typeId":"Launch"
// 		}
// 	]
// });
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
successResponse,
isSaving,
serverErrors,
setErrors,
notifyColor,
notifyMessage,
notifySignal,
notifyTimeout,
setNotify,
serviceStore,
formControlRef,
dirty,
detailItem,
dialogDeleteManager,
dialogDeleteMessage,
dialogDeleteParams,
invalid,
canDelete,
detailItemData,
detailItemTextRows,
isDeleting,
isEditable,
isNew,
dialogDeleteCancel,
dialogDeleteError,
dialogDeleteOk,
dialogDeleteOpen,
dirtyCallback,
invalidCallback,
handleCancel,
handleClose,
handleOk,
preCompleteOk,
resetAdditional,
dialogDeleteSecondaryManager,
dialogDeleteSecondaryMessage,
dialogDeleteSecondaryParams,
dialogEditSecondaryManager,
dialogEditSecondaryParams,
canAddSecondary,
canDeleteSecondary,
canEditSecondary,
isDeletingSecondary,
isEditingSecondary,
dialogDeleteSecondaryCancel,
dialogDeleteSecondaryError,
dialogDeleteSecondaryOk,
dialogDeleteSecondaryOpen,
dialogEditSecondaryCancel,
dialogEditSecondaryError,
dialogEditSecondaryOk,
dialogEditSecondaryOpen,
handleAddSecondary,
buttonsDialog,
buttonsForms,
dialogDeleteConfirmationManager,
dialogDeleteConfirmationMessage,
dialogDeleteConfirmationParams,
dialogLocationLookupManager,
dialogRocketLookupManager,
dialogRocketSetupLookupManager,
detailItemDate,
detailItemDescription,
detailItemIsDefault,
detailItemLocationId,
detailItemLocationIterationId,
detailItemLocationName,
detailItemName,
detailItemReorder,
detailItemRocketId,
detailItemRocketName,
detailItemRocketSetupId,
detailItemRocketSetupName,
isDefault,
isDefaultEdit,
isDefaultView,
isInProgress,
isShared,
locationIterations,
steps,
viewLocation,
viewRocket,
viewRocketSetup,
clickRemoveLocation,
clickRemoveRocket,
clickRemoveRocketSetup,
clickSearchLocations,
clickSearchRockets,
clickSearchRocketSetups,
clickViewLocation,
clickViewRocket,
clickViewRocketSetup,
dialogDeleteConfirmationCancel,
dialogDeleteConfirmationError,
dialogDeleteConfirmationOk,
dialogDeleteConfirmationOpen,
removeLocation,
removeRocket,
removeRocketSetup,
selectLocation,
selectRocket,
selectRocketSetup,
updateOrder,
updateStatus,
scope: 'ChecklistControl',
validation: useVuelidate({ $scope: 'ChecklistControl' })
};
}
