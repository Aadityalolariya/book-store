import axios from "axios";

const API_URL = "https://book-e-sell-node-api.vercel.app/api/category";


class Categories {
    GetAllCategories = async () => {
        try {
            const dataFetched = (await axios.get(`${API_URL}/all`)).data;
            let categoryList = [];
            dataFetched.result.forEach((element) => {
                categoryList.push({category : element.name, categoryId : element.id});
            });
            return categoryList;
        } catch (error) {
            console.log(error);
            return [error];
        }

    }
}

export default new Categories();