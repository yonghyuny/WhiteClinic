import ShaText from '@/components/atom/Text/ShaText';
import ShaInput from '@/components/atom/Input/ShaInput';
import ShaCheckbox from '@/components/atom/CheckBox/ShaCheckBox';

export type PaymentProps = {
  totalAmount: number;
  finalPayment: number;
  isEditing: boolean; // 수정
  isChecked: boolean; // 지급여부
  onFinalPaymentChange: (value: number) => void;
  onCheckboxChange: (checked: boolean) => void; // 체크 상태 변경함수
};

// PaymentDetails 컴포넌트 정의
const PaymentDetails = ({
  totalAmount,
  finalPayment,
  isEditing,
  isChecked,
  onFinalPaymentChange,
  onCheckboxChange,
}: PaymentProps) => (
  <>
    {/* 총 지급액 표시 */}
    <div className="flex items-center">
      <ShaText text="합계 금액:" isBold size="small" />
      <ShaText text={`${(totalAmount ?? 0).toLocaleString()}원`} size="small" className="ml-2" />
    </div>

    {/* 최종 지급액 표시 또는 편집 */}
    <div className="flex items-center">
      <ShaText text="수당금액:" isBold size="small" />
      {isEditing ? (
        <ShaInput
          type="number"
          value={finalPayment.toString()} // number 타입을 string으로 변환하여 ShaInput에 전달
          onChange={(value) => onFinalPaymentChange(Number(value))} // string 값을 number로 변환하여 onFinalPaymentChange에 전달
          size="small"
          className="ml-2 p-1 border rounded"
        />
      ) : (
        <ShaText text={`${(finalPayment ?? 0).toLocaleString()}원`} size="small" className="ml-2" />
      )}
    </div>

    {/* 지급 여부 체크박스 */}
    <div className="flex items-center gap-2">
      <ShaText text="지급여부:" isBold size="small" />
      <ShaCheckbox isChecked={isChecked} onChange={onCheckboxChange} />
    </div>
  </>
);

export default PaymentDetails;
