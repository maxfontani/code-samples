import * as yup from 'yup';
import { FORM_TAGS } from './constants';

export const VALIDATION_SHEMA = yup.object().shape({
	[FORM_TAGS.START_DATE]: yup.string().required('Required field'),
	[FORM_TAGS.END_DATE]: yup.string().required('Required field'),
});
