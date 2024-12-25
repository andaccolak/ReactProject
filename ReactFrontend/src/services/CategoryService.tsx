import axios, { AxiosResponse } from "axios";

class CategoryService {
    BASE_URL = "https://localhost:7240/api";

    getAllCategories(): Promise<{ categoryID: string; categoryName: string }[]> {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.BASE_URL}/Category/list`)
                .then((response: AxiosResponse) => resolve(response.data))
                .catch((error) => reject(error));
        });
    }

    getProductsByCategoryName(categoryName: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.BASE_URL}/Product/category/${categoryName}`)
                .then((response: AxiosResponse) => resolve(response.data))
                .catch((error) => reject(error));
        });
    }
}

export default new CategoryService();
