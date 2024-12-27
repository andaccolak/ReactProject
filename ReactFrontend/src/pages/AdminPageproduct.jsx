import '../css/admin.css';
import Product from '../components/adminproduct';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../redux/slices/productSlice';
import { CiCirclePlus } from "react-icons/ci";

function AdminPageproduct() {
    const dispatch = useDispatch();
    const { filteredProducts } = useSelector((state) => state.product);
    const [currentPage] = useState(1);
    const productsPerPage = 16;

    const [showForm, setShowForm] = useState(false); // Form görünürlüğünü kontrol eden state
    const [newProduct, setNewProduct] = useState({
        productName: '',
        price: '',
        description: '',
        image: '',
        categoryId: '',
        categoryName: '',
        brand: '',
        salesType: '',
        sales: '',
        quantity: '',

    });

    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = async () => {
        try {
            const response = await fetch('https://localhost:7240/api/Products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productName: newProduct.productName,
                    price: parseFloat(newProduct.price),
                    description: newProduct.description,
                    image: newProduct.image,
                    categoryID: parseInt(newProduct.categoryId, 10),
                    categoryName: newProduct.categoryName,
                    brand: newProduct.brand,
                    salesType: newProduct.salesType,
                    sales: parseInt(newProduct.sales, 10),
                    quantity: parseInt(newProduct.quantity, 10),
                }),
            });

            if (response.ok) {
                alert('Ürün başarıyla eklendi.');
                setShowForm(false);
                setNewProduct({
                    productName: '',
                    price: '',
                    description: '',
                    image: '',
                    categoryId: '',
                    categoryName: '',
                    brand: '',
                    salesType: '',
                    sales: '',
                    quantity: '',
                });
                dispatch(getAllProduct());
            } else {
                alert('Ürün eklenirken bir hata oluştu.');
            }
        } catch (error) {
            console.error('Ürün ekleme sırasında bir hata oluştu:', error);
            alert('Ürün ekleme işlemi başarısız oldu.');
        }
        finally {
            window.location.reload();
        }
    };


    return (
        <div style={{ marginLeft: '80px' }}>
            <div className='admin-page-title-div'>
                <h1 className='admin-page-title'>Ürün Yönetimi</h1>
                <button
                    style={{
                        alignSelf: 'center',
                        fontSize: '10px',
                        color: 'green',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                    }}
                    onClick={() => setShowForm(!showForm)}
                >
                    <h1 style={{ fontSize: '20px', margin: 0 }}>Ürün Ekle</h1>
                    <CiCirclePlus style={{ fontSize: '30px' }} />
                </button>
            </div>

            {showForm && (
                <div className='add-product-form'
                    style={{

                    }}
                >
                    <h2 style={{ marginBottom: '10px' }}>Yeni Ürün Ekle</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '10px' }}>
                        <div style={{ width: 'calc(50% - 10px)', minWidth: '200px' }}>
                            <label>Ürün Adı:<br /></label>
                            <input

                                type="text"
                                name="productName"
                                value={newProduct.productName}
                                onChange={handleInputChange}
                                style={{ width: '80%', padding: '5px', margin: '5px ' }}
                            />
                        </div>
                        <div style={{ width: 'calc(50% - 10px)', minWidth: '200px' }}>
                            <label>Fiyat:<br /></label>
                            <input
                                type="number"
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                style={{ width: '80%', padding: '5px', margin: '5px 0' }}
                            />
                        </div>
                        <div style={{ width: 'calc(50% - 10px)', minWidth: '200px' }}>
                            <label>Açıklama:<br /></label>
                            <textarea
                                type="text"
                                name="description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                                style={{ width: '80%', padding: '5px', margin: '5px 0' }}
                            />
                        </div>
                        <div style={{ width: 'calc(50% - 10px)', minWidth: '200px' }}>
                            <label>Görsel:<br /></label>
                            <input
                                type="text"
                                name="image"
                                value={newProduct.image}
                                onChange={handleInputChange}
                                style={{ width: '80%', padding: '5px', margin: '5px 0' }}
                            />
                        </div>
                        <div style={{ width: 'calc(50% - 10px)', minWidth: '200px' }}>
                            <label>CategoryId:<br /></label>
                            <input
                                type="number"
                                name="categoryId"
                                value={newProduct.categoryId}
                                onChange={handleInputChange}
                                style={{ width: '80%', padding: '5px', margin: '5px 0' }}
                            />
                        </div>
                        <div style={{ width: 'calc(50% - 10px)', minWidth: '200px' }}>
                            <label>Kategori İsmi:<br /></label>
                            <input
                                type="text"
                                name="categoryName"
                                value={newProduct.categoryName}
                                onChange={handleInputChange}
                                style={{ width: '80%', padding: '5px', margin: '5px 0' }}
                            />
                        </div>
                        <div style={{ width: 'calc(50% - 10px)', minWidth: '200px' }}>
                            <label>Marka:<br /></label>
                            <input
                                type="text"
                                name="brand"
                                value={newProduct.brand}
                                onChange={handleInputChange}
                                style={{ width: '80%', padding: '5px', margin: '5px 0' }}
                            />
                        </div>
                        <div style={{ width: 'calc(50% - 10px)', minWidth: '200px' }}>
                            <label>Satış Tipi:<br /></label>
                            <input
                                type="text"
                                name="salesType"
                                value={newProduct.salesType}
                                onChange={handleInputChange}
                                style={{ width: '80%', padding: '5px', margin: '5px 0' }}
                            />
                        </div>
                        <div style={{ width: 'calc(50% - 10px)', minWidth: '200px' }}>
                            <label>Toplam Satış:<br /></label>
                            <input
                                type="text"
                                name="sales"
                                value={newProduct.sales}
                                onChange={handleInputChange}
                                style={{ width: '80%', padding: '5px', margin: '5px 0' }}
                            />
                        </div>
                        <div style={{ width: 'calc(50% - 10px)', minWidth: '200px' }}>
                            <label>Stok:<br /></label>
                            <input
                                type="text"
                                name="quantity"
                                value={newProduct.quantity}
                                onChange={handleInputChange}
                                style={{ width: '80%', padding: '5px', margin: '5px 0' }}
                            />
                        </div>


                    </div>



                    <button
                        onClick={handleAddProduct}
                        style={{
                            backgroundColor: 'green',
                            color: 'white',
                            padding: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Ürünü Ekle
                    </button>
                </div>
            )}

            <div className='list'>
                <p style={{ marginLeft: '60px' }}>Görsel</p>
                <p>İsim</p>
                <p style={{ marginLeft: '40px' }}>Fiyat</p>
                <p style={{ marginLeft: '35px' }}>Stok</p>
                <p style={{ marginLeft: '30px' }}>Satış</p>
                <p style={{ marginRight: '50px' }}>İşlemler</p>
            </div>

            <div className='product-pages'>
                <div className='flex-row' style={{ flexWrap: 'wrap', marginTop: '25px' }}>
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <Product key={product.productID} product={product} />
                        ))
                    ) : (
                        <p style={{ fontWeight: 'bold', fontSize: '25px', color: 'white' }}>
                            Aradığınız ürün bulunamadı.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminPageproduct;
