import { FormikFormProps } from "../../../types/form";
import { Formik, Form } from 'formik';

import { FormikValues } from 'formik';
import { View } from "react-native";

export const FormikForm = <T extends FormikValues>({
    initialValues,
    validationSchema,
    onSubmit,
    children,
}: FormikFormProps<T>) => {
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