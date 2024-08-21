import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IFeature } from 'src/app/core/models/feature';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { ModuleService } from 'src/app/services/packages/module/module.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { PricingFormComponent } from '../../pricing-form/pricing-form.component';
import { IPrice } from 'src/app/core/models/service';
import { FeatureService } from 'src/app/services/packages/feature/feature.service';
import { IModuleType } from 'src/app/core/models/moduletype';
import { ModuletypeService } from 'src/app/services/moduletype/moduletype.service';

@Component({
    selector: 'app-modules-form-popup',
    templateUrl: './modules-form-popup.component.html',
    styleUrls: ['./modules-form-popup.component.scss']
})
export class ModulesFormPopupComponent implements OnInit {
    @ViewChild(PricingFormComponent) PricingFormComponent!: PricingFormComponent;
    foods: any[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ];
    formModule!: FormGroup;
    idModule: any;
    featureDataany: any;
    pricing : IPrice[] = [];
    features: IFeature[]= [];
    listPricing : IPrice[] = [];
    listModuleType: IModuleType [] = [];
    submitted = false;
    readOnly :any;
    constructor( 
        public navbar: NavbarService, 
        private activatedRoute: ActivatedRoute, 
        private moduleServ: ModuleService,
        private featureServ: FeatureService,
        private moduleTypeServ: ModuletypeService,  
        private toastServ: ToasterService,
        private router: Router) {}

    ngOnInit(): void {
        this.idModule =this.activatedRoute.snapshot.queryParamMap.get('id');
        this.readOnly = this.activatedRoute.snapshot.queryParamMap.get('action');
        this.getModuleType();
        this.setNavBar();
        this.initiateformModule();
        this.getAllfeatures();
       
    }

    setNavBar(){
      this.navbar.setNavBar({
        breadcrumbTitle: this.idModule ? 'Update module' :  'Add new module',
        breadcrumbIcon: 'packages'
    });
    }

    initiateformModule(){
        this.formModule = new FormGroup({
            moduleTypeId: new FormControl('', [Validators.required]),
            code: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            features: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required])
        });
        if(this.idModule){
            this.moduleServ.getModuleById(this.idModule).subscribe((module : any)=>{
              // To initiate the left formGroup
              this.formModule.patchValue({...module.result, features:module.result.features.map((feature:IFeature)=>feature.id), moduleTypeId:module.result.moduleType.id});
              this.getPricingModule(module.result.modulePricing);
              // To initiate the right formGroup
              this.listPricing = module.result.modulePricing;
              this.pricing = module.result.modulePricing;
            });
          }
          if(this.readOnly){
            this.formModule.disable()
          }

    }

    getModuleType(){
        this.moduleTypeServ.getAllModuleType().subscribe((data:any)=>{
            this.listModuleType = data.result;
        })
    }


    getAllfeatures() {
        this.featureServ.getallFeatures().subscribe((data: any) => {
            this.features = data.result.items;
        });
    }

    getPricingModule(price : IPrice[]){
        let priceFinal : IPrice[] = []
        price.forEach((element:IPrice)=>{
          let result : IPrice = {...element,sectors: element.sectors.map((sector:any)=> sector.id)}
          priceFinal.push(result)
        });
        this.pricing = priceFinal
      }


    addModule(){
        this.submitted = true;
        if(this.formModule.value && this.pricing.length ==0){
            return
        }
        let module = {...this.formModule.value,modulePricings:this.pricing}
        this.moduleServ.addModule(module).subscribe(()=>{
            this.toastServ.successToast('Module is successfully created');
          },
          (error) => this.toastServ.errorToast(error.error[0].errorMessage))
    }

    updateModule(){
        let module = {id:this.idModule,...this.formModule.value,modulePricings:this.pricing}
        this.moduleServ.updateModule(module).subscribe(()=>{
            this.toastServ.successToast('Module is successfully updated');
          },
          (error) => this.toastServ.errorToast(error.error[0].errorMessage))
    }


    actionToCall(){
        this.submitted = true;
        if(this.formModule.value && this.pricing.length ==0){
          return
        }
        if(this.idModule){
          this.updateModule();
        }else{
          this.addModule();
        }
        this.router.navigate(['/admin/packages'], { queryParams: { from: 'Modules' } });
      }
    cancel(){
        this.router.navigate(['/admin/packages'], { queryParams: { from: 'Modules' } });
    }
    }