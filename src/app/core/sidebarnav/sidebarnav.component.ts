import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SideMenuItems } from '../../shared/model/SideMenuItems';
import { AuthenticationService } from '../service/authentication.service';
import { SidebarnavService } from '../service/sidebarnav.service';

@Component({
  selector: 'org-fat-sidebarnav',
  templateUrl: './sidebarnav.component.html',
  styleUrls: ['./sidebarnav.component.scss']
})
export class SidebarnavComponent implements OnInit {
  sidemenuItems: SideMenuItems[] = [];
  uniqueParentName: string[] = [];
  parentMenuItems: SideMenuItems[] = [];
  rla!: string | string[];

  isCreateAllowed: boolean = false;
  isEditAllowed: boolean = false;
  isViewAllowed: boolean = false;
  isDeleteAllowed: boolean = false;
  userName = localStorage.getItem('userName');
  companyName = localStorage.getItem('companyID');


  layoutMode: string = "static";
  overlayMenuActive!: boolean;
  staticMenuDesktopInactive!: boolean;
  staticMenuMobileActive!: boolean;
  rotateMenuButton!: boolean;
  menuClick!: boolean;
  ripple!: boolean;
  topbarMenuActive!: boolean;
  topbarItemClick!: boolean;
  menuHoverActive!: boolean;
  activeTopbarItem: any;

  constructor(
    private sidebarnavservice: SidebarnavService,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.sidemenuItems.length > 0) {
          this.isCreateAllowed = this.sidemenuItems.some(
            item => item.menuType === "CONTEXTMENU" && item.menuName === "CreateNew" && item.parentMenuName.toLowerCase().indexOf(event.url.replace('/', '').toLowerCase()) > -1);
          this.isEditAllowed = this.sidemenuItems.some(
            item => item.menuType === "CONTEXTMENU" && item.menuName === "Edit" && item.parentMenuName.toLowerCase().indexOf(event.url.replace('/', '').toLowerCase()) > -1);
          this.isViewAllowed = this.sidemenuItems.some(
            item => item.menuType === "CONTEXTMENU" && item.menuName === "View" && item.parentMenuName.toLowerCase().indexOf(event.url.replace('/', '').toLowerCase()) > -1);
          this.isDeleteAllowed = this.sidemenuItems.some(
            item => item.menuType === "CONTEXTMENU" && item.menuName === "Delete" && item.parentMenuName.toLowerCase().indexOf(event.url.replace('/', '').toLowerCase()) > -1);

          localStorage.setItem('currentPage', event.url.replace('/', '').toLowerCase());
          localStorage.setItem("isCreateAllowed", this.isCreateAllowed.toString());
          localStorage.setItem("isEditAllowed", this.isEditAllowed.toString());
          localStorage.setItem("isViewAllowed", this.isViewAllowed.toString());
          localStorage.setItem("isDeleteAllowed", this.isDeleteAllowed.toString());
        }
      }
    });
  }


  ngOnInit(): void {
    this.getNavItems();
  }

  getNavItems() {
    this.sidebarnavservice.getSideNavItems().subscribe(data => {
      this.sidemenuItems = data;
      this.parentMenuItems = this.sidemenuItems.filter(i => i.parentMenuName == null).
        sort((a, b) => (a.sortOrder > b.sortOrder) ? 1 : -1);
    });
  }

  getChildMenuItems(parentMenuName: string) {
    return this.sidemenuItems.filter(i => i.parentMenuName === parentMenuName)
      .sort((a, b) => (a.sortOrder > b.sortOrder) ? 1 : -1);
  }

  onSearchChange(searchValue: string) {
    //TODO: Search box is not proper, deleting the typed character is not working as expected
    if (!searchValue) {
      this.getNavItems();
    } // when nothing has typed
    this.sidemenuItems = this.sidemenuItems.filter(
      item => item.menuText.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    )
  }

  onLogout() {
    this.authenticationService.logout();
  }


  onLayoutClick() {
    if (!this.topbarItemClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
    }

    if (!this.menuClick) {
      if (this.isHorizontal() || this.isSlim()) {
        // this.menuService.reset();
      }

      if (this.overlayMenuActive || this.staticMenuMobileActive) {
        this.hideOverlayMenu();
      }

      this.menuHoverActive = false;
    }
    this.topbarItemClick = false;
    this.menuClick = false;
  }

  onMenuClick(item: any) {
    this.menuClick = true;
    this.rotateMenuButton = false;
    this.overlayMenuActive = false;
    this.staticMenuMobileActive = false;
    if (this.getChildMenuItems(item.menuName).length > 0) {
      this.staticMenuMobileActive = true;
    }
  }

  onMenuButtonClick(event: any) {
    this.menuClick = true;
    this.rotateMenuButton = !this.rotateMenuButton;
    this.topbarMenuActive = false;

    if (this.layoutMode === 'overlay') {
      this.overlayMenuActive = !this.overlayMenuActive;
    } else {
      if (this.isDesktop()) {
        this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
      } else {
        this.staticMenuMobileActive = !this.staticMenuMobileActive;
      }
    }

    event.preventDefault();
  }
  onTopbarMenuButtonClick(event: any) {
    this.topbarItemClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;

    this.hideOverlayMenu();

    event.preventDefault();
  }
  hideOverlayMenu() {
    this.rotateMenuButton = false;
    this.overlayMenuActive = false;
    this.staticMenuMobileActive = false;
  }
  isTablet() {
    const width = window.innerWidth;
    return width <= 1024 && width > 640;
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  isMobile() {
    return window.innerWidth <= 640;
  }

  isStatic() {
    return this.layoutMode === "static";
  }

  isOverlay() {
    return this.layoutMode === "overlay";
  }

  isHorizontal() {
    return this.layoutMode === "horizontal";
  }


  isSlim() {
    return this.layoutMode === "slim";
  }
  onTopbarSubItemClick(event: any) {
    event.preventDefault();
  }
}
