import { LOADING } from './../interceptors/service.interceptor';
import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

const API = environment.api

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(URL:string, params?:any, loading: boolean=true):Observable<any>{

    const httpParams = new HttpParams({fromObject:params})

    return this.http.get<any>(API+URL,{params:httpParams, context: new HttpContext().set(LOADING,loading)})//Informe o interceptor se vai ou n utilizar o loading padrão
  }

  getBlob(URL: string,params?:any,loading: boolean = true){
		const options = {
			context: new HttpContext().set(LOADING, loading),
			responseType: 'blob' as 'json',
		  };
		return this.http.get<any>(API + URL,options)
	}

  post(URL:string, body?:any, loading: boolean=true){

    return this.http.post(API+URL, body,{context: new HttpContext().set(LOADING,loading)})
  }
  postStream(URL:string, body:any, loading: boolean=true){
    const options:any = {
			context: new HttpContext().set(LOADING, loading),
			responseType: 'text'
		  };
    return this.http.post(API+URL, body, options)
  }
  put(URL:string, body:any,loading: boolean=true){

    return this.http.put(API+URL, body,{context: new HttpContext().set(LOADING,loading)})
  }

  delete(URL:string){

    return this.http.delete(API+URL)
  }

}
