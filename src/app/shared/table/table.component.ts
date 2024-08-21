import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IButtonAction } from 'src/app/core/models/button-actions';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
    value: any; // Ajoutez cette ligne
    options: any[]; // Ajoutez cette ligne
    displayedColumns: string[] = [];
    @Input() allData: any[];
    @Input() exportName: string;
    @Input() header: { [keys: string]: string };
    @Output() addElement = new EventEmitter();
    @Input() actionButtons: IButtonAction;
    @Input() totalLength: number;
    dataSource = new MatTableDataSource<unknown>([]);
    allColums: string[] = [];
    @Input() pageSize: number;
    pageNumber: number = 1;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    datePipe = new DatePipe('en-US');
    @Output() editUser = new EventEmitter<any>();
    @Output() editIOTdevice = new EventEmitter<any>();
    @Output() editRow = new EventEmitter<any>();
    @Input() showselection: boolean = false;
    @Output() selectionChange = new EventEmitter<string>();
    @Input() listoptionMapped: any;
    @Input() listoptionlicensestatus: any;
    @Input() listoptioncountry: any;
    @Input() listoptioncountryMapped: any;
    @Output() overviewAction = new EventEmitter<any>();
    @Input() showFiltre: boolean = false;
    @Output() deleteRow = new EventEmitter<any>();
    @Output() onSearch = new EventEmitter<any>();
    @Output() paginationAction = new EventEmitter<PageEvent>();
    @Output() enableUser = new EventEmitter<any>();
    @Output() setStatus = new EventEmitter<any>();
    @Output() readOnly = new EventEmitter<any>();

    searchValue: string;
    constructor() { }
    ngOnChanges(changes: SimpleChanges): void {
        this.dataSource.data = this.allData;
        this.totalLength;
        // this.dataSource.paginator = this.paginator;
    }
    onSelectionChange(event: any) {
        const selectedValue = event.target.value; // Access the selected value
        this.selectionChange.emit(selectedValue);
    }
    ngAfterViewInit() {
        this.displayedColumns = Object.keys(this.header);
        this.allColums = this.displayedColumns.concat('actions');

        this.dataSource.sort = this.sort;
    }

    exportexcel(): void {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.allData);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        let date = this.datePipe.transform(new Date(), 'dd-MM-yyyy_HH:mm:ss');
        console.log(wb);
        XLSX.writeFile(wb, this.exportName + '_' + date + '.xlsx');
    }

    exportPdf() {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [this.header],
            body: this.allData
        });
        let date = this.datePipe.transform(new Date(), 'dd-MM-yyyy_HH:mm:ss');
        doc.save(this.exportName + '_' + date + '.pdf');
    }
    isObject(val: any) { return typeof val === 'object'; }

    triggerEditElement(user: any): void {
        this.editRow.emit(user);
    }

    enable(id: string): void {
        this.enableUser.emit(id);
    }

    triggerEditIOTdevice(IOTdevice: any): void {
        this.editRow.emit(IOTdevice);
    }

    triggerOverViewElement(element:any) {
        this.overviewAction.emit(element);
    }

    triggerDeleteElement(element: any): void {
        this.deleteRow.emit(element);
    }

    triggerSetStatus(element: any) {
        this.setStatus.emit(element);
    }
    search(event: any) {
        this.onSearch.emit(event);
    }

    onPageChange(event: PageEvent): void {
        this.paginationAction.emit(event);
    }

    triggerReadOnly(element : any){
      this.readOnly.emit(element)
    }
}
