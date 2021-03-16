import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPageRenderDTO } from 'src/app/core/dtos/page-render/page-render.dto';
import { IUserDTO } from 'src/app/core/dtos/user/user.dto';
import { IUser } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserCreateOrUpdateComponent } from '../user-create-or-update/user-create-or-update.component';

@Component({
  selector: 'app-user-all-page',
  templateUrl: './user-all-page.component.html',
  styleUrls: ['./user-all-page.component.css']
})
export class UserAllPageComponent implements OnInit {

  pageRender: IPageRenderDTO;
  users: IUserDTO[] = [];

  pageSizeOptions: number[] = [5, 10, 15];
  displayedColumns: string[] = ['Id', 'Fullname', 'Email', 'Authorities', 'State', 'Actions'];

  constructor(
    private userService: UserService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const pageFirstTime = 0;
    const sizeFirstTime = 5;
    this.findUsersAllpage(pageFirstTime, sizeFirstTime);
  }

  deleteById(id: number, index: number): void {

    this.userService.deleteById(id).subscribe(
      () => {

        this.users = [...this.users];
        this.users.splice(index, 1);

        this.snackBar.open('User deleted!', 'close', {
          duration: 3500
        });

      });

  }

  // Events

  pageEvent(event: PageEvent): void {
    const page = event.pageIndex;
    const size = event.pageSize;
    this.findUsersAllpage(page, size);
  }

  // Utils

  createUser(): void {

    const matDialogRef = this.matDialog.open(UserCreateOrUpdateComponent, { width: '100%' });

    matDialogRef.afterClosed().subscribe(
      (user: IUserDTO) => {
        if (user) {
          this.users = [...this.users];
          this.users.push(user);
          this.snackBar.open('User created!', 'close', { duration: 3500 });
        }
      }
    );
  }

  updateUser(user: IUser, index: number): void {
    const matDialogRef = this.matDialog.open(UserCreateOrUpdateComponent, {
      data: user,
      width: '100%'
    });

    matDialogRef.afterClosed().subscribe(
      (result: IUserDTO) => {
        if (result) {
          this.users = [...this.users];
          this.users.splice(index, 1, result);
          this.snackBar.open('User updated!', 'close', { duration: 3500 });
        }
      }
    );
  }

  activationCode(email: string): void {
    alert('enviar codigo de verificación');
  }

  // Fetchs

  private findUsersAllpage(page: number, size: number): void {
    this.userService.findAllPage(page, size).subscribe(
      (pageRender: IPageRenderDTO) => {
        this.pageRender = pageRender;
        this.users = this.pageRender.content;
      });
  }

}
