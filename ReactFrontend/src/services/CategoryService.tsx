import axios, { AxiosResponse } from "axios";

class CategoryService {
    BASE_URL = "https://colakandac.com.tr/api";

    // GET
    getAllCategories(): Promise<{ categoryID: string; categoryName: string }[]> {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.BASE_URL}/Category/list`)
                .then((response: AxiosResponse) => resolve(response.data))
                .catch((error) => reject(error));
        });
    }

    // GETByCategory
    getProductsByCategoryName(categoryName: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.BASE_URL}/Product/category/${categoryName}`)
                .then((response: AxiosResponse) => resolve(response.data))
                .catch((error) => reject(error));
        });
    }

    // POST
    createCategory(category: { categoryName: string }): Promise<{ message: string }> {
        return new Promise((resolve, reject) => {
            axios
                .post(`${this.BASE_URL}/Category`, category)
                .then((response: AxiosResponse) => resolve(response.data))
                .catch((error) => reject(error));
        });
    }

    // PUT
    updateCategory(category: { categoryID: string; categoryName: string }): Promise<{ message: string }> {
        return new Promise((resolve, reject) => {
            axios
                .put(`${this.BASE_URL}/Category`, category)
                .then((response: AxiosResponse) => resolve(response.data))
                .catch((error) => reject(error));
        });
    }

    // DELETE
    deleteCategory(categoryID: string): Promise<{ message: string }> {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${this.BASE_URL}/Category/${categoryID}`)
                .then((response: AxiosResponse) => resolve(response.data))
                .catch((error) => reject(error));
        });
    }
}

export default new CategoryService();
