import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiltersDashboardComponent } from './components/filters-dashboard/filters-dashboard.component';

const routes: Routes = [
  {
    path: 'filters',
    component: FiltersDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
