import React, { useState } from "react";
import CategoryService from "../services/CategoryService";

const AdminCategory = () => {
    const [categories, setCategories] = useState([]);
    const [updateCategoryName, setUpdateCategoryName] = useState("");
    const [editingCategoryId, setEditingCategoryId] = useState(null);

    React.useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        CategoryService.getAllCategories()
            .then((data) => setCategories(data))
            .catch((error) => console.error(error));
    };

    const handleAddCategory = () => {
        if (!updateCategoryName.trim()) {
            alert("Kategori adı boş olamaz");
            return;
        }
        CategoryService.createCategory({ categoryName: updateCategoryName })
            .then(() => {
                alert("Kategori başarıyla eklendi");
                setUpdateCategoryName("");
                fetchCategories();
            })
            .catch((error) => console.error(error));
    };

    const handleUpdateCategory = () => {
        if (!updateCategoryName.trim()) {
            alert("Kategori adı boş olamaz");
            return;
        }
        CategoryService.updateCategory({
            categoryID: editingCategoryId,
            categoryName: updateCategoryName,
        })
            .then(() => {
                alert("Kategori başarıyla güncellendi");
                setEditingCategoryId(null);
                setUpdateCategoryName("");
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
        <div>
            <h1>Admin Panel - Kategoriler</h1>

            <div>
                <h2>Kategori Ekle</h2>
                <input
                    type="text"
                    placeholder="Yeni kategori adı"
                    value={updateCategoryName}
                    onChange={(e) => setUpdateCategoryName(e.target.value)}
                />
                <button onClick={handleAddCategory}>Ekle</button>
            </div>

            <div>
                <h2>Kategori Listesi</h2>
                <ul>
                    {categories.map((category) => (
                        <li key={category.categoryID}>
                            {category.categoryName}
                            <button
                                onClick={() => {
                                    setEditingCategoryId(category.categoryID);
                                    setUpdateCategoryName(category.categoryName);
                                }}
                            >
                                Düzenle
                            </button>
                            <button onClick={() => handleDeleteCategory(category.categoryID)}>
                                Sil
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {editingCategoryId && (
                <div>
                    <h2>Kategori Güncelle</h2>
                    <input
                        type="text"
                        placeholder="Yeni kategori adı"
                        value={updateCategoryName}
                        onChange={(e) => setUpdateCategoryName(e.target.value)}
                    />
                    <button onClick={handleUpdateCategory}>Güncelle</button>
                    <button onClick={() => {
                        setEditingCategoryId(null);
                        setUpdateCategoryName("");
                    }}>İptal</button>
                </div>
            )}
        </div>
    );
};

export default AdminCategory;