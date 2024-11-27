import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
// ATableHeaderProps 타입 정의
type ATableHeaderProps = {
  [key: string]: string; // 각 헤더의 텍스트 레이블
};
// ATableHeader 컴포넌트 정의
const ATableHeader = (props: ATableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        {/* 각 헤더 텍스트 레이블을 순회하며 TableHead로 렌더링 */}
        {Object.entries(props).map(([key, label]) => (
          <TableHead key={key} className="text-center">
            {label} {/* 헤더 텍스트 표시 */}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};
export default ATableHeader;
