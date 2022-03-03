import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import { SlideFromLeftAnimation } from '../../helpers/animations/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, share } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
  animations: [SlideFromLeftAnimation]
})
export class MainNavComponent implements OnInit, OnDestroy {
  @ViewChild('collapse') collapse: ElementRef;
  subscriptions = new Subscription();
  eventId$: Observable<string>;
  isHandset: boolean;
  opened = true;
  currentQueryParam;
  logged;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authSrv: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.subscriptions.add(this.activatedRoute.queryParams.subscribe(
      (data) => {
        this.currentQueryParam = data.status;
      }
    ))
    
    this.subscriptions.add(this.breakpointObserver.observe(['(max-width: 767px)'])
    .pipe(
      map(result => result.matches),
      share()
    ).subscribe(
      (data: boolean) => {
        this.isHandset = data;
        this.opened = !this.isHandset;
        document.body.style.overflow = (this.isHandset && this.opened) ? 'hidden' : 'auto';
      }
    ));
    this.logged = this.authSrv.getLoggedUserId();
  }
  toggleNav() {
    if(this.isHandset) {
      this.opened = !this.opened;
      document.body.style.overflow = this.opened ? 'hidden' : 'auto';
    }
  }

  logout() {
    this.authSrv.logout();
    this.router.navigate(['/login']);
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
