import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/core/services/security/security.service';

@Directive({
  selector: '[appIsLogin]'
})
export class IsLoginDirective implements OnDestroy {

  private authenticationSubscription?: Subscription;
  private isLogin: boolean;

  constructor(
    private securityService: SecurityService,
    private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef
  ) { }

  @Input()
  set appIsLogin(value: boolean) {
    this.isLogin = value;
    this.updateView();
    this.authenticationSubscription = this.securityService.getAuthenticationState().subscribe(() => this.updateView());
  }

  ngOnDestroy(): void {
    if (this.authenticationSubscription) {
      this.authenticationSubscription.unsubscribe();
    }
  }

  private updateView(): void {
    this.viewContainerRef.clear();
    if (this.isLogin) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

}

