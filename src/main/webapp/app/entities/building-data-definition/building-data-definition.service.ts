import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BuildingDataDefinition } from './building-data-definition.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BuildingDataDefinition>;

@Injectable()
export class BuildingDataDefinitionService {

    private resourceUrl =  SERVER_API_URL + 'api/building-data-definitions';

    constructor(private http: HttpClient) { }

    create(buildingDataDefinition: BuildingDataDefinition): Observable<EntityResponseType> {
        const copy = this.convert(buildingDataDefinition);
        return this.http.post<BuildingDataDefinition>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(buildingDataDefinition: BuildingDataDefinition): Observable<EntityResponseType> {
        const copy = this.convert(buildingDataDefinition);
        return this.http.put<BuildingDataDefinition>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BuildingDataDefinition>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BuildingDataDefinition[]>> {
        const options = createRequestOption(req);
        return this.http.get<BuildingDataDefinition[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BuildingDataDefinition[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BuildingDataDefinition = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BuildingDataDefinition[]>): HttpResponse<BuildingDataDefinition[]> {
        const jsonResponse: BuildingDataDefinition[] = res.body;
        const body: BuildingDataDefinition[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BuildingDataDefinition.
     */
    private convertItemFromServer(buildingDataDefinition: BuildingDataDefinition): BuildingDataDefinition {
        const copy: BuildingDataDefinition = Object.assign({}, buildingDataDefinition);
        return copy;
    }

    /**
     * Convert a BuildingDataDefinition to a JSON which can be sent to the server.
     */
    private convert(buildingDataDefinition: BuildingDataDefinition): BuildingDataDefinition {
        const copy: BuildingDataDefinition = Object.assign({}, buildingDataDefinition);
        return copy;
    }
}
