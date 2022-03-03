import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
import { EmployeesService } from '../core/services/employes.service';
import { NotificationPopupComponent } from '../shared/components/notification-popup/notification-popup.component';
import { AddEmploeeComponent } from './add-emploee/add-emploee.component';
import { ViewEmploeeComponent } from './view-emploee/view-emploee.component';

@Component({
  selector: 'app-emploees',
  templateUrl: './emploees.component.html',
  styleUrls: ['./emploees.component.css']
})
export class EmploeesComponent implements OnInit {

  subscription = new Subscription();
  logged;
  emploees = [
    {id: 0, name: 'Александра Малиновa', jobTitle: 'Синиор фармацевт (6 години)', education: 'Магистер по Фармација' , img: '../../assets/images/acka.png', description: ''},
    {id: 1, name: 'Пале Спасева', jobTitle: 'Синиор фармацевт (6 години)', education: 'Магистер по Фармација', img: '../../assets/images/pale.png', description: 'Јас сум Пале Спасева, во аптеки Биофарм - Штип работам од 2016 та година.    Мојот фокус секогаш е насочен кон здравјето и добросостојбата на пациентите. Секојдневно давам стручни совети за рационална и правилна употреба на лековите, со цел превенција и унапредување на здравјето на пациентите.     Аптеки Биофарм - Штип за мене претставуваат симбол за модерна и социјално-одговорна здравствена установа, чија мисија е континуирано и навремено снабдување со потребните лекови и медицински помагала .     Во новонастанатата ситуација им препорачувам на пациентите да ги почитуваат мерките за заштита како носење маска, хигиена на раце и социјална дистанца за да го зачуваат сопственото здравје и здравјето на нивните семејства, а притоа им давам совет за употреба на витамини, минерални и додатоци на исхрана за зајакнување на нивниот имунитет.'},
    {id: 2, name: 'Тамара Мишева', jobTitle: 'фармацевт (2 години)', education: 'Фармацевски Техничар', img: '../../assets/images/tama.png'},
    {id: 3, name: 'Сања Митев', jobTitle: 'Синиор фармацевт (5 години)', education: 'Магистер по Фармација', img: '../../assets/images/sana.png'},
    {id: 4, name: 'Слаџана Стојанова', jobTitle: 'фармацевт (3 години)', education: 'Фармацевски Техничар', img: '../../assets/images/saga.png'},
    {id: 5, name: 'Тамара Мишева', jobTitle: ' фармацевт (1 годинa)', education: 'Фармацевски Техничар', img: '../../assets/images/rob.png'},
  ];


  constructor(private dialog: MatDialog, private employeesSrv: EmployeesService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.logged = this.authSrv.getLoggedUserId();

    this.getEmployees();

  }

  getEmployees() {
    this.employeesSrv.getEmployees().subscribe(
      (data: any) => {
        this.emploees = data;
      })
  }

  removeEmployee(employee): void {
    const index = this.emploees.indexOf(employee);
      this.emploees.splice(index, 1);
      this.employeesSrv.deleteEmployee(employee.ID).subscribe(
        (data: any) => {
          this.getEmployees();
        }
      )
  }

  onAdd(employee) {
    const dialogRef = this.dialog.open(AddEmploeeComponent, {
      data: {
        employee
      },
      closeOnNavigation: true,
      disableClose: true,
      width: '100%',
      maxHeight: 'calc(100vh - 75px)',
      maxWidth: '500px',
      panelClass: ['slideInRight', 'custom-modalbox','theme-styles-overwrite'],
    });
    this.subscription.add(
      dialogRef.afterClosed().pipe(
        switchMap((data) => {
          if (data) {
            this.getEmployees();
          } else {
            return  of(null)
          }
        })).subscribe(data => {
          if(data) {
            this.openDialog('Успешно го ажуриравте вработениот');
          }
        }, (err) => {
          if (err && err.status !== 401) {
            this.openDialog('Something went wrong');
          }
      }
      ));
  }

  openEmploee(emploee) {
    const dialogRef = this.dialog.open(ViewEmploeeComponent, {
      data: {
        emploee
      },
      closeOnNavigation: true,
      //disableClose: true,
      width: '100%',
      maxHeight: 'calc(100vh - 75px)',
      maxWidth: '700px',
      panelClass: ['slideInRight', 'custom-modalbox','theme-styles-overwrite'],
    });
  }

  openDialog(message): void {
    setTimeout(() => this.dialog.open(NotificationPopupComponent, {
      width: '400px',
      data: message,
      panelClass: 'modalbox-purple'
    }));
  }
  
}
