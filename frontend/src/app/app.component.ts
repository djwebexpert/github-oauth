import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gitHub-oauth';
  isSidebarOpen = true;
  isHoverSidebar = false;
  windowWidth = 0;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.resetHoverSidebar();
  }

  @HostListener('window:load')
  @HostListener('window:resize')
  onWindowChange(): void {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth < 992) {
      this.closeSidebar();
    }
  }

  openSidebar(): void {
    this.isSidebarOpen = true;
    this.resetHoverSidebar();
  }

  sidebarHoverEvent($event: Event): void {
    if (this.windowWidth < 992) {
      this.openSidebar();
    } else if (!this.isSidebarOpen) {
      this.isHoverSidebar = $event.type === 'mouseover';
    }
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
    this.resetHoverSidebar();
  }

  resetHoverSidebar(): void {
    this.isHoverSidebar = false;
  }
}
