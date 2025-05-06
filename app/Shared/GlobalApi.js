import { create } from 'apisauce'

// define the api
const api = create({
  baseURL: 'https://strapi-server-app-m49w.onrender.com/api',
  headers: { 
    "X-API-Key":"8ae838dd57bba37fc8e09221a5131f86b9f55c6b9bc616182088fb499bf0815d1e47e386cd280483cb76ab0c4958890048afaaf5220d61fad87e90cf45808a038fb066e671c1a2710ff128ab02b32fe3a466bc862778295ee756e71116d26b4a8430099e9ecfd01be65a00082e9c228be35f63c0b097284aadeb677618294578"
    
 },
})

const getClass=()=>api.get('/classes?populate=*');

const getHomework=()=>api.get("/homeworks?populate=*");

const getEvent=()=>api.get("/events?populate=*")

const getAuthenticatedUser = (token) => 
  api.get("/users/me", {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

const getHomeworkById= (id) => {
    return axiosInstance.get(`/homeworks/${id}?populate=*`);
};

export default{
    getClass,
    getHomework,
    getEvent,
    getAuthenticatedUser,
    getHomeworkById
}