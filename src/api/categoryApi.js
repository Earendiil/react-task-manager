import axiosClient from "./axiosClient";

export const getAllCategories = async (categoryData) => {
    const response = await axiosClient.get("/categories/");
    return response.data;
}

export const addCategory = async(categoryData) => {
    const response = await axiosClient.post("/categories/create", categoryData);
    return response.data;
}

export const updateCategory = async( categoryId, categoryData) =>{
    const response = await axiosClient.put(`/categories/update/${categoryId}` , categoryData);
    return response.data;
}

export const deleteCategory = async(categoryId) => {
    const response = await axiosClient.delete(`categories/delete${categoryId}`);
    return response.data;
}