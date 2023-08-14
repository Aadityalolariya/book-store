import axios from "axios";

const API_URL = "https://book-e-sell-node-api.vercel.app/api/category";

class Categories {
  GetAllCategories = async () => {
    try {
      const dataFetched = (await axios.get(`${API_URL}/all`)).data;
      let categoryList = [];
      dataFetched.result.forEach((element) => {
        categoryList.push({ category: element.name, categoryId: element.id });
      });
      console.log(categoryList);
      return categoryList;
    } catch (error) {
      console.log(error);
      return [error];
    }
  };

  AddCategory = async (category) => {
    try {
      const dataFetched = (await axios.post(API_URL, { name: category })).data;
      return dataFetched.result;
    } catch (error) {
      console.log(error);
    }
  };

  UpdateCategory = async (categoryId, categoryName) => {
    try {
      const dataFetched = (
        await axios.put(API_URL, {
          id: categoryId,
          name: categoryName,
        })
      ).data.result;
      return dataFetched;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new Categories();
