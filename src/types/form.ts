import { FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

export interface FormikFormProps<T> {
    initialValues: T;
    validationSchema?: Yup.ObjectSchema<any>;
    onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
    children: (formikProps : FormikProps<T>) => React.ReactNode;
}