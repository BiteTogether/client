import { FormikFormProps } from "../../../types/form"
import { FormikForm } from "../../../components/common/formik/FormikForm"
import { NewPostRequest } from "../../../types/feed"


export const NewPostForm = ({
    initialValues,
    validationSchema,
    onSubmit,
    children,
} : FormikFormProps<NewPostRequest>) => {
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