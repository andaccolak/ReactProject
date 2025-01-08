import '../css/admin.css';
import Product from '../components/adminproduct';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../redux/slices/productSlice';
import { CiCirclePlus } from "react-icons/ci";
import AdminCategory from '../components/AdminCategory';

function AdminPageproduct() {
    const dispatch = useDispatch();
    const { filteredProducts } = useSelector((state) => state.product);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;
    const [showForm, setShowForm] = useState(false);

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

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
    };

    return (
        <div style={{ marginRight: 'auto', marginLeft: 'auto', justifyContent: 'center', display: 'flex', maxWidth: '1500px' }}>
            <div style={{ width: '350px', marginLeft: '0px' }}>
                <AdminCategory />
            </div>
            <div className='admin-products'>
                <div className='admin-page-title-div'>
                    <h1 style={{ fontSize: '50px', fontWeight: '900', color: 'white' }} className='admin-page-title'>Ürün Yönetimi</h1>
                    <button
                        style={{
                            alignSelf: 'center',
                            fontSize: '10px',
                            color: 'green',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '5px', cursor: 'pointer', marginRight: '10px'
                        }}
                        onClick={() => setShowForm(!showForm)}
                    >
                        <h1 style={{ fontSize: '20px', margin: '10px' }}>Ürün Ekle</h1>
                        <CiCirclePlus style={{ fontSize: '30px' }} />
                    </button>
                </div>

                {showForm && (
                    <div className='add-product-form'>
                        <h2 style={{ marginBottom: '10px' }}>Yeni Ürün Ekle</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '10px' }}>
                            {/* Form inputları burada */}
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
                    </div>
                )}

                <div className='list'>
                    <p className='list-p' style={{ marginLeft: '20px' }}>Görsel</p>
                    <p className='list-p' style={{ marginLeft: '150px' }}>İsim</p>
                    <p className='list-p' style={{ marginLeft: '170px' }}>Fiyat</p>
                    <p className='list-p' style={{ marginLeft: '70px' }}>Stok</p>
                    <p className='list-p' style={{ marginLeft: '30px' }}>Satış</p>
                    <p className='list-p' style={{ marginLeft: '20px' }}>İşlemler</p>
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
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPageproduct;
