import { FormikForm } from "../common/formik/FormikForm"
import { RegisterRequest } from "../../types"
import { FormikFormProps } from "../../types/form"

export const RegisterForm = ({
    initialValues,
    validationSchema,
    onSubmit,
    children,
} : FormikFormProps<RegisterRequest>) => {
    return (
        <FormikForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formikProps) => (
                children(formikProps)
            )}
        </FormikForm>
    )
}