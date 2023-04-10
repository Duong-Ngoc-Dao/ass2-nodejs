import { Table, Space, Button, Tag, Image, Input } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICategory } from "../../types/category";

interface IProps {
    data: ICategory[],
    onRemoveCate(id: string): void
}
interface ICategoryKey extends ICategory {
    key?: string
}

function CategoryManager(props: IProps) {
    const { data, onRemoveCate } = props
    const [currentData, setCurrentData] = useState<ICategoryKey[]>(data)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: any, b: any) => a.name.length - b.name.length
        },
        {
            title: 'Products',
            key: 'products',
            render: (_: any, record: any) => (
                <Space size="middle">
                    {record.products.map((prd: any) => (
                        <Tag>{prd.name}</Tag>
                    ))}
                </Space>
            ),
        },
      
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button type="text" danger><Link to={"/admin/category/"+record._id+"/update/"  }>Update</Link></Button>
                    <Button type="primary" danger onClick={() => onRemoveCate(record._id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        const newArr: ICategoryKey[] = data?.map(cate => {
            let item: ICategoryKey = { ...cate, key: cate._id }
            return item
        })
        setCurrentData(newArr)
    }, [data])

    return (
        <div className="products">
            <h1>Categories Manager</h1>
            <a href="/admin/category/add"><button>AddCategory</button></a>
            <Table dataSource={currentData} columns={columns} />
            
            {/* <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(item => (
                        <tr key={item.id}>
                            <th>{item.id}</th>
<td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => onRemove(item.id)}>Delete</button>
                                <button>
                                    <Link to={"/admin/edit_product/" + item.id}>Edit</Link>
                                </button>
                                <button>
                                    <Link to={"/products/" + item.id}>View</Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
}

export default CategoryManager;
