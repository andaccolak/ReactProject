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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const [dragActive, setDragActive] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            await uploadImageToServer(file);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            await uploadImageToServer(file);
        }
    };

    const uploadImageToServer = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch('https://localhost:7240/api/Products/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Dosya yüklenirken bir hata oluştu.');
            }

            const data = await response.json();
            setNewProduct((prev) => ({ ...prev, image: data.url }));

        } catch (error) {
            console.error(error);
            alert('Resim yüklenemedi!');
        }
    };
    // Ürün ekleme
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
        } finally {
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
                <div className='add-product-form'>
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
                            <label>Görsel (Sürükle & Bırak veya Tıkla):<br /></label>
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                style={{
                                    width: '80%',
                                    height: '80px',
                                    border: '2px dashed #ccc',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '5px 0',
                                    backgroundColor: dragActive ? '#f0fff0' : 'transparent',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    document.getElementById('imageFileInput').click();
                                }}
                            >
                                {newProduct.image
                                    ? <img src={newProduct.image} alt="preview" style={{ maxHeight: '70px' }} />
                                    : <p style={{ color: '#555' }}>Dosyayı buraya bırakın veya tıklayın</p>
                                }
                            </div>
                            <input
                                id="imageFileInput"
                                type="file"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleFileChange}
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
                <p style={{ marginLeft: '100px' }}>İsim</p>
                <p style={{ marginLeft: '80px' }}>Fiyat</p>
                <p style={{ marginLeft: '-20px' }}>Stok</p>
                <p style={{ marginLeft: '-30px' }}>Satış</p>
                <p style={{ marginLeft: '-30px' }}>İşlemler</p>
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
