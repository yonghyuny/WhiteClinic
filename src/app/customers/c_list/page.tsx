'use client';

import { useEffect, useState } from 'react';
import api from '@/utils/axios';
import FilterTable from '@/components/organism/FilterTable/FiterTable';

// 회원관리 리스트보기
type CustomerListInfo = {
  orderDate: string;
  customerName: string;
  customerPhone: string;
  customerAddr: string;
  customerRemark?: string;
  engineerName: string;
  orderProduct: string;
  orderPayment: string;
  orderReceiptDocs: string;
  receiptDocsIssued: boolean;
};

// 테이블 헤더 설정
const headers = {
  orderDate: '예약일',
  customerName: '이름',
  customerPhone: '전화번호',
  customerAddr: '주소',
  customerRemark: '특이사항',
  engineerName: '담당기사님',
  orderProduct: '청소품목',
  orderPayment: '결제방식',
  orderRecieptDocs: '증빙서류',
  receiptDocsIssued: '영수증 발행여부',
};

// 고객 데이터의 열 키 설정
const customerColumns: Array<keyof CustomerListInfo> = [
  'orderDate',
  'customerName',
  'customerPhone',
  'customerAddr',
  'customerRemark',
  'engineerName',
  'orderProduct',
  'orderPayment',
  'orderReceiptDocs',
  'receiptDocsIssued',
];

// 데이터 변환 함수 날짜형식
const transformCustomerData = (data: CustomerListInfo[]): CustomerListInfo[] => {
  return data
    .map((item) => ({
      ...item,
      orderDate: item.orderDate.split(' ')[0], // 시간 제거
    }))
    .sort((a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()); // 예약일 기준 정렬
};

const Page = () => {
  const [customerData, setCustomerData] = useState<CustomerListInfo[]>([]); // 고객 데이터 상태

  // 고객 데이터를 API에서 가져오는 함수
  const fetchCustomerData = async () => {
    try {
      const response = await api.get<CustomerListInfo[]>('/order-info/getAllOrderDetails'); // API 호출
      const transformedData = transformCustomerData(response.data); // 데이터 변환 및 정렬
      setCustomerData(transformedData); // 상태 업데이트
      console.log('Transformed and Sorted Data:', transformedData); // 변환된 데이터 확인
    } catch (error) {
      console.error('고객 데이터 로드 에러:', error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 API 호출
  useEffect(() => {
    fetchCustomerData();
  }, []);

  return (
    <div>
      <FilterTable
        headers={headers}
        data={customerData}
        columns={customerColumns}
        placeholder="고객 정보를 검색하세요"
      />
    </div>
  );
};

export default Page;
