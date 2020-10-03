import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class ProductsUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: '',
            image: '',
            price: '',
            category: '',
        }
    }

    handleChangeInputTitle = async event => {
        const title = event.target.value
        this.setState({ title })
    }

    handleChangeInputImage = async event => {
        const image = event.target.value
        this.setState({ image })
    }

    handleChangeInputPrice = async event => {
        const price = event.target.value
        this.setState({ price })
    }

    handleChangeInputCategory = async event => {
        const category = event.target.value
        this.setState({ category })
    }

    handleUpdateProduct = async () => {
        const { id, title, image, price, category } = this.state
        const payload = { title, image, price, category }

        await api.updateProductById(id, payload).then(res => {
            window.alert(`Product updated successfully`)
            this.setState({
                title: '',
                image: '',
                price: '',
                category: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const product = await api.getProductById(id)

        this.setState({
            title: product.data.data.title,
            image: product.data.data.image,
            price: product.data.data.price,
            category: product.data.data.category,
        })
    }

    render() {
        const { title, image, price, category } = this.state
        return (
            <Wrapper>
                <Title>Update Product</Title>

                <Label>Title: </Label>
                <InputText
                    type="text"
                    value={title}
                    onChange={this.handleChangeInputTitle}
                />

                <Label>Image: </Label>
                <InputText
                    type="text"
                    value={image}
                    onChange={this.handleChangeInputImage}
                />

                <Label>Price: </Label>
                <InputText
                    type="text"
                    value={price}
                    onChange={this.handleChangeInputPrice}
                />

                <Label>Category: </Label>
                <InputText
                    type="text"
                    value={category}
                    onChange={this.handleChangeInputCategory}
                />

                <Button onClick={this.handleUpdateProduct}>Update Product</Button>
                <CancelButton href={'/products/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default ProductsUpdate
