import React, { useEffect, useState } from 'react';
import { Space, Table, Image, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { IProduct } from '../../types/products';


const ProductManagementPage = (prors) => {
  

  const [currentData, setCurrentData] = useState(prors.products)

  useEffect(() => {
    setCurrentData(
      prors.products.map((pro) => {
        return { ...pro, key: pro._id };
      })
    );
  }, [prors]);

  const deletePro = (id) => {
    // const confirm = window.confirm('Ban co chac khong !');
    // if (confirm) {
    //
    // }
    prors.onRemove(id);
  };
  interface DataType {
    key: string;
    id: number;
    name: string;
    image: string;
    price: number;
    desc: string;
    categoryId: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image width={200} src={image} />,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Desc',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Category ',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (_, record) => <a href="">{record.categoryId?.name}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" danger onClick={() => deletePro(record?._id)}>
            Delete
          </Button>
          <Button type="primary">
            <Link to={'/admin/products/' + record?._id + '/update'}>Update</Link>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <a href="/admin/products/add">Add Product</a>
      <Table columns={columns} dataSource={currentData} />
    </div>
  );
};
export default ProductManagementPage;
