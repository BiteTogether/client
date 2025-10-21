import { Formik, FormikValues } from 'formik';

import { FormikFormProps } from "../../../types/form";


export const FormikForm = <T extends FormikValues>({
    initialValues,
    validationSchema,
    onSubmit,
    children,
} : FormikFormProps<T>) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {(formikProps) => (
                children(formikProps)
            )}
        </Formik>
    );
}