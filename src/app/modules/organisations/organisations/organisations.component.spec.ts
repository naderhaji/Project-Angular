import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganisationsComponent } from './organisations.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { OrganisationsService } from 'src/app/services/organisations/organisations.service';
import { of } from 'rxjs';

describe('OrganisationsComponent', () => {
  let component: OrganisationsComponent;
  let fixture: ComponentFixture<OrganisationsComponent>;
  let mockOrganisationService: jasmine.SpyObj<OrganisationsService>;

  beforeEach(() => {
    mockOrganisationService = jasmine.createSpyObj('OrganisationsService', ['getOrganisations']);

    TestBed.configureTestingModule({
      declarations: [OrganisationsComponent],
      imports: [MatTableModule],
      providers: [
        { provide: OrganisationsService, useValue: mockOrganisationService }
      ]
    });

    fixture = TestBed.createComponent(OrganisationsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set up the paginator in ngAfterViewInit', () => {
    component.paginator = new MatPaginator();
    component.ngAfterViewInit();
    expect(component.dataSource.paginator).toBe(component.paginator);
  });

  it('should fetch organisations on ngOnInit', () => {
    const mockOrganisationsResponse = {
      resultat: {
        companys: [
          // Add sample data here if needed
        ]
      }
    };

    mockOrganisationService.getOrganisations.and.returnValue(of(mockOrganisationsResponse));

    component.ngOnInit();

    expect(mockOrganisationService.getOrganisations).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockOrganisationsResponse.resultat.companys);
  });
});
