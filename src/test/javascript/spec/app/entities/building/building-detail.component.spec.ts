/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CyberholocampusTestModule } from '../../../test.module';
import { BuildingDetailComponent } from '../../../../../../main/webapp/app/entities/building/building-detail.component';
import { BuildingService } from '../../../../../../main/webapp/app/entities/building/building.service';
import { Building } from '../../../../../../main/webapp/app/entities/building/building.model';

describe('Component Tests', () => {

    describe('Building Management Detail Component', () => {
        let comp: BuildingDetailComponent;
        let fixture: ComponentFixture<BuildingDetailComponent>;
        let service: BuildingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CyberholocampusTestModule],
                declarations: [BuildingDetailComponent],
                providers: [
                    BuildingService
                ]
            })
            .overrideTemplate(BuildingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BuildingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BuildingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Building(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.building).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
