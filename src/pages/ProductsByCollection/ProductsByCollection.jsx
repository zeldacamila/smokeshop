import React from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Spiner } from '../../components/Spiner/Spiner'

const ProductsByCollection = () => {

  const [products, setProducts] = useState([])
  let collection = useParams();
  const [loading, setLoading] = useState(false);

  console.log('collection de params:', collection.collection)

  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:8081/api/products'
    ).then((res) => {
      const allProducts = res.data.data
      console.log('allproducts:', allProducts)
    
      const productsByCollection = allProducts.filter(function (item) {
        return item.collectionName === collection.collection
      })
      console.log('productsByCollection', productsByCollection)
      
      setProducts(productsByCollection)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div className='productsByCollection-container'>
      <p className='advertising'>Envíos gratis por compras superiores a 200.000 COP</p>
      <h1 className='animate__animated animate__fadeInLeft'>{collection.collection}</h1>
      <div className='CollectionProductsCards-container'>
        {loading ? <Spiner /> : (products.map((item) => {
          return(
            <ProductCard
              productImage1={item.productImage1}
              productImage2={item.productImage2}
              collectionName={item.collectionName}
              productName={item.name}
              productPrice={item.price} />
          )}))}
      </div>
    </div>
  )
}

export default ProductsByCollection