import axios from "axios";

const baseURL = "https://mock.apidog.com/m1/464592-0-default";

export interface ResponseArray<T> {
    success: string;
    message: string;
    data: Array<T>;
}

export interface ResponseData<T> {
    success: string;
    message: string;
    data: T;
}

export interface UserInterface{
    id?:number;
    firstName: string;
    lastName: string;
    imageUrl: string;
    email: string;
    phoneNumber: string;
}

export interface News {
    id?:number;
    title: string;
    description: string;
    content: string;
    author: string;
    published_at: string;
    imageUrl: string;
}

export async function getUsers(): Promise<UserInterface[]> {
    const response = await axios.get<ResponseArray<UserInterface>>(`${baseURL}/users`);
    return response.data.data;
}

export async function createUser(user: UserInterface):Promise<ResponseData<null>>{
    const response =  await axios.post<ResponseData<null>>(`${baseURL}/users`, user);
    return response.data;
}

export async function getUser(userId: string):Promise<UserInterface> {
    const response = await axios.get<ResponseData<UserInterface>>(`${baseURL}/users/${userId}`);
    return response.data.data;
}

export async function updateUser(usedId:number, user: UserInterface):Promise<ResponseData<null>>{
    const response =  await axios.put<ResponseData<null>>(`${baseURL}/users/${usedId}`, user);
    return response.data;
}

export async function deleteUser(userId: number):Promise<ResponseData<null>> {
    const response =  await axios.delete<ResponseData<null>>(`${baseURL}/users/${userId}`);
    return response.data;
}

export async function getNews(): Promise<News[]> {
    const response = await axios.get<ResponseArray<News>>(`${baseURL}/news`);
    return response.data.data;
}

export async function getDetailNews(newsId: string):Promise<News> {
    const response = await axios.get<ResponseData<News>>(`${baseURL}/news/${newsId}`);
    return response.data.data;
}

export const getDateFormat = (published_at: string): string => {
    const date = new Date(published_at);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    return `${monthNames[monthIndex]} ${day.toString().padStart(2, '0')}, ${year}`;
  }