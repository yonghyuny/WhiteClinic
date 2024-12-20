'use client';

import { useState } from 'react';

type UseFormSubmitProps<T> = {
  initialValues: T;
  onSubmit: (data: T) => Promise<any>;
  onSuccess?: () => void;
  validateForm?: (data: T) => boolean; // optional로 변경
};

export const useFormSubmit = <T extends object>({
  initialValues,
  onSubmit,
  onSuccess,
  validateForm = () => true, // 기본값 제공
}: UseFormSubmitProps<T>) => {
  const [formValues, setFormValues] = useState<T>(initialValues);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFieldChange = (fieldName: keyof T, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const resetFormValues = () => {
    setFormValues(initialValues);
    setIsSubmitAttempted(false);
    setError(null);
  };

  const handleSubmit = async () => {
    setIsSubmitAttempted(true);
    if (!validateForm(formValues)) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await onSubmit(formValues);
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        // 성공 시 처리
        onSuccess?.();
        resetFormValues();
      } else {
        // 실패 시 처리
        setError(response.message || '등록 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } catch (error: any) {
      // 예외 처리
      // console.log('실패');
      // setError(error.response?.data.message || '등록 중 오류가 발생했습니다. 다시 시도해 주세요.');
      window.alert('수정 성공');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formValues,
    isSubmitAttempted,
    isLoading,
    error,
    handleFieldChange,
    handleSubmit,
    resetFormValues,
  };
};
