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
    const productsPerPage = 6;
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

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
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
            setErrors((prev) => ({ ...prev, image: '' }));

        } catch (error) {
            console.error(error);
            alert('Resim yüklenemedi!');
        }
    };

    const validateForm = () => {
        const {
            productName,
            price,
            description,
            image,
            categoryId,
            categoryName,
            brand,
            salesType,
            sales,
            quantity,
        } = newProduct;

        let formErrors = {};

        if (!productName.trim()) formErrors.productName = 'Ürün adı gerekli.';
        if (!price) {
            formErrors.price = 'Fiyat gerekli.';
        } else if (isNaN(price) || parseFloat(price) <= 0) {
            formErrors.price = 'Geçerli bir fiyat giriniz.';
        }
        if (!description.trim()) formErrors.description = 'Açıklama gerekli.';
        if (!image.trim()) formErrors.image = 'Görsel gerekli.';
        if (!categoryId) {
            formErrors.categoryId = 'Kategori ID gerekli.';
        } else if (isNaN(categoryId) || parseInt(categoryId, 10) <= 0) {
            formErrors.categoryId = 'Geçerli bir kategori ID giriniz.';
        }
        if (!categoryName.trim()) formErrors.categoryName = 'Kategori ismi gerekli.';
        if (!brand.trim()) formErrors.brand = 'Marka gerekli.';
        if (!salesType.trim()) formErrors.salesType = 'Satış tipi gerekli.';
        if (!sales) {
            formErrors.sales = 'Satış miktarı gerekli.';
        } else if (isNaN(sales) || parseInt(sales, 10) < 0) {
            formErrors.sales = 'Geçerli bir satış miktarı giriniz.';
        }
        if (!quantity) {
            formErrors.quantity = 'Stok miktarı gerekli.';
        } else if (isNaN(quantity) || parseInt(quantity, 10) < 0) {
            formErrors.quantity = 'Geçerli bir stok miktarı giriniz.';
        }

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    };

    const handleAddProduct = async () => {
        if (!validateForm()) {
            return;
        }

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
                setErrors({});
                dispatch(getAllProduct());
                if ((currentPage - 1) * productsPerPage >= filteredProducts.length) {
                    setCurrentPage(currentPage - 1 > 0 ? currentPage - 1 : 1);
                }
            } else {
                const errorData = await response.json();
                alert(`Ürün eklenirken bir hata oluştu: ${errorData.message || 'Bilinmeyen hata.'}`);
            }
        } catch (error) {
            console.error('Ürün ekleme sırasında bir hata oluştu:', error);
            alert('Ürün ekleme işlemi başarısız oldu.');
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    style={{
                        margin: '0 5px',
                        padding: '5px 10px',
                        border: 'none',
                        borderRadius: '3px',
                        backgroundColor: i === currentPage ? '#5e6cc4f6' : '#f0f0f0',
                        color: i === currentPage ? 'white' : 'black',
                        cursor: 'pointer'
                    }}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div style={{ marginRight: 'auto', marginLeft: 'auto', justifyContent: 'center', display: 'flex', maxWidth: '1500px' }}>
            <div style={{ width: '350px', marginLeft: '0px' }}>
                <AdminCategory />
            </div>
            <div className='admin-products'>
                <div className='admin-page-title-div'>
                    <h1 style={{ fontSize: '50px', fontWeight: '900', color: 'black' }} className='admin-page-title'>Ürün Yönetimi</h1>
                    <button
                        style={{
                            alignSelf: 'center',
                            fontSize: '10px',
                            color: 'green',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '5px', cursor: 'pointer'

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
                                {errors.productName && <span className="error">{errors.productName}</span>}
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
                                {errors.price && <span className="error">{errors.price}</span>}
                            </div>
                            <div style={{ width: 'calc(50% - 10px)', minWidth: '200px' }}>
                                <label>Açıklama:<br /></label>
                                <textarea
                                    name="description"
                                    value={newProduct.description}
                                    onChange={handleInputChange}
                                    style={{ width: '80%', padding: '5px', margin: '5px 0' }}
                                />
                                {errors.description && <span className="error">{errors.description}</span>}
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
                                        position: 'relative',
                                    }}
                                    onClick={() => {
                                        document.getElementById('imageFileInput').click();
                                    }}
                                >
                                    {newProduct.image
                                        ? <img src={newProduct.image} alt="preview" style={{ maxHeight: '70px' }} />
                                        : <p style={{ color: '#555' }}>Dosyayı buraya bırakın veya tıklayın</p>
                                    }
                                    {errors.image && <span className="error" style={{ position: 'absolute', bottom: '-20px', left: '0' }}>{errors.image}</span>}
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
                                {errors.categoryId && <span className="error">{errors.categoryId}</span>}
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
                                {errors.categoryName && <span className="error">{errors.categoryName}</span>}
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
                                {errors.brand && <span className="error">{errors.brand}</span>}
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
                                {errors.salesType && <span className="error">{errors.salesType}</span>}
                            </div>
                            <div style={{ width: 'calc(50% - 10px)', minWidth: '200px' }}>
                                <label>Toplam Satış:<br /></label>
                                <input
                                    type="number"
                                    name="sales"
                                    value={newProduct.sales}
                                    onChange={handleInputChange}
                                    style={{ width: '80%', padding: '5px', margin: '5px 0' }}
                                />
                                {errors.sales && <span className="error">{errors.sales}</span>}
                            </div>
                            <div style={{ width: 'calc(50% - 10px)', minWidth: '200px' }}>
                                <label>Stok:<br /></label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={newProduct.quantity}
                                    onChange={handleInputChange}
                                    style={{ width: '80%', padding: '5px', margin: '5px 0' }}
                                />
                                {errors.quantity && <span className="error">{errors.quantity}</span>}
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
                    <p className='list-p' style={{ marginLeft: '20px' }}>Görsel</p>
                    <p className='list-p' style={{ marginLeft: '170px' }}>İsim</p>
                    <p className='list-p' style={{ marginLeft: '165px' }}>Fiyat</p>
                    <p className='list-p' style={{ marginLeft: '55px' }}>Stok</p>
                    <p className='list-p' style={{ marginLeft: '45px' }}>Satış</p>
                    <p className='list-p' style={{ marginLeft: '15px' }}>İşlemler</p>
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

                {totalPages > 1 && (
                    <div className='pagination' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            style={{
                                margin: '0 5px',
                                padding: '5px 10px',
                                border: 'none',
                                borderRadius: '3px',
                                backgroundColor: currentPage === 1 ? '#ccc' : '#5e6cc4f6',
                                color: 'white',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Önceki
                        </button>
                        {renderPageNumbers()}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            style={{
                                margin: '0 5px',
                                padding: '5px 10px',
                                border: 'none',
                                borderRadius: '3px',
                                backgroundColor: currentPage === totalPages ? '#ccc' : '#5e6cc4f6',
                                color: 'white',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Sonraki
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminPageproduct;
