import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

dynamicForm = new FormGroup({    
        users: new FormArray([])
    });  

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {    
    this.add();    
  }

  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get u() { return this.f.users as FormArray; }
  get userFormGroups() { return this.u.controls as FormGroup[]; }

  add()
  {
      this.u.push(this.formBuilder.group({
          firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
          lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
          email: ['', [Validators.required, Validators.email]]            
      }));
  }
  remove(index:number)
  {        
      this.u.removeAt(index);                    
  }

  onSubmit() {        
      // stop here if form is invalid
      if (this.dynamicForm.invalid) {
          return;
      }
      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
  }

  onReset() {        
      this.dynamicForm.reset();
      this.u.clear();
  }
  onClear() {      
    this.u.reset();
  }

// helpers for View
isControlValid(controlName: string,form:any): boolean {
  const control = form.controls[controlName];
  return control.valid && (control.dirty || control.touched);
}

isControlInvalid(controlName: string,form:any): boolean {
  const control = form.controls[controlName];
  return control.invalid && (control.dirty || control.touched);
}

controlHasError(validation:any, controlName:string,form:any): boolean {
  const control = form.controls[controlName];
  return control.hasError(validation) && (control.dirty || control.touched);
}

isControlTouched(controlName:string,form:any): boolean {
  const control = form.controls[controlName];
  return control.dirty || control.touched;
}
}
