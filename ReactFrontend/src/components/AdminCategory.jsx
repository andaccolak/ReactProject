import React, { useState } from "react";
import CategoryService from "../services/CategoryService";
import '../css/admin.css'
const AdminCategory = () => {
    const [categories, setCategories] = useState([]);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState("");

    React.useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        CategoryService.getAllCategories()
            .then((data) => setCategories(data))
            .catch((error) => console.error(error));
    };

    const handleAddCategory = () => {
        if (!newCategoryName.trim()) {
            alert("Kategori adı boş olamaz");
            return;
        }
        CategoryService.createCategory({ categoryName: newCategoryName })
            .then(() => {
                alert("Kategori başarıyla eklendi");
                setNewCategoryName("");
                fetchCategories();
            })
            .catch((error) => console.error(error));
    };

    const handleUpdateCategory = (categoryID, newCategoryName) => {

        if (!newCategoryName.trim()) {
            alert("Kategori adı boş olamaz");
            return;
        }
        CategoryService.updateCategory({
            categoryID,
            categoryName: newCategoryName,
        })
            .then(() => {
                alert("Kategori başarıyla güncellendi");
                setEditingCategoryId(null);
                fetchCategories();
            })
            .catch((error) => console.error(error));
    };

    const handleDeleteCategory = (categoryID) => {
        if (!window.confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return;

        CategoryService.deleteCategory(categoryID)
            .then(() => {
                alert("Kategori başarıyla silindi");
                fetchCategories();
            })
            .catch((error) => console.error(error));
    };

    return (
        <div style={{ backgroundColor: 'lightgray', border: '3px solid black' }}>

            <div style={{ display: 'flow' }}>

                <input style={{ fontSize: '25px', marginTop: '50px', marginLeft: '20px', borderRadius: '10px' }}
                    type="text"
                    placeholder="Yeni kategori Ekle"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <br />
                <button style={{ borderRadius: '10px', fontSize: '25px', margin: '10px', marginLeft: '140px', cursor: 'pointer' }} onClick={handleAddCategory}>Ekle</button>
            </div>

            <div>
                <h2 style={{ marginLeft: '95px' }}>Kategori Listesi</h2>
                <ul className="category-list">
                    {categories.map((category) => (
                        <li key={category.categoryID} className="category-item">
                            {editingCategoryId === category.categoryID ? (
                                <input
                                    type="text"
                                    defaultValue={category.categoryName}
                                    onBlur={(e) => handleUpdateCategory(category.categoryID, e.target.value)}
                                    autoFocus
                                    className="category-input"
                                />
                            ) : (
                                <span className="category-name">{category.categoryName}</span>
                            )}
                            <button
                                className="category-btn edit-button"
                                onClick={() =>
                                    setEditingCategoryId(editingCategoryId === category.categoryID ? null : category.categoryID)
                                }
                            >
                                {editingCategoryId === category.categoryID ? "Kaydet" : "Düzenle"}
                            </button>
                            {editingCategoryId !== category.categoryID && (
                                <button
                                    className="category-btn delete-button"
                                    onClick={() => handleDeleteCategory(category.categoryID)}
                                >
                                    Sil
                                </button>)}

                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
};

export default AdminCategory;
