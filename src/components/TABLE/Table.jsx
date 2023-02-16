import React, { useState } from 'react'
import { Table, Tag, Badge, Popconfirm, Button, Space, Form, Input, Select, } from "antd";
import './style.css'
import moment from 'moment';
import { SearchOutlined } from "@ant-design/icons"
import Highlighter from 'react-highlight-words';

function Tables() {

    /////////////////////////   STATE'S


    const [grid, setGrid] = useState([]);
    const [editRow, setRow] = useState("");
    const [searchText, setSearchText] = useState("");
    const [form] = Form.useForm();
    const [title, SetTitle] = useState("")
    const [des, setDes] = useState("")
    const [tags, setTags] = useState('')
    const [date, setDate] = useState()
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchColumnText, setSearchColumnText] = useState("")
    const [searchColumn, setSearchColumn] = useState("")
    const [status, setStatus] = useState("OPEN")
    let [filteredData] = useState();
    const { Option, } = Select;

    ////////////////////////////// input section JS

    let change = tags.replace(/\s+/g, ' ').split(' ');

    const clearRec = () => {
        setDate('')
        setTags('')
        SetTitle('')
        setDes('')
    }

    const submitData = () => {

        if (title && des && tags) {



            var timestamp = new Date();
            var dat = timestamp.getFullYear() + '-' + (timestamp.getMonth() + 1) + '-' + timestamp.getDate();
            var time = timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds();
            var dateTime = dat + ' ' + time;

            grid.push({
                "key": grid.length + 1,
                "title": title,
                "description": des,
                "tag": change,
                "timeStamp": dateTime,
                "dueDate": date,
                "status": status
            }
            )

            localData();
            clearRec()
        }
        else {
            alert("Please fill all required field's...")
        }
    }

    const localData = () => {
        setGrid([...grid])

    }

    const handleChange = (...sorter) => {
        const { order, field } = sorter[2];
        setSortedInfo({ columnkey: field, order })
    }

    /////////////// COLUMN SEARCH

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: (
            {
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters
            }
        ) => (
            <div style={{ padding: 0 }}>
                <Input placeholder={`search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={
                        (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 0, display: "block" }}
                />
                <Space>
                    <Button type='primary' onClick={() => handleSearchCol(selectedKeys, confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{ width: 90 }}>Search</Button>
                    <Button type='primary' onClick={() => handleResetCol(clearFilters)} size="small" style={{ width: 90 }}>Reset</Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) => record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : " ",
        render: (text) =>
            searchColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchColumnText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""} />
            ) : (text)
    });

    const handleSearchCol = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchColumnText(selectedKeys[0]);
        setSearchColumn(dataIndex);
    }

    const handleResetCol = (clearFilters) => {
        clearFilters();
        setSearchColumnText("")
    }


    ////////////  columns 

    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            align: "center"
        },

        {
            title: 'Title',
            dataIndex: 'title',
            align: "center",
            editTable: true,
            sorter: (a, b) => a.title.length - b.title.length,
            sortOrder: sortedInfo.columnkey === "title" && sortedInfo.order,
            ...getColumnSearchProps("title")
        },

        {
            title: 'Description',
            dataIndex: 'description',
            align: "center",
            editTable: true,
            sorter: (a, b) => a.description.length - b.description.length,
            sortOrder: sortedInfo.columnkey === "description" && sortedInfo.order,
            ...getColumnSearchProps("description")
        },

        {
            title: 'Tags',
            dataIndex: 'tag',
            editTable: true,
            align: "center",
            ...getColumnSearchProps("tag"),
            render: (tags) => {
                if (Array.isArray(tags)) {
                    return tags.map((tag) => <Tag color="magenta" key={tag}>{tag}</Tag>)
                }

                return (tags.replace(/\s+/g, ' ').split(/[, ]+/)).map((tag) => <Tag color="magenta" key={tag}>{tag}</Tag>)
            },

        },

        {
            title: 'Status',
            dataIndex: 'status',
            align: "center",
            ...getColumnSearchProps("status"),
            render: (text, record) => (
                <Select defaultValue={record.status} style={{ width: 120 }}>
                    <Option value="WORKING">WORKING</Option>
                    <Option value="DONE">DONE</Option>
                    <Option value="OVERDUE">OVERDUE</Option>
                </Select>

            ),
            filters: [
                { text: 'OPEN', value: "OPEN" },
                { text: 'DONE', value: "DONE" }
            ],
            onFilter: (value, record) => {
                return record.status === value
            }
        },

        {
            title: 'TimeStamp',
            dataIndex: 'timeStamp',
            align: "center",
        },

        {
            title: 'DueDate',
            dataIndex: 'dueDate',
            align: "center",
            editTable: true,
            sorter: (a, b) => moment(a.dueDate) - moment(b.dueDate),
            sortOrder: sortedInfo.columnkey === "dueDate" && sortedInfo.order,
        },

        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            render: (_, record) => {
                const editable = isEditing(record)
                return grid.length >= 1 ? (
                    <Space>
                        <Popconfirm title="Are you sure ?" onConfirm={() => handelDelete(record)}>
                            <Button danger type="primary" disabled={editable}>Delete</Button>
                        </Popconfirm>
                        {
                            editable ? (<span>
                                <Space>
                                    <Button onClick={() => save(record.key)}>Save</Button>
                                    <Popconfirm title='Are you Sure ?' onConfirm={cancel}>
                                        <Button >Cancel</Button>
                                    </Popconfirm>
                                </Space>
                            </span>) : (
                                <Button onClick={() => editUser(record)}>Edit</Button>
                            )
                        }
                    </Space>
                ) : null;
            }
        },
    ];

    const handelDelete = (value) => {
        const dataSource = [...grid];
        const filteredData = dataSource.filter((item) => item.key !== value.key
        )

        setGrid(filteredData);
    }

    const isEditing = (record) => {
        return record.key === editRow;
    }

    ///////////////////  EDIT-CANCEL
    const cancel = () => {
        setRow(" ");
    }

    ///////////////////  EDIT-SAVE

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...grid];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setGrid(newData);
                setRow(" ");
            }
        }
        catch (error) {
            console.log("error", error);
        }
    };

    const editUser = (record) => {
        form.setFieldsValue({
            title: " ",
            description: " ",
            tag: [...record.tag],
            dueDate: " ",
            ...record
        })
        setRow(record.key);
    };

    const mergedColumns = columns.map((col) => {
        if (!col.editTable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    })

    const EditableCell = ({ editing, dataIndex, title, record, children, ...restProps }) => {

        const input = <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item name={dataIndex} rules={
                        [{
                            required: true,
                            message: 'please Input some value'
                        }
                        ]
                    } >
                        {input}
                    </Form.Item>
                ) : (children)}
            </td>
        )
    }

    const reset = () => {
        setSortedInfo({});
        setSearchText("");
        localData();
    }

    const handleInputChange = (e) => {
        console.log(e.target.value)
        setSearchText(e.target.value)
        if (e.target.value === "") {
            localData();
        }
    }

    const globalSearch = () => {
        filteredData = grid.filter((value) => {
            return (
                value.title.toLowerCase().includes(searchText.toLowerCase()) ||
                value.description.toLowerCase().includes(searchText.toLowerCase()) ||
                value.tag.toString().toLowerCase().includes(searchText.toLowerCase()) ||
                value.status.toLowerCase().includes(searchText.toLowerCase())
            );
        });
        setGrid(filteredData);
    }

    return (
        <>
            <div>

                <div className="header">
                    <h1>TODO-LIST</h1>
                </div>

                <div className="search">
                    <Space>
                        <Input
                            placeholder='Search here...'
                            onChange={handleInputChange}
                            type="text"
                            allowClear
                            value={searchText} />

                        <Button type='primary' onClick={globalSearch}>Search</Button>
                        <Button type='primary' onClick={reset}>Reset</Button>
                    </Space>
                </div>

                <div className="Inputs">

                    <Form onFinish={submitData} >

                        <Input type="text" className="inputs" id='title' value={title} placeholder='Title here...' maxLength='100' onChange={(e) => { SetTitle(e.target.value) }} />


                        <Input type="text" className="inputs" value={des} placeholder='Description here...' maxLength='1000' onChange={(e) => { setDes(e.target.value) }} />



                        <Input type="date" placeholder='Due-Date here....' value={date} onChange={(e) => { setDate(e.target.value) }} />


                        <Input type="text" className="inputs" value={tags} placeholder='Tags here...' onChange={(e) => { setTags(e.target.value) }} />


                        <div className="Submit-Button">
                            <Form.Item>
                                <Button className="ant-btn" htmlType="submit">
                                   ADD
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>

                </div>
                <Form form={form} component={false}>
                    {
                        grid.length > 0 ? <Table dataSource={filteredData && filteredData.length ? filteredData : grid} columns={mergedColumns} components={
                            { body: { cell: EditableCell, } }
                        }
                            onChange={handleChange}
                        /> : null
                    }
                </Form>


            </div>
        </>
    )
}

export default Tables