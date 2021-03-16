import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAuthorityDTO } from 'src/app/core/dtos/authority/authority.dto';

import { IPageRenderDTO } from 'src/app/core/dtos/page-render/page-render.dto';
import { IAuthority } from 'src/app/core/models/authority.model';
import { AuthorityService } from 'src/app/core/services/authority/authority.service';
import { AuthorityCreateOrUpdateComponent } from '../authority-create-or-update/authority-create-or-update.component';

@Component({
  selector: 'app-authority-all-page',
  templateUrl: './authority-all-page.component.html',
  styleUrls: ['./authority-all-page.component.css']
})
export class AuthorityAllPageComponent implements OnInit {

  pageRender: IPageRenderDTO;
  authorities: IAuthorityDTO[] = [];

  pageSizeOptions: number[] = [5, 10, 15];
  displayedColumns: string[] = ['Id', 'Name', 'Actions'];

  constructor(private authorityService: AuthorityService, private matDialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const pageFirstTime = 0;
    const sizeFirstTime = 5;
    this.findAuthoritiesAllpage(pageFirstTime, sizeFirstTime);
  }

  deleteById(id: number, index: number): void {

    this.authorityService.deleteById(id).subscribe(
      () => {

        this.authorities = [...this.authorities];
        this.authorities.splice(index, 1);

        this.snackBar.open('Authority deleted!', 'close', {
          duration: 3500
        });

      });

  }

  // Events

  pageEvent(event: PageEvent): void {
    const page = event.pageIndex;
    const size = event.pageSize;
    this.findAuthoritiesAllpage(page, size);
  }

  // Utils

  createAuthority(): void {

    const matDialogRef = this.matDialog.open(AuthorityCreateOrUpdateComponent, {width: '100%'});

    matDialogRef.afterClosed().subscribe(
      (authority: IAuthorityDTO) => {
        if (authority) {
          this.authorities = [...this.authorities];
          this.authorities.push(authority);
          this.snackBar.open('Authority created!', 'close', { duration: 3500 });
        }
      }
    );

  }

  updateAuthority(authority: IAuthority, index: number): void {
    const matDialogRef = this.matDialog.open(AuthorityCreateOrUpdateComponent, {
      data: authority,
      width: '100%'
    });

    matDialogRef.afterClosed().subscribe(
      (result: IAuthorityDTO) => {
        if (result) {
          this.authorities = [...this.authorities];
          this.authorities.splice(index, 1, result);
          this.snackBar.open('Authority updated!', 'close', { duration: 3500 });
        }
      }
    );
  }

  // Fetchs

  private findAuthoritiesAllpage(page: number, size: number): void {
    this.authorityService.findAllPage(page, size).subscribe(
      (pageRender: IPageRenderDTO) => {
        this.pageRender = pageRender;
        this.authorities = this.pageRender.content;
      });
  }


}
