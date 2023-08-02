import {Component, OnDestroy, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { debounceTime, debounce } from 'rxjs/operators';

@Component({
  selector: 'app-registartion-form',
  templateUrl: './registartion-form.component.html',
  styleUrls: ['./registartion-form.component.scss']
})
export class RegistartionFormComponent implements OnInit, OnDestroy {
  private subscriber$!: Subscription;

  registrationForm: UntypedFormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    roleId: [1, Validators.required]
  });
  roles: {id: number, title: string}[] = [
    { id: 1, title: 'developer' },
    { id: 2, title: 'qa' }
  ];

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.subscriber$ = this.registrationForm.valueChanges.pipe(
      debounceTime(1000)
      // debounce(() => interval(1000))
    ).subscribe(selectedValue  => {
      console.log('form value changed');
      console.log(selectedValue);
    })
  }

  ngOnDestroy(): void {
    this.subscriber$.unsubscribe();
  }

  onSubmit(): void {
    console.log(this.registrationForm.getRawValue())
  }

  isInputValid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return Boolean(field?.invalid && (field.dirty || field.touched));
  }
}
