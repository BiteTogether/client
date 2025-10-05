import { FormikForm } from "../../../components/common/formik/FormikForm"
import { LoginRequest } from "../../../types"
import { FormikFormProps } from "../../../types/form"


export const LoginForm = ({
    initialValues,
    validationSchema,
    onSubmit,
    children,
} : FormikFormProps<LoginRequest>) => {
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