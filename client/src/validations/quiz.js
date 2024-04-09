import * as Yup from 'yup';

export const quizValidation = Yup?.object({
  title: Yup?.string().trim().required('This field is required!'),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup?.string().trim().required('This field is required!'),
        options: Yup.array()
          .of(
            Yup.object().shape({
              option: Yup?.string().trim().required('This field is required!'),
              isCorrect: Yup?.boolean().required('This field is required!'),
            })
          )
          .required('Options are required')
          .min(1, 'Add miminum of 1 option')
          .max(5, 'Add maximum of 5 options')
          .test((value, context) => {
            let notAllSelected = true;
            value?.forEach((option) => {
              if (option?.isCorrect) notAllSelected = false;
            });
            if (notAllSelected) {
              return new Yup.ValidationError(
                'Please mark at least one answer as correct',
                undefined,
                context?.path
              );
            }
            return true;
          }),
      })
    )
    .required('Questions are required')
    .min(1, 'Add minimum of 1 questions')
    .max(10, 'Add maximum of 10 questions'),
});
