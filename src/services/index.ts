import http from "@/http-common";
import CatPreviewModel from "@/models/CatPreviewModel";
import CatDetailModel from "@/models/CatDetailModel";

class CatDataService {
  getAllBreeds(): Promise<any> {
    return http.get("/v1/breeds");
  }

  getBreedById(data: any): Promise<CatPreviewModel> {
    return http.get(
      `v1/images/search?page=${data.page}&limit=${data.limit}&breed_id=${data.id}`
    );
  }

  getCatDetailById(id: string): Promise<CatDetailModel> {
    return http.get(`https://api.thecatapi.com/v1/images/${id}`);
  }

  //   create(data: any): Promise<any> {
  //     return http.post("/tutorials", data);
  //   }

  //   update(id: any, data: any): Promise<any> {
  //     return http.put(`/tutorials/${id}`, data);
  //   }

  //   delete(id: any): Promise<any> {
  //     return http.delete(`/tutorials/${id}`);
  //   }

  //   deleteAll(): Promise<any> {
  //     return http.delete(`/tutorials`);
  //   }

  //   findByTitle(title: string): Promise<any> {
  //     return http.get(`/tutorials?title=${title}`);
  //   }
}

export default new CatDataService();
