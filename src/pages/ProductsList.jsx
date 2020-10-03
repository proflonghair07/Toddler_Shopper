import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateProduct extends Component {
    updateProduct = event => {
        event.preventDefault()

        window.location.href = `/products/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateProduct}>Update</Update>
    }
}

class DeleteProduct extends Component {
    deleteProduct = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the product ${this.props.id} permanently?`,
            )
        ) {
            api.deleteProductById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteProduct}>Delete</Delete>
    }
}

class ProductsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllProducts().then(products => {
            this.setState({
                products: products.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { products, isLoading } = this.state

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Title',
                accessor: 'title',
                filterable: true,
            },
            {
                Header: 'Image',
                accessor: 'image',
                filterable: true,
            },
            {
                Header: 'Price',
                accessor: 'price',
                filterable: true,
            },
            {
                Header: 'Category',
                accessor: 'category',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteProduct id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateProduct id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!products.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={products}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default ProductsList
