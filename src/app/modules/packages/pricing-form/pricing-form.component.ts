import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ISector } from 'src/app/core/models/sector';
import { IPrice } from 'src/app/core/models/service';
import { SectorService } from 'src/app/services/sector/sector.service';
const ELEMENT_DATA: any[] = [
    {
        countriesCodes: '',
        currencyCode: '',
        sectors: '',
        pricePerMonth: ''
    }
];
@Component({
    selector: 'app-pricing-form',
    templateUrl: './pricing-form.component.html',
    styleUrls: ['./pricing-form.component.scss']
})
export class PricingFormComponent {
    dataSource = new MatTableDataSource<any>([]);
    dataSourceAddPrice = new MatTableDataSource<any>(ELEMENT_DATA);
    emptyData = new MatTableDataSource([{ empty: 'row' }]);
    allColums: string[] = [];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('table') table: MatTable<any>;
    @Output() pricingAction = new EventEmitter();
    @Input() listServicePricings: any[];
    @Input() readOnly: string;
    newPricing!: IPrice;
    addRowPricing = false;
    header: { [keys: string]: string } = {
        countriesCodes: 'Countries',
        currencyCode: 'Currency',
        sectors: 'Activity Sectors',
        pricePerMonth: 'Amount'
    };
    displayedColumns: any;
    showNowRow = false;
    formPricing!: FormGroup;
    listSector: ISector[];
    countries = [{ name: 'France' }, { name: 'Allemagne' }, { name: 'Tunisie' }];
    currencyList = [{ name: 'Dinars' }, { name: 'Dollars' }, { name: 'Euro' }];
    indexToUpdate: number;
    submitted = false;
    rowToUpdate = false;
    constructor(private _sectorServ: SectorService) {}

    ngOnInit(): void {
        this.initiateFormPricing();
        this.getAllSector();
    }

    ngOnChanges(changes: SimpleChanges): void {
      this.dataSource.data = this.listServicePricings;

    }

    initiateFormPricing() {
        this.formPricing = new FormGroup({
            countriesCodes: new FormControl('', [Validators.required]),
            currencyCode: new FormControl('', [Validators.required]),
            pricePerMonth: new FormControl('', [Validators.required]),
            sectors: new FormControl('', [Validators.required])
        });
    }

    getAllSector() {
        this._sectorServ.getAllSector().subscribe((data) => {
            this.listSector = data.result;
        });
    }

    ngAfterViewInit() {
        this.displayedColumns = Object.keys(this.header);
        this.dataSource.sort = this.sort;
        this.allColums = this.readOnly ? this.displayedColumns : this.displayedColumns.concat('actions');
    }
    /** add new row */
    addPackage() {
        this.submitted = false;
        this.formPricing.reset();
        this.addRowPricing = true;
        this.indexToUpdate = -1;
    }
    /** confirm to add row */
    confirmAdd() {
        this.submitted = true;
        if (this.formPricing.invalid) {
            return;
        }
        this.listServicePricings.push(this.formPricing.value);
        this.dataSource.data = this.listServicePricings;
        this.pricingAction.emit(this.listServicePricings);
        this.addRowPricing = false;
    }
    /** Update row */
    updatePricing(index: number, price: IPrice) {
        this.indexToUpdate = index;
        this.formPricing.patchValue(price);
        this.formPricing.get('sectors')?.patchValue(this.getListSectorSelected(price));
        this.rowToUpdate = this.sameObject(price, this.listServicePricings[index]);
        this.addRowPricing = false;
    }
    /** Confirm to update row */
    confirmUpdate(index: number, price: IPrice) {
        this.submitted = true;
        this.indexToUpdate = -1;
        if (this.formPricing.invalid) {
            return;
        }
        let priceToUpdate = price.id ? { id: price.id, ...this.formPricing.value } : this.formPricing.value;
        this.listServicePricings[index] = priceToUpdate;
        this.dataSource.data = this.listServicePricings;
        this.pricingAction.emit(this.listServicePricings);
    }
    /** Delete row */
    deletePrice(index: number) {
        this.listServicePricings.splice(index, 1);
        this.dataSource.data = this.listServicePricings;
        this.pricingAction.emit(this.listServicePricings);
    }
    /** Check if two object has the same value */
    sameObject(objOne: IPrice, objTwo: IPrice) {
        return JSON.stringify(objOne) === JSON.stringify(objTwo);
    }
    /** get sector name */
    getSectorName(idSector: string) {
        let sector = this.listSector.find((x: ISector) => x.id == idSector);
        return sector?.name;
    }

    /** Get list sector selected */
    getListSectorSelected(price: IPrice) {
        let list = this.listSector.filter((x: ISector) => price.sectors.map((y: ISector) => y.id).includes(x.id));
        return list;
    }
}
